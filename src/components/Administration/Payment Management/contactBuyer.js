import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import "../../../stylesheets/formTitle.css";
import "../../../stylesheets/AddUser.css";
import { Card, Container } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { GiRollingEnergy, ImExit } from "react-icons/all";

//Email JS Messaging System
export default class ContactBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Message: "",
    };
    this.sendEmail = this.sendEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //get user ID from main page
    const id = this.props.match.params.id;
    axios
      .get(`https://payment-6mwu.onrender.com/payment/payment-management/transaction/${id}`)
      .then((response) => {
        console.log(response.data.transactions.FirstName);
        this.setState({
          Email: response.data.transactions.Email,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //Email JS credentials
  sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gmail",
        "template_9x6vq5v",
        e.target,
        "user_h6YVAt2zsrr63XZUNdgs7"
      )
      .then(
        (result) => {
          this.setState({
            Message: "success",
          });
        },
        (error) => {
          this.setState({
            Message: "warning",
          });
        }
      );
  }

  //Notification render()
  render() {
    if (this.state.Message == "success") {
      NotificationManager.success('Thành công', 'Đã gửi đi');
      setTimeout(function() {
        window.location.href = "/admin/payment/management";
      }.bind(this), 3000);
    } else if (this.state.Message == "warning") {
      NotificationManager.warning('Lỗi', 'Kiểm tra lại thông tin', 3000);
    }

    return (
      <Container className={"pt-3"}>
        <NotificationContainer />
        <Card className={"p-5 mb-3"}>
          <Card.Header>
            <div className={"go-back-icon"}>
              <Link to={"/admin/payment/management"}>
                <ImExit color={"black"} />
              </Link>
            </div>
            <div className="text-center mb-2">
              <h1 className="form-titles ">Email</h1>
              <hr className="divide" />
            </div>
          </Card.Header>

          <Card.Body>
            <div>
              <Form onSubmit={this.sendEmail.bind(this)}>
                <Form.Group className="mb-3" controlId="FirstName">
                  <Form.Control
                    name='sendTo'
                    id='sendTo'
                    defaultValue={this.state.Email}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="FirstName">
                  <Form.Control
                    name='Header'
                    id='Header'
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    placeholder="Tiêu Đề"
                  />
                </Form.Group>
                <textarea
                  align='center'
                  className="mb-3"
                  type='text'
                  name='message'
                  rows='10'
                  cols='133'
                  placeholder='Tin nhắn'
                  onChange={this.handleChange.bind(this)}
                ></textarea>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "#d00000", color: "#FFF" }}
                >
                  Gửi
                </Button>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
