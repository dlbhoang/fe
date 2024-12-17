import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { MdAddShoppingCart } from "react-icons/all";
import { Modal, Form, ToggleButton } from "react-bootstrap";

const SingleProduct = (props) => {
  const [model, setModelView] = useState(false);
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");

  const history = useHistory();
  // Các lựa chọn sử dụng trong dropdown kích thước
  const options = [
    { value: "Small", label: "Nhỏ" },
    { value: "Medium", label: "Vừa" },
    { value: "Large", label: "Lớn" },
    { value: "Regular", label: "Thông thường" },
  ];

  // Hàm tăng biến count
  function increamentCount() {
    setCount(count + 1);
  }

  // Hàm giảm biến count
  function decreamentCount() {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  // Hàm đóng cửa sổ pop-up
  const handleClose = () => setModelView(false);

  // Hàm hiển thị cửa sổ pop-up khi nhấn nút "Thêm vào giỏ"
  const handleShow = () => setModelView(true);

  // Hàm này lấy phản hồi của người dùng và thêm sản phẩm vào giỏ hàng thông qua API giỏ hàng
  function addToCart() {
    const cartItem = {
      qty: count,
      product_id: props.product._id,
      price: price,
      title: props.product.title,
      size: size,
      user: localStorage.getItem("userid"),
      image: props.product.image,
    };

    axios
      .get(
        `https://oder.onrender.com/carts/${localStorage.getItem("userid")}/${props.product._id}/${size}`
      )
      .then((res) => {
        const Item = res.data[0];
        return Item;
      })
      .then((Item) => {
        console.log(Item);
        if (Item != null) {
          const newCartItem = {
            qty: count + Item.qty,
          };
          axios
            .patch(
              `https://oder.onrender.com/carts/update/${Item._id}`,
              newCartItem
            )
            .then((res) => {
              console.log(res);
              alert("Sản phẩm đã được thêm vào giỏ hàng thành công");
            });
        } else {
          axios
            .post(`https://oder.onrender.com/carts/add`, cartItem)
            .then((res) => {
              console.log(res);
              alert("Sản phẩm đã được thêm vào giỏ hàng thành công");
            })
            .catch((err) => {
              console.log(cartItem);
              console.log(err);
            });
        }
      });
    setModelView(false);
  }

  // Hàm này dùng để thiết lập giá trị kích thước theo phản hồi của người dùng
  function selectSize(e) {
    const value = e.value;
    if (value == "Small") {
      setPrice(props.product.prices.small);
      setSize("small");
    } else if (value == "Medium") {
      setPrice(props.product.prices.medium);
      setSize("medium");
    } else if (value == "Large") {
      setPrice(props.product.prices.large);
      setSize("large");
    } else {
      setPrice(props.product.prices.regular);
      setSize("regular");
    }
  }

  return (
    <div>
      <Card>
        <CardMedia
          style={{ borderStyle: "none" }}
          component="img"
          height="190"
          image=""
          src={`http://localhost:3000/Profile/${props.product.image}`}
          title="Hình ảnh sản phẩm"
        />
        <CardContent>
          <Typography gutterBottom component="h2">
            {props.product.title}
          </Typography>
          <Typography
            style={{ fontSize: "12px" }}
            color="textSecondary"
            component="p"
          >
            {props.product.description}
          </Typography>
          <Typography
            style={{ fontSize: "11px", textAlign: "end" }}
            component="div"
            color="textSecondary"
          >
            Bắt đầu từ:{" "}
            <Typography color="textPrimary" component="span">
              {props.product.prices.regular}
            </Typography>
          </Typography>
        </CardContent>
        <div className="d-flex justify-content-around ">
          <Button
            size="small"
            style={{ backgroundColor: "#70a401", color: "white" }}
            className={"m-2"}
          >
            Tùy chỉnh
          </Button>
          <Button
            style={{ backgroundColor: "#e13340", color: "white" }}
            size="small"
            color="primary"
            className={"m-2"}
            startIcon={<MdAddShoppingCart />}
            onClick={handleShow}
          >
            Thêm
          </Button>
        </div>
      </Card>

      <Modal show={model} onHide={handleClose} animation={true}>
        <Modal.Header className={"d-flex justify-content-center"}>
          <Modal.Title>Thêm vào giỏ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Chọn kích thước</Form.Label>
          <Form.Group>
            <Select onChange={selectSize} options={options} />
          </Form.Group>
          <div className={"d-flex justify-content-center pt-3"}>
            <Button
              style={{
                color: "#c92e31",
              }}
              onClick={increamentCount}
            >
              +
            </Button>
            <span
              className={"p-2"}
              style={{
                fontSize: "18px",
                fontStyle: "bolder",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              {count}
            </span>
            <Button
              style={{
                color: "#c92e31",
              }}
              onClick={decreamentCount}
            >
              -
            </Button>
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer className={"d-flex justify-content-center"}>
          <Button
            variant="primary"
            startIcon={<MdAddShoppingCart />}
            type={"submit"}
            onClick={addToCart}
            style={{ backgroundColor: "#e13340", color: "white" }}
          >
            Thêm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SingleProduct;
