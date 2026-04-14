import { clampHp, healthPercent } from "./game-logic.js"

class Selectors {
  constructor(name) {
    this.elLvl = document.getElementById(`lvl-${name}`)
    this.elImg = document.getElementById(`img-${name}`)
    this.elName = document.getElementById(`name-${name}`)
    this.elBarHp = document.getElementById(`progressbar-${name}`)
    this.elHealth = document.getElementById(`health-${name}`)
    this.elButtons = document.querySelector(`.control`)
    this.elCard = document.querySelector(`.${name}`)
  }
}

export default class Pokemon extends Selectors {
  constructor({ lvl, name, hp, type, selectors, img, attacks = [] }) {
    super(selectors)
    this.lvl = lvl
    this.name = name
    this.hp = { defaultHp: hp, newHp: hp }
    this.type = type
    this.img = img
    this.attacks = attacks

    this.renderPokemon()
  }

  renderPokemon = () => {
    this.elLvl.innerText = `Lv. ${this.lvl}`
    this.elImg.src = this.img
    this.elName.innerText = this.name

    this.renderHp()
  }

  changeHp = (count, cb) => {
    const { nextHp, damageDone, isDefeated } = clampHp(this.hp.newHp, count)

    this.hp.newHp = nextHp
    this.renderHp()

    cb?.(damageDone)

    return isDefeated
  }

  renderHp = () => {
    this.renderHpLife()
    this.renderBarHp()
  }

  renderHpLife = () => {
    this.elHealth.innerText = `${this.hp.newHp} / ${this.hp.defaultHp}`
  }

  renderBarHp = () => {
    const hpPercent = healthPercent(this.hp.newHp, this.hp.defaultHp)

    this.elBarHp.style.width = `${hpPercent}%`
    this.elBarHp.classList.remove("low", "critical")

    if (hpPercent <= 20) {
      this.elBarHp.classList.add("critical")
      return
    }

    if (hpPercent <= 45) {
      this.elBarHp.classList.add("low")
    }
  }

  hitEffect = () => {
    this.elCard.classList.add("hit")

    setTimeout(() => {
      this.elCard.classList.remove("hit")
    }, 170)
  }
}
