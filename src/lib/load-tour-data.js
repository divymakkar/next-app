import axios from "axios";

export const loadTourData = async (slug) => {
  // http://localhost:3000/api/products/${slug}
  // http://localhost:3000/website/api/products/${slug}
  return axios
    .get(`http://localhost:3000/api/products/${slug}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return { data: {} };
    });
};

export const getTourRelatedProducts = async (slug) => {
  // www.thrillophilia.com/website/api/products/leh-ladakh-tour/related
  return axios
    .get(`http://localhost:3000/api/related`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return { data: {} };
    });
};
