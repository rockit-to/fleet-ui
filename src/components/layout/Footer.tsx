import { useState, useEffect } from 'react';

const Footer = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    const bodyHasDarkClass = document.body.classList.contains('dark');
    
    if (darkMode === 'on' || bodyHasDarkClass) {
      setIsDarkTheme(true);
      document.body.classList.add('dark');
    }
  }, []);

  const handleThemeToggle = () => {
    const body = document.body;
    
    if (!body.classList.contains('dark')) {
      body.classList.add('dark');
      localStorage.setItem('darkMode', 'on');
      setIsDarkTheme(true);
    } else {
      body.classList.remove('dark');
      localStorage.setItem('darkMode', 'off');
      setIsDarkTheme(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer__center center">
        <div className="footer__row">
          <div className="footer__col">
            <a className="footer__logo">
              <img className="some-icon" src="img/logo-dark.svg" alt="Fleet" />
              <img
                className="some-icon-dark"
                src="img/logo-light.svg"
                alt="Fleet"
              />
            </a>
            <div className="footer__theme">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                id="icon-bulb"
                className="icon icon-bulb"
              >
                <path d="M7.999 0c2.946 0 5.333 2.388 5.333 5.333 0 1.684-.781 3.186-2 4.164v1.17c0 .591-.256 1.122-.663 1.488L10.668 14a2 2 0 0 1-2 2H7.335a2 2 0 0 1-2-2v-1.841c-.41-.366-.668-.899-.668-1.492v-1.17c-1.219-.977-2-2.479-2-4.164C2.666 2.388 5.054 0 7.999 0zm1.335 12.667l-2.667-.001V14c0 .368.298.667.667.667h1.333c.368 0 .667-.298.667-.667v-1.333h0zM7.999 1.333a4 4 0 0 0-4 4A3.99 3.99 0 0 0 5.5 8.457l.499.4v1.81c0 .368.298.667.667.667h.668V7.609L6.196 6.471c-.26-.26-.26-.682 0-.943s.682-.26.943 0h0L8 6.39l.862-.862c.26-.26.682-.26.943 0s.26.682 0 .943h0L8.667 7.609v3.724h.666c.368 0 .667-.298.667-.667v-1.81l.499-.4a3.99 3.99 0 0 0 1.501-3.123 4 4 0 0 0-4-4z"></path>
              </svg>
              Dark theme
              <label className="theme js-theme">
                <input 
                  className="theme__input" 
                  type="checkbox" 
                  checked={isDarkTheme}
                  onChange={handleThemeToggle}
                />
                <span className="theme__inner">
                  <span className="theme__box"></span>
                </span>
              </label>
            </div>
          </div>

          <div className="footer__col">
            <div className="footer__menu">
              <a className="footer__link">
                Stays
              </a>
              <a className="footer__link">
                Flights
              </a>
              <a className="footer__link">
                Support
              </a>
              <a className="footer__link">
                Cars
              </a>
              <a className="footer__link">
                Things to do
              </a>
            </div>
          </div>

          <div className="footer__col">
            <div className="footer__info">Join our community 🔥</div>
            <form className="subscription">
              <input
                className="subscription__input"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
              <button className="subscription__btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="icon-arrow-next"
                  className="icon icon-arrow-next"
                >
                  <path d="M10.39 3.765c.464-.375 1.187-.349 1.615.057l3.692 3.5a.91.91 0 0 1 0 1.357l-3.692 3.5c-.428.406-1.151.431-1.615.057s-.493-1.007-.065-1.413L12.247 9H1.143C.512 9 0 8.552 0 8s.512-1 1.143-1h11.104l-1.922-1.822c-.428-.406-.399-1.038.065-1.413z"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            Copyright © 2021 UI8 LLC. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
