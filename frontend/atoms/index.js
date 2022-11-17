import { atom, selector } from "recoil";
import { v1 } from "uuid";

export const newsState = atom({
  key: `newsState/${v1()}`, // 고유키
  default: [], // 초기값
});

export const newsSelector = selector({
  key: `newsSelector/${v1()}`, // 고유키
  get: ({ get }) => {
    const news = get(newsState);
    return news;
  },
});

// atom : 구독중인 컴포넌트로 새로운 값을 반영하여 리렌더링
// 전역상태로 만듬.
