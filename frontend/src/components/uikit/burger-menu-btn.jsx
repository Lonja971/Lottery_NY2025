export function BurgerMenuBtn({ isMenu, setIsMenu }){

   const toggleMenu = () => {
      setIsMenu(!isMenu)
   }
   
   return(
      <button className="_glass hamburger__container" onClick={toggleMenu}>
         <div className={`hamburger ${isMenu ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
         </div>
      </button>
   )
}