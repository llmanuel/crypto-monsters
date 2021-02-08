import React from "react";

import { MonsterCard } from "../../components/MonsterCard";
import { Title } from "../../components/Title";

import '../../styles/myMonsters.css';

export const MyMonsters = ({ monsters, onSubmitCreate, onSubmitSetOnSale, account }) => (
  <div className="content">
    <div className="header">
      <Title title="Mis monstruos" />
      <button className="createMonster" onClick={onSubmitCreate}>Crear monstruo</button>
    </div>
    {monsters.map((monster) => {
      return (
        <MonsterCard 
          key={monster.dna}
          monster={monster}
          onSubmitSetOnSale={onSubmitSetOnSale}
          account={account}
        />
      );
    })}
  </div>
);
