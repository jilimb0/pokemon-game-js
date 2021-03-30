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
    this.elName.innerText = `${this.name}`

    this.renderHp()
  }

  changeHp = (count, cb) => {
    this.hp.newHp -= count

    if (this.hp.newHp <= 0) {
      this.hp.newHp = 0
      alert(this.name + "LOSE")
    }

    this.renderHp(count)

    cb && cb(count)
  }

  renderHp = (count) => {
    this.renderHpLife()
    this.renderBarHp(count)
  }

  renderHpLife = () => {
    this.elHealth.innerText = `${this.hp.newHp} / ${this.hp.defaultHp}`
  }

  renderBarHp = (count) => {
    console.log(this.hp.newHp)

    this.elBarHp.style.width = `${this.hp.newHp}%`

    let hp =
      this.hp.newHp === this.hp.defaultHp
        ? 100
        : `${Math.round((100 * count) / this.hp.defaultHp)}`

    this.hp.newHp -= hp
  }
}
