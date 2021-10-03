import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const PreviewModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={props.props}
          style={{
            width: "50%",
            marginLeft: "180px",
          }}
          alt="preview"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="dark">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ManageMuse = () => {
  const [templates, setTemplates] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const preload = async () => {
    const response = await axios.get(
      "https://vlz6y4dxq7.execute-api.ap-south-1.amazonaws.com/latest/muse/admintemplates/all"
    );

    setTemplates(response.data);
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="row">
        <div className="col-12">
          <Container
            style={{
              backgroundColor: "#F8F8F9",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
              borderRadius: "10px",
              textAlign: "center",
              marginTop: "30px",
              fontFamily: "poppins",
            }}
          >
            <h1>Preview</h1>
            <h1>Project Name</h1>
            <h1>Template Type</h1>
            <h1>Edit</h1>
          </Container>

          <Container
            style={{
              backgroundColor: "#F8F8F9",
              padding: "30px",
              borderRadius: "10px",
              height: "70vh",
              overflow: "scroll",
            }}
          >
            {templates.map((template, index) => {
              let image = JSON.parse(template.template);

              return (
                <Container
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                    backgroundColor: "#F8F8F9",
                  }}
                >
                  <img
                    src={image[0].image}
                    style={{ width: "5%" }}
                    alt={template.projectName}
                    onClick={() => setModalShow(true)}
                  />

                  <PreviewModal
                    props={image[0].image}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />

                  <h3>{template.projectName}</h3>
                  <h3>{template.templateType}</h3>

                  <Link
                    to={{
                      pathname: `/update/template/${template._id}`,
                      state: template,
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0207 5.82839L15.8491 2.99996L20.7988 7.94971L17.9704 10.7781M13.0207 5.82839L3.41405 15.435C3.22652 15.6225 3.12116 15.8769 3.12116 16.1421V20.6776H7.65669C7.92191 20.6776 8.17626 20.5723 8.3638 20.3847L17.9704 10.7781M13.0207 5.82839L17.9704 10.7781"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </Container>
              );
            })}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ManageMuse;
