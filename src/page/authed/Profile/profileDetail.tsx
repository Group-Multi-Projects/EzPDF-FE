import React, { useState } from "react";
import "./profileDetail.scss";

const ProfileDetail = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="account-page">
      <h1 className="account-title">Tài khoản</h1>
      <div className="profile-section">
        <img className="avatar-circle" src="https://media.vanityfair.com/photos/5f5245d91e10df7a77868af6/4:3/w_1776,h_1332,c_limit/avatar-the-last-airbender.jpg" alt="anh" />
        <button className="change-avatar-btn">Thay ảnh đại diện</button>
      </div>

      <div className="account-info">
      <label>Tên</label>

        <div className="info-item">
          <input type="text" placeholder="User name" />
          <button className="save-btn">Lưu</button>
        </div>
        <label>Email</label>

        <div className="info-item">
          <input type="email" placeholder="Useremail@gmail.com" />
          <button className="save-btn">Lưu</button>
        </div>
        <label>Password</label>

        <div className="info-item">
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              👁️
            </span>
          </div>
          <button className="save-btn">Lưu</button>
        </div>
      </div>

      <button className="save-all-btn">Lưu Thay đổi</button>
    </div>
  );
};

export default ProfileDetail;
