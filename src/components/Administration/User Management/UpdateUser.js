import React, { useState, useEffect } from "react"; 
import { Button } from "@material-ui/core"; 
import { Card, Container, Form, Table } from "react-bootstrap"; 
import { GiRollingEnergy, ImExit } from "react-icons/all"; 
import "../../../stylesheets/formTitle.css"; 
import { useParams } from "react-router"; 
import axios from "axios"; 
import { Link } from "react-router-dom"; 
import { Avatar } from "@material-ui/core"; 

function UpdateUser(props) {  
  const [imgPreview, setimgPreview] = useState(null); 
  const [error, setError] = useState(false); 
  const { id } = useParams();  

  const [FirstName, setFirstName] = useState(""); 
  const [LastName, setLastName] = useState(""); 
  const [Email, setEmail] = useState(""); 
  const [Contact, setContact] = useState(""); 
  const [Role, setRole] = useState(""); 
  const [Branch, setBranch] = useState(""); 
  const [Profile, setProfile] = useState("");  

  useEffect(() => { 
    axios         
      .get(`https://user-9iyb.onrender.com/user-management/display/${id}`)         
      .then((response) => {           
        setFirstName(response.data.UserManagement.FirstName) 
        setLastName(response.data.UserManagement.LastName) 
        setEmail(response.data.UserManagement.Email) 
        setContact(response.data.UserManagement.Contact) 
        setRole(response.data.UserManagement.Role) 
        setBranch(response.data.UserManagement.Branch) 
        setProfile(response.data.UserManagement.Profile) 
      })         
      .catch(function (err) {           
        console.log(err);         
      }); 
  },[]);

  // Profile image handle function 
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
      alert("Tập tin không hỗ trợ");     
    }   
  };    

  // Send data to the backend using API 
  function sendData(e) {     
    e.preventDefault();       
    const data = {       
      FirstName,       
      LastName,       
      Email,       
      Contact,       
      Role,       
      Branch     
    }    

    if (Profile) {   
      axios   
        .put(`https://user-9iyb.onrender.com/user-management/updates/${id}`, data)   
        .then((response) => {     
          window.location.href = "/admin/um/view-users"   
        })   
        .catch((err) => {     
          alert(err);   
        }); 
    } else {    
      axios   
        .put(`https://user-9iyb.onrender.com/user-management/update/${id}`, formData)   
        .then((response) => {     
          window.location.href = "/admin/um/view-users"   
        })   
        .catch((err) => {     
          alert(err);   
        });  
    }
  }     

  return (       
    <div>         
      <Container className={"pt-3"}>           
        <Card className={"p-5 "}>             
          <div className={"go-back-icon"}>               
            <Link to={"/admin/um/view-users"}>                 
              <ImExit color={"black"} />               
            </Link>             
          </div>                          

          <div className="text-center mb-2">             
            <div>                 
              <Avatar style={{ marginLeft: '-5px', width: '100px', height: '100px' }}                   
                alt="Ảnh đại diện"                   
                src={`http://localhost:3000/Profile/${Profile}`}                   
                className={"table-avatar"}                 
              />                 
            </div>                 
            <h1 className="form-titles ">CẬP NHẬT NGƯỜI DÙNG</h1>                              
            <hr className="divide" />                            
          </div>              
          <Form onSubmit={sendData}>               
            <Form.Group className="mb-3" controlId="FirstName">                 
              <Form.Label>Tên</Form.Label>                 
              <Form.Control                     
                name="First Name"                     
                defaultValue={FirstName}                     
                onChange={(e) => {                       
                  setFirstName(e.target.value);                     
                }}                     
                type="text"                     
                placeholder="Nhập tên"                 
              />               
            </Form.Group>                

            <Form.Group className="mb-3" controlId="LastName">                 
              <Form.Label>Họ</Form.Label>                 
              <Form.Control                     
                name="Last Name"                     
                defaultValue={LastName}                     
                onChange={(e) => {                       
                  setLastName(e.target.value);                     
                }}                     
                type="text"                     
                placeholder="Nhập họ"                 
              />               
            </Form.Group>                

            <Form.Group className="mb-3" controlId="Email">                 
              <Form.Label>Email</Form.Label>                 
              <Form.Control                     
                name="Email"                     
                defaultValue={Email}                     
                onChange={(e) => {                       
                  setEmail(e.target.value);                     
                }}                     
                type="email"                     
                placeholder="Nhập email"                 
              />               
            </Form.Group>                

            <div className="form-group">                 
              <Form.Label>Chức vụ</Form.Label>                 
              <select                     
                className="form-select form-select-lg mb-3 dropdown"                     
                aria-label=".form-select-lg example"                     
                value={Role}                     
                onChange={(e) => {                       
                  setRole(e.target.value);                     
                }}                 
              >                   
                <option selected>Chọn chức vụ</option>                   
                <option value="Admin">Quản trị viên</option>                   
                <option value="BranchManager">Quản lý chi nhánh</option>                 
              </select>               
            </div>                

            {Role !== "Admin" &&               
              <div className="form-group">                 
                <Form.Label>Chi nhánh</Form.Label>                 
                <select                     
                  className="form-select form-select-lg mb-3 dropdown"                     
                  aria-label=".form-select-lg example"                     
                  value={Branch}                     
                  onChange={(e) => {                       
                    setBranch(e.target.value);                     
                  }}                 
                >                   
                  <option selected>Chọn chi nhánh</option>                   
                  <option value="Colombo">Colombo</option>                   
                  <option value="Kandy">Kandy</option>                   
                  <option value="Galle">Galle</option>                   
                  <option value="Kurunegala">Kurunegala</option>                 
                </select>               
              </div>                
            }                

            <Form.Group className="mb-3" controlId="Contact">                 
              <Form.Label>Số điện thoại</Form.Label>                 
              <Form.Control                     
                name="Contact"                     
                defaultValue={Contact}                     
                onChange={(e) => {                       
                  setContact(e.target.value);                     
                }}                     
                type="string"                     
                placeholder="Nhập số điện thoại"                 
              />               
            </Form.Group>                                        

            <br />                

            <Button                   
              type="submit"                   
              fullWidth                   
              variant="contained"                   
              style={{ backgroundColor: "#d00000", color: "#FFF" }}               
            >                 
              Cập nhật người dùng               
            </Button>             
          </Form>           
        </Card>         
      </Container>       
    </div>   
  ); 
}  

export default UpdateUser;
