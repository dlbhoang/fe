import React, { useEffect, useState } from 'react';
import { Card, Container, Form, Row, Col, Dropdown } from "react-bootstrap";
import axios from 'axios';
import { useLocation } from 'react-router';
import ChangeStatus from './ChangeStatus';

function ViewOrder(props) {
  const location = useLocation();
  const products = location.state.order.products;
  const [status, setStatus] = useState(location.state.order.status);
  const delivery = location.state.order.delivery_code;

  return (
    <div>
      <h1>Đơn Hàng Số: {location.state.order._id}</h1>
      <table className='table'>
        <thead className='thead-dark'>
          <tr className='table-success'>
            <th scope='col'>Mã Sản Phẩm</th>
            <th scope='col'>Tiêu Đề</th>
            <th scope='col'>Kích Cỡ</th>
            <th scope='col'>Số Lượng</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.product_id}</td>
                <td>{product.title}</td>
                <td>{product.size}</td>
                <td>{product.qty}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Địa Chỉ Giao Hàng</h2>
      <h5>{delivery.fullname}</h5>
      <h5>{delivery.address}</h5>
      <h5>{delivery.city}</h5>
      <h5>{delivery.state}</h5>
      <h5>{delivery.zipcode}</h5>

      <ChangeStatus order={location.state.order._id} city={delivery.city} status={status} />
    </div>
  );
}

export default ViewOrder;
