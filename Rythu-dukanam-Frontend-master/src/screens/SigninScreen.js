import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, signin } from "../redux/actions/userAction";
// import { register, signin } from "../action/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {FaRegUser} from "react-icons/fa"
import {VscLock} from "react-icons/vsc"
import {HiOutlineMail} from "react-icons/hi"
import {SiFacebook} from "react-icons/si";
import {FcGoogle} from "react-icons/fc"

function SigninScreen(props) {
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  //signin
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  //register
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo: userRInfo, load, err } = userRegister;
  //signin
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  //register
  const submitHandlerOne = (e) => {
    e.preventDefault();
    if (password !== comfirmPassword) {
      alert("Password and comfirm password is not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      props.history.push("/admin/dashboard");
    } else if (userInfo || userRInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userRInfo, userInfo]);

  // useEffect(() => {
  // if (userRInfo) {
  // props.history.push(redirect);
  // }
  // }, [props, history, redirect, userRInfo]);

  return (
    <div className={signup ? "sign-container sign-up-mode" : "sign-container"}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={submitHandler}>
            <h2 className="title">Sign in</h2>
            {/* {loading && <LoadingBox></LoadingBox>} */}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div className="input-field">
              <i ><FaRegUser /></i>
              <input
                id="email"
                className="bg-transparent"
                className="outline-none focus:outline-none"
                name="username"
                type="email"
                placeholder="Username"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i><VscLock /></i>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="sign-btn solid outline-none ring-offset-white"
            >
              Login
            </button>
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="/auth/facebook" className="social-icon">
                <i ><SiFacebook /></i>
              </a>
              <a className="social-icon" href="/auth/google">
                <i ><FcGoogle /></i>
              </a>
            </div>
          </form>
          <form
            action="/register"
            method="post"
            className="sign-up-form"
            onSubmit={submitHandlerOne}
          >
            <h2 className="title">Sign up</h2>
            {load && <LoadingBox></LoadingBox>}
            {err && <MessageBox variant="danger">{err}</MessageBox>}
            <div className="input-field">
              <i ><FaRegUser /></i>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i><HiOutlineMail /></i>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i ><VscLock /></i>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
            <i ><VscLock /></i>
              <input
                id="comfirmPassword"
                name="comfirmPassword"
                type="password"
                placeholder="Comfirm Password"
                required
                onChange={(e) => setComfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="sign-btn ">
              Register
            </button>
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="/auth/facebook" className="social-icon">
                <i ><SiFacebook /></i>
              </a>
              <a className="social-icon" href="/auth/google">
                <i ><FcGoogle /></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content flex flex-col justify-center items-center">
            <img className="w-44" src="./img/logo.png" alt="logo" />
            {/* <h3>New here ?</h3> */}
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <Link to={`/signin?redirect=${redirect}`}>
              <button
                className="border-2 border-white hover:bg-white hover:text-lime-500 font-semibold rounded-full px-4 py-1  transparent"
                id="sign-up-btn"
                onClick={() => setSignup(!signup)}
              >
                Sign up
              </button>
            </Link>
          </div>
          <img src="./img/login.png" className="image rounded-full" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content flex flex-col items-center justify-center">
            <img className="w-44" src="./img/logo.png" alt="logo" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <Link to={`/signin?redirect=${redirect}`}>
              <button
                className="border-2 border-white hover:bg-white hover:text-lime-500 rounded-full px-4 py-1 font-semibold   transparent"
                id="sign-in-btn"
                onClick={() => setSignup(!signup)}
              >
                Sign in
              </button>
            </Link>
          </div>
          <img src="./img/signup.png" className="image rounded-full" alt="" />
        </div>
      </div>
    </div>
  );
}

export default SigninScreen;
