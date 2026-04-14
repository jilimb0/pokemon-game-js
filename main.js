import { ensureDifferentPokemon, pickEnemyAttack } from "./game-logic.js"
import generateLog from "./logs.js"
import Pokemon from "./pokemon.js"
import { POKEMONS } from "./pokemons.js"
import random, { randomRange } from "./utils.js"

const pokemon1 = POKEMONS[random(POKEMONS.length - 1)]
let pokemon2 = POKEMONS[random(POKEMONS.length - 1)]
pokemon2 = ensureDifferentPokemon(pokemon1, pokemon2, POKEMONS)

const player1 = new Pokemon({ ...pokemon1, selectors: "player1" })
const player2 = new Pokemon({ ...pokemon2, selectors: "player2" })

const $logs = document.getElementById("logs")
const $control = document.querySelector(".control")
const $result = document.getElementById("result")
const $resultText = document.getElementById("result-text")
const $restart = document.getElementById("restart-game")

let isFinished = false

function addLog(attackedPlayer, attackingPlayer, damage) {
  const $p = document.createElement("p")
  $p.innerText = generateLog(attackedPlayer, attackingPlayer, damage)
  $logs.prepend($p)
}

function disableControls() {
  Array.from($control.querySelectorAll("button")).forEach((button) => {
    button.disabled = true
  })
}

function finishGame(winnerName) {
  isFinished = true
  disableControls()
  $resultText.innerText = `${winnerName} wins the battle!`
  $result.classList.remove("hidden")
}

function performAttack(attacker, defender, attack) {
  const damage = randomRange(attack.minDamage, attack.maxDamage)
  const isDefeated = defender.changeHp(damage, (count) => {
    addLog(defender, attacker, count)
  })

  defender.hitEffect()
  return isDefeated
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

    const isEnemyDefeated = performAttack(player1, player2, attack)
    if (isEnemyDefeated) {
      finishGame(player1.name)
      return
    }

    const enemyAttack = pickEnemyAttack(player2.attacks, random)
    if (!enemyAttack) {
      finishGame(player1.name)
      return
    }

    const isPlayerDefeated = performAttack(player2, player1, enemyAttack)
    if (isPlayerDefeated) {
      finishGame(player2.name)
    }
  })

  player1.elButtons.appendChild($btn)
})

$restart.addEventListener("click", () => {
  window.location.reload()
})

function countBtn(count = 6, btn) {
  const innerText = btn.innerText
  btn.innerText = `${innerText} (${count})`

  return () => {
    count = Math.max(count - 1, 0)
    if (count === 0) {
      btn.disabled = true
    }

    btn.innerText = `${innerText} (${count})`
    return count
  }
}
