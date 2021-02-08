import React from "react";

import '../../styles/menu.css';

export const Menu = ({ onClickMyMonsters, onClickAllMonsters, account }) => {
  return (
    <div className="menuContainer">
      <div className="links">
        <button className="menuButton" onClick={onClickMyMonsters}>Mis Monstruos</button>
        <button className="menuButton" onClick={onClickAllMonsters}>Todos los Monstruos</button>
      </div>
      <div>
        <p className="account">{`Usuario: ${account}`}</p>
      </div>
    </div>
  );
};
