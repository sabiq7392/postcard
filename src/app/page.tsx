"use client";

import "./globals.css";
import "./fonts.css";
import SearchRecommendation from "../components/recommendations/Search.recommendation";
import GetRecommendations from "@/components/recommendations/List.recommendation";
import useStoreRecommendations from "@/components/recommendations/store.recommendation";
import { css } from "@emotion/css";

export default function Home() {
  const store = useStoreRecommendations();

  return (
    <main className={css`width: 100%;`}>
      {["IDLE", "LOADING"].includes(store.loadingStatus) && (
        <SearchRecommendation />
      )}
      <GetRecommendations isLoading={store.loadingStatus !== "SUCCESS"} />
    </main>
  );
}
