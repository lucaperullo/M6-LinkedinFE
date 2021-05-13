import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export default class CreatePostsWithPhotoModal extends Component {
  render() {
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title className="font-weight-normal">
            Edit your photo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center my-5 text-primary font-weight-normal">
            <p>
              {this.props.file ? this.props.file.name : "Select image to share"}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            className="rounded-pill"
            onClick={() => this.props.onHide()}
          >
            Cancel
          </Button>
          <Button
            variant="light"
            className="rounded-pill bg-info"
            onClick={() => this.props.onHide()}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
