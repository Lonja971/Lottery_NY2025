import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Register } from "./Register";
import { Login } from "./Login";

//---Ways-to-the-backend:

const mamp = "http://localhost:8888/LOTTERY_NY2025/backend"
const osPanel = "http://NY2025/backend"
const plesk = "https://97108289.hetictlyceum.nl/NY_2025"

function App() {
  const backendPath = osPanel;

  const targetDate = new Date("2024-12-16T11:00:00");
  const endDate = new Date("2030-01-03T11:00:00");

  const calculateTimeLeft = () => {
    const now = new Date();

    if (now < targetDate) {
      const difference = targetDate - now;
      return { status: "before", ...getTimeParts(difference) };
    } else if (now >= targetDate && now < endDate) {
      const difference = endDate - now;
      return { status: "active", ...getTimeParts(difference) };
    } else {
      return { status: "after" };
    }
  };

  const getTimeParts = (difference) => {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Router>
      <div>
        {timeLeft.status === "before" && (
          <div className="register">
            <div className="register__container _glass">
              <div className="timebox p">
              Voor aanvang van de Nieuwjaarloterij 2025:
                <div className="timebox-time">
                    <div className="timebox-time__item" >{timeLeft.days} <br/> Dagen</div>
                    <div className="timebox-time__item" >{timeLeft.hours} <br/> Uur</div>
                    <div className="timebox-time__item" >{timeLeft.minutes} <br/> Minuten</div>
                    <div className="timebox-time__item" >{timeLeft.seconds} <br/> Seconden</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {timeLeft.status === "active" && (
          <Routes>
            <Route path="/" element={<Home backendPath={backendPath} timeLeft={timeLeft} />} />
            <Route path="/register" element={<Register backendPath={backendPath} />} />
            <Route path="/login" element={<Login backendPath={backendPath} />} />
          </Routes>
        )}
        {timeLeft.status === "after" && (
          <div className="register">
            <div className="register__container _glass text-center">
              <p>Het was</p>
              <p>Nieuwjaarsloterij 2025</p>
              <p>WomT</p>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
