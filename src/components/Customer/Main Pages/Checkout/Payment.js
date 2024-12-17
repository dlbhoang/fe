import React, { useEffect, useState } from "react";
import { Card, Container, Form, Row, Button } from "react-bootstrap";
import "../../../../stylesheets/payment.css";
import Paypal from "./Paypal";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import DatePicker from 'react-datepicker';
import TextField from '@material-ui/core/TextField';

let myCurrentDate = new Date();
let date = myCurrentDate.getDate();
let month = myCurrentDate.getMonth() + 1;
let year = myCurrentDate.getFullYear();
var hours = myCurrentDate.getHours();
var ampm = hours >= 12 ? 'pm' : 'am';
let time = myCurrentDate.getHours() + ':' + myCurrentDate.getMinutes() + ':' + myCurrentDate.getSeconds() + '.' + ampm;
let fullDate = year + " / " + month + " / " + date;
let order_date = new Date().toLocaleString();

export default function Payment() {
  const location = useLocation();
  const Total = location.state.delivery.total;
  const deliveryCode = location.state.delivery_code;
  const fullname = location.state.delivery.fullname;
  const email = location.state.delivery.email;
  const address = location.state.delivery.address;
  const state = location.state.delivery.state;

  const [product, setProduct] = useState(location.state.product);

  const [button, setButton] = useState(true);
  const [Name, setName] = useState("");
  const [CardNumber, setCardNumber] = useState("");
  const [Date, setDate] = useState();
  const [Cvv, setCvv] = useState("");
  const [ProductID, setProductID] = useState("");
  const [Title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [Qty, setQty] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8070/carts/${localStorage.getItem("userid")}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("err=>" + err);
      });

    product.map((item) => {
      setProductID(item._id);
      setTitle(item.title);
      setImage(item.image);
      setQty(item.qty);
    });
  }, [3]);

  function makePayment() {
    const newOrder = {
      products: products,
      total_price: Total,
      order_date: order_date,
      status: "new",
      user: localStorage.getItem("userid"),
      delivery_code: deliveryCode,
    };
    var transaction = Math.floor(100000 + Math.random() * 1000000);
    var Email = localStorage.getItem("Email");
    var UserName = localStorage.getItem("userName");
    const data = {
      Name,
      CardNumber,
      Date,
      Cvv,
      Title,
      Image,
      Qty,
      Total,
      transaction,
      time,
      fullDate,
      Email,
      UserName,
      ProductID,
    };

    axios
      .post("https://payment-6mwu.onrender.com/payment/add", data)
      .then((response) => {
        if (response.data.Message == "Error") {
          NotificationManager.warning(
            "Cảnh báo",
            "Vui lòng nhập thông tin thanh toán chính xác",
            3000
          );
        } else if (response.data.Message == "Success") {
          axios
            .post("https://oder.onrender.com/orders/add", newOrder)
            .then((res) => {
              axios
                .delete(
                  `https://oder.onrender.com/carts/delete/all/${localStorage.getItem(
                    "userid"
                  )}`
                )
                .then((res) => {
                  window.location.href = "/";
                })
                .catch((err) => {
                  console.log("err=>" + err);
                });
            })
            .catch((err) => {
              console.log("err=>" + err);
            });
        }
      })
      .catch((err) => {
        alert(err);
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
                <div className="row">
                  <div className="icons">
                    <img
                      src="https://img.icons8.com/color/48/000000/visa.png"
                      alt="Visa"
                    />
                    <img
                      src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                      alt="Mastercard"
                    />
                    <img
                      src="https://img.icons8.com/color/48/000000/maestro.png"
                      alt="Maestro"
                    />
                  </div>
                </div>
                <Form>
                  <br />
                  <Form.Group controlId="formGridEmail">
                    <span>Họ và tên chủ thẻ:</span>
                    <Form.Control
                      className="CardHName"
                      type="text"
                      placeholder="Họ và tên chủ thẻ"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGridPassword">
                    <span>Số thẻ:</span>
                    <Form.Control
                      maxLength="16"
                      className="CardHName"
                      type="text"
                      placeholder="Số thẻ"
                      onChange={(e) => {
                        setCardNumber(e.target.value);
                      }}
                    />
                    <br />
                  </Form.Group>
                  <Row className="mb-3">
                    <Form.Label className="col-4">
                      <span>Ngày hết hạn:</span>
                      <TextField
                        style={{ paddingTop: "8px" }}
                        className="CVV"
                        id="date"
                        type="date"
                        defaultValue="2021-08-24"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </Form.Label>
                    <Form.Label className="col-4">
                      <span>CVV:</span>
                      <Form.Control
                        type="number"
                        maxLength="3"
                        className="CVV"
                        placeholder="CVV"
                        onChange={(e) => {
                          setCvv(e.target.value);
                        }}
                      />
                    </Form.Label>
                  </Row>
                </Form>
                <Paypal />
              </div>
            </div>
            <div className="col-md-5">
              <div className="right border">
                <h3 className="header">Tóm tắt đơn hàng</h3>
                <br />
                {products.map((item, index) => (
                  <Row className="row item" key={index}>
                    <div className="col-4 align-self-center">
                      <br />
                      <img
                        className="img-fluid"
                        style={{ width: "120px", height: "100px" }}
                        src={`http://localhost:3000/Profile/${item.image}`}
                        alt={item.title}
                      />
                    </div>
                    <div className="col-8">
                      <br />
                      <Form.Label className="row">
                        <b>Rs.{item.price}</b>
                      </Form.Label>
                      <Form.Label style={{ marginLeft: "10px" }} className="row text-muted">
                        {item.title}
                      </Form.Label>
                      <Form.Label style={{ marginLeft: "10px" }} className="row">
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
                    <b>Tổng số tiền phải trả</b>
                  </Form.Label>
                  <Form.Label className="col text-right">
                    <b>{Total}</b>
                  </Form.Label>
                </Row>
                <Row className="row lower">
                  <div className="col text-left"></div>
                </Row>{" "}
                <Button
                  onClick={makePayment}
                  className="placeOrder"
                  style={{ background: "#b80c00", marginTop: "85px", height: "55px" }}
                >
                  Đặt hàng
                </Button>
                <Form.Label className="text-muted text-center">
                  Miễn phí vận chuyển & Đổi trả
                </Form.Label>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}
