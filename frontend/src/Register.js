import React, { useEffect, useState } from "react";
import "./css/register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register({ backendPath }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isMistake, setIsMistake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isMistake) {
      const timer = setTimeout(() => {
        setIsMistake(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isMistake]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${backendPath}/api/register.php`, {
      userInfo: JSON.stringify(formData),
    })
      .then(response => {
        if (response.data.status === 'success') {
          navigate('/login', { state: { message: "Тепер ви можете увійти в свій аккаунт тут." } });
        } else {
          setErrorMessage(response.data.message);
          console.log(response.data.message);
          setIsMistake(true);
        }
      })
      .catch(error => {
        setErrorMessage('There was an error!');
        setIsMistake(true);
        console.error('There was an error!', error);
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
            <div>
              <label>
                <h3>Підтвердіть пароль:</h3>
                <input
                  className="center"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="center">
              <button className="btn _glass">
                <p>Зареєструватися</p>
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </button>
            </div>
            <p className="comment-block center">Вже є аккаунту? Увійдіть в нього <a href="http://localhost:3000/login">тут</a> !</p>
          </form>
        </div>
      </div>
      <div className="comments">
        <div className="comments__block">
          {isMistake ? <div className="error">{errorMessage}</div> : ""}
        </div>
        <div className="comments__panel">
        </div>
      </div>
    </>
  );
}