import React, { useEffect, useState } from "react"; 
import { Card, Container, Row, Col, Badge, Form, Dropdown, } from "react-bootstrap"; 
import "../../../stylesheets/ViewProduct.css"; 
import UpdateIcon from "@material-ui/icons/Update"; 
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"; 
import axios from "axios"; 
import { useHistory } from "react-router-dom"; 
import { Button, CardContent, CardMedia, Grid, Paper, Typography, } from "@material-ui/core"; 
import AddIcon from "@material-ui/icons/Add"; 
import { MdAddShoppingCart } from "react-icons/all"; 

function ViewProducts(props) { 
  const [products, setProducts] = useState([]); 
  const [view, viewState] = useState(false); 
  const [vdelete, viewDelete] = useState(false); 
  const history = useHistory();

  useEffect(() => { 
    axios
      .get("https://product-nezx.onrender.com/products")
      .then((res) => { 
        setProducts(res.data); 
      })
      .catch((err) => { 
        console.log("lỗi=>", err); 
      }); 
  }, [view]);

  const filterByCategory = (status) => { 
    axios
      .get(`https://product-nezx.onrender.com/products/filter/${status}`)
      .then((res) => { 
        setProducts(res.data); 
        if (!viewState) { 
          viewState(true); 
        } else { 
          viewState(false); 
        } 
      })
      .catch((err) => { 
        console.log("lỗi=>", err); 
      }); 
  };

  const addNewProduct = () => { 
    window.location = "/admin/add-product"; 
  };

  const removeProduct = (id) => { 
    axios
      .delete(`https://product-nezx.onrender.com/products//remove/${id}`)
      .then((res) => { 
        window.location = "/admin/view-products"; 
        alert("Xóa sản phẩm thành công"); 
        if (!viewDelete) { 
          viewDelete(true); 
        } else { 
          viewDelete(false); 
        } 
      })
      .catch((err) => { 
        console.log("lỗi=>", err); 
      }); 
  };

  const viewAll = () => { 
    axios
      .get("https://product-nezx.onrender.com/products")
      .then((res) => { 
        setProducts(res.data); 
      })
      .catch((err) => { 
        console.log("lỗi=>", err); 
      }); 
  };

  const updateTheProduct = (product) => { 
    history.push({ 
      pathname: `/admin/update-product/${product._id}`, 
      state: { 
        product: product, 
      }, 
    }); 
  };

  if (products.length > 0) { 
    return ( 
      <div> 
        <Container className="pt-3"> 
          <Card className={"p-5 mb-3"}> 
            <div className="text-center mb-2"> 
              <h1 className="form-titles m-0">QUẢN LÝ SẢN PHẨM</h1> 
              <Row className="mb-3 align-items-center"> 
                <Col lg={10}> 
                  <div className={"d-flex align-items-center "}> 
                    <div> 
                      <Form.Group 
                        className={"pt-3 "} 
                        style={{ marginRight: "30px", color: "#747474" }} 
                        controlId="formGridState" 
                      > 
                        <Form.Label>Lọc theo danh mục</Form.Label> 
                      </Form.Group> 
                    </div> 
                    <div className={"ml-3"}> 
                      <Dropdown> 
                        <Dropdown.Toggle 
                          className={"text-start"} 
                          style={{ width: "120px" }} 
                          variant="success" 
                          id="dropdown-basic" 
                        > 
                          Tất cả 
                        </Dropdown.Toggle> 
                        <Dropdown.Menu> 
                          <Dropdown.Item onClick={viewAll}>Tất cả</Dropdown.Item> 
                          <Dropdown.Item onClick={filterByCategory.bind(this, "Pizzas")}>Pizza</Dropdown.Item> 
                          <Dropdown.Item onClick={filterByCategory.bind(this, "Pastas")}>Mì Ý</Dropdown.Item> 
                          <Dropdown.Item onClick={filterByCategory.bind(this, "Appetizers")}>Món khai vị</Dropdown.Item> 
                          <Dropdown.Item onClick={filterByCategory.bind(this, "Desserts")}>Món tráng miệng</Dropdown.Item> 
                          <Dropdown.Item onClick={filterByCategory.bind(this, "Beverages")}>Đồ uống</Dropdown.Item> 
                        </Dropdown.Menu> 
                      </Dropdown> 
                    </div> 
                  </div> 
                </Col> 
                <Col lg={2}> 
                  <Button 
                    style={{ backgroundColor: "#c92e31", color: "white" }} 
                    startIcon={<AddIcon />} 
                    onClick={addNewProduct} 
                    className={"mt-3"} 
                  > 
                    Thêm 
                  </Button> 
                </Col> 
              </Row> 
              <hr className="divide" /> 
            </div> 
            <Grid container spacing={3}> 
              {products.map((product, index) => { 
                return ( 
                  <Grid item xs={4}> 
                    <Paper> 
                      <div key={index}> 
                        <Card> 
                          <CardMedia 
                            style={{ borderStyle: "none" }} 
                            component="img" 
                            height="190" 
                            image="" 
                            src={`http://localhost:3000/Profile/${product.image}`} 
                            title="Contemplative Reptile" 
                          /> 
                          <CardContent> 
                            <Typography gutterBottom component="h2"> 
                              {product.title} 
                            </Typography> 
                            <Typography 
                              style={{ fontSize: "12px" }} 
                              color="textSecondary" 
                              component="p" 
                            > 
                              {product.description} 
                            </Typography> 
                            <Typography 
                              style={{ fontSize: "11px", textAlign: "end" }} 
                              component="div" 
                              color="textSecondary" 
                            > 
                              Bắt đầu từ :{" "} 
                              <Typography color="textPrimary" component="span"> 
                                {product.prices.regular} 
                              </Typography> 
                            </Typography> 
                          </CardContent> 
                          <div className="d-flex justify-content-around "> 
                            <Button 
                              size="small" 
                              style={{ 
                                backgroundColor: "#70a401", 
                                color: "white", 
                              }} 
                              className={"m-2"} 
                              startIcon={<UpdateIcon />} 
                              onClick={() => updateTheProduct(product)} 
                            > 
                              Cập nhật 
                            </Button> 
                            <Button 
                              style={{ 
                                backgroundColor: "#e13340", 
                                color: "white", 
                              }} 
                              size="small" 
                              color="primary" 
                              className={"m-2"} 
                              startIcon={<DeleteForeverIcon />} 
                              onClick={removeProduct.bind(this, product._id)} 
                            > 
                              Xóa 
                            </Button> 
                          </div> 
                        </Card> 
                      </div> 
                    </Paper> 
                  </Grid> 
                ); 
              })}{" "} 
            </Grid> 
          </Card> 
        </Container> 
      </div> 
    ); 
  } else { 
    return ( 
      <div> 
        <Container className="pt-3"> 
          <Card className={"p-5 mb-3"}> 
            <div className="text-center mb-2"> 
              <h1 className="form-titles m-0">QUẢN LÝ SẢN PHẨM</h1> 
              <Row className="mb-3 align-items-center"> 
                <Col lg={10}> 
                  <div className={"d-flex align-items-center "}> 
                    <div> 
                      <Form.Group 
                        className={"pt-3 "} 
                        style={{ marginRight: "30px", color: "#747474" }} 
                        controlId="formGridState" 
                      > 
                        <Form.Label>Lọc theo danh mục</Form.Label> 
                      </Form.Group> 
                    </div> 
                    <div className={"ml-3"}> 
                      <Dropdown> 
                        <Dropdown.Toggle 
                          className={"text-start"} 
                          style={{ width: "120px" }} 
                          variant="success" 
                          id="dropdown-basic" 
                        > 
                          Tất cả 
                        </Dropdown.Toggle> 
                        <Dropdown.Menu> 
                          <Dropdown.Item onClick={viewAll}>Tất cả</Dropdown.Item> 
                          <Dropdown.Item onClick={filterByCategory.bind(this, "Pizzas")}>Pizza</Dropdown.Item> 
                          <Dropdown.Item onClick={filterByCategory.bind(this, "Pastas")}>Mì Ý</Dropdown.Item> 
                          <Dropdown.Item onClick={filterByCategory.bind(this, "Appetizers")}>Món khai vị</Dropdown.Item> 
                          <Dropdown.Item onClick={filterByCategory.bind(this, "Desserts")}>Món tráng miệng</Dropdown.Item> 
                          <Dropdown.Item onClick={filterByCategory.bind(this, "Beverages")}>Đồ uống</Dropdown.Item> 
                        </Dropdown.Menu> 
                      </Dropdown> 
                    </div> 
                  </div> 
                </Col> 
                <Col lg={2}> 
                  <Button 
                    style={{ backgroundColor: "#c92e31", color: "white" }} 
                    startIcon={<AddIcon />} 
                    onClick={addNewProduct} 
                    className={"mt-3"} 
                  > 
                    Thêm 
                  </Button> 
                </Col> 
              </Row> 
              <hr className="divide" /> 
            </div> 
            <h1 className={"text-center mt-4 nodata-text"}> 
              Không có sản phẩm nào để xem. 
            </h1> 
            <h1 className={"text-center mt-4 nodata-sub-text"}> 
              Vui lòng thử lại. 
            </h1> 
          </Card> 
        </Container> 
      </div> 
    ); 
  } 
} 

export default ViewProducts;
