import { atom } from "nanostores";
import { QueryClient } from "@tanstack/query-core";

export const championStore = atom(0);
export const client = new QueryClient();
