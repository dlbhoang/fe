import React, { useRef, useEffect, useState } from "react"; 
import { Card, Container, Form, Table, Row } from "react-bootstrap"; 

// Hàm Paypal này có ba phương thức thanh toán: 
// 1) Thanh toán qua PayPal 
// 2) Thanh toán qua thẻ MasterCard PayPal 
// 3) Phương thức thanh toán Google
export default function Paypal() {
  const paypal = useRef();

  useEffect(() => {
    // Tích hợp PayPal
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Bàn đẹp mắt",
                amount: {
                  currency_code: "USD",
                  value: "total", // Lấy giá trị tổng tiền từ biến 'total'
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          // Nếu thanh toán qua PayPal thành công, bạn có thể điều hướng tới trang thành công
          // history.push({
          //     pathname: `/OrderSuccess`,
          //     state: {},
          // });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);  // Render nút PayPal
  }, [4]);

  return (
    <Container className={"pt-3"}>
      <Card className={"p-4 mb-4"}>
        <Form>
          <Form.Group>
            {/* Nơi hiển thị nút PayPal */}
            <div ref={paypal} />
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
}
