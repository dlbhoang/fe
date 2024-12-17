import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import "../../../stylesheets/Profile.css";
import { Button } from "@material-ui/core";
import { FaRegAddressBook, MdNotificationsNone, RiHistoryLine, RiSettings2Line, RiSuitcaseFill } from "react-icons/all";
import CurrentOrders from "./Profile Sub Components/CurrentOrders";
import OrderHistory from "./Profile Sub Components/OrderHistory";
import AddressBook from "./Profile Sub Components/AddressBook";
import Notifications from "./Profile Sub Components/Notifications";
import Settings from "./Profile Sub Components/Settings";

function Profile() {
  const [section, setSectionState] = useState("current-orders");

  const openSection = (value) => {
    console.log(value);
    setSectionState(value);
  };

  const sections = {
    "current-orders": <CurrentOrders />,
    "order-history": <OrderHistory />,
    "address-book": <AddressBook />,
    "notifications": <Notifications />,
    "settings": <Settings />
  };

  return (
    <div>
      <Container fluid>
        <div className="d-flex gap-2">
          {/* Profile Box */}
          <Card className="profile-box text-center">
            <div className="text-center">
              <h1 className="account-titles">Hồ Sơ Của Tôi</h1>
            </div>
            <div>
              <img
                src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800"
                className="profile-image"
                alt="Profile"
              />
            </div>
            <div className="d-grid mb-3">
              <span className="profile-text">Mandara Fernando</span>
              <span className="number-text">+94 77 8341425</span>
            </div>
            <div className="d-grid">
              <Button
                className="profile-button"
                startIcon={<RiSuitcaseFill />}
                onClick={() => openSection("current-orders")}
              >
                Đơn Hàng Hiện Tại
              </Button>
              <Button
                className="profile-button"
                startIcon={<RiHistoryLine />}
                onClick={() => openSection("order-history")}
              >
                Lịch Sử Đơn Hàng
              </Button>
              <Button
                className="profile-button"
                startIcon={<FaRegAddressBook />}
                onClick={() => openSection("address-book")}
              >
                Sổ Địa Chỉ
              </Button>
              <Button
                className="profile-button"
                startIcon={<MdNotificationsNone />}
                onClick={() => openSection("notifications")}
              >
                Thông Báo
              </Button>
              <Button
                className="profile-button"
                startIcon={<RiSettings2Line />}
                onClick={() => openSection("settings")}
              >
                Cài Đặt
              </Button>
            </div>
          </Card>
          
          {/* Content Area */}
          <div style={{ width: "100%" }}>
            <div className={`profile-content ${section === "current-orders" ? "" : "d-none"}`}>
              {sections["current-orders"]}
            </div>
            <div className={`profile-content ${section === "order-history" ? "" : "d-none"}`}>
              {sections["order-history"]}
            </div>
            <div className={`profile-content ${section === "address-book" ? "" : "d-none"}`}>
              {sections["address-book"]}
            </div>
            <div className={`profile-content ${section === "notifications" ? "" : "d-none"}`}>
              {sections["notifications"]}
            </div>
            <div className={`profile-content ${section === "settings" ? "" : "d-none"}`}>
              {sections["settings"]}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
