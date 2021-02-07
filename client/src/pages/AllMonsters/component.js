import React from "react";

import { MonsterCard } from "../../components/MonsterCard";
import { Title } from "../../components/Title";

import '../../styles/myMonsters.css';

export const AllMonsters = ({ monsters, onSubmitBuyMonster }) => (
  <div className="content">
    <Title title="Todos los monstruos" />
    {monsters.map((monster) => {
      return (
        <MonsterCard 
          key={monster.dna}
          monster={monster}
          onSubmitBuyMonster={onSubmitBuyMonster}
        />
      );
    })}
  </div>
);
