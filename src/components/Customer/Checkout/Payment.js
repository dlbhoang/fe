import React, { useEffect, useState } from "react";
import { Card, Container, Form, Table, Row, Button } from "react-bootstrap";
import "../../../stylesheets/payment.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

let myCurrentDate = new Date();
let date = myCurrentDate.getDate();
let month = myCurrentDate.getMonth() + 1;
let year = myCurrentDate.getFullYear();
let time = myCurrentDate.getHours() + ":" + myCurrentDate.getMinutes();
let fullDate = year + " / " + month + " / " + date;

export default function Payment() {
  const location = useLocation();
  const [products, setProducts] = useState(location.state.product);
  const [Total, setTotal] = useState(location.state.total);

  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");

  useEffect(() => {
    setProducts(location.state.product || []);
  }, [location.state.product]);

  function handleCashPayment() {
    const transaction = Math.floor(100000 + Math.random() * 1000000);
    const Email = localStorage.getItem("Email");
    const UserName = localStorage.getItem("userName");

    const data = {
      Name,
      Phone,
      Address,
      Total,
      transaction,
      time,
      fullDate,
      Email,
      UserName,
    };

    axios
      .post("https://payment-6mwu.onrender.com/payment/cash", data) // Adjust your API endpoint for cash payments
      .then((response) => {
        if (response.data.Message === "Error") {
          NotificationManager.warning(
            "Cảnh báo",
            "Vui lòng nhập thông tin đầy đủ và chính xác",
            3000
          );
        } else if (response.data.Message === "Success") {
          NotificationManager.success(
            "Thành công",
            "Đơn hàng của bạn đã được đặt thành công!",
            3000
          );
          setTimeout(() => {
            window.location.href = "/"; // Redirect after success
          }, 3000);
        }
      })
      .catch((err) => {
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
        console.error(err);
      });
  }

  return (
    <Container className={"pt-3"}>
      <Card className={"p-5 mb-3"}>
        <NotificationContainer />
        <div className="card-body">
          <div className="row">
            <div className="col-md-7">
              <div className="left border">
                <Form>
                  <Form.Group controlId="formName">
                    <Form.Label>Tên người nhận:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên của bạn"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPhone">
                    <Form.Label>Số điện thoại:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập số điện thoại"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formAddress">
                    <Form.Label>Địa chỉ giao hàng:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Nhập địa chỉ"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>

            <div className="col-md-5">
              <div className="right border">
                <h3 className="header">Tóm tắt đơn hàng</h3>
                <br />
                {products.map((item, index) => (
                  <Row className="row item" key={index}>
                    <div className="col-4 align-self-center">
                      <img
                        className="img-fluid"
                        style={{ width: "80px", height: "80px" }}
                        src={`http://localhost:3000/Profile/${item.image}`}
                        alt="Product"
                      />
                    </div>
                    <div className="col-8">
                      <Form.Label className="row">
                        <b>Rs.{item.price}</b>
                      </Form.Label>
                      <Form.Label
                        style={{ marginLeft: "10px" }}
                        className="row text-muted"
                      >
                        {item.title}
                      </Form.Label>
                      <Form.Label
                        style={{ marginLeft: "10px" }}
                        className="row"
                      >
                        Số lượng: {item.qty}
                      </Form.Label>
                    </div>
                  </Row>
                ))}
                <hr />
                <br />
                <Row className="row lower">
                  <Form.Label className="col text-left">Tạm tính</Form.Label>
                  <Form.Label className="col text-right">{Total}</Form.Label>
                </Row>
                <Row className="row lower">
                  <Form.Label className="col text-left">Vận chuyển</Form.Label>
                  <Form.Label className="col text-right">Miễn phí</Form.Label>
                </Row>
                <Row className="row lower">
                  <Form.Label className="col text-left">
                    <b>Tổng cộng</b>
                  </Form.Label>
                  <Form.Label className="col text-right">
                    <b>{Total}</b>
                  </Form.Label>
                </Row>
                <Button
                  onClick={handleCashPayment}
                  className="placeOrder"
                  style={{ background: "#b80c00" }}
                >
                  Thanh toán tiền mặt
                </Button>
                <Form.Label className="text-muted text-center">
                  Vận chuyển & Đổi trả miễn phí
                </Form.Label>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}
