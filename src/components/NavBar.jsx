import React from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles/navbar.css";
export default class NavBar extends React.Component {
  render() {
    if (
      window.location.pathname.includes("register") ||
      window.location.pathname.includes("login")
    ) {
      return <div></div>;
    }
    return (
      <Navbar style={{ backgroundColor: "white" }} expand="lg" className="py-0">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              draggable="false"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Linkedin_icon.svg/240px-Linkedin_icon.svg.png"
              alt="LinkInIcon"
              width="34"
            />
          </Navbar.Brand>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link href="#mynetwork">My Network</Nav.Link>
              <Nav.Link href="#jobs">Jobs</Nav.Link>
              <Nav.Link href="#messaging">Messaging</Nav.Link>
              <Nav.Link href="#notifications">Notifications</Nav.Link>
              <NavDropdown title="Me" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/user/me">
                  {this.props.name + " " + this.props.surname}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <h6 className="px-4 m-0 py-1 font-weight-bold">Account</h6>
                <NavDropdown.Item href="#action/3.2">
                  Settings & Privacy
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Help</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Language</NavDropdown.Item>
                <NavDropdown.Divider />
                <h6 className="px-4 m-0 py-1 font-weight-bold">Manage</h6>
                <NavDropdown.Item href="#action/3.5">
                  Posts & Activity
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.6">
                  Job Posting Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={Link}
                  to="/login"
                  onClick={() => localStorage.clear()}
                >
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Work"
                id="basic-nav-dropdown"
                className="border-left"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
