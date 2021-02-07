import React from "react";

import { MonsterCard } from "../../components/MonsterCard";
import { Card } from "../../components/Card";
import { Title } from "../../components/Title";

import '../../styles/myMonsters.css';

export const MyMonsters = ({ monsters, onSubmitCreate, onSubmitSetOnSale }) => (
  <div className="content">
    <Title title="Mis monstruos" />
    <Card>
      <p>Crear monstruo</p>
      <button onClick={onSubmitCreate}>Crear</button>
    </Card>
    {monsters.map((monster) => {
      return (
        <MonsterCard 
          key={monster.dna}
          monster={monster}
          onSubmitSetOnSale={onSubmitSetOnSale}
        />
      );
    })}
  </div>
);
