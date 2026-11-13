(()=>{
document.documentElement.dataset.theme=Store.theme();
const cur=location.pathname.split('/').pop()||'index.html';
const links=[['index.html','Bosh sahifa'],['anime.html','Animelar'],['genres.html','Janrlar'],['anime.html?sort=rating','Top animelar'],['about.html','Biz haqimizda']];
const act=h=>{const[f,q]=h.split('?');return f===cur&&!!q===location.search.includes('sort=rating')};
U.qs('#site-header').innerHTML=`<header class="nav" id="nav"><div class="container nav-in">
<a class="logo" href="index.html"><img src="assets/logo/logo.svg" alt="" width="34" height="34">Anime<b>UZ</b></a>
<nav class="nav-links" id="navLinks" aria-label="Asosiy menyu">${links.map(([h,t])=>`<a href="${h}" class="${act(h)?'active':''}">${t}</a>`).join('')}</nav>
<div class="nav-act"><button class="icon-btn" id="sBtn" aria-label="Qidiruv">🔍</button><a class="icon-btn" href="favorites.html" aria-label="Sevimlilar">♥<span class="fav-count">0</span></a><button class="icon-btn" id="tBtn" aria-label="Yorug‘/qorong‘i rejim"></button><button class="icon-btn burger" id="bBtn" aria-label="Menyu" aria-expanded="false">☰</button></div></div></header>`;
U.qs('#site-footer').innerHTML=`<footer class="footer"><div class="container foot-grid">
<div><a class="logo" href="index.html"><img src="assets/logo/logo.svg" alt="" width="30" height="30">Anime<b>UZ</b></a><p class="muted">O‘zbekiston anime muxlislari uchun zamonaviy katalog va tomosha platformasi.</p></div>
<div><h4>Sahifalar</h4>${links.map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}<a href="favorites.html">Sevimlilar</a></div>
<div><h4>Aloqa</h4><a href="https://t.me/" target="_blank" rel="noopener noreferrer">Telegram</a><a href="mailto:info@animeuz.example">info@animeuz.example</a></div></div>
<div class="container copy muted">© ${new Date().getFullYear()} AnimeUZ. Barcha huquqlar himoyalangan.</div></footer>`;
const tBtn=U.qs('#tBtn'),setT=t=>{document.documentElement.dataset.theme=t;Store.setTheme(t);tBtn.textContent=t==='dark'?'☀':'☾'};
setT(Store.theme());
tBtn.onclick=()=>setT(document.documentElement.dataset.theme==='dark'?'light':'dark');
const nav=U.qs('#nav'),sc=()=>nav.classList.toggle('scrolled',scrollY>20);sc();addEventListener('scroll',sc,{passive:true});
U.qs('#bBtn').onclick=e=>{const o=U.qs('#navLinks').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
window.Site={updateFav(){U.qsa('.fav-count').forEach(e=>e.textContent=Store.favs().length)}};Site.updateFav();
Search.init();U.qs('#sBtn').onclick=()=>Search.open();
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-fav]');
  if(b){const id=+b.dataset.fav,on=Store.toggleFav(id);
    U.qsa(`[data-fav="${id}"]`).forEach(x=>{x.classList.toggle('on',on);const s=x.querySelector('span');if(s)s.textContent=on?'Sevimlilardan olib tashlash':'Sevimlilarga qo‘shish'});
    Site.updateFav();U.toast(on?'Sevimlilarga qo‘shildi':'Sevimlilardan olib tashlandi');document.dispatchEvent(new CustomEvent('favchange'));return}
  const a=e.target.closest('a[href]');
  if(a&&!a.target&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&a.origin===location.origin&&!a.getAttribute('href').startsWith('#')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.href=a.href,180)}
});
addEventListener('pageshow',()=>document.body.classList.remove('leaving'));
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.08});U.qsa('.reveal').forEach(e=>io.observe(e))}else U.qsa('.reveal').forEach(e=>e.classList.add('in'));
})();
