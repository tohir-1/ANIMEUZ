(()=>{
const box=U.qs('#detail'),id=U.param('id');
if(!id||isNaN(id)){location.replace('index.html');return}
const a=U.byId(id);
if(!a){document.title='Topilmadi — AnimeUZ';box.innerHTML=U.notFound();return}
document.title=`${a.title} — AnimeUZ`;
const md=U.qs('meta[name=description]');if(md)md.content=a.description;
const t=U.esc(a.title),on=Store.isFav(a.id),last=Store.last(),resume=last&&last.id===a.id&&last.ep>1;
const info=[['Original nomi',a.originalTitle],['Chiqqan yili',a.year],['Davomiyligi',a.duration],['Tur',a.type],['Qismlar soni',a.episodes],['Status',a.status],['Studiya',a.studio],['Til',a.language.join(', ')]];
const sim=ANIME.filter(x=>x.id!==a.id&&x.genres.some(g=>a.genres.includes(g))).sort((x,y)=>y.rating-x.rating).slice(0,5);
box.innerHTML=`<section class="d-banner"><div class="d-bg"></div><div class="container d-wrap">
<img class="d-poster" data-pid="${a.id}" src="${U.poster(a)}" alt="${t} posteri" onerror="this.onerror=null;this.src=U.gen(${a.id})">
<div class="d-info"><h1>${t}</h1><p class="muted">${U.esc(a.originalTitle)}</p>
<div class="meta"><span class="pill">★ ${a.rating.toFixed(1)}</span><span class="pill">${a.year}</span><span class="pill">${a.type}</span><span class="pill">${a.status}</span></div>
<div class="meta">${a.genres.map(g=>`<a class="chip" href="genres.html?g=${encodeURIComponent(g)}">${g}</a>`).join('')}</div>
<div class="btns">${U.hasVideo(a)?`<a class="btn" href="watch.html?id=${a.id}&ep=${resume?last.ep:1}">▶ ${resume?last.ep+'-qismdan davom etish':'Online ko‘rish'}</a>`:''}
<button class="btn btn-ghost" id="gBtn">Google orqali qidirish</button>
<button class="btn btn-ghost btn-fav ${on?'on':''}" data-fav="${a.id}">♥ <span>${on?'Sevimlilardan olib tashlash':'Sevimlilarga qo‘shish'}</span></button>
<button class="btn btn-ghost" id="shBtn">Ulashish</button></div></div></div></section>
<div class="container section"><h2>Anime haqida</h2><p class="d-desc">${U.esc(a.description)}</p>
<dl class="info">${info.map(([k,v])=>`<div><dt class="muted">${k}</dt><dd>${U.esc(v)}</dd></div>`).join('')}</dl>
${a.trailerUrl?`<p><a class="btn btn-ghost btn-sm" href="${U.esc(a.trailerUrl)}" target="_blank" rel="noopener noreferrer">Treyler</a></p>`:''}</div>
<div class="container section"><h2>O‘xshash animelar</h2>${U.grid(sim,'row')}</div>`;
U.setBg(U.qs('.d-bg',box),a);
U.qs('#gBtn').onclick=()=>window.open(U.googleUrl(a),'_blank','noopener,noreferrer');
U.qs('#shBtn').onclick=async()=>{
  const d={title:a.title+' — AnimeUZ',url:location.href};
  try{if(navigator.share){await navigator.share(d)}else{await navigator.clipboard.writeText(d.url);U.toast('Havola nusxalandi')}}
  catch(e){if(e.name!=='AbortError')prompt('Havolani nusxalang:',d.url)}
};
})();
