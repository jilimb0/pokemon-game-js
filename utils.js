function random(max) {
  return Math.floor(Math.random() * (max + 1))
}

export function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default random
