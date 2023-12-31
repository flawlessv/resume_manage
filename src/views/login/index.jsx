import { message } from "antd";
import axios from "axios";
import React from "react";
import "./index.css";
import { useNavigate } from "react-router";
import ParticlesBg from "particles-bg";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    const input = document.getElementsByTagName("input");
    const username = input[0].value;
    const password = input[1].value;
    console.log(username, password);
    axios
      .get(
        `/users?username=${username}&password=${password}&roleState=true&_expand=role`
      )
      .then((res) => {
        if (res.data.length === 0) {
          message.error("登录失败");
        } else {
          localStorage.setItem("token", JSON.stringify(res.data[0]));
          setTimeout(() => {
            message.success("登陆成功");
            navigate("/home");
          }, 500);
        }
      });
  };
  return (
    <>
      <div className="my-login-box">
        <h2>简历魔法屋后台登录</h2>
        <div>
          <div className="user-box">
            <input
              type="text"
              name="username"
              required=""
              placeholder="测试用户名:admin"
            />
            <label>用户名</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              required=""
              placeholder="密码:111"
            />
            <label>密码</label>
          </div>
          <button onClick={handleLogin}>
            <span></span>
            <span></span>
            <span></span>
            <span></span> 登录
          </button>
        </div>
      </div>
      <ParticlesBg type="circle" bg={true} />
    </>
  );
};

export default Login;
