const hexToRgb = (hex) => {

    const bigint =
      parseInt(hex.slice(1), 16)

    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    }
  }

export default hexToRgb