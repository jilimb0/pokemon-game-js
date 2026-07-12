import random from "./utils.js"

const locales = {
  ru: [
    (c, e, count, newHp, defaultHp) =>
      `${c} вспомнил что-то важное, но неожиданно ${e}, не помня себя от испуга, ударил в предплечье врага. -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} поперхнулся, и за это ${e} с испугу приложил прямой удар коленом в лоб врага. -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} забылся, но в это время наглый ${e}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} пришел в себя, но неожиданно ${e} случайно нанес мощнейший удар. -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} поперхнулся, но в это время ${e} нехотя раздробил кулаком <вырезанно цензурой> противника. -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} удивился, а ${e} пошатнувшись влепил подлый удар. -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} высморкался, но неожиданно ${e} провел дробящий удар. -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} пошатнулся, и внезапно наглый ${e} беспричинно ударил в ногу противника. -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} расстроился, как вдруг, неожиданно ${e} случайно влепил стопой в живот соперника. -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} пытался что-то сказать, но вдруг, неожиданно ${e} со скуки, разбил бровь сопернику. -${count} ${newHp}/${defaultHp}`,
  ],
  en: [
    (c, e, count, newHp, defaultHp) =>
      `${c} was lost in thought, and ${e} landed a cheap shot to the forearm! -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} choked, and ${e} retaliated with a swift knee to the forehead! -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} spaced out, and the sneaky ${e} snuck in a cheap hit from behind! -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} came to their senses, but ${e} landed a devastating blow! -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} stumbled, and ${e} crushed them with a brutal punch (censored)! -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} was shocked as ${e} delivered a dirty strike! -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} sneezed, and ${e} landed a crushing blow! -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} faltered, and the bold ${e} kicked them in the leg! -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} got upset, and ${e} kicked them square in the stomach! -${count} ${newHp}/${defaultHp}`,
    (c, e, count, newHp, defaultHp) =>
      `${c} tried to speak, but ${e} boredly shattered their brow! -${count} ${newHp}/${defaultHp}`,
  ],
}

let currentLang = "en"

function generateLog({ name: nameChar, hp: { newHp, defaultHp } }, { name: nameEnemy }, count) {
  const logs = locales[currentLang]
  const template = logs[random(logs.length - 1)]
  return template(nameChar, nameEnemy, count, newHp, defaultHp)
}

export function setLang(lang) {
  if (locales[lang]) {
    currentLang = lang
  }
}

export function getLang() {
  return currentLang
}

export default generateLog
