import { react, Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

class ChangeStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      del_guys: [],
      chefs: [],
      emp: '',
      options: [],
      status: this.props.status,
    };
    this.updateOrder = this.updateOrder.bind(this);
  }

  updateOrder() {
    let newOrder = {};
    if (this.state.status === 'new') {
      newOrder = {
        status: 'processing',
        assign_to: this.state.emp
      }
    } else if (this.state.status === 'processing') {
      newOrder = {
        status: 'ready',
      }
    }
    axios.patch(`https://oder.onrender.com/orders/edit/${this.props.order}`, newOrder)
      .then(res => {
        alert('Giai đoạn hoàn thành');
        window.location = '/admin/orders'
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    if (this.state.status === 'new') {
      axios.get(`http://localhost:8070/employee-management/employee/chefs/${this.props.city}`)
        .then(res => {
          this.setState({ chefs: res.data });
          let data = [];
          this.state.chefs.map(chef => {
            let item = {
              value: chef._id,
              label: chef.FirstName + ' ' + chef.LastName
            }
            console.log(item)
            data.push(item);
          })
          console.log(data)
          this.setState({ options: data });
        }).catch(err => {
          console.log(err);
        })
    } else if (this.state.status === 'ready') {
      axios.get().then(res => {
        this.setState({ del_guys: res.data });
        let data = [];
        this.state.del_guys.map(chef => {
          let item = {
            value: chef._id,
            label: chef.name
          }
          data.push(item);
        })
        console.log(data)
        this.setState({ options: data });
      }).catch(err => {
        this.setState({ emp: e.value });
        console.log(this.state.emp)
      })
    }
  }

  render() {
    if (this.state.status === 'new') {
      return (
        <div>
          <h1>Trạng thái: Mới</h1>
          <Select
            maxMenuHeight={125}
            options={this.state.options}
            onChange={(e) => {
              this.setState({ emp: e.value });
            }}
          />
          <button onClick={this.updateOrder}>Giao đầu bếp</button>
        </div>
      );
    } else if (this.state.status === 'processing') {
      return (
        <div>
          <h1>Trạng thái: Đang xử lý</h1>
          <button onClick={this.updateOrder}>Đánh dấu là đã sẵn sàng</button>
        </div>
      );
    }
  }
}

export default ChangeStatus;
