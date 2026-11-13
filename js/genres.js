(()=>{
const ICON={Action:'⚔',Adventure:'🧭',Comedy:'😂',Drama:'🎭',Fantasy:'🐉',Romance:'💞',Horror:'👻',Mystery:'🔍',"Sci-Fi":'🚀',Sports:'🏅',Supernatural:'✨',Thriller:'⚡'};
const box=U.qs('#genreCards'),res=U.qs('#result');
box.innerHTML=GENRES.map((g,i)=>`<button class="genre-card" data-g="${g}" style="--h:${i*30}"><span class="gi">${ICON[g]}</span><b>${g}</b><small>${ANIME.filter(a=>a.genres.includes(g)).length} ta anime</small></button>`).join('');
function pick(g,scroll){
  if(!GENRES.includes(g)){res.innerHTML='';return}
  U.qsa('.genre-card',box).forEach(b=>b.classList.toggle('on',b.dataset.g===g));
  const l=ANIME.filter(a=>a.genres.includes(g)).sort((a,b)=>b.rating-a.rating);
  res.innerHTML=`<h2>${g} animelari <span class="muted">(${l.length})</span></h2>${U.grid(l)}`;
  history.replaceState(null,'','?g='+encodeURIComponent(g));
  if(scroll)res.scrollIntoView({behavior:'smooth'});
}
box.onclick=e=>{const b=e.target.closest('[data-g]');if(b)pick(b.dataset.g,true)};
pick(U.param('g'),false);
})();
