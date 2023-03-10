window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme')) {
    document.body.classList.add('light');
    const image = (document.querySelector('.icon img').src =
      './assets/library/home-light.png');
  }
});

const graph = document.querySelector('#graph');

const options = {
  percent: graph.dataset.percent,
  size: 76,
  lineWidth: 6,
  rotate: 0,
};

const canvas = document.createElement('canvas');
const span = document.createElement('span');
span.classList.add('storage-percent');
span.innerText = `${options.percent}%`;


const ctx = canvas.getContext('2d');
canvas.width = canvas.height = options.size;

graph.appendChild(span);
graph.append(canvas);

ctx.translate(options.size / 2, options.size / 2);
ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

const radius = (options.size - options.lineWidth) / 2;
const drawCircle = function (color, lineWidth, percent) {
  percent = Math.min(Math.max(0, percent || 1), 1);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineWidth = lineWidth;
  ctx.stroke();
};


const color = getComputedStyle(document.body)
  .getPropertyValue('--box-border')
  .trim();

const borderColor = getComputedStyle(document.body)
  .getPropertyValue('--tab-bg')
  .trim();

drawCircle(borderColor, options.lineWidth, 100 / 100);
drawCircle(color, options.lineWidth, options.percent / 100);

const rightSection = document.querySelector('.right-section');

const toggleActive = el => {
  document
    .querySelectorAll('.tab')
    .forEach(tab => tab.classList.remove('active'));
  el.classList.toggle('active');
};

class Page {
  currentState;

  constructor(state, btn) {
    this.changeState(state, btn);
  }

  changeState(state, btn) {
    toggleActive(btn);
    this.currentState = state;
  }
}

const gameState = () => {
  const gameTemplate = document.querySelector('#game-template');
  const templateClone = gameTemplate.content.cloneNode(true);
  rightSection.innerHTML = '';
  rightSection.appendChild(templateClone);

  return 'game-state';
};

const appState = () => {
  const appTemplate = document.querySelector('#app-template');
  const templateClone = appTemplate.content.cloneNode(true);
  rightSection.innerHTML = '';
  rightSection.appendChild(templateClone);

  return 'app-state';
};
const installerpState = () => {
  const installerpTemplate = document.querySelector('#installerp');
  const templateClone = installerpTemplate.content.cloneNode(true);
  rightSection.innerHTML = '';
  rightSection.appendChild(templateClone);

  return 'installerp-state';
};
const gameBtn = document.querySelector('#game');
const appBtn = document.querySelector('#app');
const installerpBtn = document.querySelector('#installerp');

const page = new Page(gameState(), gameBtn);

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    toggleActive(tab);
  });
});

gameBtn.addEventListener('click', () => {
  page.changeState(gameState(), gameBtn);
});

appBtn.addEventListener('click', () => {
  page.changeState(appState(), appBtn);
});

appBtn.addEventListener('click', () => {
  page.changeState(appState(), installerpBtn);
});
