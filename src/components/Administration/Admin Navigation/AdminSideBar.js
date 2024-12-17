import React, { useEffect, useState } from "react";
import "../../../stylesheets/adminbar.css";
import axios from "axios";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineUserAdd,
  CgReorder,
  FaClipboardList,
  FaEye,
  FaShuttleVan,
  FaSignOutAlt,
  FaUserMd,
  FaUsers,
  GiHamburgerMenu,
  GiPayMoney,
  MdDashboard,
  MdLibraryAdd,
} from "react-icons/all";
import { Link } from "react-router-dom";

function AdminSideBar(props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    props.onCollapse(active);
  }, [active]);

  const toggleMenu = () => {
    setActive(!active);
    const toggle = document.querySelector(".toggle");
    const navigation = document.querySelector(".navigation");
    const main = document.querySelector(".main");

    toggle.classList.toggle("active");
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  };

  const toggleDrop = (e) => {
    const dropdown = e.target.closest(".drop-btn");
    const dropdownContent = dropdown.nextElementSibling;

    dropdown.classList.toggle("active");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  };

  const Logout = () => {
    axios
      .get("https://user-9iyb.onrender.com/auth/logout")
      .then((response) => {
        localStorage.removeItem("user");
        localStorage.removeItem("userid");
        localStorage.removeItem("icon_id");
        localStorage.removeItem("Email");
        localStorage.removeItem("__paypal_storage__");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderAdminSidebar = () => (
    <div className="sidebar-container">
      <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <div className="portal-image">
                <img src="/PizzaHut.svg" alt="Logo" />
              </div>
            </a>
          </li>
          <li>
            <a href="/admin/dashboard">
              <span className="icon">
                <MdDashboard />
              </span>
              <span className="title">Bảng điều khiển</span>
            </a>
          </li>
          {/* Quản lý người dùng */}
          <li>
            <a onClick={toggleDrop} className="drop-btn">
              <span className="icon">
                <FaUserMd />
              </span>
              <span className="title">Quản lý người dùng</span>
              <span className="icon-end">
                <AiFillCaretDown />
              </span>
              <span className="icon-end-up">
                <AiFillCaretUp />
              </span>
            </a>
            <div className="dropdown-container">
              <a href="/admin/um/view-users" className="list-item">
                <span className="sub-icon">
                  <FaEye className="ic" />
                </span>
                <span className="subtitle">Xem người dùng</span>
              </a>
              <a href="/admin/um/add-user" className="list-item">
                <span className="sub-icon">
                  <AiOutlineUserAdd className="ic" />
                </span>
                <span className="subtitle">Thêm người dùng</span>
              </a>
            </div>
          </li>
          {/* Quản lý sản phẩm */}
          <li>
            <a onClick={toggleDrop} className="drop-btn">
              <span className="icon">
                <FaClipboardList />
              </span>
              <span className="title">Quản lý sản phẩm</span>
              <span className="icon-end">
                <AiFillCaretDown />
              </span>
              <span className="icon-end-up">
                <AiFillCaretUp />
              </span>
            </a>
            <div className="dropdown-container">
              <a href="/admin/view-products" className="list-item">
                <span className="sub-icon">
                  <FaEye className="ic" />
                </span>
                <span className="subtitle">Xem sản phẩm</span>
              </a>
              <a href="/admin/add-product" className="list-item">
                <span className="sub-icon">
                  <MdLibraryAdd className="ic" />
                </span>
                <span className="subtitle">Thêm sản phẩm</span>
              </a>
            </div>
          </li>
          {/* Quản lý đơn hàng */}
          <li>
            <a onClick={toggleDrop} className="drop-btn">
              <span className="icon">
                <CgReorder />
              </span>
              <span className="title">Quản lý đơn hàng</span>
              <span className="icon-end">
                <AiFillCaretDown />
              </span>
              <span className="icon-end-up">
                <AiFillCaretUp />
              </span>
            </a>
            <div className="dropdown-container">
              <a href="/admin/orders" className="list-item">
                <span className="sub-icon">
                  <FaEye className="ic" />
                </span>
                <span className="subtitle">Xem đơn hàng</span>
              </a>
            </div>
          </li>
          {/* Quản lý thanh toán */}
          <li>
            <a onClick={toggleDrop} className="drop-btn">
              <span className="icon">
                <GiPayMoney />
              </span>
              <span className="title">Quản lý thanh toán</span>
              <span className="icon-end">
                <AiFillCaretDown />
              </span>
              <span className="icon-end-up">
                <AiFillCaretUp />
              </span>
            </a>
            <div className="dropdown-container">
              <a href="/admin/payment/management" className="list-item">
                <span className="sub-icon">
                  <FaEye className="ic" />
                </span>
                <span className="subtitle">Xem thanh toán</span>
              </a>
            </div>
          </li>
          {/* Đăng xuất */}
          <li>
            <Link onClick={Logout}>
              <span className="icon">
                <FaSignOutAlt />
              </span>
              <span className="title">Đăng xuất</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className={"main"}>
        <div className={"top-bar"}>
          <div className={"toggle"}>
            <GiHamburgerMenu className={"icon"} onClick={toggleMenu} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBranchManagerSidebar = () => (
    <div className="sidebar-container">
      <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <div className="portal-image">
                <img src="/PizzaHut.png" alt="Logo" />
              </div>
            </a>
          </li>
          <li>
            <a href="/admin/dashboard">
              <span className="icon">
                <MdDashboard />
              </span>
              <span className="title">Bảng điều khiển</span>
            </a>
          </li>
          {/* Quản lý nhân viên */}
          <li>
            <a onClick={toggleDrop} className="drop-btn">
              <span className="icon">
                <FaUsers className="ic" />
              </span>
              <span className="title">Quản lý nhân viên</span>
              <span className="icon-end">
                <AiFillCaretDown />
              </span>
              <span className="icon-end-up">
                <AiFillCaretUp />
              </span>
            </a>
            <div className="dropdown-container">
              <a href="/admin/um/view-users" className="list-item">
                <span className="sub-icon">
                  <FaEye className="ic" />
                </span>
                <span className="subtitle">Xem nhân viên</span>
              </a>
              <a href="/admin/um/add-user" className="list-item">
                <span className="sub-icon">
                  <AiOutlineUserAdd className="ic" />
                </span>
                <span className="subtitle">Thêm nhân viên</span>
              </a>
            </div>
          </li>
          {/* Quản lý xe */}
          <li>
            <a href="/admin/dashboard">
              <span className="icon">
                <FaShuttleVan className="ic" />
              </span>
              <span className="title">Quản lý xe</span>
            </a>
          </li>
        </ul>
      </div>

      <div className={"main"}>
        <div className={"top-bar"}>
          <div className={"toggle"}>
            <GiHamburgerMenu className={"icon"} onClick={toggleMenu} />
          </div>
        </div>
      </div>
    </div>
  );

  if (localStorage.getItem("user") === "Admin") {
    return renderAdminSidebar();
  } else if (localStorage.getItem("user") === "BranchManager") {
    return renderBranchManagerSidebar();
  } else {
    return null;
  }
}

export default AdminSideBar;
