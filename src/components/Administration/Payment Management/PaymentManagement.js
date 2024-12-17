import React, { Component } from "react"; 
import "../../../stylesheets/Orders.css"; 
import { Avatar, Button, IconButton, Tooltip } from "@material-ui/core"; 
import "../../../stylesheets/formTitle.css"; 
import axios from "axios"; 
import { Card, Container, Table } from "react-bootstrap"; 
import DropdownButton from "react-bootstrap/DropdownButton"; 
import Dropdown from "react-bootstrap/Dropdown";  
import jsPDF from "jspdf"; 
import html2canvas from "html2canvas"; 
import Paper from "@material-ui/core/Paper"; 
import logo from "./Background.jpg"; 
import { RiDownload2Fill } from "react-icons/all";  

class PaymentManagement extends Component {   
  constructor(props) {     
    super(props);     
    this.state = {       
      transaction: [],       
      filter: "",     
    };      

    this.Filter = this.Filter.bind(this);     
    this.Report = this.Report.bind(this);   
  }    

  componentDidMount() {     
    axios       
      .get("https://payment-6mwu.onrender.com/payment/payment-management/display")       
      .then((response) => {         
        this.setState({ transaction: response.data });          
        console.log(response.data);       
      })       
      .catch(function (err) {         
        console.log(err);       
      });   
  }   

  componentDidUpdate() {     
    if (this.state.filter === "All") {       
      axios         
        .get("https://payment-6mwu.onrender.com/payment/payment-management/display")         
        .then((response) => {           
          this.setState({ transaction: response.data });            
          console.log(response.data);         
        })         
        .catch(function (err) {           
          console.log(err);         
        });     
    } else if (this.state.filter === "Refund") {       
      axios         
        .get(           
          `https://payment-6mwu.onrender.com/payment/payment-management/filter/${this.state.filter}`         
        )         
        .then((response) => {           
          this.setState({ transaction: response.data });            
          console.log(response.data);         
        })         
        .catch(function (err) {           
          console.log(err);         
        });     
    } else if (this.state.filter === "Completed") {       
      axios         
        .get(           
          `https://payment-6mwu.onrender.com/payment/payment-management/filter/${this.state.filter}`         
        )         
        .then((response) => {           
          this.setState({ transaction: response.data });         
        })         
        .catch(function (err) {           
          console.log(err);         
        });     
    }   
  }    

  Filter = (e) => {     
    this.setState({ filter: e });   
  };    

  Report = () => {     
    const input = document.getElementById("pdfdiv");     
    html2canvas(input).then((canvas) => {       
      var imgWidth = 270;       
      var pageHeight = 290;       
      var imgHeight = (canvas.height * imgWidth) / canvas.width;       
      var heightLeft = imgHeight;       
      const imgData = canvas.toDataURL("image/png");       
      const pdf = new jsPDF("p", "mm", "a4");        

      var position = 0;       
      pdf.addImage(logo, "png", 0, 0, 220, 30);       
      pdf.setFont("Helvertica", "bold");       
      pdf.setFontSize(14);       
      pdf.text(5, 53, "Báo cáo :");       
      pdf.text(5, 61, "Phòng ban :");       
      pdf.setFont("Helvertica", "normal");       
      pdf.setFontSize(12);       
      pdf.text(30, 53, "Giao dịch");       
      pdf.text(30, 61, "Phòng Quản Lý Thanh Toán");        

      pdf.addImage(imgData, "JPEG", 0, 70, imgWidth, imgHeight);       
      pdf.save("Transactions.pdf");     
    });   
  };    

  render() {     
    return (       
      <Container className={"pt-3"}>         
        <Card className={"p-5 mb-3"}>           
          <div className="text-center ">             
            <h1 className="form-titles ">QUẢN LÝ THANH TOÁN</h1>             
            <hr className="divide" />           
          </div>           
          <div             
            className={               
              "d-flex  p-3 pt-0  justify-content-start align-items-center"             
            }           
          >             
            <DropdownButton               
              alignRight               
              title="Lọc Giao Dịch"               
              id="dropdown-menu-align-right"               
              variant="light"               
              onSelect={this.Filter}             
            >               
              <Dropdown.Item eventKey="All">Tất cả</Dropdown.Item>               
              <Dropdown.Item eventKey="Completed">Hoàn thành</Dropdown.Item>               
              <Dropdown.Item eventKey="Refund">Hoàn tiền</Dropdown.Item>               
              <Dropdown.Divider />             
            </DropdownButton>           
          </div>           
          <br />            
          <table className="table" id="pdfdiv" component={Paper}>             
            <thead className="thead-dark">               
              <tr className="table-dark">                 
                <th scope="col">Mã giao dịch</th>                 
                <th></th>                 
                <th scope="col">Tên sản phẩm</th>                 
                <th scope="col">Trạng thái</th>                 
                <th scope="col">Ngày</th>                 
                <th scope="col">Số tiền</th>                 
                <th scope="col">Hành động</th>               
              </tr>             
            </thead>             
            <tbody>               
              {this.state.transaction.map((data, key) => (                 
                <tr>                   
                  <td>{data.transaction}</td>                   
                  <td></td>                   
                  <td>{data.Title}</td>                   
                  <td>{data.status}</td>                   
                  <td>{data.fullDate}</td>                   
                  <td>VND. {data.Total} .00</td>                   
                  <td>                     
                    <Dropdown>                       
                      <Dropdown.Toggle                         
                        variant="secondary"                         
                        id="dropdown-basic"                         
                        style={{                           
                          width: "100px",                           
                          height: "35px",                           
                          fontSize: "14px",                         
                        }}                       
                      >                         
                        Tùy chọn                       
                      </Dropdown.Toggle>                        
                      <Dropdown.Menu>                         
                        <Dropdown.Item                           
                          href={`/admin/payment/filter/${data._id}`}                         
                        >                           
                          Xem                         
                        </Dropdown.Item>                         
                        {data.status !== "Refund" && (                           
                          <Dropdown.Item                             
                            href={`/admin/payment/refund/${data._id}`}                           
                          >                             
                            Hoàn tiền                           
                          </Dropdown.Item>                         
                        )}                          
                        <Dropdown.Item                           
                          href={`/admin/payment/contact/${data._id}`}                         
                        >                           
                          Liên hệ                         
                        </Dropdown.Item>                          
                        {data.status === "Refund" && (                           
                          <Dropdown.Item                             
                            href={`/admin/payment/refund-invoice/${data._id}`}                           
                          >                             
                            Hóa đơn hoàn tiền                           
                          </Dropdown.Item>                         
                        )}                       
                      </Dropdown.Menu>                     
                    </Dropdown>                   
                  </td>                 
                </tr>               
              ))}             
            </tbody>           
          </table>            
          <Button             
            style={{ width: "200px", marginLeft: "42%" }}             
            className="cancel-button"             
            startIcon={<RiDownload2Fill />}             
            onClick={this.Report}           
          >             
            Tạo Báo Cáo           
          </Button>           
          <br />         
        </Card>       
      </Container>     
    );   
  } 
}  

export default PaymentManagement;
