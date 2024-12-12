import "../../css/footer.css";

export function Footer({ timeLeft }){
   return(
      <footer>
         <div className="footer__container _container">
            <div className="footer-bg"></div>
            <div className="footer__content">
               Хочете подивитися на характеристики танків?
               Ви можете зробити це <a target="_blank" rel="noopener noreferrer" href="https://lonja971.github.io/WomT_wiki/WomT.html">Тут</a> !
               "Новорічна Лотерея 2025" створена по конструкторній грі "World of mine tanks".
               Тут ви можете отримати багато ексклюзивних ресурсів з гри, які лімітовано роздаються в кейсах під час події "Новорічна лотерея 2025".
            </div>
            <div className="timebox">
               До кінця події:
               <div className="timebox-time">
                  <div className="timebox-time__item" >{timeLeft.days} <br/> Днів</div>
                  <div className="timebox-time__item" >{timeLeft.hours} <br/> Годин</div>
                  <div className="timebox-time__item" >{timeLeft.minutes} <br/> Хвилин</div>
                  <div className="timebox-time__item" >{timeLeft.seconds} <br/> Секунд</div>
               </div>
            </div>
         </div>
      </footer>
   )
}