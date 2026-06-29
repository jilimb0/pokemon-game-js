import { pickEnemyAttack } from "./game-logic.js"
import generateLog from "./logs.js"
import Pokemon from "./pokemon.js"
import random, { randomRange } from "./utils.js"

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
  for (const button of $control.querySelectorAll("button")) {
    button.disabled = true
  }
}

function finishGame(winnerName) {
  isFinished = true
  disableControls()
  $resultText.innerText = `${winnerName} wins!`
  $result.classList.remove("hidden")
  $result.focus()
}

function performAttack(attacker, defender, attack) {
  const damage = randomRange(attack.minDamage, attack.maxDamage)
  const isDefeated = defender.changeHp(damage, (count) => {
    addLog(defender, attacker, count)
  })
  defender.hitEffect()
  return isDefeated
}

function startBattle(playerData, enemyData) {
  const player1 = new Pokemon({ ...playerData, selectors: "player1" })
  const player2 = new Pokemon({ ...enemyData, selectors: "player2" })

  player1.attacks.forEach((attack) => {
    const $btn = document.createElement("button")
    $btn.className = "button"
    $btn.id = `button-${attack.id}`
    $btn.innerText = attack.name

    const btnCounter = countBtn(attack.maxCount, $btn)

    $btn.addEventListener("click", () => {
      if (isFinished) return
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
}

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

// Listen for selection screen to finish
window.addEventListener("battle-start", () => {
  startBattle(window.__selectedPokemon, window.__enemyPokemon)
})
