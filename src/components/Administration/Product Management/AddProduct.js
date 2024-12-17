import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Card, Container, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { Link } from "react-router-dom";
import { ImExit } from "react-icons/im";

function AddProduct(props) {
  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);
  const [Small, setSmall] = useState(0);
  const [Regular, setRegular] = useState(0);
  const [Large, setLarge] = useState(0);
  const [Medium, setMedium] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topping, setTopping] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [validated, setValidated] = useState(false);

  const categories = [
    { value: "Pizzas", label: "Pizza" },
    { value: "Pastas", label: "Mì Ý" },
    { value: "Appetizers", label: "Món khai vị" },
    { value: "Desserts", label: "Món tráng miệng" },
    { value: "Beverages", label: "Đồ uống" },
  ];

  const options = [
    { value: "List1", label: "Danh sách 1" },
    { value: "List2", label: "Danh sách 2" },
    { value: "List3", label: "Danh sách 3" },
  ];

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log("Selected image: ", e.target.files[0]);
  };

  const onChange = (e) => {
    const txt = document.getElementById([e.target.name]);
    txt.disabled = e.target.checked ? false : true;
    if (!txt.disabled) {
      txt.focus();
    }
  };

  const submitDetails = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if image is selected
    if (!image) {
      alert("Hãy chọn hình ảnh!");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("file", image);
    data.append("small", Small);
    data.append("medium", Medium);
    data.append("large", Large);
    data.append("regular", Regular);
    data.append("status", status);
    data.append("topping", topping); // Send topping value

    console.log("Form Data: ", data);

    axios
      .post("https://product-nezx.onrender.com/products/add", data)
      .then((res) => {
        console.log("Response: ", res);
        window.location = "/admin/view-products"; // Redirect after success
      })
      .catch((err) => {
        console.log("Error: ", err);
        alert("Có lỗi xảy ra khi thêm sản phẩm!");
      });
  };

  return (
    <div>
      <Container className={"pt-3"}>
        <Card className={"p-5 mb-3"}>
          <div className={"go-back-icon"}>
            <Link to={"/admin/view-products"}>
              <ImExit color={"black"} />
            </Link>
          </div>
          <div className="text-center mb-2">
            <h1 className="form-titles">THÊM SẢN PHẨM</h1>
            <hr className="divide" />
          </div>

          <Form noValidate validated={validated} onSubmit={submitDetails}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                required
                name="title"
                type="text"
                placeholder="Tên sản phẩm"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Form.Control.Feedback>Chính xác!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>

            <>
              <p>Thêm hình ảnh</p>
              <label htmlFor="fileUpload" className="customeFileUplad">
                Chọn tệp
              </label>
              <input
                className="form-control"
                type="file"
                id="fileUpload"
                onChange={handleImageChange}
                required
              />
              <span>(jpg, jpeg hoặc png)</span>
            </>

            <br />
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Check
                  type="checkbox"
                  label="Size nhỏ"
                  name="Small"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="text"
                  id="Small"
                  name="Small"
                  placeholder="Giá"
                  disabled={true}
                  onChange={(e) => {
                    setSmall(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Check
                  type="checkbox"
                  label="Size trung bình"
                  name="Medium"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="text"
                  id="Medium"
                  name="Medium"
                  placeholder="Giá"
                  disabled={true}
                  onChange={(e) => {
                    setMedium(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Check
                  type="checkbox"
                  label="Size lớn"
                  name="Large"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="text"
                  id="Large"
                  name="Large"
                  placeholder="Giá"
                  disabled={true}
                  onChange={(e) => {
                    setLarge(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Check
                  type="checkbox"
                  label="Size tiêu chuẩn"
                  name="Regular"
                  onChange={onChange}
                  checked={true}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="text"
                  id="Regular"
                  name="Regular"
                  placeholder="Giá"
                  onChange={(e) => {
                    setRegular(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Thêm topping (Tùy chọn)</Form.Label>
              </Form.Group>

              <div className="form-group">
                <Select
                  options={options}
                  onChange={(e) => {
                    setTopping(e.value);
                  }}
                />
              </div>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Tình trạng</Form.Label>
              </Form.Group>

              <div className="form-group">
                <Select
                  required
                  aria-label=".form-select-lg example"
                  options={categories}
                  onChange={(e) => {
                    setStatus(e.value);
                  }}
                />
              </div>
            </Row>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#d00000",
                color: "#FFF",
              }}
            >
              Thêm
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default AddProduct;
