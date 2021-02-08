pragma solidity >=0.5.0 <0.6.0;

contract MonsterFactory {
  event NewMonster(uint256 dna);

  struct Monster {
    uint256 dna;
    // Price in Gwei
    uint256 price;
    bool onSale;
  }

  Monster[] public monsters;
  uint256[] public monstersDna;

  mapping(uint256 => address payable) public monsterToOwner;
  mapping(uint256 => uint256) public monsterToIndex;
  mapping(address => uint256) public ownerMonsterCount;

  function _createMonster(uint256 _dna) internal {
    monsters.push(Monster(_dna, _dna * 100000 + 1000000, false));
    monstersDna.push(_dna);
    monsterToIndex[_dna] = monsters.length - 1;
    monsterToOwner[_dna] = msg.sender;
    ownerMonsterCount[msg.sender]++;
    emit NewMonster(_dna);
  }

  function createRandomMonster(uint256 _dna) public {
    require(_dna <= 65535);
    _createMonster(_dna);
  }

  // Transfer ownership of a monster
  function buyMonster(uint256 _monsterDna) payable public {
    uint index = monsterToIndex[_monsterDna];
    require(msg.value >= monsters[index].price);
    require(monsters[index].onSale == true);
    address payable owner = monsterToOwner[_monsterDna];
    owner.transfer(msg.value);
    ownerMonsterCount[owner]--;
    ownerMonsterCount[msg.sender]++;
    monsterToOwner[_monsterDna] = msg.sender;
    monsters[index].onSale = false;
  }

  function setOnSale(uint256 _monsterDna) public {
    require(msg.sender == monsterToOwner[_monsterDna]);
    uint index = monsterToIndex[_monsterDna];
    monsters[index].onSale = true;
  }

  function getMonsters() public view returns (uint256[] memory)  {
    return monstersDna;
  }

  function getMonstersFromUser() public view returns (uint256[] memory)  {
    uint256[] memory ownerMonstersDnas = new uint256[](ownerMonsterCount[msg.sender]);
    uint counter = 0;
    for (uint i=0; i < monsters.length; i++) {
      if (monsterToOwner[monsters[i].dna] == msg.sender) {
        ownerMonstersDnas[counter] = monsters[i].dna;
        counter++;
      }
    }
    return ownerMonstersDnas;
  }

  function getMonsterData(uint256 _monsterDna) public view returns (uint256, uint256, bool, address)  {
    uint index = monsterToIndex[_monsterDna];
    return (monsters[index].dna, monsters[index].price, monsters[index].onSale, monsterToOwner[_monsterDna]);
  }
}
