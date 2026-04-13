import test from "node:test"
import assert from "node:assert/strict"
import {
  clampHp,
  ensureDifferentPokemon,
  healthPercent,
  pickEnemyAttack,
} from "../game-logic.js"

test("clampHp prevents negative hp and reports defeat", () => {
  const result = clampHp(20, 50)
  assert.equal(result.nextHp, 0)
  assert.equal(result.damageDone, 20)
  assert.equal(result.isDefeated, true)
})

test("healthPercent returns rounded percentage", () => {
  assert.equal(healthPercent(73, 146), 50)
  assert.equal(healthPercent(1, 3), 33)
  assert.equal(healthPercent(10, 0), 0)
})

test("pickEnemyAttack uses provided index function", () => {
  const attacks = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const picked = pickEnemyAttack(attacks, () => 1)
  assert.deepEqual(picked, { id: 2 })
})

test("ensureDifferentPokemon changes duplicate selection", () => {
  const roster = [{ name: "A" }, { name: "B" }, { name: "C" }]
  const result = ensureDifferentPokemon({ name: "A" }, { name: "A" }, roster)
  assert.deepEqual(result, { name: "B" })
})
