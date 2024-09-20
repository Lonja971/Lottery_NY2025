import "../../css/footer.css";

export function Footer(){
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
         </div>
      </footer>
   )
}