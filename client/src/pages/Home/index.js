import React, { useState } from "react";

import { Menu } from "../../components/Menu";
import { MyMonsters } from "../MyMonsters";

import '../../styles/home.css';

export const Home = ({ contract, account }) => {
  const [newMonster, setNewMonster] = useState("");
  const [monsters, setMonsters] = useState([]);

  console.log({methods: contract.methods});

  const onSubmitCreate = async () => {
    console.log({newMonster});
    const response = await contract.methods.createRandomMonster(newMonster).send({ from: account });
    console.log({response});
    await onSubmitGet();
  };

  const onSubmitGet = async () => {
    const currentMonstersDna =  await contract.methods.getMonsters().call();
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

  const onSubmitSetOnSale = async (dna) => {
    await contract.methods.setOnSale(dna).send({ from: account });
    await onSubmitGet();
  };

  const onSubmitBuyMonster = async (monster) => {
    await contract.methods.buyMonster(monster.dna)
      .send({ from: account, value: monster.price });
    await onSubmitGet();
  };


  return (
    <div className="appContainer">
      <Menu />
      <MyMonsters contract={contract} account={account} />
    </div>
  );
}