import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Card, Container, Form } from "react-bootstrap";
import "../../../stylesheets/formTitle.css";
import "../../../stylesheets/AddUser.css";
import { ImExit } from "react-icons/all";
import { Link } from "react-router-dom";
import ReactNotifications from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function AddUser(props) {
  const [imgPreview, setimgPreview] = useState(null);
  const [error, setError] = useState(false);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const [Branch, setBranch] = useState("Tất cả chi nhánh");
  const [Profile, setProfile] = useState("");

  const [Notification, setNotification] = useState("");

  const handleImageChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setimgPreview(reader.result);
      };
      setProfile(e.target.files[0]);
      reader.readAsDataURL(selected);
    } else {
      setError(true);
      alert("Tệp không được hỗ trợ");
    }
  };

  function sendData(e) {
    console.log(
      FirstName,
      LastName,
      Email,
      Contact,
      Password,
      Role,
      Branch,
      Profile
    );
    e.preventDefault();
    const formData = new FormData();
    formData.append("FirstName", FirstName);
    formData.append("LastName", LastName);
    formData.append("Email", Email);
    formData.append("Contact", Contact);
    formData.append("Password", Password);
    formData.append("Role", Role);
    formData.append("Branch", Branch);
    formData.append("Profile", Profile);

    axios
      .post("https://user-9iyb.onrender.com/user-management/add", formData)
      .then((response) => {
        if (response.data.Message === "Success") {
          localStorage.setItem("user", "Admin");
          NotificationManager.success("Thành công", "Đã thêm người dùng mới");
          setTimeout(
            function () {
              window.location.href = "/admin/um/view-users";
            }.bind(this),
            1000
          );
        } else {
          NotificationManager.warning("Cảnh báo", response.data.Message, 3000);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <Container className={"pt-3"}>
        <NotificationContainer />
        <Card className={"p-5 mb-3"}>
          <div className={"go-back-icon"}>
            <Link to={"/admin/um/view-users"}>
              <ImExit color={"black"} />
            </Link>
          </div>
          <div className="text-center mb-2">
            <h1 className="form-titles ">THÊM NGƯỜI DÙNG</h1>
            <hr className="divide" />
          </div>

          <Form onSubmit={sendData}>
            <Form.Group className="mb-3" controlId="FirstName">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                name="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                type="text"
                placeholder="Tên"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="LastName">
              <Form.Label>Họ</Form.Label>
              <Form.Control
                name="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                placeholder="Họ"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="sandaruwan@gmail.com"
              />
            </Form.Group>

            <div className="form-group">
              <Form.Label>Vai trò</Form.Label>
              <select
                class="form-select form-select-lg mb-3 dropdown "
                aria-label=".form-select-lg example"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option selected>Chọn Vai trò</option>
                <option value="Admin">Quản trị viên</option>
                <option value="BranchManager">Quản lý chi nhánh</option>
                <option value="ProductManager">Quản lý sản phẩm</option>
                <option value="DeliveryManager">Quản lý giao hàng</option>
              </select>
            </div>

            {Role !== "Admin" && (
              <div className="form-group">
                <Form.Label>Chi nhánh</Form.Label>
                <select
                  class="form-select form-select-lg mb-3 dropdown "
                  aria-label=".form-select-lg example"
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                >
                  <option selected>Chọn Chi nhánh</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Galle">Galle</option>
                  <option value="Kurunegala">Kurunegala</option>
                </select>
              </div>
            )}

            <Form.Group className="mb-3" controlId="Contact">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                name="Contact"
                onChange={(e) => {
                  setContact(e.target.value);
                }}
                maxLength="10"
                type="number"
                placeholder="+97778341425"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Contact">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                name="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                placeholder="**********"
              />
            </Form.Group>

            {error && <p className="errorMsg">Tệp không được hỗ trợ</p>}
            <div
              className="imgPreview"
              style={{
                background: imgPreview
                  ? `url("${imgPreview}") no-repeat center/cover`
                  : "#131313",
                height: 300,
                width: 300,
              }}
            >
              {!imgPreview && (
                <>
                  <p>Thêm ảnh</p>
                  <label htmlFor="fileUpload" className="customeFileUplad">
                    Chọn tệp
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    onChange={handleImageChange}
                  />
                  <span>(jpg, jpeg hoặc png)</span>
                </>
              )}
            </div>
            {imgPreview && (
              <button onClick={() => setimgPreview(null)}>Xóa ảnh</button>
            )}
            <br />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#d00000", color: "#FFF" }}
            >
              Thêm Người Dùng
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default AddUser;
