import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

import { allOrders } from "../../redux/actions/orderAction";
import { allUsers } from "../../redux/actions/userAction";
import moment from "moment";
import { Link } from "react-router-dom";

function DashCustomer() {
  const dispatch = useDispatch();
  const usersAll = useSelector((state) => state.usersAll);
  const { error, loading, users } = usersAll;
  const ordersAll = useSelector((state) => state.ordersAll);
  const { error: errorO, loading: loadingO, orders } = ordersAll;

  function orderTotal(id) {
    return orders.reduce(function (sum, order) {
      if (order.user === id) {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
  }
  function spentTotal(id) {
    return orders.reduce(function (sum, order) {
      if (order.user === id) {
        return sum + order.orderItems.reduce((a, c) => a + c.price * c.qty, 0);
      } else {
        return sum;
      }
    }, 0);
  }

  function lastDate(id) {
    return orders.reduce(function (sum, order, createAt) {
      if (order.user === id) {
        return createAt;
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
      const newContactList = users.filter((user) => {
        return Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(users);
    }
  };

  const getSearchTerm = () => {
    searchHandler(inputEl.current.value);
  };

  // search engin
  useEffect(() => {
    dispatch(allOrders());
    dispatch(allUsers());
  }, []);
  return (
    <div className=" w-full  ml-16 mt-14 flex flex-col justify-start items-start   bg-transparent text-coolGray-800 text-sm md:text-base ">
      {loading || loadingO ? (
        <LoadingBox />
      ) : error || errorO ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="w-full">
          <div className="w-full flex justify-between items-center bg-gray-50 p-3">
            <input
              className="w-72 rounded-lg border py-2 text-center text-sm md:text-xl"
              type="text"
              placeholder="search"
              ref={inputEl}
              value={searchTerm}
              onChange={getSearchTerm}
            />

            <div className="flex justify-end items-center space-x-2 text-purple-500 font-bold ">
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
          <table className="w-full   table-auto ">
            <thead className="w-full border bg-gray-50">
              <tr className="w-full ">
                <th className="border py-2 px-2">
                  <input className="w-5 h-5" type="checkbox" />
                </th>
                <th className="border py-2">Customer</th>
                <th className="border py-2">Last seen</th>
                <th className="border py-2">Orders</th>
                <th className="border py-2">Total spent</th>
                <th className="border py-2">Latest purchase</th>
                <th className="border py-2">Status</th>
                <th className="border py-2">Segments</th>
              </tr>
            </thead>
            <tbody className="w-full border">
              {(searchTerm.length < 1 ? users : searchResults).map((user) => (
                // <Order key={user._id} userId={user._id}/>
                <tr key={user._id} className="text-lg">
                  <td className="border text-center py-2">
                    <input className="w-5 h-5" type="checkbox" />
                  </td>
                  <td className="flex justify-start py-2 items-center space-x-2">
                    <Link
                      className="flex justify-start py-2 items-center space-x-2"
                      to={`/admin/dashboard/customer/${user._id}`}
                    >
                      {user.profile.img === "" ? (
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
                      ) : (
                        <img
                          className="w-7 h-7 border ml-2 border-lime-400 rounded-full"
                          src={user.profile.img}
                          alt="userImage"
                        />
                      )}
                      <p>{user.name}</p>
                    </Link>
                  </td>
                  <td className="border text-center py-2">4/11/2021</td>
                  <td className="border text-center py-2">
                    {orderTotal(user._id)}
                  </td>
                  <td className="border text-center py-2 text-red-500">
                    {spentTotal(user._id)}
                  </td>
                  <td className="border text-center py-2">
                    {/* {orders && (
                      <>
                        {orders.map(
                          (order, index) =>
                            user._id == order.user && (
                              <p>
                                {moment(
                                  order.createAt
                                ).format("DD/MM/YYYY HH:MM")}
                              </p>
                            )
                        )}
                      </>
                    )} */}

                    {moment(lastDate(user._id)).format("DD/MM/YYYY HH:MM")}
                  </td>
                  <td className="border text-center py-2 flex justify-center items-center">
                    {user.profile.disable === "active" ? (
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
                        className="h-5 w-5  "
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
                  <td className="border  text-center py-2 space-x-1">
                    {user.profile.stats === "regular" ? (
                      <span className="bg-gray-400 p-1 px-2 rounded-full">
                        Regular
                      </span>
                    ) : user.profile.stats === "orderedonce" ? (
                      <span className="bg-gray-400 p-1 rounded-full px-2">
                        Ordered Once
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DashCustomer;
