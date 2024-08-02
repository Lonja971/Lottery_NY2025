import React, { useState, useEffect } from "react";

export function Clock(){
   const [time, setTime] = useState(new Date());

   useEffect(() => {
     const intervalId = setInterval(() => {
       setTime(new Date());
     }, 1000);
 
     return () => clearInterval(intervalId);
   }, []);
 
   return (
     <div>
       <h1>Поточний час: {time.toLocaleTimeString()}</h1>
     </div>
   );
}