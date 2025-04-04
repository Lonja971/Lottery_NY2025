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
  const handleLinkToLogin = (e) => {
    e.preventDefault();
    navigate("/login")
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${backendPath}/api/register.php`, {
      userInfo: JSON.stringify(formData),
    })
      .then(response => {
        if (response.data.status === 'success') {
          navigate('/login', { state: { message: "You can now log into your account here." } });
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
            <div>
              <label>
                <h3>Confirm password:</h3>
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
                <p>Sign up</p>
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </button>
            </div>
            <p className="comment-block center">Already have an account?<br />Enter it <a href="#" onClick={handleLinkToLogin}>here</a>!</p>
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