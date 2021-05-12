import React from "react";
import { Form } from "react-bootstrap";

class PostMaker extends React.Component {
  state = {
    post: {
      username: "",
      text: "",
      img: "",
    },
  };

  uploadPost = async () => {
    try {
      let response = await fetch("http://localhost:5000/v1/posts", {
        method: "POST",
        body: JSON.stringify(this.state.post),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        await this.props.fetch();
        alert("Post added");
        // this.uploadImage();

        console.log(this.props.postId());
        this.uploadPostImage(this.props.postId());
        this.setState({ post: { text: "" } });
        console.log(this.state.post);
      } else {
        alert("Failed to add the post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  uploadPostImage = async (id) => {
    console.log(this.state.file);
    if (this.state.file === null) {
      console.log("No image or file added");
    } else {
      let image = new FormData();
      image.append("post", this.state.file);

      try {
        const response = await fetch("http://localhost:5000/v1/posts/" + id, {
          method: "POST",
          body: image,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          console.log("Post pic added");
          console.log(this.props.postId());
          this.props.fetch();
          this.setState({ file: null });
        } else {
          console.log("Error while adding the pic");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    return (
      <div style={{ minHeight: "10vh", backgroundColor: "white" }}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Group controlId="textarea">
            <Form.Control
              as="textarea"
              onChange={(e) =>
                this.setState({
                  post: { ...this.state.post, text: e.target.value },
                })
              }
              value={this.state.post.text}
              placeholder="Start a post"
              rows={1}
            />
          </Form.Group>
          <Form.Group>
            <Form.File
              id="postimage"
              onChange={(e) =>
                this.setState({
                  file: e.target.files[0],
                })
              }
              label="Upload image"
            />
          </Form.Group>
          <button onClick={() => this.uploadPost()}>Post</button>
        </Form>
      </div>
    );
  }
}
export default PostMaker;
