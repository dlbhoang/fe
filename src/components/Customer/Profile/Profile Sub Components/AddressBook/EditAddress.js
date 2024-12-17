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

  const [fullname, setFullName] = useState(props.address.fullname);   
  const [email, setEmail] = useState(props.address.user);   
  const [address, setAddress] = useState(props.address.address);   
  const [city, setCity] = useState(props.address.city);   
  const [zipcode, setZipcode] = useState(props.address.zipcode);   
  const [state, setState] = useState(props.address.state);    

  return (     
    <div>       
      <Card className={"p-5 mb-3"}>         
        <div className="text-center mb-2">           
          <h1 className="form-titles ">Cập Nhật Địa Chỉ</h1>           
          <hr className="divide" />         
        </div>         
        <Form.Group as={Col} controlId="formGridAddress">           
          <Form.Label>Họ và Tên</Form.Label>           
          <Form.Control             
            type="text"             
            defaultValue={props.address.fullname}             
            onChange={(e) => {                
              setFullName(e.target.value);             
            }}           
          />            
          <Form.Label>Địa Chỉ</Form.Label>           
          <Form.Control               
            type="text"               
            defaultValue={props.address.address}               
            onChange={(e) => {                
              setAddress(e.target.value);              
            }}           
          />           
        </Form.Group>         
        <div className={"mb-4"}>           
          <Form.Group className={"mb-4"}>             
            <Form.Label>Thành Phố</Form.Label>             
            <Select               
              maxMenuHeight={125}              
              onChange={(e) => {                
                setCity(e.value);              
              }}               
              options={options}             
            />           
          </Form.Group>           
          <Form.Label>Mã Bưu Điện</Form.Label>           
          <Form.Control               
            type="text"               
            defaultValue={props.address.zipcode}               
            onChange={(e) => {                   
              setZipcode(e.target.value);                
            }}           
          />            
          <Form.Label>Tỉnh / Thành Phố</Form.Label>           
          <Form.Control               
            type="text"               
            defaultValue={props.address.state}                
            onChange={(e) => {                   
              setState(e.target.value);               
            }}           
          />           
        </div>            
        <div className="d-flex  gap-2">           
          <Button             
            className={"cancel-button"}             
            variant="outlined"             
            onClick={() => {               
              props.close("add");             
            }}           
          >             
            Hủy           
          </Button>           
          <Button             
            className={"save-button"}             
            variant="outlined"             
            onClick={() => {                 
              const newAddress = {                   
                fullname: fullname,                   
                address: address,                   
                city: city,                   
                zipcode: zipcode,                   
                state: state                 
              };                 
              axios.patch(`http://localhost:8070/deliveries/update/${props.address._id}`, newAddress).then(res => {                   
                alert("Cập nhật thông tin giao hàng thành công");                                      
              }).catch(err => {                       
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
