/**
 * https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
 *
 * @param hex
 * @param alpha
 * @returns {string}
 */
export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};