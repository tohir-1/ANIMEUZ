(()=>{
const heroIds=[78,6,11,8,4];
const slides=heroIds.map(U.byId);
const hero=U.qs('#hero');
hero.innerHTML=slides.map((a,i)=>`<div class="slide ${i?'':'active'}" data-i="${i}" aria-hidden="${i?'true':'false'}"><div class="container slide-in"><div class="slide-txt">
<div class="meta"><span class="pill">★ ${a.rating.toFixed(1)}</span><span class="pill">${a.genres.slice(0,3).join(', ')}</span><span class="pill">${a.year}</span></div>
<h1>${U.esc(a.title)}</h1><p>${U.esc(a.description)}</p>
<div class="btns">${U.hasVideo(a)?`<a class="btn" href="watch.html?id=${a.id}&ep=1">▶ Tomosha qilish</a>`:''}<a class="btn btn-ghost" href="details.html?id=${a.id}">Batafsil</a></div></div>
<img class="hero-poster" data-pid="${a.id}" src="${U.poster(a)}" alt="${U.esc(a.title)} posteri" onerror="this.onerror=null;this.src=U.gen(${a.id})"></div></div>`).join('')
+`<button class="h-arr l" aria-label="Oldingi">‹</button><button class="h-arr r" aria-label="Keyingi">›</button><div class="dots">${slides.map((_,i)=>`<button class="${i?'':'on'}" aria-label="${i+1}-banner"></button>`).join('')}</div>`;
const els=U.qsa('.slide',hero),dots=U.qsa('.dots button',hero);
els.forEach((e,i)=>U.setBg(e,slides[i]));
let idx=0,timer;
const go=n=>{idx=(n+els.length)%els.length;els.forEach((e,i)=>{e.classList.toggle('active',i===idx);e.setAttribute('aria-hidden',i!==idx)});dots.forEach((d,i)=>d.classList.toggle('on',i===idx))};
const start=()=>{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){clearInterval(timer);timer=setInterval(()=>go(idx+1),6000)}};
U.qs('.h-arr.l',hero).onclick=()=>{go(idx-1);start()};U.qs('.h-arr.r',hero).onclick=()=>{go(idx+1);start()};
dots.forEach((d,i)=>d.onclick=()=>{go(i);start()});
hero.onmouseenter=()=>clearInterval(timer);hero.onmouseleave=start;start();
const secs={trending:()=>ANIME.slice(0,10),newest:()=>[...ANIME].sort((a,b)=>b.year-a.year||a.id-b.id).slice(0,10),toprated:()=>[...ANIME].sort((a,b)=>b.rating-a.rating).slice(0,10)};
Object.keys(secs).forEach(k=>U.qs('#'+k).outerHTML=U.skeleton(10,'row').replace('class="row"',`class="row" id="${k}"`));
setTimeout(()=>Object.keys(secs).forEach(k=>U.qs('#'+k).innerHTML=secs[k]().map(U.card).join('')),350);
U.qs('#genreTiles').innerHTML=GENRES.map((g,i)=>`<a class="genre-tile" style="--h:${i*30}" href="genres.html?g=${encodeURIComponent(g)}">${g}</a>`).join('');
})();
