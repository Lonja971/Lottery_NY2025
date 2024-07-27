import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/modal.css";

export function ChangeName() {
  const location = useLocation();
  const { playerId } = location.state || {};
  console.log(playerId);

  const message = location.state?.message || "";
  const [formData, setFormData] = useState({ username: '' });
  const [isMessage, setIsMessage] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const successfullChange = () => {
    setIsMessage("success");
    navigate('/');
  }
  const sendToMainPage = () => {
    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://NY2025/backend/api/changePlayerName.php", {
        player_id: playerId,
        new_user_name: formData.username,
      })
      .then((response) => {
        if (response.data.status === "success") {
          successfullChange();
        } else {
          console.log("Login error:", response.data.message);
          setIsMessage("error");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setIsMessage("error");
      });
  };

  useEffect(() => {
    if (playerId === undefined){
      navigate("/login");
    }
    if (isMessage) {
      const timer = setTimeout(() => {
        setIsMessage("error");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isMessage, navigate, playerId]);

  return (
    <>
      <div className="modal__close" onClick={sendToMainPage}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="register">
        <div className={`register__container _glass ${isMessage === "error" ? "mistake" : ""}`}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <h3>Нове ім'я:</h3>
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
            <div className="center">
              <button className="btn _glass">
                <p>Змінити</p>
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
          {isMessage !== undefined && (
            isMessage === "error" ? (
              <div className="error">
                Помилка зміни ім'я! Спробуйте ще раз пізніше.
              </div>
            ) : isMessage === "success" ? (
              <div>
                Ваше ім'я успішно змінено.
              </div>
            ) : (
              ""
            )
          )}
          {message ? <div>{message}</div> : ""}
        </div>
        <div className="comments__panel"></div>
      </div>
    </>
  );
}