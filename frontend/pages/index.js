import React from "react";
import Link from "next/link";
import AppLayout from "../components/AppLayout";

export default function index() {
  return (
    <div className="max-container">
      <AppLayout>
        <div>
          <article
            className="mainBanner"
            style={{
              backgroundImage: "url(/images/main.png)",
            }}
          ></article>
        </div>
        <div>
          <div className="item">
            <Link href="#">
              <div className="img">
                {/* <img src="images/image001.png" alt="product" /> */}
              </div>
            </Link>
            <div className="category">
              <span>아이돈케어</span>
            </div>

            <div className="name">
              <span>마로네 노트북 파우치</span>
            </div>

            <div className="item_price">
              <span className="price">17100</span>
              <span className="unit">원</span>
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
