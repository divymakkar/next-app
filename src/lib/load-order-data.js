import axios from "axios";

export const loadOrderData = async (orderRef) => {
  return axios
    .get(`http://localhost:3000/website/api/orders/${orderRef}`, {
      headers: {
        "Access-Token":
          "eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcl9pZCI6OTc1LCJleHAiOjE2NjM2NzM4ODF9.ykb-Qcr4gkEF6MhhddZtG44XTMS2p50AT6jO_PwVz7U",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return { data: {} };
    });
};
