<!-- 
  Erro no "class" e "key" está relacionado a utilizar vue e react no mesmo projeto
-->
<template>
  <section
    class="mt-14 mb-12"
    v-if="
      selectedChampionTips?.allytips.length ||
      selectedChampionTips?.enemytips.length
    "
  >
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
      <h1 class="text-5xl italic text-white mb-5">TIPS</h1>
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
    <div
      class="flex flex-row justify-between w-full"
      v-if="!!selectedChampionTips?.allytips.length"
    >
      <div class="w-2/5">
        <h2 class="text-white uppercase font-4xl mb-4">Playing with?</h2>
        <ul
          v-for="tip in selectedChampionTips?.allytips"
          :key="tip"
          class="font-xs text-white list-disc mb-2"
        >
          <li>
            {{ tip }}
          </li>
        </ul>
      </div>
      <div class="w-2/5" v-if="!!selectedChampionTips?.enemytips.length">
        <h2 class="text-white uppercase font-4xl mb-4">Playing against?</h2>
        <ul
          v-for="tip in selectedChampionTips?.enemytips"
          :key="tip"
          class="font-xs text-white list-disc mb-2"
        >
          <li>
            {{ tip }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useStore } from "@nanostores/vue";
import { useQuery, QueryClient } from "@tanstack/vue-query";
import { getChampions, getChampion } from "../api/Champions";
import { getLatestVersion } from "../api/Versions";
import { championStore } from "../store/Store";
import { client } from "../store/QueryClient";

export default {
  setup() {
    const champion = useStore(championStore);

    const queryClient = new QueryClient({
      queryCache: client.getQueryCache(),
    });

    const { data: version } = useQuery(
      {
        queryKey: ["versions"],
        queryFn: () => getLatestVersion(),
        placeholderData: (prev) => prev,
      },
      queryClient
    );

    const { data: champions } = useQuery(
      {
        queryKey: ["champions"],
        queryFn: () => getChampions({ version: version.value }),
        placeholderData: (prev) => prev,
        enabled: !!version.value,
      },
      queryClient
    );

    const { data: selectedChampionTips } = useQuery(
      {
        queryKey: ["champion", champion],
        queryFn: () =>
          getChampion({
            version: version.value,
            id: champions.value[champion.value].id,
          }),
        select(data) {
          return { allytips: data?.allytips, enemytips: data?.enemytips };
        },
        placeholderData: (prev) => prev,
        enabled: !!champions.value,
      },
      queryClient
    );

    return {
      selectedChampionTips,
    };
  },
};
</script>
