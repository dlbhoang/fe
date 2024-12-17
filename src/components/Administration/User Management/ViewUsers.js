import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 
import { Avatar, Button, IconButton, Tooltip } from "@material-ui/core"; 
import "../../../stylesheets/formTitle.css"; 
import axios from "axios"; 
import { Modal, Form, ToggleButton, Dropdown } from "react-bootstrap"; 
import { Card, Container, Table } from "react-bootstrap"; 
import { 
  FaEdit, 
  FaEye, 
  FaTrash, 
  IoMdAddCircleOutline, 
  MdEmail, 
} from "react-icons/all"; 
import ReactNotifications from "react-notifications-component"; 
import { store } from "react-notifications-component"; 
import "react-notifications-component/dist/theme.css"; 
import "animate.css"; 
import { 
  NotificationContainer, 
  NotificationManager, 
} from "react-notifications"; 
import "react-notifications/lib/notifications.css"; 

function ViewUsers(props) {   
  const [model, setModelView] = useState(false);   
  const [Users, setUsers] = useState([]);   
  const [showPop, setShowPop] = useState(false);   
  const [Notification, setNotification] = useState("");   

  useEffect(() => {   
    axios   
      .get("https://user-9iyb.onrender.com/user-management/display")   
      .then((response) => {     
        setUsers(response.data);      
        console.log(response.data);   
      })   
      .catch(function (err) {     
        console.log(err);   
      }); 
  }, []);

  function onDelete(id, Email) {
    const data = { Email };

    axios
      .post(`https://user-9iyb.onrender.com/user-management/delete/${id}`, data)
      .then((response) => {
        NotificationManager.success("Thành công", "Đã xóa");
        setTimeout(
          function () {
            window.location.href = "/admin/um/view-users";
          }.bind(this),
          1000
        );
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div>
      <Container className={"pt-3"}>
        <NotificationContainer />
        <Card className={"p-5 mb-3"}>
          <div className="text-center mb-2">
            <h1 className="form-titles ">QUẢN LÝ NGƯỜI DÙNG</h1>
            <hr className="divide" />
          </div>
          <div>
            <Table
              striped
              bordered
              hover
              variant="dark"
              className={"text-center"}
            >
              <thead>
                <tr>
                  <th className={"table-data"}>Hồ sơ</th>
                  <th className={"table-data"}>Tên người dùng</th>
                  <th className={"table-data"}>Vai trò</th>
                  <th className={"table-data"}>Chi nhánh</th>
                  <th>
                    <Tooltip title="Thêm" placement="top">
                      <IconButton aria-label="delete" href={"/admin/um/add-user"}>
                        <IoMdAddCircleOutline color={"white"} />
                      </IconButton>
                    </Tooltip>
                  </th>
                </tr>
              </thead>
              {Users.map((data, key) => (
                <tbody>
                  <tr>
                    <td className={"table-data"}>
                      <Avatar
                        style={{
                          width: "80px",
                          height: "80px",
                        }}
                        alt="Remy Sharp"
                        src={`http://localhost:3000/Profile/${data.Profile}`}
                        className={"table-avatar"}
                      />
                    </td>
                    <td className={"table-data"}>{data.FirstName}</td>
                    <td className={"table-data"}>{data.Role}</td>
                    <td className={"table-data"}>{data.Branch}</td>
                    <td>
                      {" "}
                      <Tooltip
                        title="Chỉnh sửa"
                        className="table-icon"
                        style={{
                          color: "red",
                        }}
                      >
                        <Link to={`/admin/um/update-user/${data._id}`}>
                          <FaEdit color={"white"} />
                        </Link>
                      </Tooltip>

                      <Tooltip
                        title="Xóa"
                        className="table-icon"
                        style={{
                          color: "red",
                        }}
                      >
                        <Link type="submit" onClick={() => onDelete(data._id, data.Email)}>
                          <FaTrash color={"white"} />
                        </Link>
                      </Tooltip>

                      <Tooltip
                        title="Xem"
                        className="table-icon"
                        style={{
                          color: "red",
                        }}
                      >
                        <Link to={`/admin/um/view-user-details/${data._id}`}>
                          <FaEye color={"white"} />
                        </Link>
                      </Tooltip>

                      <Tooltip
                        title="Liên hệ"
                        className="table-icon"
                        style={{
                          color: "red",
                        }}
                      >
                        <Link to={`/admin/um/contact-user/${data._id}`}>
                          <MdEmail color={"white"} />
                        </Link>
                      </Tooltip>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default ViewUsers;
