import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../../components/MessageBox";
import LoadingBox from "../../../components/LoadingBox";
import { createProduct } from "../../../redux/actions/ProductAction";

function DashCreate(props) {
  const [go, setGO] = useState(false);
  const [info, setInfo] = useState({
    image: true,
    details: false,
  });
  const [getData, setGetData] = useState({
    image: "",
    name: "",
    price: "",
    orderLimit: "",
    status: "",
    category: "",
    zone: ""
  });
  const productCreate = useSelector((state) => state.productCreate);
  const { error, loading, success, product } = productCreate;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(getData));
  };

  return (
    <div className=" w-full ml-16 h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="w-full md:w-8/12 h-5/6 bg-white mx-auto md:mt-10 rounded-lg flex flex-col justify-between"
      >
        <div className="w-full h-20 flex justify-between items-center">
          <button
            type="button"
            onClick={() =>
              setInfo({
                ...info,
                image: true,
                details: false,
                descripation: false,
              })
            }
            className={
              !info.image
                ? "w-6/12 p-4 text-3xl border-b-4  font-semibold focus:outline-none"
                : "w-6/12 p-4 text-3xl border-b-4  font-semibold border-purple-500 text-purple-500 focus:outline-none"
            }
          >
            image
          </button>
          <button
            type="button"
            onClick={() =>
              setInfo({
                ...info,
                details: true,
                image: false,
                descripation: false,
              })
            }
            className={
              !info.details
                ? "w-6/12 p-4 text-3xl border-b-4  font-semibold focus:outline-none"
                : "w-6/12 p-4 text-3xl border-b-4  font-semibold border-purple-500 text-purple-500 focus:outline-none"
            }
          >
            Detials
          </button>
        </div>
        <div className="w-full">
          <div
            className={
              info.image
                ? "w-full flex flex-col justify-start items-center space-y-12"
                : " hidden"
            }
          >
            <div className="w-72 h-72 border-4 border-white shadow-xl rounded-xl overflow-hidden">
              <img
                className="w-full h-full  object-cover "
                src={getData.image}
              />
            </div>
            <FileBase
              type="file"
              multiple={false}
              // onDone={({ base64 }) => setImage(base64)}
              onDone={({ base64 }) => setGetData({ ...getData, image: base64 })}
              // onDone={({ base64 }) => setImg(base64)}
            />
            <button
              onClick={() =>
                setInfo({
                  ...info,
                  image: false,
                  details: true,
                })
              }
              className="text-xl border border-purple-500 px-4 py-1 rounded-lg"
            >
              Next
            </button>
          </div>

          <div
            className={
              info.details
                ? "w-full flex flex-col justify-center items-center space-y-8"
                : "hidden"
            }
          >
            <div className="relative w-full border py-5 focus-within:border-lime-500">
              <label
                className={
                  !go
                    ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                    : "absolute top-0 ml-2 z-10 text-sm"
                }
              >
                Reference / Name{" "}
                <sub className="text-red-500 text-xl font-bold">*</sub>
              </label>
              <input
                onClick={() => setGO(!go)}
                name="lastname"
                id="lastname"
                type="text"
                required
                value={getData.name}
                onChange={(e) =>
                  setGetData({ ...getData, name: e.target.value })
                }
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
                Price (&#x20B9;){" "}
                <sub className="text-red-500 text-xl font-bold">*</sub>
              </label>
              <input
                name="price"
                id="price"
                type="number"
                required
                autoComplete="none"
                value={getData.price}
                onChange={(e) =>
                  setGetData({ ...getData, price: e.target.value })
                }
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
                Order Limit{" "}
                <sub className="text-red-500 text-xl font-bold">*</sub>
              </label>
              <input
                required
                autoComplete="none"
                name="limit"
                id="limit"
                type="number"
                value={getData.orderLimit}
                onChange={(e) =>
                  setGetData({ ...getData, orderLimit: e.target.value })
                }
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
                Status <sub className="text-red-500 text-xl font-bold">*</sub>
              </label>
              <select
                name="Status"
                id="Status"
                type="text"
                value={getData.status}
                onChange={(e) =>
                  setGetData({ ...getData, status: e.target.value })
                }
                className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
              >
                <option selected value="availible">Availible</option>
                <option value="unavailible">Unavailible</option>
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
                Category <sub className="text-red-500 text-xl font-bold">*</sub>
              </label>
              <select
                name="Category"
                id="Category"
                type="text"
                value={getData.category}
                onChange={(e) =>
                  setGetData({ ...getData, category: e.target.value })
                }
                className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
              >
                <option selected value="foods">Foods</option>
                <option value="vegetables">Vegetables</option>
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
                Category <sub className="text-red-500 text-xl font-bold">*</sub>
              </label>
              <select
                name="Zone"
                id="Zone"
                type="text"
                value={getData.zone}
                onChange={(e) =>
                  setGetData({ ...getData, zone: e.target.value })
                }
                className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
              >
                <option selected value="L.B.Nager">L.B.Nager</option>
                <option value="Charminar">Charminar</option>
                <option value="Khairatabad">Khairatabad</option>
                <option value="Secunderabad">Secunderabad</option>
                <option value="Serilingampally">Serilingampally</option>
                <option value="Kukatpally">Kukatpally</option>
              </select>
            </div>
            <button
              onClick={() =>
                setInfo({
                  ...info,
                  image: true,
                  details: false,
                })
              }
              className="text-xl border border-purple-500 px-4 py-1 rounded-lg"
            >
              Back
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-400 text-white text-3xl p-4 focus:outline-none"
        >
          Create Product
        </button>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {success && (
          <MessageBox variant="success">Product Create Successfully</MessageBox>
        )}
      </form>
    </div>
  );
}

export default DashCreate;
