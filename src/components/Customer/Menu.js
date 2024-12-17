import React, { useEffect, useState } from "react"; 
import axios from "axios"; 
import { Button, ButtonGroup, Card, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap"; 
import { GiHamburgerMenu } from "react-icons/all"; 
import { Grid, Paper } from "@material-ui/core"; 
import SingleProduct from "./Main Pages/SingleProduct";  

// Hàm Menu
const Menu = () => { 
  const [category, setCategoryState] = useState(""); 
  const [products, setProduct] = useState([]);

  useEffect(() => { 
    axios       
      .get("https://product-nezx.onrender.com/products") // Lấy tất cả sản phẩm thông qua API
      .then((res) => {         
        setProduct(res.data);       
      })       
      .catch((err) => {         
        console.log("Lỗi=>" + err);       
      });   
  }, [category]);

  // Hàm này để thay đổi danh mục khi khách hàng nhấn vào một trong các nút danh mục
  function openFoodList(cat) {     
    console.log(cat);     
    setCategoryState(cat);   
  }

  return (     
    <Container fluid={"lg"}>       
      <div className="text-center">         
        <h1 className="main-titles">Thực Đơn</h1>         
        <hr className="main-divide" />       
      </div>       
      <div className="d-flex gap-2">         
        <div style={{ width: "300px" }}>           
          <Card className={"category-card p-3"}>             
            <Card.Body>               
              <Card.Title>                 
                <GiHamburgerMenu className={"d-inline"} />                 
                <span className={"category-title d-inline"}>Danh Mục </span>               
              </Card.Title>               
              <ButtonGroup className={"category-grp pt-3"} vertical>                 
                <Button                   
                  className={"category-btn"}                   
                  onClick={() => openFoodList("")}                 
                >                   
                  Tất Cả                 
                </Button>                 
                <Button                   
                  className={"category-btn"}                   
                  onClick={() => openFoodList("Pizza")}                 
                >                   
                  Pizza                 
                </Button>                 
                <Button                   
                  className={"category-btn"}                   
                  onClick={() => openFoodList("Món Khai Vị")}                 
                >                   
                  Món Khai Vị                 
                </Button>                 
                <Button                   
                  className={"category-btn"}                   
                  onClick={() => openFoodList("Mì Ý")}                 
                >                   
                  Mì Ý                 
                </Button>                 
                <Button                   
                  className={"category-btn"}                   
                  onClick={() => openFoodList("Món Tráng Miệng")}                 
                >                   
                  Món Tráng Miệng                 
                </Button>                 
                <Button                   
                  className={"category-btn"}                   
                  onClick={() => openFoodList("Đồ Uống")}                 
                >                   
                  Đồ Uống                 
                </Button>               
              </ButtonGroup>             
            </Card.Body>           
          </Card>         
        </div>         
        <div className={"p-3"} style={{ width: "100%" }}>           
          <div className={`tab-content ${category === "" ? "active" : ""}`}>             
            <h1 className="food-titles">Bất kỳ</h1>             
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
          <div className={`tab-content ${category === "Pizza" ? "active" : ""}`}>             
            <h1 className="food-titles">Pizza</h1>             
            <hr className="food-divide" />             
            <Grid container spacing={3}>               
              {products                 
                .filter((product) => {                   
                  if (product.status === "Pizza") {                      
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
          <div className={`tab-content ${category === "Món Khai Vị" ? "active" : ""}`}>             
            <h1 className="food-titles">Món Khai Vị</h1>             
            <hr className="food-divide" />             
            <Grid container spacing={3}>               
              {products                 
                .filter((product) => {                   
                  if (product.status === "Món Khai Vị") {                     
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
          <div className={`tab-content ${category === "Mì Ý" ? "active" : ""}`}>             
            <h1 className="food-titles">Mì Ý</h1>             
            <hr className="food-divide" />             
            <Grid container spacing={3}>               
              {products                 
                .filter((product) => {                   
                  if (product.status === "Mì Ý") {                     
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
          <div className={`tab-content ${category === "Món Tráng Miệng" ? "active" : ""}`}>             
            <h1 className="food-titles">Món Tráng Miệng</h1>             
            <hr className="food-divide" />             
            <Grid container spacing={3}>               
              {products                 
                .filter((product) => {                   
                  if (product.status === "Món Tráng Miệng") {                     
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
          <div className={`tab-content ${category === "Đồ Uống" ? "active" : ""}`}>             
            <h1 className="food-titles">Đồ Uống</h1>             
            <hr className="food-divide" />             
            <Grid container spacing={3}>               
              {products                 
                .filter((product) => {                   
                  if (product.status === "Đồ Uống") {                     
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

export default Menu;
