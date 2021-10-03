import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Col, Button, Container } from "react-bootstrap";
import Navigation from "./Navigation";
import { updateTemplate } from "./helper/updateTemplate";

const UpdateTemplate = ({ match }) => {
  const location = useLocation();
  const [values, setValues] = useState({
    image: location.state.template,
    _id: match.params.templateId,
    projectName: location.state.projectName,
    description: location.state.description,
    category: location.state.category,
    tags: location.state.tags.toString(),
    prime: location.state.prime,
    aspectRatio: location.state.aspectRatio,
    templateType: location.state.templateType,
    colors: location.state.colors,
    region: location.state.region,
    error: "",
    success: "",
  });

  if (location.state === "") {
    setValues({ ...values, error: "No data found" });
  }

  const {
    image,
    projectName,
    description,
    category,
    tags,
    prime,
    aspectRatio,
    templateType,
    region,
    colors,
    error,
    success,
  } = values;
  let previewimage = JSON.parse(image);

  const onSubmit = (event) => {
    event.preventDefault();

    let tagsArray = tags.split(",");
    setValues({
      ...values,
      error: "",
      success: "",
    });

    const valuesObject = {
      _id: match.params.templateId,
      projectName: projectName,
      description: description,
      category: category,
      tags: tagsArray,
      prime: prime,
      aspectRatio: aspectRatio,
      templateType: templateType,
      colors: colors,
      region: region,
    };

    try {
      updateTemplate(valuesObject);
      setValues({
        ...values,
        _id: "",
        projectName: "",
        description: "",
        category: "",
        tags: [],
        prime: "",
        aspectRatio: "",
        templateType: "",
        colors: "",
        error: "",
        success: "Template updated successfully.",
      });
    } catch (error) {
      setValues({
        ...values,
        error: "Failed to update template.",
      });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setValues({ ...values, [event.target.name]: value });
  };

  const handleCheck = () => {
    setValues({
      ...values,
      prime: !location.state.prime,
    });
  };

  const editTemplateForm = () => (
    <Container
      className="formContainer"
      style={{ marginTop: "30px", width: "40%" }}
    >
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Preview</Form.Label>
            <br />
            <img
              src={previewimage[0].image}
              alt="preview"
              style={{ width: "30%" }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              placeholder="Project Name"
              onChange={handleChange}
              name="projectName"
              value={projectName}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Category</Form.Label>
            <Form.Control
              placeholder="Category"
              onChange={handleChange}
              name="category"
              value={category}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Colors</Form.Label>
            <Form.Control
              placeholder="Colors"
              onChange={handleChange}
              name="colors"
              value={colors}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Description"
              onChange={handleChange}
              name="description"
              value={description}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Check
              type="checkbox"
              label="Prime"
              name="prime"
              onChange={handleCheck}
              defaultChecked={prime}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Region</Form.Label>
            <Form.Control
              placeholder="Region"
              onChange={handleChange}
              name="region"
              value={region}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Template Type</Form.Label>
            <Form.Control
              placeholder="Template Type"
              onChange={handleChange}
              name="templateType"
              value={templateType}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Aspect Ratio</Form.Label>
            <Form.Control
              placeholder="Aspect Ratio"
              onChange={handleChange}
              name="aspectRatio"
              value={aspectRatio}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Tags</Form.Label>
            <Form.Control
              placeholder="Tags"
              onChange={handleChange}
              name="tags"
              value={tags}
            />
          </Form.Group>
        </Form.Row>
        <div className="d-grid gap-2">
          <Button
            variant="dark"
            type="submit"
            style={{ marginTop: "20px" }}
            onClick={onSubmit}
            size="lg"
          >
            Update Template
          </Button>
        </div>
      </Form>
    </Container>
  );

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{
        display: success ? "" : "none",
        width: "50%",
      }}
    >
      <h4 style={{ textAlign: "center" }}>{success}</h4>
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none", width: "50%" }}
    >
      <h4>{error}</h4>
    </div>
  );

  return (
    <div>
      <Navigation />
      <Container
        style={{
          backgroundColor: "#F8F8F9",
          display: "flex",
          justifyContent: "center",
          marginBottom: "5px",
          borderRadius: "10px",
          alignItems: "center",
          marginTop: "30px",
          fontFamily: "poppins",
          width: "50%",
          height: "80px",
        }}
      >
        <h1>Edit Template</h1>
      </Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {success ? successMessage() : ""}
        {error ? errorMessage() : ""}
      </div>
      {editTemplateForm()}
    </div>
  );
};

export default UpdateTemplate;
