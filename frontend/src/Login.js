import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/welcome-animation.css";

export function Login() {
  const location = useLocation();
  const message = location.state?.message || "";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isMistake, setIsMistake] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
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
        if (response.data.status === "success") {
          const token = response.data.token;
          document.cookie = `t=${token}; expires=${new Date(Date.now() + 30 * 24 * 3600 * 1000).toUTCString()}; path=/`;

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

  useEffect(() => {
    if (isMistake) {
      const timer = setTimeout(() => {
        setIsMistake(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isMistake]);

  useEffect(() => {
    const welcomeWomT = localStorage.getItem('welcomeWomT');
    if (!welcomeWomT) {
      setIsFirstVisit(true);
      localStorage.setItem('welcomeWomT', 'true');
    }
  }, []);

  return (
    <>
      {isFirstVisit ? (
        <div className="welcome">
          <div className="welcome__item-container">
            <div className="welcome__item welcome-alert">
                <img
                  src="img/background/alert.png"
                  alt="ALERT-IMG"
                />
                <h3 className="welcome-text">! Увага !<br></br>В проекті присутній звук</h3>
            </div>
          </div>
          <div className="welcome__item-container">
            <div className="welcome__item welcome-logo">
                <img
                  src="logo-big.png"
                  alt="LOGO-IMG"
                />
                <h3 className="welcome-text">Представляє</h3>
            </div>
          </div>
          <div className="welcome__item-container">
            <div className="welcome__item welcome-lottery">
                <img
                  src="logo-ng"
                  alt="LOTTERY-IMG"
                />
                <h3 className="welcome-text">Новорічна Лотерея 2025</h3>
            </div>
          </div>
        </div>
      ) : ""}
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
            <p className="comment-block center">Ще немає аккаунту? Створіть його <a href="http://localhost:3000/register">тут</a> !</p>
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