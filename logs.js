import random from "./utils.js"

function generateLog(
  { name: nameChar, hp: { newHp, defaultHp } },
  { name: nameEnemy },
  count
) {
  const logs = [
    `${nameChar} вспомнил что-то важное, но неожиданно ${nameEnemy}, не помня себя от испуга, ударил в предплечье врага. -${count} ${newHp}/${defaultHp}`,
    `${nameChar} поперхнулся, и за это ${nameEnemy} с испугу приложил прямой удар коленом в лоб врага. -${count} ${newHp}/${defaultHp}`,
    `${nameChar} забылся, но в это время наглый ${nameEnemy}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count} ${newHp}/${defaultHp}`,
    `${nameChar} пришел в себя, но неожиданно ${nameEnemy} случайно нанес мощнейший удар. -${count} ${newHp}/${defaultHp}`,
    `${nameChar} поперхнулся, но в это время ${nameEnemy} нехотя раздробил кулаком <вырезанно цензурой> противника. -${count} ${newHp}/${defaultHp}`,
    `${nameChar} удивился, а ${nameEnemy} пошатнувшись влепил подлый удар. -${count} ${newHp}/${defaultHp}`,
    `${nameChar} высморкался, но неожиданно ${nameEnemy} провел дробящий удар. -${count} ${newHp}/${defaultHp}`,
    `${nameChar} пошатнулся, и внезапно наглый ${nameEnemy} беспричинно ударил в ногу противника. -${count} ${newHp}/${defaultHp}`,
    `${nameChar} расстроился, как вдруг, неожиданно ${nameEnemy} случайно влепил стопой в живот соперника. -${count} ${newHp}/${defaultHp}`,
    `${nameChar} пытался что-то сказать, но вдруг, неожиданно ${nameEnemy} со скуки, разбил бровь сопернику. -${count} ${newHp}/${defaultHp}`,
  ]

  return logs[random(logs.length) - 1]
}

export default generateLog
