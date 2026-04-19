const Header = () => {
  return (
    <header className="header js-header header_border">
      <div className="header__center center">
        <a className="header__logo">
          <img className="some-icon" src="img/logo-dark.svg" alt="Fleet" />
          <img
            className="some-icon-dark"
            src="img/logo-light.svg"
            alt="Fleet"
          />
        </a>

        <div className="header__wrapper js-header-wrapper">
          <div className="header__item header__item_dropdown js-header-item">
            <button className="header__head js-header-head">
              Travelers
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                id="icon-arrow-down"
                className="icon icon-arrow-down"
              >
                <path d="M10.805 6.362c-.26-.26-.682-.26-.943 0L8 8.224 6.138 6.362c-.26-.26-.682-.26-.943 0s-.26.682 0 .943l2.333 2.333c.26.26.682.26.943 0l2.333-2.333c.26-.26.26-.682 0-.943z"></path>
              </svg>
            </button>
            <div className="header__body js-header-body">
              <div className="header__menu">
                <a className="header__link active">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="icon-comment"
                    className="icon icon-comment"
                  >
                    <path d="M8 1.413c1.643 0 3.124.162 4.203.326 1.127.171 2.019.997 2.213 2.12a17.13 17.13 0 0 1 .25 2.887 17.13 17.13 0 0 1-.25 2.887c-.193 1.123-1.086 1.949-2.213 2.12a28.6 28.6 0 0 1-3.787.323l-4.077 2.409a.67.67 0 0 1-1.006-.574v-2.269c-.902-.3-1.584-1.045-1.75-2.009-.135-.783-.25-1.777-.25-2.887s.115-2.104.25-2.887c.193-1.123 1.086-1.949 2.213-2.12 1.08-.164 2.561-.326 4.203-.326zm0 1.333a27.01 27.01 0 0 0-4.003.311c-.596.091-1.01.506-1.099 1.028a15.8 15.8 0 0 0-.231 2.661 15.8 15.8 0 0 0 .231 2.661c.078.453.395.817.856.97l.913.303v2.063l3.375-1.994.353-.006a27.26 27.26 0 0 0 3.609-.308c.596-.091 1.01-.506 1.099-1.028.125-.724.231-1.641.231-2.661s-.106-1.937-.231-2.661c-.09-.522-.504-.938-1.099-1.028A27.01 27.01 0 0 0 8 2.746zm-.667 4.667c.368 0 .667.298.667.667s-.298.667-.667.667h0-2.667C4.298 8.746 4 8.448 4 8.08s.298-.667.667-.667h0zm4-2.667c.368 0 .667.298.667.667s-.298.667-.667.667h0-6.667C4.298 6.08 4 5.781 4 5.413s.298-.667.667-.667h0z"></path>
                  </svg>
                  Stays
                </a>
                <a className="header__link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="icon-email"
                    className="icon icon-email"
                  >
                    <path d="M13.334 2a2 2 0 0 1 1.995 1.851l.005.149v8a2 2 0 0 1-1.851 1.995l-.149.005H2.667a2 2 0 0 1-1.995-1.851L.667 12V4a2 2 0 0 1 1.851-1.995L2.667 2h10.667zm0 1.333H2.667C2.299 3.333 2 3.632 2 4v8c0 .368.298.667.667.667h10.667c.368 0 .667-.298.667-.667V4c0-.368-.298-.667-.667-.667zm-.821 1.573c.236.283.198.703-.085.939L9.281 8.468a2 2 0 0 1-2.561 0L3.574 5.845c-.283-.236-.321-.656-.085-.939s.656-.321.939-.085l3.146 2.622c.247.206.606.206.854 0l3.146-2.622c.283-.236.703-.197.939.085z"></path>
                  </svg>
                  Flights
                </a>
                <a className="header__link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="icon-home"
                    className="icon icon-home"
                  >
                    <path d="M8.287 1.411c.09.02.177.053.278.102l.086.044.318.184.132.079 2.561 1.543 3.348 2.009c.316.189.418.599.229.915-.17.284-.519.396-.817.277l-.097-.048-.99-.594v6.751c-.001.619-.013.951-.145 1.211-.128.251-.332.455-.583.583-.233.119-.526.141-1.033.144H10v.001H6v-.001H4.428c-.508-.004-.8-.026-1.033-.144-.251-.128-.455-.332-.583-.583-.119-.233-.141-.526-.144-1.033l-.001-6.928-.99.594c-.316.189-.725.087-.915-.229-.17-.284-.105-.644.14-.852l.088-.063 3.344-2.006L6.899 1.82l.451-.263.084-.043c.101-.049.189-.082.279-.102.189-.042.385-.042.574 0zM8 2.721l-.006.003-2.973 1.784L4 5.123l.001 7.651.008.399.005.071.002.018.018.002a6.48 6.48 0 0 0 .469.013H6V10.61a2 2 0 0 1 3.995-.149l.005.149v2.666h1.498l.399-.008.071-.005.018-.002.002-.018c.011-.133.013-.311.014-.608V5.123l-1.025-.618-2.969-1.781L8 2.721zm0 7.223c-.368 0-.667.298-.667.667l-.001 2.666h1.333l.001-2.666c0-.368-.298-.667-.667-.667z"></path>
                  </svg>
                  Things to do
                </a>
                <a className="header__link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="icon-email"
                    className="icon icon-email"
                  >
                    <path d="M13.334 2a2 2 0 0 1 1.995 1.851l.005.149v8a2 2 0 0 1-1.851 1.995l-.149.005H2.667a2 2 0 0 1-1.995-1.851L.667 12V4a2 2 0 0 1 1.851-1.995L2.667 2h10.667zm0 1.333H2.667C2.299 3.333 2 3.632 2 4v8c0 .368.298.667.667.667h10.667c.368 0 .667-.298.667-.667V4c0-.368-.298-.667-.667-.667zm-.821 1.573c.236.283.198.703-.085.939L9.281 8.468a2 2 0 0 1-2.561 0L3.574 5.845c-.283-.236-.321-.656-.085-.939s.656-.321.939-.085l3.146 2.622c.247.206.606.206.854 0l3.146-2.622c.283-.236.703-.197.939.085z"></path>
                  </svg>
                  Cars
                </a>
              </div>
            </div>
          </div>

          <a className="header__item">
            Support
          </a>

          <div className="header__item header__item_language js-header-item">
            <button className="header__head js-header-head">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                id="icon-globe"
                className="icon icon-globe"
              >
                <path d="M8 1.334a6.67 6.67 0 0 1 6.631 5.971l.003.029.033.667a6.67 6.67 0 0 1-13.3.667l-.033-.667c0-.225.011-.447.033-.667h0a6.67 6.67 0 0 1 6.634-6zm1.982 7.334H6.018c.077 1.396.391 2.599.817 3.451.532 1.065 1.021 1.216 1.164 1.216s.632-.151 1.164-1.216c.426-.852.74-2.055.817-3.451zm-5.299 0H2.708c.228 1.831 1.385 3.374 2.983 4.142-.556-1.068-.927-2.52-1.008-4.142zm8.609 0h-1.975c-.081 1.622-.452 3.074-1.009 4.142a5.34 5.34 0 0 0 2.984-4.143zm-7.6-5.476l-.143.071c-1.525.79-2.62 2.295-2.841 4.071h1.975c.08-1.623.452-3.074 1.008-4.143zM8 2.667c-.143 0-.632.151-1.164 1.216-.426.852-.74 2.055-.817 3.452h3.964c-.077-1.396-.391-2.6-.817-3.452-.501-1.002-.963-1.195-1.136-1.214L8 2.667h0zm2.308.524l.049.095c.53 1.059.882 2.473.96 4.048h1.975a5.34 5.34 0 0 0-2.984-4.143z"></path>
              </svg>
              Language
            </button>
            <div className="header__body js-header-body">
              <div className="header__list">
                <a className="header__box active">
                  <div className="header__category">English</div>
                  <div className="header__country">United States</div>
                </a>
                <a className="header__box">
                  <div className="header__category">Vietnamese</div>
                  <div className="header__country">Vietnamese</div>
                </a>
                <a className="header__box">
                  <div className="header__category">FranÃ§ais</div>
                  <div className="header__country">Belgique</div>
                </a>
                <a className="header__box">
                  <div className="header__category">FranÃ§ais</div>
                  <div className="header__country">Canada</div>
                </a>
              </div>
            </div>
          </div>

          <a
            className="button button-stroke button-small header__button"
           
          >
            List your property
          </a>
        </div>

        <div className="header__item header__item_notification js-header-item">
          <button className="header__head js-header-head active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              id="icon-notification"
              className="icon icon-notification"
            >
              <path d="M8.833 12.861c.368 0 .679.313.516.643-.072.146-.169.281-.289.398-.281.276-.663.431-1.061.431s-.779-.155-1.061-.431a1.47 1.47 0 0 1-.289-.398c-.163-.33.148-.643.516-.643h1.667zM8 1.667c2.982 0 5.4 2.382 5.4 5.321v4.106h.011a.59.59 0 0 1 .589.589.59.59 0 0 1-.589.589H2.589A.59.59 0 0 1 2 11.683a.59.59 0 0 1 .589-.589H2.6V6.988c0-2.939 2.418-5.321 5.4-5.321zm0 1.178c-2.32 0-4.2 1.855-4.2 4.142v4.106h8.4V6.988c0-2.288-1.88-4.142-4.2-4.142z"></path>
            </svg>
          </button>
          <div className="header__body js-header-body">
            <div className="header__title">Notification</div>
            <div className="header__notifications">
              <a className="header__notification">
                <div className="header__avatar">
                  <img src="img/content/avatar-1.jpg" alt="Avatar" />
                </div>
                <div className="header__details">
                  <div className="header__subtitle">Kohaku Tora</div>
                  <div className="header__content">just sent you a message</div>
                  <div className="header__date">1 minute ago</div>
                  <div className="header__status header__button--primary"></div>
                </div>
              </a>
              <a className="header__notification">
                <div className="header__avatar">
                  <img src="img/content/avatar-1.jpg" alt="Avatar" />
                </div>
                <div className="header__details">
                  <div className="header__subtitle">Kohaku Tora</div>
                  <div className="header__content">just sent you a message</div>
                  <div className="header__date">3 hours ago</div>
                  <div className="header__status header__button--primary"></div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <a
          className="header__login js-popup-open"
          href="#popup-login"
          data-effect="mfp-zoom-in"
        >
          <svg className="icon icon-user">
            <use xlinkHref="#icon-user"></use>
          </svg>
        </a>

        <div className="header__item header__item_user js-header-item">
          <button className="header__head js-header-head">
            <img src="img/content/avatar-2.jpg" alt="Avatar" />
          </button>
          <div className="header__body js-header-body">
            <div className="header__group">
              <div className="header__menu">
                <a className="header__link">
                  <svg className="icon icon-comment">
                    <use xlinkHref="#icon-comment"></use>
                  </svg>
                  Messages
                </a>
                <a className="header__link">
                  <svg className="icon icon-home">
                    <use xlinkHref="#icon-home"></use>
                  </svg>
                  Bookings
                </a>
                <a className="header__link">
                  <svg className="icon icon-email">
                    <use xlinkHref="#icon-email"></use>
                  </svg>
                  Wishlists
                </a>
              </div>
              <div className="header__menu">
                <a className="header__link">
                  <svg className="icon icon-building">
                    <use xlinkHref="#icon-building"></use>
                  </svg>
                  List your property
                </a>
                <a className="header__link">
                  <svg className="icon icon-flag">
                    <use xlinkHref="#icon-flag"></use>
                  </svg>
                  Host an experience
                </a>
              </div>
            </div>
            <div className="header__btns">
              <a
                className="button button-small header__button"
               
              >
                Account
              </a>
              <button className="button-stroke button-small header__button">
                Log out
              </button>
            </div>
          </div>
        </div>

        <button className="header__burger js-header-burger"></button>
      </div>
    </header>
  );
};

export default Header;
