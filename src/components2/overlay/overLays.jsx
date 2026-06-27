import { useState } from "react";
import RoleRevealOverlay from "./roleRevealOverlay";
import WordSelectOverlay from "./wordselect";
import { useSelector } from "react-redux";
import WaitingForWordOverlay from "./selectingOverlay";
import RoundOverlay from "./roundOverlay";

const Overlays = ({words, isImposter, isEliminated, selectorSocketId, round, showAlert}) => {
    const [showRound, setShowRound] = useState(true);
    const [showRole, setShowRole] = useState(false);
    const [showWordSelect, setShowWordSelect] = useState(false)
    const socketId = useSelector(state=>state.personal.value?.socketId)
    const isSelector = selectorSocketId === socketId

    return (
        <>
            {
                showRound && (
                    <RoundOverlay onDone={()=>{
                        setShowRound(false);
                        if (isEliminated || round>1) {
                            setShowWordSelect(true)
                        } else {
                            setShowRole(true);    
                        }
                        
                    }} />
                )
            }
            {showRole && (
                <RoleRevealOverlay isImposter={isImposter} onDone={()=>{
                    setShowRole(false)
                    setShowWordSelect(true)
                }} />
            )}

            {
                showWordSelect && isSelector && (
                    <WordSelectOverlay words={words} showAlert={showAlert}/>
                )
            }
            {
                showWordSelect && !isSelector && (
                    <WaitingForWordOverlay />
                )
            }
        
        </>
    )
}
export default Overlays