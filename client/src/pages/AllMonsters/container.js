import React, { useEffect, useState } from "react";
import { AllMonsters } from "./component";

import {getMonstersLook} from "../../getMonsterLooks";

import '../../styles/title.css';

export const AllMonstersContainer = ({ contract, account }) => {
  const [monsters, setMonsters] = useState([]);
  const [finishFetch, setFinishFetch]= useState(false);

  const getAllMonsters = async () => {
    const currentMonstersDna =  await contract.methods.getMonsters().call();
    console.log({ currentMonstersDna });
    const currentMonsters = await Promise.all(currentMonstersDna.map(async (dna) => {
      const monsterData = await contract.methods.getMonsterData(parseInt(dna)).call();
      const monsterDescription = getMonstersLook(parseInt(monsterData[0]));
      return {
        dna: parseInt(monsterData[0], 16),
        price: parseInt(monsterData[1]),
        onSale: monsterData[2],
        ...monsterDescription
      }
    }));
    console.log({ currentMonsters });
    setMonsters(Array.isArray(currentMonsters) ? currentMonsters : [currentMonsters]);
  };

  useEffect(() => {
    const fetchMonsters = async () => {
      await getAllMonsters();
      setFinishFetch(true);
    };
    fetchMonsters();
  },[]);

  const onSubmitBuyMonster = async (monster) => {
    await contract.methods.buyMonster(monster.dna)
      .send({ from: account, value: monster.price });
    await getAllMonsters();
  };

  return (
    <>
      {finishFetch && <AllMonsters monsters={monsters} onSubmitBuyMonster={onSubmitBuyMonster} />}
    </>
  );
};
