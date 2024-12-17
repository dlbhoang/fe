import React, { Component } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: 0,
      products: 0,
      orders: 0,
      Employee: 0,
      User: 0,
    };
  }

  componentDidMount() {
    // Giả lập dữ liệu API trả về
    const response = {
      data: {
        transaction: 1200,
        products: 800,
        orders: 1500,
        Employee: 350,
        User: 450
      }
    };

    // Cập nhật state với dữ liệu lấy từ API (hoặc dữ liệu giả lập)
    this.setState({
      transactions: response.data.transaction,
      products: response.data.products,
      orders: response.data.orders,
      Employee: response.data.Employee,
      User: response.data.User,
    });
  }

  render() {
    return (
      <div>
        <table className='table' style={{ marginTop: '80px' }}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <div style={{ width: "300px", height: "300px" }}>
                  <h4>Sales</h4>
                  <PieChart
                    data={[
                      { title: 'Transactions', value: this.state.transactions, color: '#E38627' },
                      { title: 'Products', value: this.state.products, color: '#C13C37' },
                      { title: 'Orders', value: this.state.orders, color: '#6A2135' },
                    ]}
                  />
                </div>
              </th>
              <th>
                <div style={{ width: "300px", height: "300px" }}>
                  <h4>User Interaction</h4>
                  <PieChart
                    data={[
                      { title: 'Employees', value: this.state.Employee, color: '#b30000' },
                      { title: 'Users', value: this.state.User, color: '#000033' },
                    ]}
                  />
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default Dashboard;
