import ServiceRecommendationModel from "@/services/recommendation/model.recommendation";
import { create } from "zustand";

export interface UseStoreRecommendations {
  query: string | null,
  data: ServiceRecommendationModel["GetList"] | null,
  setQuery: (query: UseStoreRecommendations["query"]) => void,
  setData: (data: UseStoreRecommendations["data"]) => void,
  loadingStatus: "IDLE" | "LOADING" | "ERROR" | "SUCCESS",
  setLoadingStatus: (loadingStatus: UseStoreRecommendations["loadingStatus"]) => void,
}

const useStoreRecommendations = create<UseStoreRecommendations>(set => ({
  query: null,
  data: null,
  setQuery: (query) => set(() => ({ query })),
  setData: (data) => set(() => ({ data })),
  loadingStatus: "IDLE",
  setLoadingStatus: (loadingStatus: UseStoreRecommendations["loadingStatus"]) => set(() => ({ loadingStatus })),
}));

export default useStoreRecommendations;