import React from "react"; 
import { Card, Col, Form, Row } from "react-bootstrap"; 
import { Button, Typography } from "@material-ui/core";  

function ChangePassword(props) {   
  return (     
    <div>       
      <Card className={"p-5 mb-3"}>         
        <div className="text-center mb-2">           
          <h1 className="form-titles ">Đổi Mật Khẩu</h1>           
          <hr className="divide" />         
        </div>         
        <Typography           
          style={{ color: "#e23636" }}           
          className={"mb-2"}           
          variant="caption"         
        >           
          *Bạn sắp thay đổi mật khẩu. Hãy chắc chắn bạn biết những gì mình đang làm.         
        </Typography>         
        <Form.Group className={"mb-3"} as={Col} controlId="formGridPassword">           
          <Form.Label>Mật Khẩu</Form.Label>           
          <Form.Control             
            type="password"             
            placeholder="Mật khẩu"             
            // onChange={(e) => {             
            //   setPassword(e.target.value);             
            // }}           
          />         
        </Form.Group>         
        <Form.Group className={"mb-3"} as={Col} controlId="formGridPassword">           
          <Form.Label>Xác Nhận Mật Khẩu</Form.Label>           
          <Form.Control             
            type="password"             
            placeholder="Xác nhận mật khẩu"             
            // onChange={(e) => {             
            //   setCPassword(e.target.value);             
            // }}           
          />         
        </Form.Group>         
        <div className="d-flex gap-2">           
          <Button             
            className={"cancel-button"}             
            variant="outlined"             
            onClick={() => {               
              props.close("change");             
            }}           
          >             
            Hủy           
          </Button>           
          <Button             
            className={"save-button"}             
            variant="outlined"             
            // onClick={() => {             
            //   props.fun("address");             
            // }}           
          >             
            Lưu           
          </Button>         
        </div>       
      </Card>     
    </div>   
  ); 
}  

export default ChangePassword;
