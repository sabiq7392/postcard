"use client";

import { css } from "@emotion/css";
import { BsPlusLg } from "react-icons/bs";
import { ReactElement } from "react";
import { Button, Div } from "@/styles/MameStyled_V2/core/HtmlTag";
import useStoreRecommendations from "../recommendations/store.recommendation";

export default function Sidebar(): ReactElement {
  const store = useStoreRecommendations();

  const redirectToSearchRecommendation = () => {
    store.setLoadingStatus("IDLE");
    store.setData(null);
    store.setQuery(null);
  };

  return (
    <aside className={css`
      background: black;
      padding: 1.25rem .875rem;
    `}>
      <img src="/images/logo.svg" alt="postcard logo" />
      <Div style={{ background: "#4E4E53", height: 1, width: "100%", marginTop: "1.5rem", marginBottom: "1.5rem" }} />
      {store.loadingStatus === "SUCCESS" && (
        <Button onClick={redirectToSearchRecommendation} style={{ height: 24, width: 24, background: "#0078E8", border: "none", display: "grid", placeItems: "center", borderRadius: ".25rem", cursor: "pointer" }}>
          <BsPlusLg color="white" />
        </Button>
      )}
    </aside>
  );
}