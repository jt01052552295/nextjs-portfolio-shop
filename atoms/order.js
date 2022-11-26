import { atom, selector } from "recoil";
import { v1 } from "uuid";
import { recoilPersist } from "recoil-persist";

export const ORDER_LIST = `ORDER_LIST`;
export const ORDER_LIST_STATS = `ORDER_LIST_STATS`;
export const ORDER_LIST_CHECKED = `ORDER_LIST_CHECKED`;

const { persistAtom } = recoilPersist({
  key: ORDER_LIST,
});

export const orderListState = atom({
  key: ORDER_LIST,
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const orderListStatsState = selector({
  key: ORDER_LIST_STATS,
  get: ({ get }) => {
    const orderList = get(orderListState);
    const totalOrderNum = orderList.length;
    const totalOrderStock = orderList.reduce((a, c) => a + c.stock, 0);
    const totalOrderPrice = orderList.reduce((a, c) => a + c.price, 0);

    return {
      orderList,
      totalOrderNum,
      totalOrderStock,
      totalOrderPrice,
    };
  },
});

export const orderListCheckedState = atom({
  key: ORDER_LIST_CHECKED,
  default: [],
});
