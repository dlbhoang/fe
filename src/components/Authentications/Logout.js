import React, { useEffect, useState } from "react"; 
import axios from "axios";  

// Logout Function 
function Logout(props) {  
  useEffect(() => {
    axios
      .get("https://user-9iyb.onrender.com/auth/logout")
      .then((response) => {
        // Xóa tất cả thông tin người dùng khỏi localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("userid");
        localStorage.removeItem("icon_id");
        localStorage.removeItem("Email");
        localStorage.removeItem("__paypal_storage__");

        // Chuyển hướng người dùng về trang chủ
        window.location.href = "/";
      })
      .catch((err) => {
        console.log("Lỗi khi đăng xuất: ", err);
      });
  }, []);

  return (
    <div>
      <h3>Đang đăng xuất...</h3>
      <p>Vui lòng đợi trong giây lát...</p>
    </div>
  );
}

export default Logout;
