import React, { useEffect, useState } from "react"; 
import { Select } from "@material-ui/core"; 
import { IoList } from "react-icons/all"; 
import OrderItem from "./OrderItem"; 
import axios from "axios";  

function OrderHistory(props) {   
  const [orderStatus, setOrderStatus] = useState("completed");   
  const [orders, setOrders] = useState([]);   

  useEffect(() => {     
    axios       
      .get(         
        `https://oder.onrender.com/orders/gethistory/${localStorage.getItem(           
          "Email"         
        )}`       
      )       
      .then((res) => {         
        setOrders(res.data);       
      })       
      .catch((err) => {         
        console.log("err=>" + err);       
      });   
  }, [orderStatus]);   

  function openOrdersList(value) {     
    setOrderStatus(value);   
  }   

  return (     
    <div>       
      <div>         
        <h6 className="profile-divider">           
          <span>Lịch sử đơn hàng</span>         
        </h6>{" "}       
      </div>       
      <div className="d-flex justify-content-between align-self-center">         
        <div>           
          {/* Quản lý trạng thái đơn hàng ở đây với dropdown */}           
          <Select             
            native             
            variant={"outlined"}             
            className={"dropdown-lister"}             
            onChange={""} // Tham chiếu đến Modal trong Single product.js           
          >             
            <option onClick={() => openOrdersList("completed")}>Đã giao</option>             
            <option onClick={() => openOrdersList("cancelled")}>Đã hủy</option>           
          </Select>         
        </div>{" "}         
        <div>           
          <IoList style={{ fontSize: 30, cursor: "pointer" }} />         
        </div>       
      </div>        

      <div>         
        <div className={` ${orderStatus === "completed" ? "" : "d-none"}`}>           
          {orders             
            .filter((order) => {               
              if (order.status === "delivered") {                 
                return order;               
              }             
            })             
            .map((order, index) => {               
              return <OrderItem key={index} order={order} />;             
            })}         
        </div>{" "}         
        <div className={` ${orderStatus === "cancelled" ? "" : "d-none"}`}>           
          {orders             
            .filter((order) => {               
              if (order.status === "canceled") {                 
                return order;               
              }             
            })             
            .map((order, index) => {               
              return <OrderItem key={index} order={order} />;             
            })}         
        </div>{" "}       
      </div>     
    </div>   
  ); 
}  

export default OrderHistory;
