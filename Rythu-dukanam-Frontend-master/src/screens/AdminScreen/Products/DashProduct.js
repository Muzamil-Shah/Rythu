import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { listProduct } from "../../../redux/actions/ProductAction";

function DashProduct() {
  const inputEl = useRef("");
  const productsList = useSelector((state) => state.productsList);
  const { error, loading, products } = productsList;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newProductList = products.filter((product) => {
        return Object.values(product)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newProductList);
    } else {
      setSearchResults(products);
    }
  };

  const getSearchTerm = () => {
    searchHandler(inputEl.current.value);
  };

  useEffect(() => {
    dispatch(listProduct());
  }, []);
  return (
    <div className="  w-auto md:w-full ml-16 mt-14 flex flex-col justify-start items-start  mx-auto bg-transparent text-coolGray-800 ">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="w-full flex justify-between items-center bg-gray-50 p-3">
            <input
              ref={inputEl}
              className="w-72 rounded-lg border py-2 text-center texxt-sm md:text-xl"
              type="text"
              placeholder="search"
              value={searchTerm}
              onChange={getSearchTerm}
            />

            <div className="flex justify-center items-center space-x-3">
              <Link to="/admin/dashboard/product/create">
                <div className="flex justify-center items-center space-x-2 text-purple-500 font-bold ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <li>CREATE</li>
                </div>
              </Link>
              <div className="flex justify-center items-center space-x-2 text-purple-500 font-bold ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <li>ADD FILTER</li>
              </div>
            </div>
          </div>
          <table className="w-full  table-auto">
            <thead className="w-full border bg-gray-50 ">
              <tr className="w-full ">
                <th className="border py-2">
                  <input className="w-5 h-5" type="checkbox" />
                </th>
                <th className="border py-2">Id</th>
                <th className="border py-2">Img</th>
                <th className="border py-2">Name</th>
                <th className="border py-2">Price</th>
                <th className="border py-2">Order_Limit</th>
                <th className="border py-2">Status</th>
                <th className="border py-2">Category</th>
                <th className="border py-2">Zone</th>
              </tr>
            </thead>
            <tbody className="w-full border font-bold">
              {searchTerm.length < 1
                ? products.map((product) => (
                    <tr key={product._id} className="text-lg">
                      <td className="border text-center py-2 px-2">
                        <input className="w-5 h-5" type="checkbox" />
                      </td>
                      <td className="border py-2 text-center px-2">
                        <span>...{product._id.slice(-3)}</span>
                      </td>
                      <td className="border text-center  flex justify-center items-center">
                        <div className="md:w-32 md:h-32 w-24 h-24">
                          <img
                            className="w-full h-full "
                            src={product.image}
                            alt="product"
                          />
                        </div>
                      </td>

                      <td className="border text-center py-2 px-2 ">
                        <Link
                          className="text-purple-500"
                          to={`/admin/dashboard/product/update/${product._id}`}
                        >
                          {product.name}{" "}
                        </Link>
                      </td>
                      <td className="border text-center py-2 px-2 text-red-500">
                        &#x20B9;{product.price}/KG
                      </td>
                      <td className="border text-center py-2 px-2">
                        {product.orderLimit}Kg
                      </td>
                      <td className="border text-center py-2 px-2">
                        {product.status}
                      </td>
                      <td className="border text-center py-2 px-2">
                        {product.category}
                      </td>
                      <td className="border text-center py-2 px-2">
                        {product.zone}
                      </td>
                    </tr>
                  ))
                : searchResults.map((product) => (
                    <tr key={product._id} className="text-lg">
                      <td className="border text-center py-2 px-2">
                        <input className="w-5 h-5" type="checkbox" />
                      </td>
                      <td className="border py-2 text-center">
                        <span>{product._id}</span>
                      </td>
                      <td className="border text-center py-2 px-2 flex justify-center items-center">
                        <div className="w-32 h-32">
                          <img
                            className="w-full h-full object-cover"
                            src={product.image}
                            alt="product"
                          />
                        </div>
                      </td>

                      <td className="border text-center py-2">
                        <Link
                          className=""
                          to={`/admin/dashboard/product/update/${product._id}`}
                        >
                          {product.name}{" "}
                        </Link>
                      </td>
                      <td className="border text-center py-2 text-red-500">
                        &#x20B9;{product.price}/KG
                      </td>
                      <td className="border text-center py-2">
                        {product.orderLimit}Kg
                      </td>
                      <td className="border text-center py-2">
                        {product.status}
                      </td>
                      <td className="border text-center py-2">
                        {product.category}
                      </td>
                      <td className="border text-center py-2">
                        {product.zone}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default DashProduct;
