import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePlayerDataFetcher(initialIsUpdated = false) {
  const [isUpdated, setIsUpdated] = useState(initialIsUpdated);
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    if (isUpdated) {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost/ny2025/backend/api/getData.php");
          setPlayerData(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };

      fetchData(); // Викликаємо функцію один раз при першій умові isUpdated === true

      setIsUpdated(false); // Змінюємо isUpdated на false, щоб зупинити автоматичне оновлення

    }
  }, [isUpdated]);

  const updatePlayerData = () => {
    setIsUpdated(true); // Встановлюємо isUpdated в true для оновлення даних
  };

  return { playerData, updatePlayerData };
}