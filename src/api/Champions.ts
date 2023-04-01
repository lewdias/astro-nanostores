import { ChampionType, ChampionsType } from "./types";

type GetChampionType = {
  id: string;
  version: string;
};

const API_URL = "http://ddragon.leagueoflegends.com";

export const getApiUrl = (version: string) =>
  `${API_URL}/cdn/${version}/data/en_US`;

export const getChampions = async ({ version }: { version: string }) => {
  const API_URL = getApiUrl(version);
  const res = await fetch(`${API_URL}/champion.json`);
  const champions = await res.json();

  return Object.values(champions.data) as ChampionsType[];
};

export const getChampion = async ({ id, version }: GetChampionType) => {
  const API_URL = getApiUrl(version);

  const res = await fetch(`${API_URL}/champion/${id}.json`);
  const champion = await res.json();
  return Object.values(champion.data)[0] as ChampionType;
};

export const getChampionIconApiUrl = (version: string, image: string) => {
  const url = `${API_URL}/cdn/${version}`;
  return `${url}/img/champion/${image}`;
};

export const listChampions = async ({ version }: { version: string }) => {
  const champions = await getChampions({ version });

  const championsWithImage = champions.map((champion) => {
    const championImage = getChampionIconApiUrl(version, champion.image.full);
    return { ...champion, image: championImage };
  });

  return championsWithImage;
};

export const getChampionSplashImage = (id: string, skin = 0) => {
  return `${API_URL}/cdn/img/champion/splash/${id}_${skin}.jpg`;
};


export const getSpellImage = (version: string, id: string) => {
  return `${API_URL}/cdn/${version}/img/spell/${id}`;
};
