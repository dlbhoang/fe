import { NotificationContainer, NotificationManager } from "react-notifications"; 
import "react-notifications/lib/notifications.css"; 
import React, { useState } from "react"; 
import axios from "axios"; 
import { Button } from "@material-ui/core"; 
import { Card, Form, Col, Row, Container } from "react-bootstrap";  

function SignUp(props) {   
  const [FirstName, setFirstName] = useState("");   
  const [LastName, setLastName] = useState("");   
  const [Email, setEmail] = useState("");   
  const [Contact, setContact] = useState("");   
  const [Address, setAddress] = useState("");   
  const [Password, setPassword] = useState("");   
  const [CPassword, setCPassword] = useState("");    

  function Signing() {     
    const data = {       
      FirstName,       
      LastName,       
      Email,       
      Contact,       
      Address,       
      Password,       
      CPassword,     
    };      

    console.log(data);      

    axios       
      .post("https://user-9iyb.onrender.com/auth/register", data)       
      .then((response) => {         
        //success Login         
        if (response.data.Success) {           
          NotificationManager.success("Thành công", response.data.Success, 3000);           
          setTimeout(             
            function () {               
              window.location.href = "/login";             
            }.bind(this),             
            2000           
          );            
        //Error Login         
        } else {           
          if (response.data.errorMessage) {             
            NotificationManager.warning(               
              "Cảnh báo",               
              response.data.errorMessage,               
              3000             
            );           
          }         
        }       
      })       
      .catch((err) => {         
        NotificationManager.warning("Cảnh báo", err.data, 3000);       
      });   
  }    

  return (     
    <div>       
      <div className="d-flex gap-2">         
        <div style={{ overflow: "hidden" }}>           
          <img             
            src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800"             
            alt="Paris"             
            width="500"             
            height="620"           
          />         
        </div>         
        <div>           
          <NotificationContainer />           
          <div className={"p-5 mb-3"}>             
            <div className="text-center mb-2">               
              <h1 className="form-titles ">Đăng Ký</h1>               
              <hr className="divide" />             
            </div>              

            <Row className="mb-3">               
              <Form.Group as={Col} controlId="formGridFname">                 
                <Form.Label>Họ</Form.Label>                 
                <Form.Control                   
                  type="text"                   
                  placeholder="Họ"                   
                  onChange={(e) => {                     
                    setFirstName(e.target.value);                   
                  }}                 
                />               
              </Form.Group>                

              <Form.Group as={Col} controlId="formGridLname">                 
                <Form.Label>Tên</Form.Label>                 
                <Form.Control                   
                  type="text"                   
                  placeholder="Tên"                   
                  onChange={(e) => {                     
                    setLastName(e.target.value);                   
                  }}                 
                />               
              </Form.Group>             
            </Row>              

            <Row className="mb-3">               
              <Form.Group as={Col} controlId="formGridEmail">                 
                <Form.Label>Email</Form.Label>                 
                <Form.Control                   
                  type="email"                   
                  placeholder="Email"                   
                  onChange={(e) => {                     
                    setEmail(e.target.value);                   
                  }}                 
                />               
              </Form.Group>                

              <Form.Group as={Col} controlId="formGridPhone">                 
                <Form.Label>Số Điện Thoại</Form.Label>                 
                <Form.Control                   
                  type="text"                   
                  placeholder="Số Điện Thoại"                   
                  onChange={(e) => {                     
                    setContact(e.target.value);                   
                  }}                 
                />               
              </Form.Group>             
            </Row>              

            <Row className="mb-3">               
              <Form.Group as={Col} controlId="formGridPassword">                 
                <Form.Label>Mật Khẩu</Form.Label>                 
                <Form.Control                   
                  type="password"                   
                  placeholder="Mật khẩu"                   
                  onChange={(e) => {                     
                    setPassword(e.target.value);                   
                  }}                 
                />               
              </Form.Group>                

              <Form.Group as={Col} controlId="formGridPassword">                 
                <Form.Label>Xác Nhận Mật Khẩu</Form.Label>                 
                <Form.Control                   
                  type="password"                   
                  placeholder="Xác nhận mật khẩu"                   
                  onChange={(e) => {                     
                    setCPassword(e.target.value);                   
                  }}                 
                />               
              </Form.Group>             
            </Row>              

            <Button               
              onClick={Signing}               
              type="submit"               
              fullWidth               
              className={"mt-3 mb-3"}               
              variant="contained"               
              style={{ backgroundColor: "#c92e31", color: "#FFF" }}             
            >               
              Đăng Ký             
            </Button>              

            <span               
              style={{                 
                textTransform: "none",                 
                color: "#030000",                 
                paddingLeft: 100,               
              }}             
            >               
              Đã có tài khoản?{" "}               
              <a                 
                style={{                   
                  textTransform: "none",                   
                  color: "#c92e31",                   
                  cursor: "pointer",                 
                }}                 
                onClick={() => props.fun("login")}               
              >                 
                Đăng Nhập               
              </a>             
            </span>           
          </div>         
        </div>       
      </div>{" "}     
    </div>   
  ); 
}  

export default SignUp;
