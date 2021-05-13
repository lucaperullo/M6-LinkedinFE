import React from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import Adv from "./Adv";
import PostMaker from "./PostMaker";
import ContentLoader, { Facebook } from "react-content-loader";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import "./styles/feed.css";

import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import { FacebookSelector, FacebookCounter } from "@charkour/react-reactions";

class Feed extends React.Component {
  state = {
    filtered: null,
    show: false,
    posts: [],
    body: {
      text: "",
      img: "https://cdn.ilpost.it/wp-content/uploads/2019/10/ilpost-anteprima-colore.png?x72029",
      _id: "",
    },
  };
  MyFacebookLoader = () => <Facebook />;
  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/register");
  };
  fetchDataAndShowModal = (id) => {
    this.setState({ _id: id });
    this.handleShow();
    this.getPosts(id);
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  onHide = () => {
    this.setState({ show: false });
    this.setState({ body: {} });
  };
  // https: //striveschool-api.herokuapp.com/api/posts/
  editPost = async (id) => {
    try {
      let response = await fetch(`http://localhost:5000/v1/posts/` + id, {
        method: "PUT",
        body: JSON.stringify(this.state.body),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Your post was edited successfully😎");
        this.getPosts();
        this.setState({
          body: {},
        });
      } else {
        toast.error("You cannot edit other people posts!🧐");
      }
    } catch (error) {
      console.log(error);
    }
  };
  deletePost = async (id) => {
    try {
      let response = await fetch(`http://localhost:5000/v1/posts/` + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        toast("Post deleted");
        this.getPosts();
      } else {
        toast.error(
          "What are you trying to do?!🤌🏼 You cannot delete other people posts 🤦🏼 "
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  getPosts = async (id) => {
    if (id) {
      try {
        let response = await fetch("http://localhost:5000/v1/posts/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          toast("Initializing content..", {
            icon: "⏳",
          });
          let data = await response.json();
          this.setState({
            body: data,
          });
          // console.log(data);
          console.log(this.state.body);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let response = await fetch("http://localhost:5000/v1/posts", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          toast("Initializing content..", {
            icon: "⏳",
          });
          let data = await response.json();
          console.log(data);

          this.setState({
            filtered: data.filter(
              (post) => post.username === this.props.state.data.username
            ),
          });
          this.setState({
            posts: data
              .filter((post) => post.username)
              .slice(-20)
              .reverse(),
          });
          // console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  componentDidMount() {
    this.getPosts();
    this.props.fetch();
  }
  postsId = () => {
    return this.state.posts[0]._id;
  };

  render() {
    return (
      <>
        <Container fluid>
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
          <Row style={{ marginTop: "5vh", justifyContent: "space-evenly" }}>
            <Col xs={2}>
              <Card className="sidebar">
                <Card.Img
                  draggable="false"
                  variant="top"
                  src="https://coverfiles.alphacoders.com/372/37275.jpg"
                />
                <div className="proPicContainer">
                  <img
                    draggable="false"
                    onClick={() => this.props.history.push("/user/me")}
                    className="profPic"
                    src={this.props.state.data.image}
                  />
                  <h6>
                    {this.props.state.data.name} {this.props.state.data.surname}
                  </h6>
                </div>
                <Card.Body>
                  <Card.Text>
                    <div className="sidebarInfo">
                      <br />
                      <p className="text-muted">
                        {this.props.state.data.title}
                      </p>

                      <div>
                        <hr style={{ width: "auto" }} />
                        <strong className="text-muted">Connections</strong>
                        <p>Grow your connections</p>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <PostMaker fetch={this.getPosts} postId={this.postsId} />

              {!this.state.posts.length > 0 ? (
                <Container>
                  <div style={{ marginTop: "50px", marginBottom: "50px" }}>
                    {this.MyFacebookLoader()}
                  </div>
                  <div style={{ marginBottom: "50px" }}>
                    {this.MyFacebookLoader()}
                  </div>
                  <div style={{ marginBottom: "50px" }}>
                    {this.MyFacebookLoader()}
                  </div>
                  <div style={{ marginBottom: "50px" }}>
                    {this.MyFacebookLoader()}
                  </div>
                  <div style={{ marginBottom: "50px" }}>
                    {this.MyFacebookLoader()}
                  </div>
                </Container>
              ) : (
                this.state.posts
                  .filter((post) => {
                    return post.username === this.props.state.data.username;
                  })
                  .map((post) => {
                    return (
                      <div className="postCard">
                        <p className="postTime">
                          {moment(post.createdAt).fromNow()}
                        </p>
                        <div className="options">
                          <BsThreeDotsVertical />
                          <MdDeleteSweep
                            onClick={() => this.deletePost(post._id)}
                            className="optionDel"
                          />
                          <RiEditBoxFill
                            onClick={() => this.fetchDataAndShowModal(post._id)}
                            className="optionEdit"
                          />
                        </div>
                        <div className="rope">
                          <img
                            draggable="false"
                            className="avatar"
                            src={
                              post.user_picture
                                ? post.user_picture
                                : "https://www.sunchem.nl/wp-content/uploads/H_About/Teamphotos/profile-placeholder.jpg"
                            }
                          />
                          <div className="userTag">
                            <h4>{post.username} </h4>
                            <p className="text-muted tag">
                              {"@" + post.username}
                            </p>
                          </div>
                        </div>
                        <p
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {post.text && post.text}
                        </p>
                        <br />
                        {post.img && (
                          <img
                            className="postImage"
                            draggable="false"
                            alt={post._id}
                            src={post.img}
                            height={200}
                          />
                        )}
                        <hr />
                        <div className="rope">
                          <FacebookCounter />
                          {/* <FacebookSelector /> */}
                        </div>
                      </div>
                    );
                  })
              )}
              {!this.state.posts.length > 0 ? (
                <Container>
                  <div style={{ marginTop: "50px", marginBottom: "50px" }}>
                    {this.MyFacebookLoader()}
                  </div>
                  <div style={{ marginBottom: "50px" }}>
                    {this.MyFacebookLoader()}
                  </div>
                  <div style={{ marginBottom: "50px" }}>
                    {this.MyFacebookLoader()}
                  </div>
                  <div style={{ marginBottom: "50px" }}>
                    {this.MyFacebookLoader()}
                  </div>
                  <div style={{ marginBottom: "50px" }}>
                    {this.MyFacebookLoader()}
                  </div>
                </Container>
              ) : (
                this.state.posts
                  .filter((post) => {
                    return post.username !== this.props.state.data.username;
                  })
                  .map((post) => {
                    return (
                      <div className="postCard">
                        <p className="postTime">
                          {moment(post.createdAt).fromNow()}
                        </p>

                        <div className="rope">
                          <img
                            draggable="false"
                            className="avatar"
                            src={
                              post.user_picture
                                ? post.user_picture
                                : "https://www.sunchem.nl/wp-content/uploads/H_About/Teamphotos/profile-placeholder.jpg"
                            }
                          />
                          <div className="userTag">
                            <h4>{post.username} </h4>
                            <p className="text-muted tag">
                              {"@" + post.username}
                            </p>
                          </div>
                        </div>
                        <p
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {post.text && post.text}
                        </p>
                        <br />
                        {post.img && (
                          <img
                            className="postImage"
                            draggable="false"
                            alt={post._id}
                            src={post.img}
                            height={200}
                          />
                        )}
                        <hr />
                        <div className="rope">
                          <FacebookCounter />
                          {/* <FacebookSelector /> */}
                        </div>
                      </div>
                    );
                  })
              )}
            </Col>

            <Col className="d-none d-xl-block" xs={3}>
              <Adv />
            </Col>
          </Row>
          <Modal show={this.state.show}>
            <Modal.Header closeButton={this.onHide}>
              <Modal.Title>
                {this.state.body._id ? "Edit your post!" : <div></div>}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.editPost();
                }}
              >
                {/* <Form.Group>
                  <Form.Label>img</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        body: {
                          ...this.state.body,
                          img: e.target.value,
                        },
                      })
                    }
                    value={this.state.body.img}
                    as="url"
                  />
                </Form.Group> */}
                <Form.Group>
                  <Form.Label>Your post</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        body: { ...this.state.body, text: e.target.value },
                      })
                    }
                    value={this.state.body.text}
                    type="text"
                    placeholder="your previous post"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.onHide()}>
                Close
              </Button>

              <Button
                variant="primary"
                onClick={() => this.editPost(this.state.body._id)}
              >
                Edit
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </>
    );
  }
}
export default Feed;
