import monsterNames from "./nombres.json";
import monstersSurnames from "./apellidos.json";

export const getMonstersLook = (monsterDna) => {
  const hexaDna = monsterDna.toString(16).toUpperCase();;
  console.log({ hexaDna });
  const dnaValues = hexaDna.split('');
  while (dnaValues.length < 4) {
    dnaValues.unshift("0");
  }
  return {
    monsterLooks: `./monsters/img/monsters/monster_${dnaValues[0]}.png`,
    background: `./monsters/img/backgrounds/${dnaValues[1]}.png`,
    name: `${monsterNames[dnaValues[2]]} ${monstersSurnames[dnaValues[3]]}`
  };
};