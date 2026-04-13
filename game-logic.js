export function clampHp(currentHp, damage) {
  const nextHp = Math.max(currentHp - damage, 0)
  return {
    nextHp,
    damageDone: currentHp - nextHp,
    isDefeated: nextHp === 0,
  }
}

export function healthPercent(currentHp, defaultHp) {
  if (defaultHp <= 0) {
    return 0
  }
  return Math.round((currentHp / defaultHp) * 100)
}

export function pickEnemyAttack(attacks, randomIndexFn) {
  if (!attacks || attacks.length === 0) {
    return null
  }

  const index = randomIndexFn(attacks.length - 1)
  return attacks[index]
}

export function ensureDifferentPokemon(primary, secondary, roster) {
  if (primary.name !== secondary.name) {
    return secondary
  }

  const currentIndex = roster.findIndex((pokemon) => pokemon.name === secondary.name)
  const fallbackIndex = (currentIndex + 1) % roster.length

  return roster[fallbackIndex]
}
