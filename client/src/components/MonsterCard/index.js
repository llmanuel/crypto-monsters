import React from "react";

import { Card } from "../Card";

import '../../styles/monsterCard.css';

export const MonsterCard = ({ monster, onSubmitSetOnSale, onSubmitBuyMonster }) => 
  <Card key={monster.dna}>
    <p className="monsterName">El fantasma de la FADU</p>
    <div className="monsterContainer">
      <img className="monster" src="./monsters/img/monsters/monster_0.png" />
      <img className="backgroundImage" src="./monsters/img/backgrounds/0.png" />
    </div>
    <div className="dataContainer">
      <p className="data">DNA   <span className="dataValues">{` ${monster.dna}`}</span></p>
      <p className="data">Precio (Gwies) <span className="dataValues">{`${monster.price}`}</span></p>
      {monster.onSale && <p className="dataValues">En venta</p>}
    </div>
    <div className="buttonsContainer">
      <button className="onSaleButton" onClick={() => onSubmitSetOnSale(monster.dna)}>Poner en venta</button>
      {onSubmitBuyMonster && <button className="buyButton" onClick={() => onSubmitBuyMonster(monster)}>Comprar</button>}
    </div>
  </Card>
;



