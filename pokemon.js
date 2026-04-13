class Selectors {
  constructor(name) {
    this.elLvl = document.getElementById(`lvl-${name}`)
    this.elImg = document.getElementById(`img-${name}`)
    this.elName = document.getElementById(`name-${name}`)
    this.elBarHp = document.getElementById(`progressbar-${name}`)
    this.elHealth = document.getElementById(`health-${name}`)
    this.elButtons = document.querySelector(`.control`)
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
    const nextHp = Math.max(this.hp.newHp - count, 0)
    const damageDone = this.hp.newHp - nextHp

    this.hp.newHp = nextHp
    this.renderHp()

    cb && cb(damageDone)

    return this.hp.newHp === 0
  }

  renderHp = () => {
    this.renderHpLife()
    this.renderBarHp()
  }

  renderHpLife = () => {
    this.elHealth.innerText = `${this.hp.newHp} / ${this.hp.defaultHp}`
  }

  renderBarHp = () => {
    const hpPercent = Math.round((this.hp.newHp / this.hp.defaultHp) * 100)
    this.elBarHp.style.width = `${hpPercent}%`
  }
}
