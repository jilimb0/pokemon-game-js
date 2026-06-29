import { POKEMONS } from "./pokemons.js"

const $selection = document.getElementById("selection")
const $grid = document.getElementById("selection-grid")
const $startBtn = document.getElementById("start-battle")
const $game = document.getElementById("game")
const $enemyName = document.getElementById("enemy-name")

let selectedPokemon = null
let enemyPokemon = null

function renderSelection() {
  $grid.innerHTML = ""
  POKEMONS.forEach((p) => {
    const card = document.createElement("div")
    card.className = "pokemon selection-card"
    card.dataset.name = p.name

    card.innerHTML = `
      <span class="lvl">Lv. ${p.lvl}</span>
      <img class="sprite" src="${p.img}" alt="${p.name}" />
      <div class="details">
        <h2 class="name">${p.name}</h2>
        <span class="type-badge type-${p.type}">${p.type}</span>
      </div>
    `

    card.addEventListener("click", () => {
      for (const c of $grid.querySelectorAll(".selection-card")) {
        c.classList.remove("selected")
      }
      card.classList.add("selected")
      selectedPokemon = p
      $startBtn.disabled = false
    })

    $grid.appendChild(card)
  })
}

function pickEnemy(playerPick) {
  const others = POKEMONS.filter((p) => p.name !== playerPick.name)
  return others[Math.floor(Math.random() * others.length)]
}

$startBtn.addEventListener("click", () => {
  if (!selectedPokemon) return
  enemyPokemon = pickEnemy(selectedPokemon)
  $enemyName.textContent = enemyPokemon.name
  $selection.classList.add("hidden")
  $game.classList.remove("hidden")
  // Store selected Pokemon on window for main.js to read
  window.__selectedPokemon = selectedPokemon
  window.__enemyPokemon = enemyPokemon
  // Dispatch event so main.js knows to start
  window.dispatchEvent(new CustomEvent("battle-start"))
})

renderSelection()
