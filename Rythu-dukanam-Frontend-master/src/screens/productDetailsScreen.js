import React from "react";
import { Link } from "react-router-dom";

function productDetailsScreen(props) {
  const { product } = props;

  return (
    <div className="w-full h-12 flex justify-center items-center text-red-700">
      <h3 className="text-xl font-bold ">{product._id} Items</h3>
      <p>Total: &#x20B9; 30000 </p>
      <Link
        to="/cart"
        className="bg-lime-500 px-3 py-1 rounded text-white font-bold border hover:border-lime-500 hover:text-lime-500 hover:bg-white"
      >
        View Cart
      </Link>
    </div>
  );
}

export default productDetailsScreen;
