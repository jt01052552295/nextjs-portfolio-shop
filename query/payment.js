// import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
// import axios from "axios";

// export const orderMutation = () => {
//   return useMutation(
//     async (variable) => {
//       console.log("async", variable);
//       return await axios.post("/api/order/payment", variable);
//     },
//     {
//       onMutate: (variable) => {
//         console.log("onMutate", variable);
//         // variable : {loginId: 'xxx', password; 'xxx'}
//       },
//       onError: (error, variable, context) => {
//         // error
//         console.log("onError", error);
//         return error;
//       },
//       onSuccess: (data, variables, context) => {
//         console.log("onSuccess", data);
//         return data;

//         // setUserState(data.data);
//         // const returnUrl = router.query.returnUrl || "/";
//         // router.replace(returnUrl);
//       },
//       onSettled: () => {
//         console.log("end");
//       },
//     }
//   );
// };
