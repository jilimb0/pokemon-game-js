import assert from "node:assert/strict"
import test from "node:test"
import { clampHp, ensureDifferentPokemon, healthPercent, pickEnemyAttack } from "../game-logic.js"

test("clampHp prevents negative hp and reports defeat", () => {
  const result = clampHp(20, 50)
  assert.equal(result.nextHp, 0)
  assert.equal(result.damageDone, 20)
  assert.equal(result.isDefeated, true)
})

test("clampHp returns full damage when hp is sufficient", () => {
  const result = clampHp(100, 30)
  assert.equal(result.nextHp, 70)
  assert.equal(result.damageDone, 30)
  assert.equal(result.isDefeated, false)
})

test("clampHp handles zero damage", () => {
  const result = clampHp(50, 0)
  assert.equal(result.nextHp, 50)
  assert.equal(result.damageDone, 0)
  assert.equal(result.isDefeated, false)
})

test("clampHp handles edge case where damage exactly equals hp", () => {
  const result = clampHp(30, 30)
  assert.equal(result.nextHp, 0)
  assert.equal(result.damageDone, 30)
  assert.equal(result.isDefeated, true)
})

test("healthPercent returns rounded percentage", () => {
  assert.equal(healthPercent(73, 146), 50)
  assert.equal(healthPercent(1, 3), 33)
  assert.equal(healthPercent(10, 0), 0)
})

test("healthPercent handles full hp", () => {
  assert.equal(healthPercent(100, 100), 100)
})

test("healthPercent handles zero hp", () => {
  assert.equal(healthPercent(0, 100), 0)
})

test("healthPercent handles fractions correctly", () => {
  assert.equal(healthPercent(50, 100), 50)
  assert.equal(healthPercent(149, 150), 99)
  assert.equal(healthPercent(1, 150), 1)
})

test("pickEnemyAttack uses provided index function", () => {
  const attacks = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const picked = pickEnemyAttack(attacks, () => 1)
  assert.deepEqual(picked, { id: 2 })
})

test("pickEnemyAttack returns null for empty attacks", () => {
  const result = pickEnemyAttack([], () => 0)
  assert.equal(result, null)
})

test("pickEnemyAttack returns null for null attacks", () => {
  const result = pickEnemyAttack(null, () => 0)
  assert.equal(result, null)
})

test("pickEnemyAttack returns null for undefined attacks", () => {
  const result = pickEnemyAttack(undefined, () => 0)
  assert.equal(result, null)
})

test("pickEnemyAttack handles single attack", () => {
  const attacks = [{ id: 99 }]
  const picked = pickEnemyAttack(attacks, () => 0)
  assert.deepEqual(picked, { id: 99 })
})

test("ensureDifferentPokemon changes duplicate selection", () => {
  const roster = [{ name: "A" }, { name: "B" }, { name: "C" }]
  const result = ensureDifferentPokemon({ name: "A" }, { name: "A" }, roster)
  assert.deepEqual(result, { name: "B" })
})

test("ensureDifferentPokemon keeps different selection", () => {
  const roster = [{ name: "A" }, { name: "B" }, { name: "C" }]
  const result = ensureDifferentPokemon({ name: "A" }, { name: "B" }, roster)
  assert.deepEqual(result, { name: "B" })
})

test("ensureDifferentPokemon wraps around roster end", () => {
  const roster = [{ name: "A" }, { name: "B" }]
  const result = ensureDifferentPokemon({ name: "B" }, { name: "B" }, roster)
  assert.deepEqual(result, { name: "A" })
})
