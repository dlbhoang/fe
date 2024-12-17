import React, { useState } from 'react';
import { Card, Container, Form, Row, Col, Dropdown } from "react-bootstrap";
import "../../../stylesheets/Orders.css";
import { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { CSVLink } from 'react-csv';

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  const fileHeaders = [
    { label: 'Mã Đơn Hàng', key: '_id' },
    { label: 'Mã Người Dùng', key: 'user' },
    { label: 'Trạng Thái', key: 'status' },
    { label: 'Ngày', key: 'order_date' },
    { label: 'Tổng Tiền', key: 'total_price' },
  ];

  useEffect(() => {
    axios.get(`https://oder.onrender.com/orders`).then(res => {
      setOrders(res.data);
    }).catch(err => {
      console.log("err=>" + err);
    })
  }, [3]);

  const viewOrder = (order) => {
    history.push({
      pathname: `/admin/view-order`,
      state: {
        order: order
      }
    })
  }

  return (
    <main >
      <div className='body' align='center' style={{ marginTop: "80px" }}>
        <div className='card' style={{ backgroundColor: "white", width: "1250px", height: 'auto' }}>
          <h1 className="form-titles ">QUẢN LÝ ĐƠN HÀNG</h1>

          <Form.Control
            className="search"
            name="search"
            onChange={(event) => {
              // setDescription(event.target.value);
            }}
            type="text"
            placeholder="Tìm kiếm khách hàng"
          />

          <Form.Label className="filter-by" >Lọc Theo Trạng Thái:</Form.Label>

          <Dropdown className="drop">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Chọn Trạng Thái
            </Dropdown.Toggle>

            <Dropdown.Menu onClick={(e) => {
              axios.get(`http://localhost:8070/orders/${e.target.name}`).then(res => {
                setOrders(res.data);
              }).catch(err => {
                console.log("err=>" + err);
              })
            }}>
              <Dropdown.Item name="all">Tất Cả</Dropdown.Item>
              <Dropdown.Item name="new">Mới</Dropdown.Item>
              <Dropdown.Item name="processing">Đang Xử Lý</Dropdown.Item>
              <Dropdown.Item name="ready">Sẵn Sàng</Dropdown.Item>
              <Dropdown.Item name="ontheway">Đang Giao</Dropdown.Item>
              <Dropdown.Item name="delivered">Đã Giao</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <br />

          <table className='table'>
            <thead className='thead-dark'>
              <tr className='table-success'>
                <th scope='col'>Mã Đơn Hàng</th>
                <th></th>
                <th scope='col'>Mã Người Dùng</th>
                <th scope='col'>Trạng Thái</th>
                <th scope='col'>Ngày</th>
                <th scope='col'>Số Tiền</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return (
                  <tr onClick={viewOrder.bind(this, order)}>
                    <td>
                      {order._id}
                    </td>
                    <td>
                    </td>
                    <td>
                      {order.user}
                    </td>
                    <td >
                      {order.status}
                    </td>
                    <td>
                      {order.order_date}
                    </td>
                    <td>
                      VND.{order.total_price}.00
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <CSVLink className="btn-report" headers={fileHeaders} data={orders} fileName="Orders.csv" target="_blank" >
            Tạo Báo Cáo
          </CSVLink><br />
        </div>
      </div>
    </main>
  );
}

export default Orders;
