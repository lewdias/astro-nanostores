export const API_URL = "http://ddragon.leagueoflegends.com/api";

export const getLatestVersion = async () => {
  const res = await fetch(`${API_URL}/versions.json`);
  const version = await res.json();
  return version[0] as string;
};
