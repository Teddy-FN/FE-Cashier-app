import { axiosInstance } from ".";

export const postCheckoutItem = async (payload) => {
  const { data, status } = await axiosInstance.post("/checkout/checkout-item", payload);
  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const checkoutItem = async (payload) => {
  console.log("PAYLOAD =>", payload);
  const { data, status } = await axiosInstance.put(
    `/checkout/edit-checkout-item/${payload.id}`,
    payload
  );
  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const cancelCheckoutItem = async (payload) => {
  const body = {
    id: payload.id,
    invoice: payload.invoice
  };
  const { data, status } = await axiosInstance.delete(
    `/checkout/delete-checkout-item/${body?.id}`,
    {
      data: body
    }
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};