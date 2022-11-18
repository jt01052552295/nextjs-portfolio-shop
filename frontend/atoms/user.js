import { atom, selector } from "recoil";
import { v1 } from "uuid";
import { recoilPersist } from "recoil-persist";

export const USER_ATOM_KEY = `USER_ATOM_KEY`;
export const USER_SELECTOR_KEY = `USER_SELECTOR`;

const { persistAtom } = recoilPersist({
  key: USER_ATOM_KEY,
});

export const userState = atom({
  key: USER_ATOM_KEY, // 고유키
  default: {}, // 초기값
  effects_UNSTABLE: [persistAtom],
});

export const userSelector = selector({
  key: USER_SELECTOR_KEY, // 고유키
  get: ({ get }) => {
    const user = get(userState);
    return user;
  },
});

// atom : 구독중인 컴포넌트로 새로운 값을 반영하여 리렌더링
// 전역상태로 만듬.
