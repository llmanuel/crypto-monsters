import React, { useEffect, useState } from "react";
import { MyMonsters } from "./component";
import { getMonstersLook } from "../../getMonsterLooks";

import '../../styles/title.css';

export const MyMonstersContainer = ({ contract, account }) => {
  const [monsters, setMonsters] = useState([]);
  const [finishFetch, setFinishFetch]= useState(false);

  const getMyMonsters = async () => {
    const currentMonstersDna =  await contract.methods.getMonstersFromUser().call({ from: account });
    console.log({ currentMonstersDna });
    const currentMonsters = await Promise.all(currentMonstersDna.map(async (dna) => {
      const monsterData = await contract.methods.getMonsterData(parseInt(dna)).call();
      const monsterDescription = getMonstersLook(parseInt(monsterData[0]));
      return {
        dna: parseInt(monsterData[0]),
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
    const accountCopy = account;
    const accountValues = accountCopy.split('');
    const monsterDnaValues = [accountValues[2], accountValues[3], accountValues[4], accountValues[5]];
    const monsterDna = monsterDnaValues.join("");
    console.log({monsterDna, monsterDnaDecimal: parseInt(monsterDna, 16)})
    await contract.methods.createRandomMonster(parseInt(monsterDna, 16)).send({ from: account });
    await getMyMonsters();
  };

  return (
    <>
      {finishFetch && <MyMonsters monsters={monsters} onSubmitCreate={onSubmitCreate} onSubmitSetOnSale={onSubmitSetOnSale} />}
    </>
  );
};
