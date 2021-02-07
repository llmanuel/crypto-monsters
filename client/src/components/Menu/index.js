import React from "react";

import '../../styles/menu.css';

export const Menu = ({ onClickMyMonsters, onClickAllMonsters }) => {
  return (
  <div className="menu">
    <button className="menuButton" onClick={onClickMyMonsters}>Mis Monstruos</button>
    <button className="menuButton" onClick={onClickAllMonsters}>Todos los Monstruos</button>
  </div>);
};
