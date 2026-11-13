(()=>{
const box=U.qs('#watch'),id=U.param('id');
if(!id||isNaN(id)){location.replace('index.html');return}
const a=U.byId(id);
if(!a){box.innerHTML=U.notFound();return}
const last=Store.last(),total=a.episodesList.length;
let ep=+U.param('ep')||(last&&last.id===a.id?last.ep:1);ep=Math.min(Math.max(ep,1),total);
const rec=ANIME.filter(x=>x.id!==a.id&&x.genres.some(g=>a.genres.includes(g))).sort((x,y)=>y.rating-x.rating).slice(0,6);
box.innerHTML=`<div class="watch-layout"><div><div class="player-box" id="player"></div>
<div class="w-info"><h1><a href="details.html?id=${a.id}">${U.esc(a.title)}</a></h1><p class="muted" id="epTitle"></p>
<div class="btns"><button class="btn btn-ghost btn-sm" id="prev">‹ Oldingi qism</button><button class="btn btn-sm" id="next">Keyingi qism ›</button></div>
<div class="src-box"><p class="muted small" id="srcNote"></p><div class="src-row"><input id="srcUrl" type="text" placeholder="Video havolasi: .mp4, YouTube yoki rasmiy embed (https://...)" aria-label="Video havolasi"><button class="btn btn-sm" id="srcSave">Saqlash</button><button class="btn btn-ghost btn-sm" id="srcReset">Tozalash</button></div></div></div></div>
<aside><h3>Qismlar</h3><div class="eps" id="eps">${a.episodesList.map(e=>`<button data-n="${e.number}" class="${e.videoUrl?'':'na'}" title="${e.videoUrl?'':'Video hozircha mavjud emas'}">${e.number}</button>`).join('')}</div>
${a.episodes>total?`<p class="muted small">Birinchi ${total} ta qism ko‘rsatilmoqda.</p>`:''}</aside></div>
<h2 class="section">Tavsiya etilgan animelar</h2>${U.grid(rec,'row')}`;
document.title=`${a.title} — Online tomosha | AnimeUZ`;
function select(n){
  ep=Math.min(Math.max(n,1),total);const e0=a.episodesList[ep-1],ov=Store.get('animeuz_videos',{})[`${a.id}:${ep}`],e=ov?{...e0,videoUrl:ov.url,videoType:ov.type,demo:false}:e0;
  U.qs('#srcNote').textContent=ov?'Siz qo‘shgan video manbasi ishlatilmoqda.':!e.videoUrl?'Bu qism uchun video manbasi yo‘q. Qonuniy manbangiz havolasini pastga qo‘yib saqlang.':'';
  U.qs('#srcUrl').value=ov?ov.url:'';
  Player.mount(U.qs('#player'),e,{onEnded:()=>ep<total&&select(ep+1)});
  U.qs('#epTitle').textContent=e.title;
  U.qsa('#eps button').forEach(b=>b.classList.toggle('on',+b.dataset.n===ep));
  U.qs('#prev').disabled=ep<=1;U.qs('#next').disabled=ep>=total;
  Store.setLast(a.id,ep);history.replaceState(null,'',`?id=${a.id}&ep=${ep}`);
}
U.qs('#eps').onclick=e=>{const b=e.target.closest('[data-n]');if(b)select(+b.dataset.n)};
U.qs('#prev').onclick=()=>select(ep-1);U.qs('#next').onclick=()=>select(ep+1);
const key=()=>`${a.id}:${ep}`;
U.qs('#srcSave').onclick=()=>{
  const url=U.qs('#srcUrl').value.trim();
  if(!url)return U.toast('Havolani kiriting');
  const type=/youtu\.?be/i.test(url)?'youtube':/\.(mp4|webm|ogg)(\?|#|$)/i.test(url)?'html5':'embed';
  if(/^(javascript|data):/i.test(url)||(type!=='html5'&&!/^https:\/\//i.test(url)))return U.toast('Havola https:// bilan boshlanishi kerak');
  const m=Store.get('animeuz_videos',{});m[key()]={url,type};Store.set('animeuz_videos',m);select(ep);U.toast('Video manbasi saqlandi');
};
U.qs('#srcReset').onclick=()=>{const m=Store.get('animeuz_videos',{});delete m[key()];Store.set('animeuz_videos',m);select(ep)};
select(ep);
})();
