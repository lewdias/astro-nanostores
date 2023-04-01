export type ChampionsType = {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  lore: string;
  partype: string;
  tags: number[];
  info: ChampionInfo;
  image: ChampionImage;
  stats: ChampionStats;
};

export type ChampionType = {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  image: ChampionImage;
  skins: ChampionSkins[];
  lore: string;
  allytips: string[];
  enemytips: string[];
  spells: ChampionSpells[];
  tags: number[];
};

export type ChampionImage = {
  full: string;
};

type ChampionSkins = {
  id: number;
  num: number;
  name: string;
  chromas: boolean;
};

type ChampionSpells = {
  id: string;
  name: string;
  description: string;
  cooldownBurn: string;
  image: {
    full: string;
  };
};

type ChampionInfo = {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
};

type ChampionStats = {
  hp: number;
  hpperlevel: number;
  mp: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
};
