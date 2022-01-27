import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allOrders } from "../../../redux/actions/orderAction";
import MessageBox from "../../../components/MessageBox";
import LoadingBox from "../../../components/LoadingBox";
import moment from "moment";
import { Link } from "react-router-dom";

function DashOrders() {
  const [getAction, setGetAction] = useState({
    orders: true,
    delivery: false,
    returns: false,
    cancel: false,
  });

  const dispatch = useDispatch();
  const ordersAll = useSelector((state) => state.ordersAll);
  const { error, loading, orders } = ordersAll;

  function orderedFuction() {
    return orders.reduce(function (sum, order) {
      if (order.status === "ordered") {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
  }
  function deliveredFuction() {
    return orders.reduce(function (sum, order) {
      if (order.status === "delivered") {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
  }
  function cancelledFuction() {
    return orders.reduce(function (sum, order) {
      if (order.status === "cancelled") {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
  }
  function returnedFuction() {
    return orders.reduce(function (sum, order) {
      if (order.status === "returned") {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
  }

  // search engin
  const inputEl = useRef("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = orders.filter((order) => {
        return Object.values(order)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(orders);
    }
  };

  const getSearchTerm = () => {
    searchHandler(inputEl.current.value);
  };

  // search engin

  useEffect(() => {
    dispatch(allOrders());
  }, []);
  return (
    <div className=" w-auto md:w-full md:ml-14  flex flex-col justify-start items-start  mx-auto bg-transparent  text-coolGray-800 ">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="w-full   flex flex-col justify-start items-start  mx-auto bg-transparent  text-coolGray-800 ">
          <div className="w-full flex justify-between items-center bg-gray-50 p-3">
            <input
              className="w-72 rounded-lg border p-2 text-center text-sm md:text-xl"
              type="text"
              placeholder="search"
              ref={inputEl}
              value={searchTerm}
              onChange={getSearchTerm}
            />

            <div className="flex justify-center items-center space-x-2 text-xs md:text-base text-purple-500 font-bold ">
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

          <div className="w-full  flex justify-center items-center border rounded-t-xl">
            <button
              onClick={() =>
                setGetAction({
                  ...getAction,
                  orders: true,
                  delivery: false,
                  returns: false,
                  cancel: false,
                })
              }
              className={
                !getAction.orders
                  ? "w-4/12 p-2 text-center text-sm md:text-3xl uppercase border-b-4 focus:outline-none"
                  : "w-4/12 p-2 text-center text-sm md:text-3xl uppercase border-b-4 border-purple-500 focus:outline-none"
              }
            >
              ordered({orderedFuction()})
            </button>
            <button
              onClick={() =>
                setGetAction({
                  ...getAction,
                  delivery: true,
                  orders: false,
                  returns: false,
                  cancel: false,
                })
              }
              className={
                !getAction.delivery
                  ? "w-4/12 p-2 text-center text-sm md:text-3xl uppercase border-b-4 focus:outline-none "
                  : "w-4/12 p-2 text-center text-sm md:text-3xl uppercase border-b-4 border-purple-500 focus:outline-none"
              }
            >
              delivered({deliveredFuction()})
            </button>
            <button
              onClick={() =>
                setGetAction({
                  ...getAction,
                  cancel: true,
                  returns: false,
                  orders: false,
                  delivery: false,
                })
              }
              className={
                !getAction.cancel
                  ? "w-4/12 p-2 text-center text-sm md:text-3xl uppercase border-b-4 focus:outline-none"
                  : "w-4/12 p-2 text-center text-sm md:text-3xl uppercase border-b-4 border-purple-500 focus:outline-none"
              }
            >
              cancelled({cancelledFuction()})
            </button>
            <button
              onClick={() =>
                setGetAction({
                  ...getAction,
                  returns: true,
                  orders: false,
                  delivery: false,
                  cancel: false,
                })
              }
              className={
                !getAction.returns
                  ? "w-4/12 p-2 text-center text-sm md:text-3xl uppercase border-b-4 focus:outline-none"
                  : "w-4/12 p-2 text-center text-sm md:text-3xl uppercase border-b-4 border-purple-500 focus:outline-none"
              }
            >
              returned({returnedFuction()})
            </button>
          </div>
          <div className="w-full ">
            {getAction.orders && (
              <table className="w-full  table-auto text-xs md:text-base">
                <thead className="w-full border bg-gray-50">
                  <tr className="w-full ">
                    <th className="border p-2">
                      <input className="w-5 h-5" type="checkbox" />
                    </th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Reference</th>
                    <th className="border p-2">Customer</th>
                    <th className="border p-2">Address</th>
                    <th className="border p-2">Items</th>
                    <th className="border p-2">Total</th>
                  </tr>
                </thead>
                <tbody className="w-full border">
                  {(searchTerm.length < 1 ? orders : searchResults).map(
                    (order) => (
                      <>
                        {order.status === "ordered" && (
                          <tr key={order._id} className="text-lg">
                            <td className="border text-center p-2">
                              <input className="w-5 h-5" type="checkbox" />
                            </td>
                            <td className="border text-center p-2">
                              {moment(order.createAt).fromNow()}
                              {/* {order.createAt} */}
                            </td>
                            <td className="border text-center p-2">
                              <Link
                                to={`/admin/dashboard/order/update/${order._id}`}
                              >
                                {order._id}
                              </Link>
                            </td>
                            <td className="flex justify-start p-2 items-center space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 ml-2 text-red-500 bg-red-200  rounded-full "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <p>{order.informationAddress.contact}</p>
                            </td>
                            <td className="border text-center p-2">
                              {order.shippingAddress.shipIn}
                            </td>
                            <td className="border text-center p-2">
                              {order.orderItems.length}
                            </td>
                            <td className="border text-center p-2">
                              &#x20B9;{" "}
                              {order.orderItems.reduce(
                                (a, c) => a + c.price * c.qty,
                                0
                              )}
                              .00
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </tbody>
              </table>
            )}
            {getAction.delivery && (
              <table className="w-full  table-auto">
                <thead className="w-full border bg-gray-50">
                  <tr className="w-full ">
                    <th className="border p-2">
                      <input className="w-5 h-5" type="checkbox" />
                    </th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Reference</th>
                    <th className="border p-2">Customer</th>
                    <th className="border p-2">Address</th>
                    <th className="border p-2">Items</th>
                    <th className="border p-2">Total</th>
                    <th className="border p-2">Returned</th>
                  </tr>
                </thead>
                <tbody className="w-full border">
                  {(searchTerm.length < 1 ? orders : searchResults).map(
                    (order) => (
                      <>
                        {order.status === "delivered" && (
                          <tr className="text-lg">
                            <td className="border text-center p-2">
                              <input className="w-5 h-5" type="checkbox" />
                            </td>
                            <td className="border text-center p-2">
                              {moment(order.createAt).format(
                                "DD/MM/YYYY HH:MM "
                              )}
                            </td>
                            <td className="border text-center p-2">
                              <Link to="/admin/dashboard/order/update/:id">
                                {order._id}
                              </Link>
                            </td>
                            <td className="flex justify-start p-2 items-center space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 ml-2 text-red-500 bg-red-200  rounded-full "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <p>{order.informationAddress.contact}</p>
                            </td>
                            <td className="border text-center p-2">
                              {order.shippingAddress.shipIn}
                            </td>
                            <td className="border text-center p-2">
                              {order.orderItems.length}
                            </td>
                            <td className="border text-center p-2">
                              &#x20B9;{" "}
                              {order.orderItems.reduce(
                                (a, c) => a + c.price * c.qty,
                                0
                              )}
                              .00
                            </td>
                            <td className="border text-center p-2 flex justify-center items-center">
                              {order.status === "returned" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-7 w-6  "
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </tbody>
              </table>
            )}
            {getAction.cancel && (
              <table className="w-full  table-auto">
                <thead className="w-full border bg-gray-50">
                  <tr className="w-full ">
                    <th className="border p-2">
                      <input className="w-5 h-5" type="checkbox" />
                    </th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Reference</th>
                    <th className="border p-2">Customer</th>
                    <th className="border p-2">Address</th>
                    <th className="border p-2">Items</th>
                    <th className="border p-2">Total</th>
                    <th className="border p-2">Returned</th>
                  </tr>
                </thead>
                <tbody className="w-full border">
                  {(searchTerm.length < 1 ? orders : searchResults).map(
                    (order) => (
                      <>
                        {order.status === "cancelled" && (
                          <tr key={order._id} className="text-lg">
                            <td className="border text-center p-2">
                              <input className="w-5 h-5" type="checkbox" />
                            </td>
                            <td className="border text-center p-2">
                              {moment(order.createAt).format(
                                "DD/MM/YYYY HH:MM "
                              )}
                            </td>
                            <td className="border text-center p-2">
                              <Link
                                to={`/admin/dashboard/order/update/${order._id}`}
                              >
                                {order._id}
                              </Link>
                            </td>
                            <td className="flex justify-start p-2 items-center space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 ml-2 text-red-500 bg-red-200  rounded-full "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <p>{order.informationAddress.contact}</p>
                            </td>
                            <td className="border text-center p-2">
                              {order.shippingAddress.shipIn}
                            </td>
                            <td className="border text-center p-2">
                              {order.orderItems.length}
                            </td>
                            <td className="border text-center p-2">
                              &#x20B9;{" "}
                              {order.orderItems.reduce(
                                (a, c) => a + c.price * c.qty,
                                0
                              )}
                              .00
                            </td>
                            <td className="border text-center p-2 flex justify-center items-center">
                              {order.status === "returned" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-7 w-6  "
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </tbody>
              </table>
            )}
            {getAction.returns && (
              <table className="w-full  table-auto">
                <thead className="w-full border bg-gray-50">
                  <tr className="w-full ">
                    <th className="border p-2">
                      <input className="w-5 h-5" type="checkbox" />
                    </th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Reference</th>
                    <th className="border p-2">Customer</th>
                    <th className="border p-2">Address</th>
                    <th className="border p-2">Items</th>
                    <th className="border p-2">Total</th>
                    <th className="border p-2">Returned</th>
                  </tr>
                </thead>
                <tbody className="w-full border">
                  {(searchTerm.length < 1 ? orders : searchResults).map(
                    (order) => (
                      <>
                        {order.status === "returned" && (
                          <tr key={order._id} className="text-lg">
                            <td className="border text-center p-2">
                              <input className="w-5 h-5" type="checkbox" />
                            </td>
                            <td className="border text-center p-2">
                              {moment(order.createAt).format(
                                "DD/MM/YYYY HH:MM "
                              )}
                            </td>
                            <td className="border text-center p-2">
                              <Link
                                to={`/admin/dashboard/order/update/${order._id}`}
                              >
                                {order._id}
                              </Link>
                            </td>
                            <td className="flex justify-start p-2 items-center space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 ml-2 text-red-500 bg-red-200  rounded-full "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <p>{order.informationAddress.contact}</p>
                            </td>
                            <td className="border text-center p-2">
                              {order.shippingAddress.shipIn}
                            </td>
                            <td className="border text-center p-2">
                              {order.orderItems.length}
                            </td>
                            <td className="border text-center p-2">
                              &#x20B9;{" "}
                              {order.orderItems.reduce(
                                (a, c) => a + c.price * c.qty,
                                0
                              )}
                              .00
                            </td>
                            <td className="border text-center p-2 flex justify-center items-center">
                              {order.status === "returned" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-7 w-6  "
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashOrders;
