// ---------- theme toggle ----------
const rootEl = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
let currentTheme = prefersLight ? 'light' : 'dark';
rootEl.setAttribute('data-theme', currentTheme);
themeBtn.setAttribute('aria-pressed', String(currentTheme === 'light'));
themeBtn.setAttribute('aria-label', currentTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');

themeBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  rootEl.setAttribute('data-theme', currentTheme);
  themeBtn.setAttribute('aria-pressed', String(currentTheme === 'light'));
  themeBtn.setAttribute('aria-label', currentTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  if(typeof draw === 'function' && reduceMotion) draw();
});

// ---------- terminal typewriter ----------
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const termLines = [
  {t:'$ python3 discover.py --target khushi.dev', cls:'prompt'},
  {t:'[+] Stage 1: Resolving core skills...', cls:'dim'},
  {t:'    python.khushi.dev      -> RESOLVED', cls:''},
  {t:'    backend.khushi.dev     -> RESOLVED', cls:''},
  {t:'    security.khushi.dev    -> RESOLVED', cls:''},
  {t:'[+] Stage 2: Querying experience log...', cls:'dim'},
  {t:'    maruti_suzuki x2 -> VERIFIED (Grade: Excellent)', cls:''},
  {t:'[+] Scan complete. 1 engineer found.', cls:'ok'},
];

const termBody = document.getElementById('termBody');
const heroEls = ['heroName','heroRole','heroLoc','heroCta','scrollCue'].map(id => document.getElementById(id));

function revealHero(){
  heroEls.forEach((el, i) => {
    setTimeout(() => { el.classList.add('reveal'); el.style.opacity=''; }, i*160);
  });
}

if(reduceMotion){
  termBody.innerHTML = termLines.map(l => `<div class="line ${l.cls}">${l.t}</div>`).join('');
  heroEls.forEach(el => { el.style.opacity='1'; el.style.transform='none'; });
} else {
  let li = 0;
  function typeLine(){
    if(li >= termLines.length){
      revealHero();
      return;
    }
    const {t, cls} = termLines[li];
    const div = document.createElement('div');
    div.className = 'line ' + cls;
    termBody.appendChild(div);
    let ci = 0;
    const speed = 1;
    function typeChar(){
      if(ci <= t.length){
        div.textContent = t.slice(0, ci);
        if(ci < t.length){
          const cur = document.createElement('span');
          cur.className='cursor';
          div.appendChild(cur);
        }
        ci++;
        setTimeout(typeChar, speed);
      } else {
        li++;
        setTimeout(typeLine, 30);
      }
    }
    typeChar();
  }
  setTimeout(typeLine, 100);
}

// ---------- scroll reveal ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:0.15});
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// ---------- ambient network canvas ----------
const canvas = document.getElementById('netbg');
const ctx = canvas.getContext('2d');
let W, H, nodes = [];
function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
function initNodes(){
  const count = Math.min(46, Math.floor((W*H)/32000));
  nodes = Array.from({length:count}, () => ({
    x: Math.random()*W, y: Math.random()*H,
    vx: (Math.random()-0.5)*0.15, vy: (Math.random()-0.5)*0.15,
    r: Math.random()*1.4+0.6
  }));
}
function draw(){
  ctx.clearRect(0,0,W,H);
  const isLight = rootEl.getAttribute('data-theme') === 'light';
  const dotColor = isLight ? '12,140,125' : '79,209,197';
  const lineAlpha = isLight ? 0.16 : 0.12;
  const dotAlpha = isLight ? 0.45 : 0.6;
  ctx.fillStyle = `rgb(${dotColor})`;
  for(const n of nodes){
    n.x += n.vx; n.y += n.vy;
    if(n.x<0||n.x>W) n.vx*=-1;
    if(n.y<0||n.y>H) n.vy*=-1;
  }
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i], b=nodes[j];
      const d = Math.hypot(a.x-b.x, a.y-b.y);
      if(d < 130){
        ctx.strokeStyle = `rgba(${dotColor},${lineAlpha*(1-d/130)})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
  }
  for(const n of nodes){
    ctx.globalAlpha = dotAlpha;
    ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  if(!reduceMotion) requestAnimationFrame(draw);
}
resize(); initNodes(); draw();
window.addEventListener('resize', () => { resize(); initNodes(); });

const yearElement = document.getElementById("copyright-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}