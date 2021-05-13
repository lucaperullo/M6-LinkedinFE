import React from "react";
// import { Form } from "react-bootstrap";
import InputOption from "./InputOption";
import ImageIcon from "@material-ui/icons/Image";
import YouTubeIcon from "@material-ui/icons/YouTube";
import DateRangeIcon from "@material-ui/icons/DateRange";
import BallotIcon from "@material-ui/icons/Ballot";
import "./CreatePost.css";
import { Container, Row, Col } from "react-bootstrap";
import CreatePostsWithPhotoModal from "./CreatePostsWithPhotoModal";

class PostMaker extends React.Component {
  state = {
    modalShow: false,
    postObj: {
      text: "",
    },
    file: null,
  };

  uploadPost = async (e) => {
    e.preventDefault();
    try {
      // console.log(this.state.postObj);
      // console.log(this.props.userInfo);
      // console.log(this.props.userInfo._id, "EEEEEEEEEEEEEEEEEEE");
      // console.log(this.state.file, "EEEEEEEEEEEEEEEEEEE");
      const formData = new FormData();
      console.log(this.state.file, "AAAAAAAAAAAAAAAAAAAAAAA");
      if (this.state.file !== null) {
        formData.append("imagePost", this.state.file);
      }

      let response = await fetch(
        "http://localhost:5000/v1/posts/" + this.props.userInfo._id,
        {
          method: "POST",
          body: JSON.stringify(this.state.postObj),
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const postAdded = await response.json();
        const postId = postAdded._id;
        let request = await fetch(
          `http://localhost:5000/v1/posts/${postId}/user/${this.props.userInfo._id}`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (request.ok) {
          this.props.fetch();
          alert("Post added");
        } else {
          console.log("Error while adding post with pic");
        }
      } else {
        alert("Failed to add the post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // uploadPostImage = async (id) => {
  //   console.log(this.state.file);
  //   if (this.state.file === null) {
  //     console.log("No image or file added");
  //   } else {
  //     let image = new FormData();
  //     image.append("post", this.state.file);

  //     try {
  //       const response = await fetch("http://localhost:5000/v1/posts/" + id, {
  //         method: "POST",
  //         body: image,
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       });
  //       if (response.ok) {
  //         console.log("Post pic added");
  //         console.log(this.props.postId());
  //         this.props.fetch();
  //         this.setState({ file: null });
  //       } else {
  //         console.log("Error while adding the pic");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  render() {
    return (
      // <div style={{ minHeight: "10vh", backgroundColor: "white" }}>
      //   <Form
      //     onSubmit={(e) => {
      //       e.preventDefault();
      //     }}
      //   >
      //     <Form.Group>
      //       <Form.Control
      //         as="text"
      //         onChange={(e) =>
      //           this.setState({
      //             post: { ...this.state.post, text: e.target.value },
      //           })
      //         }
      //         value={this.state.post.text}
      //         placeholder="Start a post"
      //       />
      //     </Form.Group>
      //     <Form.Group>
      //       <Form.File
      //         id="postimage"
      //         onChange={(e) =>
      //           this.setState({
      //             file: e.target.files[0],
      //           })
      //         }
      //         label="Upload image"
      //       />
      //     </Form.Group>
      //     <button onClick={() => this.uploadPost()}>Post</button>
      //   </Form>
      // </div>
      <form onSubmit={this.uploadPost}>
        <Container className="start-post-wrapper">
          <Row>
            <Col xs={12} lg={2} className="picture-div">
              <img src={this.props.userInfo.image} alt="profile-pic" />
            </Col>
            <Col xs={12} lg={10} className="input-div">
              <div>
                <input
                  type="text"
                  id="text"
                  placeholder="Start a post"
                  value={this.state.postObj.text}
                  onChange={(e) =>
                    this.setState({
                      postObj: {
                        ...this.state.postObj,
                        [e.target.id]: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div></div>
              <button type="submit">Send</button>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="input-options-div">
              <div onClick={() => this.setState({ modalShow: true })}>
                <label htmlFor="file" className="mt-2">
                  <InputOption
                    Icon={ImageIcon}
                    title={"Photo"}
                    color="#7085F9"
                  />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => this.setState({ file: e.target.files[0] })}
                  style={{ display: "none" }}
                />
              </div>
              <InputOption Icon={YouTubeIcon} title={"Video"} color="#E7A33E" />
              <InputOption
                Icon={DateRangeIcon}
                title={"Event"}
                color="#C0CBCD"
              />
              <InputOption
                Icon={BallotIcon}
                title={"Write Article"}
                color="#7FC15E"
              />
            </Col>
          </Row>
          <CreatePostsWithPhotoModal
            file={this.state.file}
            userInfo={this.props.userInfo}
            show={this.state.modalShow}
            addPosts={this.uploadPost}
            onHide={() => this.setState({ modalShow: false })}
          />
        </Container>
      </form>
    );
  }
}
export default PostMaker;
