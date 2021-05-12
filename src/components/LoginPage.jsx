// import { Form, Button, Container } from "react-bootstrap";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import "./styles/login.css";
import { Link } from "react-router-dom";
export default class Login extends React.Component {
  state = {
    password: "",
    username: "",
  };
  notify = () => toast("Here is your toast.");
  logUser = async () => {
    try {
      let response = await fetch("http://localhost:5000/v1/login", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.ok) {
        const res = await response.json();
        const access_token = await res.data.access_token;
        console.log(res);

        localStorage.setItem("token", access_token);

        toast.success("Welcome back " + this.state.username + " 🥳🤙🏻");

        this.setState({
          password: "",
          username: "",
        });
        setTimeout(() => {
          this.props.access();
        }, 4000);
      } else {
        toast.error(
          "User " +
            this.state.username +
            " or password aren't in out database, please try again 🤯👾."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div className="login">
        <div className="loginForm">
          <div className="titleLogin">
            <div className="textWrap">
              <h2>Sign in </h2>
              <p>Stay updated on your professional world</p>
            </div>
          </div>
          <label className="inputLabel">Username/E-mail Address</label>
          <input
            className="formInput"
            onChange={(e) =>
              this.setState({
                ...this.state,
                username: e.target.value,
              })
            }
            value={this.state.username}
            type="text"
          ></input>
          <label className="inputLabel">Password</label>
          <input
            className="formInput"
            onChange={(e) =>
              this.setState({
                ...this.state,
                password: e.target.value,
              })
            }
            value={this.state.password}
            type="password"
          ></input>
          <button className="loginButton" onClick={this.logUser}>
            Sign in
          </button>
          <div className="linkWrap">
            <Link className="link" to="/register">
              Create an account
            </Link>
          </div>
        </div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            className: "",
            style: {
              margin: "40px",
              background: "#363636",
              color: "#fff",
              zIndex: 1,
            },
            duration: 5000,
            // Default options for specific types
          }}
        />

        <img
          draggable="false"
          className="logoIn"
          src="https://www.shareicon.net/data/512x512/2016/07/08/117028_media_512x512.png"
          alt=""
        />
      </div>
    );
  }
}
