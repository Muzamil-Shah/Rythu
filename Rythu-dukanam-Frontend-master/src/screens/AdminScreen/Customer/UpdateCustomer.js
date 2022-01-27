import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  detailsUser,
  updateUserProfile,
} from "../../../redux/actions/userAction";
import states from "../../../states";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";

function UpdateCustomer(props) {
  const userId = props.match.params.id;
  const [show, setShow] = useState(false);
  const [go, setGo] = useState(true);
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const [stats, setStats] = useState("");
  const [disable, setDisable] = useState("");
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ userId, stats, disable }));
    props.history.push("/signin");
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteUser({ _id: userId }));
    props.history.push("/admin/dashboard/customers");
  };

  useEffect(() => {
    dispatch(detailsUser(userId));

    console.log(user);
  }, []);

  return (
    <div className="w-full ml-14 bg-gray-100  p-8  flex flex-col lg:flex-row justify-start items-start lg:space-x-3 lg:space-y-0 space-y-3">
      {loading || updateLoading ? (
        <LoadingBox />
      ) : error || updateError ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {updateSuccess && (
            <MessageBox variant="success">
              Customer profile Update successfully
            </MessageBox>
          )}
          <form
            onSubmit={submitHandler}
            className="w-full  lg:space-x-3  rounded-xl bg-white flex flex-col  justify-start items-start p-8  "
          >
            <div className="w-full flex justify-start items-start space-x-3">
              <div className="w-full lg:w-7/12 space-y-3">
                <h3 className="text-xl font-bold">Identity</h3>

                <div className="flex ">
                  <div className="relative w-full border py-5 focus-within:border-lime-500">
                    <label
                      className={
                        !go
                          ? "absolute z-0 top-3 text-lg ml-2 py-1 bg-white"
                          : "absolute z-0 top-0 ml-2  text-sm"
                      }
                    >
                      First name
                    </label>
                    <input
                      name="firstname"
                      id="firstname"
                      type="text"
                      value={user.profile.firstname}
                      className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                    />
                  </div>
                  <div className="relative w-full border py-5 focus-within:border-lime-500">
                    <label
                      className={
                        !go
                          ? "absolute top-3 text-lg ml-2 z-0 py-1 bg-white"
                          : "absolute top-0 ml-2 z-0 text-sm"
                      }
                    >
                      Last name
                    </label>
                    <input
                      name="lastname"
                      id="lastname"
                      type="text"
                      value={user.profile.lastname}
                      className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                    />
                  </div>
                </div>
                <div className="relative w-full border py-5 focus-within:border-lime-500">
                  <label
                    className={
                      !go
                        ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                        : "absolute top-0 ml-2 z-10 text-sm"
                    }
                  >
                    Phone
                  </label>
                  <input
                    name="contact"
                    id="contact"
                    value={user.profile.phone}
                    onClick={() => setGo(!go)}
                    className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                  />
                </div>
                <div className="relative w-full border py-5 focus-within:border-lime-500">
                  <label
                    className={
                      !go
                        ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                        : "absolute top-0 ml-2 z-10 text-sm"
                    }
                  >
                    Email
                  </label>
                  <input
                    name="contact"
                    id="contact"
                    value={user.email}
                    onClick={() => setGo(!go)}
                    className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                  />
                </div>
                <div className="relative w-full border py-5 focus-within:border-lime-500">
                  <label
                    className={
                      !go
                        ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                        : "absolute top-0 ml-2 z-10 text-sm"
                    }
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    type="text"
                    value={user.profile.gender}
                    className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                  >
                    {user.profile.gender == "" && <option value=""></option>}
                    {user.profile.gender == "male" && (
                      <option value="male">Male</option>
                    )}
                    {user.profile.gender == "female" && (
                      <option value="female">Female</option>
                    )}
                    {user.profile.gender == "others" && (
                      <option value="others">Others</option>
                    )}
                  </select>
                </div>
                <div className="relative w-full border py-5 focus-within:border-lime-500">
                  <label
                    className={
                      !go
                        ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                        : "absolute top-0 ml-2 z-10 text-sm"
                    }
                  >
                    Business
                  </label>
                  <input
                    name="contact"
                    id="contact"
                    value={user.profile.business}
                    onClick={() => setGo(!go)}
                    className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                  />
                </div>
                <div className="relative w-full border py-5 focus-within:border-lime-500">
                  <label
                    className={
                      !go
                        ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                        : "absolute top-0 ml-2 z-10 text-sm"
                    }
                  >
                    Shop Code
                  </label>
                  <input
                    name="contact"
                    id="contact"
                    value={user.profile.shopCode}
                    onClick={() => setGo(!go)}
                    className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                  />
                </div>
                <h3 className="text-xl font-bold">Address</h3>
                <div className="relative w-full border py-5 focus-within:border-lime-500">
                  <label
                    className={
                      !go
                        ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                        : "absolute top-0 ml-2 z-10 text-sm"
                    }
                  >
                    Address
                  </label>
                  <input
                    name="address"
                    id="address"
                    type="text"
                    // value={getData.address}

                    className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                  />
                </div>

                <div className="flex ">
                  <div className="relative w-full border py-5 focus-within:border-lime-500">
                    <label
                      className={
                        !go
                          ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                          : "absolute top-0 ml-2 z-10 text-sm"
                      }
                    >
                      City
                    </label>
                    <input
                      name="city"
                      id="city"
                      type="text"
                      // value={getData.city}

                      className="relative w-4/12  top-0 ml-2  font-semibold focus:outline-none"
                    />
                  </div>
                  <div className="relative w-full border py-5 focus-within:border-lime-500">
                    <label
                      className={
                        !go
                          ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                          : "absolute top-0 ml-2 z-10 text-sm"
                      }
                    >
                      State
                    </label>
                    <select
                      name="state"
                      id="state"
                      type="text"
                      // value={getData.state}

                      className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                    >
                      {states.map((state) => (
                        <>
                          <option key={state.key} value={state.name}>
                            {state.name}
                          </option>
                          ;
                        </>
                      ))}
                    </select>
                  </div>
                  <div className="relative w-full border py-5 focus-within:border-lime-500">
                    <label
                      className={
                        !go
                          ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                          : "absolute top-0 ml-2 z-10 text-sm"
                      }
                    >
                      PIN code
                    </label>
                    <input
                      name="pincode"
                      id="pincode"
                      type="text"
                      // value={getData.pinCode}

                      type="Number"
                      className="relative w-4/12  top-0 ml-2  font-semibold focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-5/12  space-y-3">
                <h3 className="text-xl font-bold">Stats</h3>
                <div className="flex lg:flex-col  justify-start items-start  lg:space-y-3">
                  <div className="relative w-full border py-5 focus-within:border-lime-500">
                    <label
                      className={
                        !go
                          ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                          : "absolute top-0 ml-2 z-10 text-sm"
                      }
                    >
                      Segment
                    </label>
                    <select
                      name="stats"
                      id="stats"
                      type="text"
                      value={stats}
                      onChange={(e) => setStats(e.target.value)}
                      className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                    >
                      <option value=""></option>
                      <option value="regular">Regular</option>
                      <option value="orderedonce">Ordered once</option>
                    </select>
                  </div>
                  <div className="relative w-full border py-5 focus-within:border-lime-500">
                    <label
                      className={
                        !go
                          ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                          : "absolute top-0 ml-2 z-10 text-sm"
                      }
                    >
                      Disable User
                    </label>
                    <select
                      name="disable"
                      id="disable"
                      type="text"
                      value={disable}
                      onChange={(e) => setDisable(e.target.value)}
                      className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                    >
                      <option value=""></option>
                      <option value="disable">Disable User</option>
                      <option value="active">Active User</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <button className="py-1 px-4 text-xl font-semibold mt-2 bg-purple-500 rounded text-white border hover:bg-white hover:border-purple-500 hover:text-purple-500">
                Save
              </button>
              <button
                onClick={deleteHandler}
                className="py-1 px-4 text-xl font-semibold mt-2 capitalize bg-red-500 text-white border hover:bg-white hover:text-red-500 hover:border-red-500"
              >
                delete
              </button>
            </div>
          </form>
          <div className="w-full lg:w-4/12 rounded-xl  flex justify-start items-start  h-screen">
            <div className="w-full p-8 bg-white rounded-xl flex flex-col justify-start items-start space-y-3">
              <h3 className="lg:text-xl font-bold">History</h3>
              <div className="w-full flex justify-between items-center ">
                <div className="flex justify-start items-start md:text-lg space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex flex-col justify-start ite">
                    <span>First seen</span>
                    <span>2/23/2021</span>
                  </div>
                </div>
                <div className="flex justify-start items-start md:text-xl space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex flex-col justify-start ite">
                    <span>Last seen</span>
                    <span>2/23/2021</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-start space-x-3 lg:text-xl">
                <span className="text-gray-500 w-6h-6">&#x20B9;</span>
                <span>5 Orders</span>
              </div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateCustomer;
