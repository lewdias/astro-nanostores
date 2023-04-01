/** @jsxImportSource solid-js */

import { createQuery } from "@tanstack/solid-query";
import { useStore } from "@nanostores/solid";
import { championStore } from "../store/Store";
import { client } from "../store/QueryClient";
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
    <section class="text-white my-10">
      <div class="flex flex-col gap-5">
        <div class="flex justify-around items-center">
          <svg
            width="311"
            height="2"
            viewBox="0 0 311 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H311" stroke="#C89B3C" />
          </svg>
          <h1 class="text-5xl italic">SKILLS</h1>
          <svg
            width="311"
            height="2"
            viewBox="0 0 311 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H311" stroke="#C89B3C" />
          </svg>
        </div>
        {selectedChampionSpellsQuery.data?.map((spell) => (
          <>
            <div class="flex items-center mb-8">
              <div class="p-2 border-darkgold border-solid border">
                <img
                  src={getSpellImage(versionQuery.data, spell.image.full)}
                  alt={spell.name}
                  class="w-16 h-16"
                />
              </div>
              <div class="ml-5">
                <h2 class="font-bold uppercase">{spell.name}</h2>
                <p>{spell.description}</p>
              </div>
            </div>
            <svg
              width="414"
              height="1"
              viewBox="0 0 414 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="mx-auto"
            >
              <path d="M0 0.5H414" stroke="#C89B3C" />
            </svg>
          </>
        ))}
      </div>
    </section>
  );
};
