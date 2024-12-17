import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Card, Container, Form, Col, Row } from "react-bootstrap";
import ReactNotifications from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

let myCurrentDate = new Date();
let date = myCurrentDate.getDate();
let month = myCurrentDate.getMonth() + 1;
let year = myCurrentDate.getFullYear();
var hours = myCurrentDate.getHours();
var ampm = hours >= 12 ? 'pm' : 'am';
let time =  myCurrentDate.getHours() + ':' + myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds() +'.'+ ampm;
let Dates = year + " / " + month + " / " + date;

//Login function
function Login(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Notification, setNotification] = useState("");

  function Authentication(e) {
    e.preventDefault();

    const data = {
      Email,
      Password,
      Dates,
      time
    };

    axios
      .post("https://user-9iyb.onrender.com/auth/login", data)
      .then((response) => {
        //Check user types and display notifications
        if (response.data.users.Role === "Admin") {
          localStorage.setItem("user", "Admin");
          NotificationManager.success("Thành công", "Đăng nhập thành công");
          setTimeout(
            function () {
              window.location.href = "/admin/dashboard";
            }.bind(this),
            1000
          );
        } else if (response.data.users.Role === "User") {
          localStorage.setItem("user", "User");
          localStorage.setItem("userid", response.data.users.Email);
          localStorage.setItem("Email", response.data.users.Email);
          localStorage.setItem("userName", response.data.users.FirstName);
          NotificationManager.success("Thành công", "Đăng nhập thành công");
          setTimeout(
            function () {
              window.location.href = "/";
            }.bind(this),
            1000
          );
        } else if (response.data.users.Role === "BranchManager") {
          localStorage.setItem("user", response.data.users.Role);
          localStorage.setItem("branch", response.data.users.Branch);
          NotificationManager.success("Thành công", "Đăng nhập thành công");
          setTimeout(
            function () {
              window.location.href = "/admin/em/view-employees";
            }.bind(this),
            1000
          );
        } else if (response.data.users.Role === "DeliveryManager") {
          localStorage.setItem("user", response.data.users.Role);
          localStorage.setItem("branch", response.data.users.Branch);
          NotificationManager.success("Thành công", "Đăng nhập thành công");
          setTimeout(
            function () {
              window.location.href = "/admin/delivery";
            }.bind(this),
            1000
          );
        } else {
          NotificationManager.info("Đăng nhập không hợp lệ");
          setTimeout(
            function () {
              window.location.href = "/";
            }.bind(this),
            1000
          );
        }
      })
      .catch((err) => {
        NotificationManager.warning("Cảnh báo", "Thông tin đăng nhập không hợp lệ", 3000);
      });
  }

  return (
    <div>
      <div className="d-flex gap-2">
        <div>
          <img
            src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800"
            alt="Paris"
            width="450"
            height="500"
          />
        </div>
        <div>
          <NotificationContainer />
          <div className={"p-5 mb-3"}>
            <Row>
              <div className="text-center mb-2">
                <h1 className="form-titles ">Đăng Nhập</h1>
                <hr className="divide" />
              </div>
              {/*<Form onSubmit={Authentication}>*/}
              <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={"mt-3 mb-3"}
              onClick={Authentication}
              style={{ backgroundColor: "#c92e31", color: "#FFF" }}
            >
              Đăng Nhập
            </Button>
            {/*</Form>   {/*</Form>*/}
            <span
              style={{
                textTransform: "none",
                color: "#030000",
                paddingLeft: 100,
              }}
            >
              Bạn chưa có tài khoản?{" "}
              <a
                style={{
                  textTransform: "none",
                  color: "#c92e31",
                  cursor: "pointer",
                }}
                onClick={() => props.fun("")}
              >
                Đăng ký
              </a>
            </span>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default Login;
