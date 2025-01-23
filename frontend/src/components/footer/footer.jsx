import "../../css/footer.css";

export function Footer({ timeLeft }){
   return(
      <footer>
         <div className="footer__container _container">
            <div className="footer-bg"></div>
            <div className="footer__content">
               "New Year's Lottery 2025" is a site that simulates a New Year's event for the fictional game "World of my tanks". The purpose of the site is to open containers and knock out rewards from them.
            </div>
            <div className="timebox">
               Until the end of the event:
               <div className="timebox-time">
                  <div className="timebox-time__item" >{timeLeft.days} <br/> Days</div>
                  <div className="timebox-time__item" >{timeLeft.hours} <br/> Hours</div>
                  <div className="timebox-time__item" >{timeLeft.minutes} <br/> Minutes</div>
                  <div className="timebox-time__item" >{timeLeft.seconds} <br/> Seconds</div>
               </div>
            </div>
         </div>
      </footer>
   )
}