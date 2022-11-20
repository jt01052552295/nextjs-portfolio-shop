import { atom, selector } from "recoil";
import { v1 } from "uuid";
import { recoilPersist } from "recoil-persist";

export const LOCATION_ATOM_KEY = `LOCATION_ATOM_KEY`;
export const LOCATION_SELECTOR_KEY = `LOCATION_SELECTOR_KEY`;

export const ADDRESS_ATOM_KEY = `ADDRESS_ATOM_KEY`;
export const ADDRESS_SELECTOR_KEY = `ADDRESS_SELECTOR_KEY`;

const { persistAtom } = recoilPersist({
  key: ADDRESS_ATOM_KEY,
});

export const locationState = atom({
  key: LOCATION_ATOM_KEY, // 고유키
  default: false, // 초기값
});

export const locationSelector = selector({
  key: LOCATION_SELECTOR_KEY, // 고유키
  get: ({ get }) => {
    const row = get(locationState);
    return row;
  },
});

export const addressState = atom({
  key: ADDRESS_ATOM_KEY, // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export const addressSelector = selector({
  key: ADDRESS_SELECTOR_KEY, // 고유키
  get: ({ get }) => {
    const row = get(addressState);
    return row;
  },
});

// atom : 구독중인 컴포넌트로 새로운 값을 반영하여 리렌더링
// 전역상태로 만듬.
