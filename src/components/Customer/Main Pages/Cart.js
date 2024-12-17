import React, { useEffect, useState } from "react"; 
import { Card, Col, Container, Row, Table } from "react-bootstrap"; 
import { Button, Grid, Paper, Typography } from "@material-ui/core"; 
import { GrNext, MdAddShoppingCart } from "react-icons/all"; 
import NavigateNextIcon from "@material-ui/icons/NavigateNext"; 
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"; 
import axios from "axios";   
import { useHistory } from "react-router"; 

function Cart(props) { 
  const [products, setProducts] = useState([]); 
  const history = useHistory(); 
  const [total, setTotal] = useState(0); 
  const [value, setValue] = useState(0);  

  useEffect(() => { 
    // Lấy danh sách sản phẩm trong giỏ hàng
    axios.get(`https://oder.onrender.com/carts/${localStorage.getItem("userid")}`).then((res) => {  
      console.log(res.data); 
      setProducts(res.data); 
    }).then(() => { 
      // Lấy tổng tiền của giỏ hàng
      axios.get(`https://oder.onrender.com/carts/total/${localStorage.getItem("userid")}`).then(res => { 
        setTotal(res.data.total); 
        console.log(total); 
      }) 
    }).catch((err) => { 
      console.log("err=>" + err); 
    }); 
  }, [value]);

  // Xóa sản phẩm khỏi giỏ hàng
  const removeProduct = (product) => { 
    axios.delete(`https://oder.onrender.com/carts/delete/${product._id}`).then((res) => { 
      setValue(value + 1); 
    }).catch((err) => { 
      console.log("err=>" + err); 
    }); 
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng (tăng số lượng)
  function increamentCount(p) { 
    const qty = p.qty + 1; 
    const product = { qty: qty } 
    axios.patch(`https://oder.onrender.com/carts/update/${p._id}`, product).then(res => { 
      setValue(value + 1); 
    }).catch(err => { 
      console.log(err); 
    }) 
  }

  // Hàm tính tổng tiền của giỏ hàng
  function getTotal() { 
    return total; 
  }

  // Tiến hành thanh toán
  function continueToCheckout() { 
    if(total > 0) { 
      history.push({ 
        pathname: "/checkout", 
        state: { 
          total: total, 
          product: products 
        } 
      }) 
    } else { 
      alert('Giỏ hàng không có sản phẩm để thanh toán') 
    } 
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng (giảm số lượng)
  function decreamentCount(p) { 
    if (p.qty > 0) { 
      const qty = p.qty - 1; 
      const product = { qty: qty } 
      axios.patch(`https://oder.onrender.com/carts/update/${p._id}`, product).then(res => { 
        setValue(value + 1); 
      }).catch(err => { 
        console.log(err); 
      }) 
    } 
  }

  return ( 
    <Container fluid={"lg"}> 
      <Card className={"mt-2"}> 
        <Card.Body> 
          <Row> 
            <Col lg={9}> 
              <div className=""> 
                <h1 className="cart-titles">Giỏ hàng</h1> 
                <hr className="food-divide"/> 
              </div> 
              <Grid container spacing={3}> 
                { 
                  products.map((product, index) => { 
                    return ( 
                      <Grid item xs={12}> 
                        <Paper className={"p-2 "}> 
                          <div className="d-flex justify-content-around align-items-center"> 
                            <div className="p-2 "> 
                              { 
                                product.title + "(" + product.size + ")" 
                              } 
                            </div> 
                            <div className="p-2 text-center"> 
                              <div> 
                                <div className={"d-flex justify-content-center "}> 
                                  <Button style={{ color: "#c92e31" }} onClick={increamentCount.bind(this, product)}> 
                                    + 
                                  </Button> 
                                  <span className={"p-2"}> 
                                    { product.qty } 
                                  </span> 
                                  <Button style={{ color: "#c92e31" }} onClick={decreamentCount.bind(this, product)}> 
                                    - 
                                  </Button> 
                                  <br/> 
                                </div> 
                              </div> 
                            </div> 
                            <div className="p-2 "> 
                              { "VND" + product.price + ".00" } 
                            </div> 
                            <div className="p-2 "> 
                              <Button startIcon={<RemoveCircleOutlineIcon/>} style={{ color: "#c92e31" }} onClick={removeProduct.bind(this, product)}> 
                                Xóa 
                              </Button> 
                            </div> 
                          </div> 
                        </Paper> 
                      </Grid> 
                    ); 
                  }) 
                } 
              </Grid> 
            </Col> 
            <Col lg={3}> 
              <div className="text-center"> 
                <h1 className="cart-titles">Tóm tắt</h1> 
                <hr className="food-divide"/> 
              </div> 
              <Button variant="primary" style={{ backgroundColor: "#70a401", color: "white", fontSize: "12px", padding: "10px 20px 8px 20px" }}> 
                Nhập mã giảm giá của bạn 
              </Button> 
              <Button variant="primary" className={"mt-3"} style={{ backgroundColor: "#808080", fontSize: "12px", color: "white", padding: "10px 20px 8px 20px" }}> 
                Sử dụng mã giảm giá GES 
              </Button> 
              <Table striped bordered className={"mt-2"}> 
                <tbody> 
                  <tr> 
                    <td className={"bill-fields"}>Tổng phụ</td> 
                    <td className={"bill-fields text-right "} width={25}> 
                      { 'VND' + getTotal() + '.00' } 
                    </td> 
                  </tr> 
                  <tr> 
                    <td className={"bill-fields"}>Giảm giá</td> 
                    <td className={"bill-fields text-right "} width={25}> 
                      .00 
                    </td> 
                  </tr> 
                  <tr> 
                    <td className={"bill-fields"}>Phí dịch vụ(5.00%)</td> 
                    <td className={"bill-fields text-right "} width={25}> 
                      .00 
                    </td> 
                  </tr> 
                  <tr> 
                    <td colSpan="2" className={"bill-total-field"}> 
                      <div className={"d-flex justify-content-end"}> 
                        <div className={"p-2"}>Tổng cộng:</div> 
                        <div className={"p-2"}> 
                          { 'VND' + getTotal() + '.00' } 
                        </div> 
                      </div> 
                    </td> 
                  </tr> 
                </tbody> 
              </Table> 
              <Button variant="primary" className={"mt-3"} endIcon={<NavigateNextIcon />} style={{ backgroundColor: "#c92e31", fontSize: "12px", color: "white", padding: "10px 20px 8px 20px" }} onClick={continueToCheckout}> 
                Tiến hành thanh toán 
              </Button> 
            </Col> 
          </Row> 
        </Card.Body> 
      </Card> 
    </Container> 
  ); 
} 

export default Cart; 
