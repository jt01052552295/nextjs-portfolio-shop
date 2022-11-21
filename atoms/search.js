import { atom, selector } from "recoil";
import { v1 } from "uuid";
import { recoilPersist } from "recoil-persist";

export const SEARCH_ATOM_KEY = `SEARCH_ATOM_KEY`;
export const SEARCH_SELECTOR_KEY = `SEARCH_SELECTOR`;

// const { persistAtom } = recoilPersist({
//   key: SEARCH_ATOM_KEY,
// });

export const searchState = atom({
  key: SEARCH_ATOM_KEY, // 고유키
  default: null, // 초기값
});

export const searchSelector = selector({
  key: SEARCH_SELECTOR_KEY, // 고유키
  get: ({ get }) => {
    const search = get(searchState);
    return search;
  },
});

// atom : 구독중인 컴포넌트로 새로운 값을 반영하여 리렌더링
// 전역상태로 만듬.
