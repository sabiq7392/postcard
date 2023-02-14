"use client";
import { css } from "@emotion/css";

import { ReactElement } from "react";

export default function Sidebar(): ReactElement {
  return (
    <aside className={css`
      background: black;
      padding: 1.25rem .875rem;
    `}>
      <img src="/images/logo.svg" alt="postcard logo" />
    </aside>
  );
}