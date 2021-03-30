import random from "./utils.js"
import generateLog from "./logs.js"
import Pokemon from "./pokemon.js"
import { POKEMONS } from "./pokemons.js"

const pokemon1 = POKEMONS[random(POKEMONS.length - 1)]
const pokemon2 = POKEMONS[random(POKEMONS.length - 1)]

const player1 = new Pokemon({ ...pokemon1, selectors: "player1" })
const player2 = new Pokemon({ ...pokemon2, selectors: "player2" })

const $logs = document.getElementById("logs")
const $p = document.createElement("p")

player1.attacks.forEach((btn) => {
  const $btn = document.createElement("button")
  $btn.className = "button"
  $btn.id = `button-${btn.id}`
  $btn.innerText = btn.name

  const btnCounter = countBtn(btn.maxCount, $btn)
  $btn.addEventListener("click", () => {
    btnCounter()
    player1.changeHp(random(btn.maxCount), function (count) {
      $p.innerText = generateLog(player1, player2, count)
    })
    player2.changeHp(random(btn.maxCount), function (count) {
      $p.innerText = generateLog(player1, player2, count)
    })
  })

  player1.elButtons.appendChild($btn)

  $logs.insertBefore($p, $logs.children[0]) // fix logs
})

function countBtn(count = 6, btn) {
  const innerText = btn.innerText
  btn.innerText = `${innerText} (${count})`

  return function () {
    count--
    if (count === 0) {
      btn.disabled = true
    }
    btn.innerText = `${innerText} (${count})`
    return count
  }
}
