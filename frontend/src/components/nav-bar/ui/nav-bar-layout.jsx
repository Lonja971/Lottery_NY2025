export function NavBarLayout({
  exchangeBlock,
  storageBlock,
  nameBlock,
  goldBlock,
  tokensBlock,
  redTokensBlock,
  isMenu
}) {
  return (
    <nav className={`nav _glass ${isMenu ? "active" : ""}`}>
      <div className="_container nav__container">
        <div className="nav-top">
          <ul className="nav__menu">
            {storageBlock}
            {exchangeBlock}
            {nameBlock}
            {goldBlock}
            {tokensBlock}
            {redTokensBlock}
          </ul>
        </div>
        <a href="#" className="nav__logo-big">
          <img src="logo-big.png" alt="LOGO" />
        </a>
      </div>
    </nav>
  );
}
