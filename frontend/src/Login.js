import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/welcome-animation.css";

export function Login({ backendPath }) {
  const location = useLocation();
  const initialMessage = location.state?.message || "";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [messages, setMessages] = useState([]);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLinkToRegister = (e) => {
    e.preventDefault();
    navigate("/register")
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post( `${backendPath}/api/login.php`, {
        userInfo: formData,
      })
      .then((response) => {
        if (response.data.status === "success") {
          const token = response.data.token;
          document.cookie = `t=${token}; expires=${new Date(Date.now() + 30 * 24 * 3600 * 1000).toUTCString()}; path=/`;

          navigate("/");
        } else {
          console.log("Login error:", response.data.message);
          addMessage("Помилка входу! Перевірте своє ім'я або пароль!", true);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        addMessage("Сталася помилка! Спробуйте ще раз пізніше.", true);
      });
  };

  const addMessage = (message, isError = false) => {
    const id = Date.now();
    setMessages((prevMessages) => [...prevMessages, { id, message, error_message: isError }]);
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== id)
      );
    }, 10000);
  };

  useEffect(() => {
    if (initialMessage) {
      addMessage(initialMessage, false);
    }
  }, [initialMessage]);

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
              <h3 className="welcome-text">! Please note !<br></br>There is sound in the project</h3>
            </div>
          </div>
          <div className="welcome__item-container">
            <div className="welcome__item welcome-logo">
              <img
                src="logo-big.png"
                alt="LOGO-IMG"
              />
              <h3 className="welcome-text">Represents</h3>
            </div>
          </div>
          <div className="welcome__item-container">
            <div className="welcome__item welcome-lottery">
              <img
                src="img/background/lottery_bg-v1.png"
                alt="LOTTERY-IMG"
              />
              <h3 className="welcome-text">New Year's Lottery 2025</h3>
            </div>
          </div>
        </div>
      ) : ""}
      <div className="register">
        <div className="register__container _glass">
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <h3>Name:</h3>
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
                <h3>Password:</h3>
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
                <p>Log in</p>
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </button>
            </div>
            <p className="comment-block center">Don't have an account yet?<br />Create it <a href="#" onClick={handleLinkToRegister}>here</a>!</p>
          </form>
        </div>
      </div>
      <div className="comments">
        <div className="comments__block">
          {messages.map((msg) => (
            <div key={msg.id} className={msg.error_message ? "error" : ""}>
              {msg.message}
            </div>
          ))}
        </div>
        <div className="comments__panel"></div>
      </div>
    </>
  );
}