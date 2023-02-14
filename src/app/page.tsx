"use client"

import "./globals.css";
import "./fonts.css";
import { Poppins } from '@next/font/google'
import GoogleMaps from "@/components/recommendations/List.recommendation";
import SearchRecommendation from "../components/recommendations/Search.recommendation";
import GetRecommendations from "@/components/recommendations/List.recommendation";
import useStoreRecommendations from "@/components/recommendations/store.recommendation";

export default function Home() {
  const store = useStoreRecommendations();

  console.log(store.loadingStatus)

  return (
    <main>
      {["IDLE", "LOADING"].includes(store.loadingStatus) && (
        <SearchRecommendation />
      )}
      <GetRecommendations isLoading={store.loadingStatus !== "SUCCESS"} />
    </main>
  )
}
