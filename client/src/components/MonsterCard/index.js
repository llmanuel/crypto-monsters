import React from "react";

import { Card } from "../Card";

import '../../styles/monsterCard.css';

export const MonsterCard = ({ monster, onSubmitSetOnSale, onSubmitBuyMonster, account }) => 
  <Card key={monster.dna}>
    <p className="monsterName">{monster.name}</p>
    <div className="monsterContainer">
      <img className="monster" alt="monster" src={monster.monsterLooks} />
      <img className="backgroundImage" alt="monster-background" src={monster.background} />
    </div>
    <div className="dataContainer">
      <p className="data">DNA   <span className="dataValues">{` ${monster.dna}`}</span></p>
      <p className="data">Precio (Gwies) <span className="dataValues">{`${monster.price}`}</span></p>
      <p className="data">Dueño   <span className="dataValuesOwner">{` ${monster.owner}`}</span></p>
      {monster.onSale && <p className="dataValues">En venta</p>}
    </div>
    <div className="buttonsContainer">
      {onSubmitSetOnSale && <button className="onSaleButton" onClick={() => onSubmitSetOnSale(monster.dna)}>Poner en venta</button>}
      {onSubmitBuyMonster && monster.onSale && monster.owner != account && 
        <button className="buyButton" onClick={() => onSubmitBuyMonster(monster)}>Comprar</button>
      }
    </div>
  </Card>
;



