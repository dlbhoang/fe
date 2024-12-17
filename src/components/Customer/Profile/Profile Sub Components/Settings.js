import React, { useEffect, useState } from "react"; 
import { Card, Col, Form, Row } from "react-bootstrap"; 
import { Button, Container, Dialog, Zoom } from "@material-ui/core"; 
import { BsPlus, MdDelete, MdModeEdit } from "react-icons/all"; 
import AddAddress from "./AddressBook/AddAddress"; 
import ChangePassword from "./Settings/ChangePassword"; 
import axios from "axios"; 

function Settings(props) {   
  const [openChangePassword, setChangePassword] = useState(false);    

  const handleClickOpenPop = (value) => {     
    if (value === "change") {       
      setChangePassword(true);     
    }   
  };    

  const handleClosePop = (value) => {     
    if (value === "change") {       
      setChangePassword(false);     
    }   
  };    

  return (     
    <div>       
      <div>         
        <h6 className="profile-divider">           
          <span>Cài Đặt</span>         
        </h6>{" "}       
      </div>       
      <Container maxWidth={"md"}>         
        <Card className={"p-5 mb-3"}>           
          <div className="text-center mb-2">             
            <h1 className="form-titles ">Cập Nhật Thông Tin Của Bạn</h1>             
            <hr className="divide" />           
          </div>           
          <Row className="mb-3">             
            <Form.Group as={Col} controlId="formGridFname">               
              <Form.Label>Họ</Form.Label>               
              <Form.Control                 
                type="text"                 
                placeholder="Họ"                 
                // onChange={(e) => {                 
                //   setFirstName(e.target.value);                 
                // }}               
              />             
            </Form.Group>              

            <Form.Group as={Col} controlId="formGridLname">               
              <Form.Label>Tên</Form.Label>               
              <Form.Control                 
                type="text"                 
                placeholder="Tên"                 
                // onChange={(e) => {                 
                //   setLastName(e.target.value);                 
                // }}               
              />             
            </Form.Group>           
          </Row>            

          <Form.Group as={Col} className="mb-3" controlId="formGridEmail">             
            <Form.Label>Email</Form.Label>             
            <Form.Control               
              type="email"               
              placeholder="Email"               
              // onChange={(e) => {               
              //   setEmail(e.target.value);               
              // }}             
            />           
          </Form.Group>            

          <Form.Group className="mb-3" as={Col} controlId="formGridPhone">             
            <Form.Label>Số Điện Thoại</Form.Label>             
            <Form.Control               
              type="text"               
              placeholder="Số Điện Thoại"               
              // onChange={(e) => {               
              //   setContact(e.target.value);               
              // }}             
            />           
          </Form.Group>            

          <Button             
            // onClick={Signing}             
            type="submit"             
            fullWidth             
            className={"save-button"}             
            variant="outlined"           
          >             
            Cập Nhật           
          </Button>         
        </Card>       
      </Container>       

      <div className="d-flex justify-content-center gap-3">         
        <div>           
          {" "}           
          <Button             
            className={"cancel-button"}             
            style={{ width: "400px" }}             
            startIcon={<MdDelete />}             
            // onClick={() => handleClickOpenPop("add")}           
          >             
            Xóa Tài Khoản           
          </Button>{" "}         
        </div>         
        <div>           
          {" "}           
          <Button             
            className={"save-button"}             
            startIcon={<MdModeEdit />}             
            style={{ width: "400px" }}             
            onClick={() => handleClickOpenPop("change")}           
          >             
            Thay Đổi Mật Khẩu           
          </Button>{" "}         
        </div>       
      </div>{" "}       

      <div>         
        {" "}         
        <Dialog           
          style={{ zIndex: 9999 }}           
          open={openChangePassword}           
          fullWidth={true}           
          TransitionComponent={Zoom}           
          onClose={() => handleClosePop("change")}         
        >           
          <ChangePassword close={handleClosePop} />         
        </Dialog>       
      </div>     
    </div>   
  ); 
}  

export default Settings;
