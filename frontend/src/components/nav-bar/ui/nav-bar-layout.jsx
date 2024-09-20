export function NavBarLayout({
  exchangeBlock,
  storageBlock,
  nameBlock,
  goldBlock,
  tokensBlock,
  redTokensBlock,
  drawingsBlock,
}) {
  return (
    <div className="_container nav__container">
      <div className="nav-top">
        <ul className="nav__menu">
          {storageBlock}
          {exchangeBlock}
          {nameBlock}
          {goldBlock}
          {tokensBlock}
          {redTokensBlock}
          {drawingsBlock}
        </ul>
      </div>
      <a target="_blank" rel="noopener noreferrer" href="https://lonja971.github.io/WomT_wiki/WomT.html" className="nav__logo-big">
        <img src="logo-big.png" alt="LOGO" />
      </a>
    </div>
  );
}
