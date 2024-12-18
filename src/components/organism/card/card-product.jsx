/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { formatCurrencyRupiah } from "../../../utils/formatter-currency";
import LineClampText from "../label/lineclamp";
import Spinner from "../loading/loading-load-image";
import { useCookies } from "react-cookie";

// State
import { orderList } from "../../../state/order-list";

const ProductCard = ({ items, withActionButton = true }) => {
  const { addingProduct } = orderList();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cookie] = useCookies(["user"]);
  const linkImage = items?.image?.replace("https://drive.google.com/uc?id=", "");
  const thumbnailUrl = `https://drive.google.com/thumbnail?id=${linkImage}&sz=w1000`;

  const decrement = () =>
    setCount((prevState) => {
      if (prevState < 1) {
        return (prevState = 0);
      } else {
        return --prevState;
      }
    });

  const increment = () => setCount((prevState) => ++prevState);

  const handleAddingProduct = (items) => {
    const options = items.option.map((items) => {
      return {
        option: [],
        isMultiple: items.isMultiple,
        nameSubCategory: items.nameSubCategory,
        typeSubCategory: JSON.parse(items.typeSubCategory)
      };
    });

    addingProduct({
      store: cookie.user.store,
      id: Math.random().toString(),
      idProduct: items?.id,
      orderName: items?.nameProduct,
      price: items?.price,
      count: count,
      totalPrice: Number(items?.price) * count,
      img: items?.image,
      options: options
    });
  };

  return (
    <div className="p-2 rounded-lg flex flex-col gap-4 bg-white h-fit">
      {loading && <Spinner />}
      <img
        src={thumbnailUrl}
        alt="Google Drive Image"
        style={{ maxWidth: "100%", height: "auto", display: loading ? "none" : "block" }}
        onLoad={() => setLoading(false)} // Image loaded successfully
        onError={(e) => {
          console.log("Image failed to load", e);
          e.target.onerror = null; // Prevents infinite loop
          e.target.src = "https://via.placeholder.com/150"; // Fallback image
          setLoading(false); // Even if it fails, stop loading
        }}
      />
      <div className="flex flex-col gap-1">
        <p className="text-[#737373] font-bold text-base">{items?.nameProduct || "-"}</p>
        <LineClampText text={items?.description || "-"} />
        {/* <p className="text-[#737373] text-sm w-4/5 line-clamp-2">{items?.description || "-"}</p> */}
        <p className="text-[#737373] font-bold text-base">
          {formatCurrencyRupiah(items?.price) || "-"}
        </p>
      </div>
      {withActionButton && (
        <div className="flex flex-col gap-1">
          <p className="text-[#CECECE] text-sm">Masukan Jumlah :</p>
          <div className="flex justify-between items-center">
            <Button
              onClick={decrement}
              className="bg-[#6853F0] hover:bg-[#1ACB0A] text-white rounded-full p-2 h-14 w-14 flex items-center justify-center">
              <MinusIcon className="h-8 w-8" />
            </Button>
            <div className="flex-1 text-black font-bold text-lg text-center">{count} Items</div>
            <Button
              onClick={increment}
              className="bg-[#6853F0] hover:bg-[#1ACB0A] text-white rounded-full p-2 h-14 w-14 flex items-center justify-center">
              <PlusIcon className="h-8 w-8" />
            </Button>
          </div>
        </div>
      )}
      {withActionButton && (
        <button
          disabled={count === 0}
          className="w-full h-6 py-6 text-xs font-bold rounded-md flex items-center cursor-pointer justify-center bg-[#6853F0] text-white hover:bg-[#1ACB0A] duration-200 hover:text-white disabled:bg-slate-400"
          onClick={() => {
            handleAddingProduct(items);
            setCount(0);
          }}>
          Masukan Keranjang
        </button>
      )}
    </div>
  );
};

export default ProductCard;
