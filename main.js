import random from "./utils.js"
import { randomRange } from "./utils.js"
import generateLog from "./logs.js"
import Pokemon from "./pokemon.js"
import { POKEMONS } from "./pokemons.js"

const pokemon1 = POKEMONS[random(POKEMONS.length - 1)]
let pokemon2 = POKEMONS[random(POKEMONS.length - 1)]

if (pokemon1.name === pokemon2.name) {
  pokemon2 = POKEMONS[(POKEMONS.findIndex((p) => p.name === pokemon2.name) + 1) % POKEMONS.length]
}

const player1 = new Pokemon({ ...pokemon1, selectors: "player1" })
const player2 = new Pokemon({ ...pokemon2, selectors: "player2" })

const $logs = document.getElementById("logs")
const $control = document.querySelector(".control")

let isFinished = false

function addLog(attackedPlayer, attackingPlayer, damage) {
  const $p = document.createElement("p")
  $p.innerText = generateLog(attackedPlayer, attackingPlayer, damage)
  $logs.prepend($p)
}

function finishGame(winnerName) {
  isFinished = true
  const $result = document.createElement("p")
  $result.innerText = `${winnerName} wins!`
  $logs.prepend($result)

  Array.from($control.querySelectorAll("button")).forEach((button) => {
    button.disabled = true
  })
}

player1.attacks.forEach((attack) => {
  const $btn = document.createElement("button")
  $btn.className = "button"
  $btn.id = `button-${attack.id}`
  $btn.innerText = attack.name

  const btnCounter = countBtn(attack.maxCount, $btn)
  $btn.addEventListener("click", () => {
    if (isFinished) {
      return
    }

    btnCounter()

    const playerDamage = randomRange(attack.minDamage, attack.maxDamage)
    const isEnemyDefeated = player2.changeHp(playerDamage, (count) => {
      addLog(player2, player1, count)
    })

    if (isEnemyDefeated) {
      finishGame(player1.name)
      return
    }

    const enemyAttack = player2.attacks[random(player2.attacks.length - 1)]
    const enemyDamage = randomRange(enemyAttack.minDamage, enemyAttack.maxDamage)
    const isPlayerDefeated = player1.changeHp(enemyDamage, (count) => {
      addLog(player1, player2, count)
    })

    if (isPlayerDefeated) {
      finishGame(player2.name)
    }
  })

  player1.elButtons.appendChild($btn)
})

function countBtn(count = 6, btn) {
  const innerText = btn.innerText
  btn.innerText = `${innerText} (${count})`

  return function () {
    count = Math.max(count - 1, 0)
    if (count === 0) {
      btn.disabled = true
    }
    btn.innerText = `${innerText} (${count})`
    return count
  }
}
