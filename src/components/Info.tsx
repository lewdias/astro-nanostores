import { useQuery } from "@tanstack/react-query";
import { championStore } from "../store/Store";
import { client } from "../store/QueryClient";
import {
  getChampions,
  getChampion,
  getChampionSplashImage,
  getChampionIconApiUrl,
} from "../api";
import { getLatestVersion } from "../api/Versions";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useStore } from "@nanostores/react";
import React from "react";
import { TagIcon } from "./TagIcon";

export const Info = () => {
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

      <section className="relative">
        <div className="flex mx-auto p-0">
          <div
            className="w-full h-[680px] bg-cover bg-center relative mt-20 p-5 backdrop-blur-sm"
            style={{
              backgroundImage: `url(${getChampionSplashImage(
                selectedChampion.id
              )})`,
            }}
          >
            <div className="opacity-50 bg-black absolute w-full h-full top-0 right-0 pointer-events-none z-10" />
            <div className="flex items-center justify-center h-full">
              <div className="relative z-20 w-3/6 flex items-center justify-center flex-col">
                <img
                  src={getChampionIconApiUrl(
                    latestVersion,
                    selectedChampion.image.full
                  )}
                  alt={selectedChampion.name}
                />
                <h1 className="text-white text-6xl uppercase my-6">
                  {selectedChampion.name}
                </h1>
                <h2 className="text-white text-2xl uppercase">
                  {selectedChampion.title}
                </h2>

                <svg
                  width="183"
                  height="12"
                  viewBox="0 0 183 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-5"
                >
                  <path
                    d="M96.5279 0L91.5044 4.92682L86.4721 0H0V1.51661H80.8153L91.5044 12L102.186 1.51661H183V0H96.5279ZM91.5044 9.8623L82.2262 0.762638H86.1554L91.5044 6.00867L96.8446 0.762638H100.78L91.5044 9.8623Z"
                    fill="#C89B3C"
                  />
                </svg>

                <div className="text-white flex gap-7">
                  {selectedChampion.tags.map((tag) => (
                    <p
                      className="text-center uppercase text-[10px] relative"
                      key={tag}
                    >
                      <TagIcon tag={tag} className="w-12" />
                      <span className="absolute bottom-1 left-1/2 translate-x-[-50%]">
                        {tag}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <svg
          width="48"
          height="64"
          viewBox="0 0 48 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={previous}
          className="absolute -left-24 top-1/2 cursor-pointer"
        >
          <path d="M32 63L1 32L32 1" stroke="#C89B3C" />
          <path d="M47 63L16 32L47 1" stroke="#785A28" />
        </svg>

        <svg
          width="48"
          height="64"
          viewBox="0 0 48 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={next}
          className="absolute -right-24 top-1/2 cursor-pointer"
        >
          <path d="M16 1L47 32L16 63" stroke="#C89B3C" />
          <path d="M1 1L32 32L1 63" stroke="#785A28" />
        </svg>
      </section>
    </>
  );
};
