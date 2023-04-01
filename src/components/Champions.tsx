import { useQuery } from "@tanstack/react-query";
import { championStore, client } from "../store/Store";
import { getChampions, getChampion, getChampionSplashImage } from "../api";
import { getLatestVersion } from "../api/Versions";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useStore } from "@nanostores/react";
import React from "react";

export const Champions = () => {
  const champion = useStore(championStore);

  const { data: latestVersion } = useQuery(
    {
      queryKey: ["versions"],
      queryFn: () => getLatestVersion(),
    },
    client
  );

  const { data: champions } = useQuery(
    {
      queryKey: ["champions"],
      queryFn: () => getChampions({ version: latestVersion }),
      enabled: !!latestVersion,
    },
    client
  );

  const { data: selectedChampion } = useQuery(
    {
      queryKey: ["champion", champion],
      queryFn: () =>
        getChampion({
          version: latestVersion,
          id: champions[champion].id,
        }),
      placeholderData: (prev) => prev,
      enabled: !!champions,
    },
    client
  );

  const MAX_CHAMPION_COUNT = champions?.length || 0;

  const next = () => {
    if (championStore.get() === MAX_CHAMPION_COUNT - 1) return;
    championStore.set(championStore.get() + 1);
  };

  const previous = () => {
    if (championStore.get() === 0) return;
    championStore.set(championStore.get() - 1);
  };

  if (!selectedChampion) {
    return <></>;
  }

  return (
    <>
      <ReactQueryDevtools queryClient={client} />

      <div className="relative">
        <div className="flex mx-auto p-0">
          <div
            className="w-full h-96 bg-cover relative mt-20 p-5"
            style={{
              backgroundImage: `url(${getChampionSplashImage(
                selectedChampion.id
              )})`,
            }}
          >
            <div className="opacity-50 bg-black absolute w-full h-full top-0 right-0 pointer-events-none z-10" />
            <div className="flex items-center h-full">
              <div className="relative z-20 w-3/6">
                <h1 className="text-white text-6xl uppercase">
                  {selectedChampion.name}
                </h1>
                <p className="text-white my-4 text-xs">
                  {selectedChampion.lore}
                </p>
                <div className="text-white flex gap-1">
                  {selectedChampion.tags.map((tag) => (
                    <p
                      className="border-white border-solid border-1 border h-9 w-24 flex items-center justify-center"
                      key={tag}
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-12 h-12 absolute -left-14 top-1/2"
          onClick={previous}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-12 h-12 absolute -right-14 top-1/2"
          onClick={next}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </>
  );
};
