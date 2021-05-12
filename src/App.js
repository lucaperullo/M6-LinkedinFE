import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, withRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Registration from "./components/Registrationpage";
import Login from "./components/LoginPage";
import React from "react";
import Feed from "./components/Feed";

class App extends React.Component {
  state = {
    bearer: "",
    data: {
      area: "",
      bio: "",
      email: "",
      image:
        "https://i.pinimg.com/736x/0c/45/2c/0c452ca459fcf28b3c3b5322d11cbc62.jpg",
      name: "",
      password: "",
      surname: "",
      title: "",
      username: "",
    },
  };
  getActualUser = async () => {
    try {
      let response = await fetch("http://localhost:5000/v1/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        let myProfile = await response.json();
        this.setState({ data: myProfile });
        console.log(this.state.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  updateBearer = (hi2) => {
    this.setState({ bearer: hi2 });
    if (this.state.bearer !== "") {
      this.props.history.push("/");
    }
  };
  access = () => {
    this.props.history.push("/");
  };
  updateState = (subState) => {
    this.setState({ data: subState });
  };
  componentDidMount() {
    this.getActualUser();
  }
  render() {
    return (
      <>
        <NavBar {...this.state.data} />
        <Route path="/user/:id" render={(props) => <Profile {...props} />} />

        <Route
          exact
          path="/"
          render={(props) => (
            <Feed {...props} state={this.state} fetch={this.getActualUser} />
          )}
        />
        <Route
          exact
          path="/register"
          render={(props) => (
            <Registration
              {...props}
              {...this.state}
              access={this.access}
              setState={this.updateState}
              setState2={this.updateBearer}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login access={this.access} {...props} />}
        />
      </>
    );
  }
}

export default withRouter(App);
