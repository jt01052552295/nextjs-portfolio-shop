import { atom, selector } from "recoil";
import { v1 } from "uuid";
import { recoilPersist } from "recoil-persist";

export const CART_LIST = `CART_LIST`;
export const CART_LIST_STATS = `CART_LIST_STATS`;
export const CART_LIST_FILTER = `CartListFilter`;
export const FILTER_CART_LIST = `FilteredCartList`;

const { persistAtom } = recoilPersist({
  key: CART_LIST,
});

export const cartListState = atom({
  key: CART_LIST,
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const cartListStatsState = selector({
  key: CART_LIST_STATS,
  get: ({ get }) => {
    const cartList = get(cartListState);
    const totalNum = cartList.length;
    //   const totalPrice = todoList.filter((item) => item.isComplete).length;
    //   const totalCount = totalNum - totalCompletedNum;
    //   const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100;

    return {
      totalNum,
      cartList,
    };
  },
});

// export const cartListFilterState = atom({
//   key: CART_LIST_FILTER,
//   default: "Show All",
// });

// export const filteredCartListState = selector({
//   key: FILTER_CART_LIST,
//   get: ({ get }) => {
//     const filter = get(cartListFilterState);
//     const list = get(cartListState);

//     switch (filter) {
//       case "Show Completed":
//         return list.filter((item) => item.isComplete);
//       case "Show Uncompleted":
//         return list.filter((item) => !item.isComplete);
//       default:
//         return list;
//     }
//   },
// });
// atom : 구독중인 컴포넌트로 새로운 값을 반영하여 리렌더링
// 전역상태로 만듬.
