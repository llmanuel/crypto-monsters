import React, { useState } from "react";

import { Menu } from "../../components/Menu";
import { MyMonsters } from "../MyMonsters";
import { AllMonsters } from "../AllMonsters";

import '../../styles/home.css';

export const Home = ({ contract, account }) => {
  const [allMonstersOpen, setAllMonstersOpen] = useState(true);

  const onClickMyMonsters = () => setAllMonstersOpen(false);
  const onClickAllMonsters = () => setAllMonstersOpen(true);

  return (
    <div className="appContainer">
      <Menu onClickMyMonsters={onClickMyMonsters} onClickAllMonsters={onClickAllMonsters} account={account} />
      {!allMonstersOpen && <MyMonsters contract={contract} account={account} />}
      {allMonstersOpen && <AllMonsters contract={contract} account={account} />}
    </div>
  );
}