import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../redux/actions/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import FileBase from "react-file-base64";
import { USER_UPDATE_PROFILE_RESET } from "../redux/conistance/userConstants";
import Header from "../components/Header";
import ProfileHeader from "../components/ProfileHeader";
import {RiUser6Line, RiLogoutCircleLine,RiCloseCircleFill} from "react-icons/ri"


function UserProfile(props) {
  const [show, setShow] = useState(false);
  const [img, setImg] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [shopCode, setShopCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password And Confirm Password Are Not Matched");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          email,
          password,
          img,
          firstname,
          lastname,
          gender,
          phone,
          business,
          shopCode,
        })
      );
    }
  };

  // const uploadPhoto = () => {
  //   document.getElementById("getFile").click;
  // };
  const carts = useSelector((state) => state.carts);
  const { cartItems } = carts;

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setEmail(user.email);
      setImg(user.profile.img);
      setFirstname(user.profile.firstname);
      setLastname(user.profile.lastname);
      setGender(user.profile.gender);
      setPhone(user.profile.phone);
      setBusiness(user.profile.business);
      setShopCode(user.profile.shopCode);
    }
  }, [dispatch, userInfo._id, user]);
  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="w-full flex flex-col text-sm md:text-lg justify-center items-start ">
          <Header cartItems={cartItems} />
          <ProfileHeader />
          {updateLoading && <LoadingBox />}
          {updateError && <MessageBox variant="danger">{error}</MessageBox>}
          {updateSuccess && (
            <MessageBox variant="success">
              Profile Update Successfully
            </MessageBox>
          )}
          <img src="https://picsum.photos/1200/800" alt="cover" className="w-full h-96 object-cover"/>
          <div className="relative w-full flex flex-col justify-center items-center space-y-3">
            <span className="absolute w-36 h-36 md:w-40 md:h-40 bg-red-500 rounded-full text-center text-6xl flex justify-center items-center  overflow-hidden">
              {/* {user.profile.img == "" ? (
                <><RiUser6Line className="w-24 h-24"/></>
              ) : ( */}
              <img
                className="w-full h-full object-cover"
                src={img}
                alt="userimage"
              />
              {/* )} */}
            </span>
            {/* <h3 className=" md:text-xl font-semibold border-b capitalize">
              {user.profile.firstname + " " + user.profile.lastname}
            </h3> */}
          </div>

          <div className="w-full mt-28">
            <form
              onSubmit={submitHandler}
              className="container py-2 px-2 md:mx-auto  flex flex-col justify-center items-center space-y-5"
            >
              <label
                for="getFile"
                className="w-full flex justify-center items-center pl-20"
              >
                <FileBase
                  type="file"
                  multiple={false}
                  // onDone={({ base64 }) => setImage(base64)}
                  // onDone={({ base64 }) =>
                  //   setGetData({ ...getData, img: base64 })
                  // }
                  onDone={({ base64 }) => setImg(base64)}
                />
              </label>
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="border-b-2 focus:outline-none hover:text-purple-500"
              >
                Change Password
              </button>

              <label
                className={
                  show
                    ? "container flex md:text-xl font-semibold text-gray-800"
                    : "hidden"
                }
              >
                <span className="w-3/12">Password:</span>
                <input
                  className="w-9/12 ml-3  text-right focus:outline-none"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label
                className={
                  show
                    ? "container flex md:text-xl font-semibold text-gray-800"
                    : "hidden"
                }
              >
                <span className="w-3/12">Confirm Password:</span>
                <input
                  className="w-9/12 ml-3  text-right focus:outline-none"
                  type="text"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <label className="container flex md:text-xl font-semibold text-gray-800">
                <span className="w-3/12">First Name:</span>
                <input
                  className="w-9/12 ml-3  text-right focus:outline-none"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </label>
              <label className="container flex md:text-xl font-semibold text-gray-800">
                <span className="w-3/12">Last Name:</span>
                <input
                  className="w-9/12 ml-3 text-right focus:outline-none"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </label>
              <label className="container flex md:text-xl font-semibold text-gray-800">
                {" "}
                <span className="w-3/12">Gender:</span>
                <input
                  className="w-9/12 ml-3 text-right focus:outline-none"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <label className="container flex md:text-xl font-semibold text-gray-800">
                {" "}
                <span className="w-3/12">Phone:</span>
                <input
                  className="w-9/12 ml-3 text-right focus:outline-none"
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label className="container flex md:text-xl font-semibold text-gray-800">
                {" "}
                <span className="w-3/12">Email</span>
                <input
                  className="w-9/12 ml-3 text-right focus:outline-none"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="container flex md:text-xl font-semibold text-gray-800">
                {" "}
                <span className="w-3/12">Busniuse Name:</span>
                <input
                  className="w-9/12 ml-3 text-right focus:outline-none"
                  type="text"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                />
              </label>
              <label className="container flex md:text-xl font-semibold text-gray-800">
                {" "}
                <span className="w-3/12">GMS/TTD/PTF No:</span>
                <input
                  className="w-9/12 ml-3 text-right focus:outline-none"
                  type="text"
                  value={shopCode}
                  onChange={(e) => setShopCode(e.target.value)}
                />
              </label>
              <button
                type="submit"
                className="bg-gray-900 py-2 px-4 border text-white hover:bg-white hover:text-gray-900 hover:border-gray-900"
              >
                Edit Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
