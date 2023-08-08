import axios from "axios";

const instance  = axios.create({
  baseURL:process.env.REACT_APP_BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
let key = process.env.REACT_APP_BASE_URL
export const userLogin = async (bodyContent) => {
  return new Promise((resolve, reject) => {
    instance
      .post(`/auth/login`, bodyContent)
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    instance
      .get(`/products`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
