const U={
qs:(s,r=document)=>r.querySelector(s),
qsa:(s,r=document)=>[...r.querySelectorAll(s)],
param:k=>new URLSearchParams(location.search).get(k),
hasVideo:a=>a.episodesList.some(e=>e.videoUrl)||Object.keys(Store.get('animeuz_videos',{})).some(k=>k.startsWith(a.id+':')),
byId:id=>ANIME.find(a=>a.id===Number(id)),
esc:s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
svg(a,w,h,big){
  const hue=(a.id*47)%360,h2=(hue+60)%360,max=big?26:13,lines=[];let cur='';
  a.title.split(' ').forEach(x=>{if(cur&&(cur+' '+x).length>max){lines.push(cur);cur=x}else cur=(cur?cur+' ':'')+x});lines.push(cur);
  const L=lines.slice(0,4),fs=big?46:25,x=big?w*.72:w/2,y0=h/2-(L.length-1)*fs*.6;
  const t=L.map((l,i)=>`<text x="${x}" y="${y0+i*fs*1.25}" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-weight="700" font-size="${fs}">${U.esc(l)}</text>`).join('');
  const s=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},70%,38%)"/><stop offset="1" stop-color="hsl(${h2},75%,16%)"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/><circle cx="${w*.85}" cy="${h*.15}" r="${h*.28}" fill="#fff" opacity=".08"/><circle cx="${w*.1}" cy="${h*.92}" r="${h*.35}" fill="#fff" opacity=".06"/>${t}<text x="${x}" y="${h-18}" text-anchor="middle" fill="#fff" opacity=".6" font-family="Arial,sans-serif" font-size="${big?18:13}">AnimeUZ · ${a.year}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
},
gen:id=>U.svg(U.byId(id),300,450,false),
poster:a=>a.poster||Posters.map[a.id]||U.svg(a,300,450,false),
banner:a=>a.banner||Posters.map[a.id]||U.svg(a,1280,560,true),
setBg(el,a){el.dataset.bgid=a.id;el.style.backgroundImage=`url("${U.banner(a)}")`;if(a.banner){const i=new Image();i.onload=()=>el.style.backgroundImage=`url("${a.banner}")`;i.src=a.banner}},
googleUrl:a=>a.googleSearch||`https://www.google.com/search?q=${encodeURIComponent(a.title+' anime uzbek tilida')}`,
card(a){
  const on=Store.isFav(a.id),t=U.esc(a.title);
  return `<article class="card"><a class="card-img" href="details.html?id=${a.id}"><img loading="lazy" data-pid="${a.id}" src="${U.poster(a)}" alt="${t} posteri" onerror="this.onerror=null;this.src=U.gen(${a.id})"><span class="badge">★ ${a.rating.toFixed(1)}</span><span class="type">${a.type}</span></a>
  <div class="card-body"><h3 title="${t}">${t}</h3><p class="muted">${a.year} · ${a.genres.slice(0,2).join(', ')}</p>
  <div class="card-act"><a class="btn btn-sm" href="details.html?id=${a.id}">Batafsil</a><button class="fav-btn ${on?'on':''}" data-fav="${a.id}" aria-label="Sevimlilarga qo‘shish/olib tashlash">♥</button></div></div></article>`;
},
grid:(list,cls='grid')=>list.length?`<div class="${cls}">${list.map(U.card).join('')}</div>`:U.empty('Anime topilmadi','Boshqa so‘z yoki filtr bilan urinib ko‘ring.'),
empty:(t,s,btn='')=>`<div class="empty"><div class="empty-i">✦</div><h3>${t}</h3><p class="muted">${s}</p>${btn}</div>`,
skeleton:(n,cls='row')=>`<div class="${cls}">${'<div class="card sk"><div class="card-img"></div><div class="card-body"><div class="sk-l"></div><div class="sk-l s"></div></div></div>'.repeat(n)}</div>`,
toast(m){let t=U.qs('#toast');if(!t){t=document.createElement('div');t.id='toast';t.setAttribute('role','status');document.body.appendChild(t)}
  t.textContent=m;t.classList.add('show');clearTimeout(U.tt);U.tt=setTimeout(()=>t.classList.remove('show'),2200)},
notFound:()=>`<div class="container section">${U.empty('Anime topilmadi','Bunday sahifa mavjud emas yoki o‘chirilgan.','<a class="btn" href="anime.html">Katalogga qaytish</a>')}</div>`
};

// Haqiqiy posterlar: Jikan API (MyAnimeList). Natija LocalStorage'da saqlanadi.
const Posters={
 map:Store.get('animeuz_posters',{}),queue:[],busy:false,seen:new Set(),
 apply(id){const url=this.map[id];if(!url)return;
  U.qsa(`img[data-pid="${id}"]`).forEach(i=>{if(i.src!==url)i.src=url});
  U.qsa(`[data-bgid="${id}"]`).forEach(e=>e.style.backgroundImage=`url("${url}")`)},
 scan(){U.qsa('img[data-pid],[data-bgid]').forEach(e=>{const id=+(e.dataset.pid||e.dataset.bgid);
  if(this.map[id])this.apply(id);else if(!(id in this.map)&&!this.seen.has(id)&&U.byId(id)){this.seen.add(id);this.queue.push(id)}});this.run()},
 async find(a){
  try{const r=await fetch('https://graphql.anilist.co',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify({query:'query($s:String){Media(search:$s,type:ANIME,sort:SEARCH_MATCH){coverImage{extraLarge large}}}',variables:{s:a.title}})});
   if(r.status===429)return 'wait';
   if(r.ok){const j=await r.json(),c=j.data&&j.data.Media&&j.data.Media.coverImage;if(c)return c.extraLarge||c.large}
   else if(r.status!==404)console.warn('AniList',r.status)}catch(e){console.warn('AniList xato',e)}
  try{const r=await fetch('https://api.jikan.moe/v4/anime?limit=1&q='+encodeURIComponent(a.title));
   if(r.status===429)return 'wait';
   if(r.ok){const j=await r.json(),im=j.data&&j.data[0]&&j.data[0].images&&j.data[0].images.jpg;if(im)return im.large_image_url||im.image_url}}
  catch(e){console.warn('Jikan xato',e)}
  return null},
 async run(){if(this.busy)return;this.busy=true;
  while(this.queue.length){const id=this.queue.shift(),a=U.byId(id);let wait=750;
   const u=await this.find(a);
   if(u==='wait'){this.queue.unshift(id);wait=6000}
   else if(u){this.map[id]=u;Store.set('animeuz_posters',this.map);this.apply(id)}
   await new Promise(r=>setTimeout(r,wait))}
  this.busy=false},
 init(){let t;new MutationObserver(()=>{clearTimeout(t);t=setTimeout(()=>this.scan(),80)}).observe(document.documentElement,{childList:true,subtree:true});this.scan()}
};
setTimeout(()=>Posters.init(),0);
