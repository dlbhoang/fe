import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/all";
import { Grid, Paper } from "@material-ui/core";
import SingleProduct from "./SingleProduct";

// Hàm menu
const Home = () => {
  const [category, setCategoryState] = useState("");
  const [products, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://product-nezx.onrender.com/products") // Lấy tất cả sản phẩm qua API
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log("err=>" + err);
      });
  }, [category]);

  // Hàm này để thiết lập danh mục khi khách hàng nhấp vào một trong các nút danh mục
  function openFoodList(cat) {
    console.log(cat);
    setCategoryState(cat);
  }

  return (
    <Container fluid={"lg"}>
      <div className="d-flex gap-2">
        <div className={"p-3"} style={{ width: "100%" }}>
          <div className={`tab-content ${category === "" ? "active" : ""}`}>
            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products.map((product, index) => {
                return (
                  <Grid item xs={4}>
                    <Paper>
                      <SingleProduct product={product} />
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <div
            className={`tab-content ${category === "Pizza" ? "active" : ""}`}
          >
            <h1 className="food-titles">Pizza</h1>
            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products
                .filter((product) => {
                  if (product.status == "Pizzas") {
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <Grid item xs={4}>
                      <Paper>
                        <SingleProduct product={product} />
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
          <div
            className={`tab-content ${
              category === "Appetizers" ? "active" : ""
            }`}
          >
            <h1 className="food-titles">Món Khai Vị</h1>
            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products
                .filter((product) => {
                  if (product.status == "Appetizers") {
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <Grid item xs={4}>
                      <Paper>
                        <SingleProduct product={product} />
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
          <div
            className={`tab-content ${
              category === "Pastas" ? "active" : ""
            }`}
          >
            <h1 className="food-titles">Mì Ý</h1>
            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products
                .filter((product) => {
                  if (product.status == "Pastas") {
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <Grid item xs={4}>
                      <Paper>
                        <SingleProduct product={product} />
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
          <div
            className={`tab-content ${
              category === "Desserts" ? "active" : ""
            }`}
          >
            <h1 className="food-titles">Món Tráng Miệng</h1>
            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products
                .filter((product) => {
                  if (product.status == "Desserts") {
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <Grid item xs={4}>
                      <Paper>
                        <SingleProduct product={product} />
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
          <div
            className={`tab-content ${
              category === "Beverages" ? "active" : ""
            }`}
          >
            <h1 className="food-titles">Đồ Uống</h1>
            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products
                .filter((product) => {
                  if (product.status == "Beverages") {
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <Grid item xs={4}>
                      <Paper>
                        <SingleProduct product={product} />
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
