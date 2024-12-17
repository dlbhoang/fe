import React, { useRef, useEffect } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // React Router's navigation hook

export default function Paypal({ totalAmount, description = "Your Purchase" }) {
  const paypal = useRef();
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    if (!window.paypal) {
      console.error("PayPal SDK not loaded. Please ensure the script is included.");
      return;
    }

    // Initialize PayPal Buttons
    window.paypal
      .Buttons({
        // Create the order
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: description, // Use the passed description or default value
                amount: {
                  currency_code: "USD", // Update currency code as needed
                  value: totalAmount.toFixed(2), // Use totalAmount dynamically and ensure it's formatted
                },
              },
            ],
          });
        },

        // When the payment is approved
        onApprove: async (data, actions) => {
          try {
            const order = await actions.order.capture();
            console.log("Order captured:", order);

            // Navigate to success page after successful payment
            navigate("/OrderSuccess", {
              state: {
                orderDetails: order, // Pass order details to the success page
              },
            });
          } catch (error) {
            console.error("Error capturing the order:", error);
            alert("There was an issue capturing the order. Please try again.");
          }
        },

        // When there's an error
        onError: (err) => {
          console.error("PayPal Button Error:", err);
          alert("An error occurred during payment. Please try again.");
        },
      })
      .render(paypal.current); // Render PayPal buttons into the DOM element
  }, [description, totalAmount, navigate]); // Dependencies

  return (
    <Container className="pt-3">
      <Card className="p-4 mb-4">
        <Form>
          <Form.Group>
            <div ref={paypal} />
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
}
