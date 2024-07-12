import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const location = useLocation();
  const message = location.state?.message || "";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isMistake, setIsMistake] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://NY2025/backend/api/login.php", {
        userInfo: formData,
      })
      .then((response) => {
        console.log("Response:", response.data);

        if (response.data.status === "success") {
          console.log("Login successful");

          // Збереження токену у куці у браузері клієнта
          const token = response.data.token;
          document.cookie = `t=${token}; expires=${new Date(Date.now() + 30 * 24 * 3600 * 1000).toUTCString()}; path=/`;

          // Перенаправлення на головну сторінку
          navigate("/");
        } else {
          console.log("Login error:", response.data.message);
          setIsMistake(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setIsMistake(true);
      });
  };

  return (
    <>
      <div className="register">
        <div className={`register__container _glass ${isMistake ? "mistake" : ""}`}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <h3>Ім'я:</h3>
                <input
                  className="center"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <h3>Пароль:</h3>
                <input
                  className="center"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="center">
              <button className="btn _glass">
                <p>Увійти</p>
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="comments">
        <div className="comments__block">
          {isMistake ? (
            <div className="error">
              Помилка входу! Перевірте своє ім'я або пароль!
            </div>
          ) : (
            ""
          )}
          {message ? <div>{message}</div> : ""}
        </div>
        <div className="comments__panel"></div>
      </div>
    </>
  );
}
