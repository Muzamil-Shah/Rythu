import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function ItemList(props) {
  const { product, setProductId } = props;
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);

  const increase = () => {
    setQty(qty + product.orderLimit);
    setTotal((qty + product.orderLimit) * product.price);
  };
  const decrease = () => {
    setQty(qty - product.orderLimit);
    setTotal((qty - product.orderLimit) * product.price);
  };
  useEffect(() => {
    if (qty === 0) {
      setTotal(0);
      setQty(0);
    }
  }, [qty]);

  return (
    <div
      key={product._id}
      className="w-full h-40 bg-white flex flex-row justify-around items-center"
    >
      <div className="w-16 h-20 md:w-28 md:h-32 rounded-lg">
        <img
          className="w-full h-full
          rounded-lg "
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="w-3/12 flex flex-col justify-center items-start space-y-1">
        <h1 className="text-xl font-bold capitalize">{product.name}</h1>
        <p>&#x20B9; {product.price} /Kg</p>
        <p>&#x20B9; {total}</p>
      </div>
      <div>
        <button
          onClick={decrease}
          className={qty >= product.orderLimit ? "border w-8 " : "hidden"}
        >
          -
        </button>
        <input
          className="text-center w-10 md:w-20"
          type="text"
          disabled
          value={qty}
        />
        <button onClick={increase} className="border w-8 ">
          +
        </button>
      </div>
      <div>
        {product.status === "unavailible" ? (
          <span className="text-red-500 text-sm font-semibold">
            Unavailibale
          </span>
        ) : (
          <Link onClick={() => setProductId(product._id)}>
            <Link
              to={`/cart/${product._id}?qty=${qty}`}
              className="px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900"
            >
              ADD
            </Link>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ItemList;
