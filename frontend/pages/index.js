import React, { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";
import Items from "../components/items/Items";

export default function index() {
  return (
    <div className="max-container">
      <AppLayout>
        <div className="mb">
          <article
            className="mainBanner"
            style={{
              backgroundImage: "url(/images/main.png)",
            }}
          ></article>
        </div>
        <Items />
      </AppLayout>
    </div>
  );
}
