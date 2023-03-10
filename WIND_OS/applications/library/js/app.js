class NavBar extends HTMLElement {
  constructor() {
    super();

    this.isScrolledDown = false;

    this.innerHTML = `
      <nav>
      
      </nav>
    `;
  }

  connectedCallback() {
    if (localStorage.getItem('theme')) {
      this.toggleTheme();
    }

    this.setTime();
    setInterval(this.setTime, 5000);

    document
      .querySelector('.toggle')
      .addEventListener('click', this.toggleTheme);
    document.querySelector('#mic').addEventListener('click', this.toggleMic);
    document
      .querySelector('.hamburger')
      .addEventListener('click', () => this.toggleOpen());

    window.addEventListener('scroll', () => this.handleScroll());
  }

  setTime() {
    const time = document.querySelector('.nav-time');
    const today = new Date();
    let _hours = today.getHours();
    let timePeriod;

    if (_hours > 12) {
      timePeriod = 'PM';
      _hours = _hours - 12;
    } else {
      timePeriod = 'AM';
    }

    const hours = _hours.toString().length < 2 ? `0${_hours}` : _hours;
    let _minutes = today.getMinutes();
    const minutes = _minutes.toString().length < 2 ? `0${_minutes}` : _minutes;
    time.innerText = `${hours}:${minutes} ${timePeriod}`;
  }

  toggleTheme() {
    const toggleBtn = document.querySelector('#toggle');

    document.body.classList.toggle('light');
    toggleBtn.classList.toggle('fa-sun');
    toggleBtn.classList.toggle('fa-moon');
    if (document.body.classList.contains('light')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.clear();
    }
  }

  toggleMic() {
    this.classList.toggle('fa-microphone');
    this.classList.toggle('fa-microphone-slash');
  }

  toggleOpen() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    navLinks.classList.toggle('open');
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.toggle('fade');
    });

    if (this.isScrolledDown) {
      navLinks.style.marginTop = '91vh';
    }

    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    hamburger.classList.toggle('nav-toggle');
  }

  handleScroll() {
    const navbar = document.querySelector('nav');
    const navHeight = navbar.clientHeight;

    if (window.scrollY > navHeight) {
      navbar.classList.add('scrolled-down');
      this.isScrolledDown = true;
    } else {
      navbar.classList.remove('scrolled-down');
      this.isScrolledDown = false;
    }
  }
}

class GridItem extends HTMLElement {
  constructor() {
    super();

    const image = this.getAttribute('image') || 'recent/my-games-icon.png';
    const text = this.getAttribute('text');
    const full = this.getAttribute('full');
    const wide = this.getAttribute('wide');
    const link = this.getAttribute('link') || null;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(
      this.createTemplate({ image, text, full, wide, link }).content.cloneNode(
        true
      )
    );
  }

  createTemplate({ image, text, full, wide, link }) {
    const template = document.createElement('template');

    template.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .wrapper {
          width: 100%;
          height: 100%;
          position: relative !important;
          margin: 0;
          transition: box-shadow 200ms ease-in, scale 300ms ease-out;
          cursor: pointer;
        }

        .wrapper:hover {
          outline: 9px solid var(--box-border);
          transform: scale(1.03);
          z-index: 3;
          box-shadow: 0 0 49px 5px var(--box-shadow);
        }
        
        .wrapper:hover .overlay {
          ${link ? 'height: 22%' : 'height: 30%;'}
        }
      
        .wrapper:hover .full {
          height: 100%;
        }

        img {
          height: 100%;
          display: block;
          width: 100%;
          object-fit: cover;
        }
        
        .content {
          position: absolute;
          padding: 1rem;
          display: flex;
          align-items: center;
          height: 100%;
          color: #fff;
        }
      
        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--overlay);
          width: 100%;
          height: 0;
          transition: height 300ms ease;
          overflow: hidden;
        }
      
        .wide {
          backdrop-filter: blur(50px) var(--blur-dark);
          background: transparent;
        }

        .top {
          object-position: top;
        }
      </style>

      ${link ? '<a href="https://hexgl.bkcore.com/play/">' : ''}
      <div class="wrapper">
        <img ${link ? 'class="top"' : ''} src="./assets/${image}" alt="">
        ${
          text
            ? `
          <div class="overlay ${full ? 'full' : ''} ${wide ? 'wide' : ''}">
            <div class="content">
              ${text}
            </div>
          </div>
        `
            : ''
        }
      </div>
      ${link ? '</a>' : ''}
    `;

    return template;
  }
}

window.customElements.define('nav-bar', NavBar);
window.customElements.define('game-item', GridItem);

const likeBtn = document.querySelector('.far.fa-heart');

likeBtn.addEventListener('click', () => {
  likeBtn.classList.toggle('fas');
  likeBtn.classList.toggle('liked');
});
