import React, { useEffect, useState } from "react";
import Image from "next/image";
import AppLayout from "../components/AppLayout";
import Items from "../components/items/Items";
import Slick from "../components/slider/Slick";

export default function index() {
  return (
    <div className="max-container">
      <AppLayout>
        <div className="mb">
          <Slick />

          {/* <div className="mainBanner">
            <Image
              src={`/images/main.png`}
              className="mbImg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              alt="main"
            />
          </div> */}
        </div>
        <Items />
      </AppLayout>
    </div>
  );
}
