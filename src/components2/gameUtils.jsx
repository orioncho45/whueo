import { useDispatch, useSelector } from "react-redux";
import { closeSocket, getSocket } from "../socket/test"
import Overlays from "./overlay/overLays";
import { setRoomData } from "../store/features/roomData";
import { useEffect, useState, useRef, useCallback } from "react";
import { addMessage, clearMessages, closeChat } from "../store/features/chat";
import GameResult from "./gameResult";
import ChatComponent from "./chat";
import { useNavigate } from "react-router-dom";
import PingHUD from "./utils/ping";
import Players from "./players";
import { closePlayers } from "../store/features/players";
import useSound from "../sounds/player";

const GameUtils = ({ showAlert = () => {}, confirmAction = () => {} }) => {

    const socket = getSocket();
    const playSound = useSound();
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const roomData = useSelector(state => state.roomData.value);
    const socketId = useSelector(state => state.personal.value?.socketId);
    const playersOpen = useSelector(state => state.players?.value?.open)

    const [ping, setPing] = useState(0)
    const [words, setWords] = useState([]);
    const [isImposter, setIsImposter] = useState(false)
    const [isEliminated, setIsEliminated] = useState(false);
    const [selectorSocketId, setSelectorSocketId] = useState(null)
    const [tempRoomData, setTempRoomData] = useState(null);
    const [showOverlays, setShowOverlays] = useState(false)
    const [gameResult, setGameResult] = useState(null);

    // Refs to avoid stale closures in socket handlers
    const roomDataRef = useRef(roomData);
    const tempRoomDataRef = useRef(tempRoomData);
    const isImposterRef = useRef(isImposter);

    useEffect(() => { roomDataRef.current = roomData; }, [roomData]);
    useEffect(() => { tempRoomDataRef.current = tempRoomData; }, [tempRoomData]);
    useEffect(() => { isImposterRef.current = isImposter; }, [isImposter]);

    // ============================
    // RESET
    // ============================
    const resetState = ()=>{
        setShowOverlays(false)
        setGameResult(null)
        setTempRoomData(null);
        setIsEliminated(false);
        setSelectorSocketId(null);
        setIsImposter(false);
        setWords([]);
    }
    const reset = useCallback((reason) => {
        const message = reason && typeof reason === "string" ? reason : "Sorry! you got disconnected"
        showAlert("error", message)
        closeSocket()
        
        dispatch(closePlayers())
        dispatch(setRoomData(null))
        dispatch(clearMessages())
        resetState()
        Navigate("/play")
    }, [dispatch, showAlert])

    // ============================
    // SOCKET HANDLERS
    // ============================
    const handleGameStarted = useCallback(({ roomData: newRoomData, words, selectorSocketId }) => {
        //console.log(newRoomData)
        const player = newRoomData.players[socketId];
        setWords(words)
        setTempRoomData(newRoomData)
        setIsImposter(newRoomData.imposters.includes(socketId))
        setIsEliminated(player?.eliminated ?? false)
        setSelectorSocketId(selectorSocketId)
        setShowOverlays(true)
        setGameResult(null)
    }, [socketId])

    const handleRestart = useCallback(({ roomData: newRoomData }) => {
        
        resetState()
        dispatch(setRoomData(newRoomData))
    }, [dispatch])

    const handleUserJoined = useCallback(({ roomData: newRoomData }) => {
        dispatch(setRoomData(newRoomData))
        playSound({type: "join"});
    }, [dispatch])

    const handleUserLeft = useCallback(({ roomData: newRoomData, socketId: removedIds, reason }) => {
        const current = roomDataRef.current;
        
        // if we are the one who left
        if (!Object.keys(newRoomData.players).includes(socketId)) {
            reset(reason)
        } else {

            
            if(removedIds){
                removedIds.forEach(element => {
                    if (roomData?.players[element]?.username) {
                        dispatch(addMessage({
                            type: "system",
                            message: `${roomData.players[element].username} is no logner in the room!`
                        }))
                    }
                });
            }
            // notify if host changed
            if (current?.hostId !== newRoomData.hostId) {
                const newHost = newRoomData.players[newRoomData.hostId];
                if (newHost) {
                    dispatch(addMessage({
                        type: "system",
                        message: `${newHost.username} is now the new host!`
                    }))
                }
            }
            dispatch(setRoomData(newRoomData))
        }
        playSound({type: "leave"});
    }, [dispatch, socketId, reset])

    const handleMessage = useCallback((payload) => {
        dispatch(addMessage({ type: "chat", ...payload }))
    }, [dispatch])

    const handleGameResult = useCallback((result) => {
        setGameResult(result)
    }, [])

    const handleVoteStart = useCallback(({ roomData: newRoomData }) => {
        dispatch(setRoomData(newRoomData))
    }, [dispatch])

    const handleWordSelect = useCallback((payload) => {
        const current = tempRoomDataRef.current;
        if (!current) return;
        const newValue = current.imposters.includes(socketId) ? {imposter: payload.word} : {player: payload.word}
        dispatch(setRoomData({
            ...current,
            word: {...current.word, ...newValue}
        }))
        setShowOverlays(false)
    }, [dispatch, socketId])

    const handlePing = useCallback(() => {
        if (!socketId || !socket || !roomData) return;
        const started = Date.now();
        socket.emit("ping", {}, () => {
            setPing(Date.now() - started)
        })
    }, [socket, socketId])

    // ============================
    // REGISTER SOCKET LISTENERS
    // ============================
    useEffect(() => {
        if (!socket) return

        socket.on("start_room", handleGameStarted)
        socket.on("restart_game", handleRestart)
        socket.on("user_joined", handleUserJoined)
        socket.on("user_left", handleUserLeft)
        socket.on("message", handleMessage)
        socket.on("game_result", handleGameResult)
        socket.on("vote_start", handleVoteStart)
        socket.on("word_select", handleWordSelect)
        socket.on("cleanup", reset)
        socket.onclose = reset

        return () => {
            socket.off("start_room", handleGameStarted)
            socket.off("restart_game", handleRestart)
            socket.off("user_joined", handleUserJoined)
            socket.off("user_left", handleUserLeft)
            socket.off("message", handleMessage)
            socket.off("game_result", handleGameResult)
            socket.off("vote_start", handleVoteStart)
            socket.off("word_select", handleWordSelect)
            socket.off("cleanup", reset)
            socket.onclose = null
        }
    }, [
        socket,
        handleGameStarted,
        handleRestart,
        handleUserJoined,
        handleUserLeft,
        handleMessage,
        handleGameResult,
        handleVoteStart,
        handleWordSelect,
        reset
    ])

    // ============================
    // PING — every 3 seconds
    // ============================
    useEffect(() => {
        if (!socket) return
        const interval = setInterval(handlePing, 3000)
        return () => clearInterval(interval)
    }, [socket, handlePing])

    // ============================
    // CLOSE CHAT/PLAYERS ON LEAVE
    // ============================
    useEffect(() => {
        if (!roomData) {
            dispatch(closePlayers())
            dispatch(closeChat())
        }
    }, [roomData])

    if (!roomData) return null;

    const showChat = ["lobby", "started", "vote"].includes(roomData?.state)

    return (
        <>
            {socketId && <PingHUD ping={ping} />}
            {showChat && <ChatComponent />}
            {showOverlays && (
                <Overlays
                    showAlert={showAlert}
                    isEliminated={isEliminated}
                    selectorSocketId={selectorSocketId}
                    words={words}
                    isImposter={isImposter}
                    round={tempRoomData.round}
                    onDone={() => {
                        if (tempRoomDataRef.current) {
                            dispatch(setRoomData(tempRoomDataRef.current))
                        }
                        setShowOverlays(false)
                    }}
                />
            )}
            {gameResult && (
                <GameResult showAlert={showAlert} gameResult={gameResult} />
            )}
            {(playersOpen && roomData) && <Players confirmAction={confirmAction} showAlert={showAlert} />}
        </>
    )
}

export default GameUtils;