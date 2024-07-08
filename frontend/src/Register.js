import React, { useState } from "react";
import "./css/register.css";

export function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут ви можете додати логіку для обробки даних форми
    console.log("Form submitted:", formData);
  };

  return (
    <div className="register">
      <div className="register__container _glass">
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
  );
}
