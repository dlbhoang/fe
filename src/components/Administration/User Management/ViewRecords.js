import axios from "axios"; 
import React, { Component } from "react"; 
import { Card, Container } from "react-bootstrap"; 
import { Paper } from "@material-ui/core"; 
import { Link } from "react-router-dom"; 

//Trang Xem Chi Tiết Quản Lý Người Dùng
class ViewRecords extends Component {   
    constructor(props) {     
        super(props);     
        this.state = {       
            Management: [],       
            FirstName: "",       
            LastName: "",       
            Email: "",       
            Role: "",       
            Branch:"",       
            Contact: "",       
            Profile: "",       
            Time: "",       
            Date: "",     
        };   
    }   

    componentDidMount() {     
        const id = this.props.match.params.id;     
        axios       
            .get(`https://user-9iyb.onrender.com/user-management/display/${id}`)       
            .then((response) => {         
                console.log(response.data.UserManagement.Profile);         
                this.setState({           
                    FirstName: response.data.UserManagement.FirstName,           
                    LastName: response.data.UserManagement.LastName,           
                    Email: response.data.UserManagement.Email,           
                    Role: response.data.UserManagement.Role,           
                    Branch: response.data.UserManagement.Branch,           
                    Contact: response.data.UserManagement.Contact,           
                    Profile: response.data.UserManagement.Profile,           
                    Date:response.data.UserManagement.LastLoginDate,           
                    Time:response.data.UserManagement.LastLoginTime         
                });       
            })       
            .catch(function (err) {         
                console.log(err);       
            });   
    }    

    render() {     
        return (       
            <Container>         
                <Paper elevation={"9"}>           
                    <Card className='text-center'>             
                        <Card.Header>               
                            {" "}               
                            <h1 className={"text-center sub-titles mt-2"}>Quản Lý Người Dùng</h1>             
                        </Card.Header>                     
                        <Card.Body>                                              
                            <img                         
                                alt='Ảnh đại diện'                         
                                center                         
                                style={{                           
                                    borderRadius: "50%",                           
                                    width: "100px",                           
                                    height: "100px",                         
                                }}                         
                                src={`http://localhost:3000/Profile/${this.state.Profile}`}                       
                            />               
                            <Card.Text>                 
                                <div align='center' style={{ marginTop: "60px", marginLeft:'100px' }}>                   
                                    <div>                     
                                        <form class='form1'>                               
                                            <div class='input-group mb-3' style={{ width: "600px" }}>                         
                                                <div style={{ width: "300px", marginRight: "100;" }}>                           
                                                    <span>                             
                                                        <p style={{ float: "left", marginLeft: "80px" }}>                               
                                                            Tên                              
                                                            <span style={{ color: "red" }}>&#42; :</span>                             
                                                        </p>                           
                                                    </span>                         
                                                </div>                         
                                                <p>{this.state.FirstName}</p>                       
                                            </div>                         
                                            <div class='input-group mb-3' style={{ width: "600px" }}>                         
                                                <div style={{ width: "300px", marginRight: "100;" }}>                           
                                                    <span>                             
                                                        <p style={{ float: "left", marginLeft: "80px" }}>                               
                                                            Họ và Tên                              
                                                            <span style={{ color: "red" }}>&#42;:</span>                             
                                                        </p>                           
                                                    </span>                         
                                                </div>                         
                                                <p>{this.state.LastName}</p>                       
                                            </div>                        
                                            <div class='input-group mb-3' style={{ width: "600px" }}>                         
                                                <div style={{ width: "300px", marginRight: "100;" }}>                           
                                                    <span>                             
                                                        <p style={{ float: "left", marginLeft: "80px" }}>                               
                                                            Email <span style={{ color: "red" }}>&#42;:</span>                             
                                                        </p>                           
                                                    </span>                         
                                                </div>                         
                                                <p>{this.state.Email}</p>                       
                                            </div>                                    
                                            <div class='input-group mb-3' style={{ width: "600px" }}>                         
                                                <div style={{ width: "300px", marginRight: "100;" }}>                           
                                                    <span>                             
                                                        <p style={{ float: "left", marginLeft: "80px" }}>                               
                                                            Vai trò<span style={{ color: "red" }}>&#42;:</span>                             
                                                        </p>                           
                                                    </span>                         
                                                </div>                         
                                                <p>{this.state.Role}</p>                       
                                            </div>                       
                                            { this.state.Role !== "Admin" &&                       
                                                <div class='input-group mb-3' style={{ width: "600px" }}>                         
                                                    <div style={{ width: "300px", marginRight: "100;" }}>                           
                                                        <span>                             
                                                            <p style={{ float: "left", marginLeft: "80px" }}>                               
                                                                Chi nhánh<span style={{ color: "red" }}>&#42;:</span>                             
                                                            </p>                           
                                                        </span>                         
                                                    </div>                         
                                                    <p>{this.state.Branch}</p>                       
                                                </div>                       
                                            }                       
                                            <div class='input-group mb-3' style={{ width: "600px" }}>                         
                                                <div style={{ width: "300px" }}>                           
                                                    <span>                             
                                                        <p style={{ float: "left", marginLeft: "80px" }}>                               
                                                            Liên hệ                              
                                                            <span style={{ color: "red" }}>&#42;:</span>                             
                                                        </p>                           
                                                    </span>                         
                                                </div>                         
                                                <p>{this.state.Contact}</p>                       
                                            </div>                        
                                            <div class='input-group mb-3' style={{ width: "600px" }}>                         
                                                <div style={{ width: "300px" }}>                           
                                                    <span>                             
                                                        <p style={{ float: "left", marginLeft: "80px" }}>                               
                                                            Thời gian đăng nhập lần cuối                              
                                                            <span style={{ color: "red" }}>&#42;:</span>                             
                                                        </p>                           
                                                    </span>                         
                                                </div>                         
                                                <p>{this.state.Time}</p>                       
                                            </div>                         
                                            <div class='input-group mb-3' style={{ width: "600px" }}>                         
                                                <div style={{ width: "300px" }}>                           
                                                    <span>                             
                                                        <p style={{ float: "left", marginLeft: "80px" }}>                               
                                                            Ngày đăng nhập lần cuối                              
                                                            <span style={{ color: "red" }}>&#42;:</span>                             
                                                        </p>                           
                                                    </span>                         
                                                </div>                         
                                                <p>{this.state.Date}</p>                       
                                            </div>                      
                                        </form>                   
                                    </div>                 
                                </div>               
                            </Card.Text><br/><br/>               
                            <Link to={"/admin/um/view-users"}>                         
                                Quay lại Trang Chủ             
                            </Link>              
                        </Card.Body>           
                    </Card>         
                </Paper>       
            </Container>     
        );   
    } 
}

export default ViewRecords;
