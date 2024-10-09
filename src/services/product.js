import { axiosInstance } from ".";

export const getAllProduct = async ({ location, nameProduct, category }) => {
  const { data, status } = await axiosInstance.get(
    `product/get-product?store=${location}&nameProduct=${nameProduct}&category=${category}`
  );
  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const getProductByOutlet = async ({ location }) => {
  console.log("location =>", location);

  const { data, status } = await axiosInstance.get(
    `product/get-product-by-super-admin?store=${location}`
  );
  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const getAllProductTable = async ({ location }) => {
  const { data, status } = await axiosInstance.get(`product/get-product-all?store=${location}`);
  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const addProduct = async (payload) => {
  const { data, status } = await axiosInstance.post("/product/add-product", payload);
  if (status !== 200) throw Error(`${data.message}`);
  return data;
};
