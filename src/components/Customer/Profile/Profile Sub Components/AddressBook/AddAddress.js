import React, { useState } from 'react'; 
import { Card, Col, Form, Row } from "react-bootstrap"; 
import { Button, Typography } from "@material-ui/core"; 
import Select from "react-select"; 
import axios from 'axios'; 

function AddAddress(props) {   
  const options = [     
    { value: "HaNoi", label: "Hà Nội" },     
    { value: "HoChiMinh", label: "Hồ Chí Minh" },     
    { value: "DaNang", label: "Đà Nẵng" },     
    { value: "CanTho", label: "Cần Thơ" },     
    { value: "Hue", label: "Huế" },   
  ];    

  const [fullname, setFullName] = useState("");   
  const [email, setEmail] = useState("");   
  const [address, setAddress] = useState("");   
  const [city, setCity] = useState("");   
  const [zipcode, setZipcode] = useState("");   
  const [state, setState] = useState("");    

  return (     
    <div>       
      <Card className={"p-5 mb-3"}>         
        <div className="text-center mb-2">           
          <h1 className="form-titles ">Thêm Địa Chỉ Mới</h1>           
          <hr className="divide" />         
        </div>         
        <Form.Group as={Col} controlId="formGridAddress">           
          <Form.Label>Họ và Tên</Form.Label>           
          <Form.Control             
            type="text"             
            placeholder="Ví dụ: Nhà tôi"             
            onChange={(e) => { setFullName(e.target.value); }}           
          />            

          <Form.Label>Địa Chỉ</Form.Label>           
          <Form.Control               
            type="text"               
            placeholder="Ví dụ: Số 233/1, Đường Kalapuwa"               
            onChange={(e) => { setAddress(e.target.value); }}           
          />         
        </Form.Group>         
        <div className={"mb-4"}>           
          <Form.Group className={"mb-4"}>             
            <Form.Label>Thành Phố</Form.Label>             
            <Select               
              maxMenuHeight={125}              
              onChange={(e) => { setCity(e.value); }}               
              options={options}             
            />           
          </Form.Group>           
          <Form.Label>Mã Bưu Chính</Form.Label>           
          <Form.Control               
            type="text"               
            placeholder="123"               
            onChange={(e) => { setZipcode(e.target.value); }}           
          />            

          <Form.Label>Tỉnh/Thành Phố</Form.Label>           
          <Form.Control               
            type="text"               
            placeholder="Ví dụ: Hà Nội"               
            onChange={(e) => { setState(e.target.value); }}           
          />         
        </div>            

        <div className="d-flex gap-2">           
          <Button             
            className={"cancel-button"}             
            variant="outlined"             
            onClick={() => { props.close("add"); }}           
          >             
            Hủy           
          </Button>           
          <Button             
            className={"save-button"}             
            variant="outlined"             
            onClick={() => {                 
              const newAddress = {                   
                fullname: fullname,                   
                user: localStorage.getItem('Email'),                   
                address: address,                   
                city: city,                   
                zipcode: zipcode,                   
                state: state,                   
                status: 'permanent'                 
              };                 
              axios.post('http://localhost:8070/deliveries/add', newAddress)                 
                .then(res => {                   
                  alert("Thông tin giao hàng đã được gửi thành công");                                      
                })                 
                .catch(err => {                     
                  console.log(err);                   
                });             
            }}           
          >             
            Lưu           
          </Button>         
        </div>       
      </Card>     
    </div>   
  ); 
} 

export default AddAddress;
