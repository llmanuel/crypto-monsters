import React, { useEffect, useState } from "react";
import { MyMonsters } from "./component";

import '../../styles/title.css';

export const MyMonstersContainer = ({ contract, account }) => {
  const [monsters, setMonsters] = useState([]);
  const [finishFetch, setFinishFetch]= useState(false);

  const getMyMonsters = async () => {
    const currentMonstersDna =  await contract.methods.getMonstersFromUser().call({ from: account });
    console.log({ currentMonstersDna });
    const currentMonsters = await Promise.all(currentMonstersDna.map(async (dna) => {
      const monsterData = await contract.methods.getMonsterData(parseInt(dna)).call();
      return {
        dna: parseInt(monsterData[0]),
        price: parseInt(monsterData[1]),
        onSale: monsterData[2]
      }
    }));
    console.log({ currentMonsters });
    setMonsters(Array.isArray(currentMonsters) ? currentMonsters : [currentMonsters]);
  };

  useEffect(() => {
    const fetchMonsters = async () => {
      await getMyMonsters();
      setFinishFetch(true);
    };
    fetchMonsters();
  },[]);

  const onSubmitSetOnSale = async (dna) => {
    await contract.methods.setOnSale(dna).send({ from: account });
    await getMyMonsters();
  };

  const onSubmitCreate = async () => {
    await contract.methods.createRandomMonster(1).send({ from: account });
    await getMyMonsters();
  };

  return (
    <>
      {finishFetch && <MyMonsters monsters={monsters} onSubmitCreate={onSubmitCreate} onSubmitSetOnSale={onSubmitSetOnSale} />}
    </>
  );
};
