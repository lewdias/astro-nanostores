/** @jsxImportSource solid-js */

import { createQuery } from "@tanstack/solid-query";
import { useStore } from "@nanostores/solid";
import { championStore, client } from "../store/Store";
import { getChampion, getChampions, getSpellImage } from "../api";
import { getLatestVersion } from "../api/Versions";

export const Abilities = () => {
  const champion = useStore(championStore);

  const versionQuery = createQuery(
    () => ({
      queryKey: ["versions"],
      queryFn: () => getLatestVersion(),
    }),
    () => client
  );

  const championsQuery = createQuery(
    () => ({
      queryKey: ["champions"],
      queryFn: () => getChampions({ version: versionQuery.data }),
      get enabled() {
        return !!versionQuery.data;
      },
      placeholderData: (prev) => prev,
    }),
    () => client
  );

  const selectedChampionSpellsQuery = createQuery(
    () => ({
      queryKey: ["champion", champion()],
      queryFn: () =>
        getChampion({
          version: versionQuery.data,
          id: championsQuery.data[champion()].id,
        }),
      get enabled() {
        return !!versionQuery.data && !!championsQuery.data;
      },
      placeholderData: (prev) => prev,
      select(data) {
        return data.spells;
      },
    }),
    () => client
  );

  return (
    <div class="text-white my-10">
      <div class="flex flex-col gap-5">
        {selectedChampionSpellsQuery.data?.map((spell) => (
          <div class="flex items-center">
            <div class="w-16 h-16">
              <img
                src={getSpellImage(versionQuery.data, spell.image.full)}
                alt={spell.name}
              />
            </div>
            <div class="ml-5">
              <h2 class="font-bold uppercase">{spell.name}</h2>
              <p>{spell.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
