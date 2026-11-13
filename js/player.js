const Player={
fmt(s){if(!isFinite(s))return'0:00';const m=Math.floor(s/60),x=Math.floor(s%60);return m+':'+String(x).padStart(2,'0')},
msg:(t,s)=>`<div class="vp-msg"><div class="empty-i">▶</div><h3>${t}</h3><p class="muted">${s||''}</p></div>`,
ytId:u=>{const m=String(u).match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);return m?m[1]:(/^[\w-]{11}$/.test(u)?u:null)},
// Adapterlar: html5 | youtube | embed
mount(box,ep,cb={}){
  if(!ep||!ep.videoUrl){box.innerHTML=this.msg('Video hozircha mavjud emas','Bu qism uchun video manbasi qo‘shilmagan.');return}
  const type=ep.videoType||'html5';
  if(type==='youtube'){const id=this.ytId(ep.videoUrl);box.innerHTML=id?`<iframe class="vp-frame" src="https://www.youtube-nocookie.com/embed/${id}" title="${U.esc(ep.title)}" allowfullscreen allow="encrypted-media; picture-in-picture"></iframe>`:this.msg('Video manbasi noto‘g‘ri');return}
  if(type==='embed'){if(!/^https:\/\//.test(ep.videoUrl)){box.innerHTML=this.msg('Video manbasi noto‘g‘ri');return}box.innerHTML=`<iframe class="vp-frame" src="${U.esc(ep.videoUrl)}" title="${U.esc(ep.title)}" allowfullscreen></iframe>`;return}
  const src=ep.sources&&ep.sources.length?ep.sources:[{label:'Auto',url:ep.videoUrl}];
  box.innerHTML=`<div class="vp"><video playsinline preload="metadata" src="${U.esc(src[0].url)}"></video>
  <div class="vp-bar"><button class="pp" aria-label="Play/Pause">▶</button><input class="seek" type="range" min="0" max="1000" value="0" aria-label="Progress"><span class="time">0:00 / 0:00</span>
  <button class="mute" aria-label="Ovoz">🔊</button><input class="vol" type="range" min="0" max="1" step=".05" value="1" aria-label="Ovoz balandligi">
  <select class="qual" aria-label="Sifat" ${src.length<2?'hidden':''}>${src.map((s,i)=>`<option value="${i}">${U.esc(s.label)}</option>`).join('')}</select><button class="fs" aria-label="To‘liq ekran">⛶</button></div></div>`;
  const $=s=>U.qs(s,box),v=$('video'),pp=$('.pp'),seek=$('.seek'),tm=$('.time');
  const upd=()=>{seek.value=v.duration?v.currentTime/v.duration*1000:0;tm.textContent=this.fmt(v.currentTime)+' / '+this.fmt(v.duration)};
  const toggle=()=>v.paused?v.play().catch(()=>{}):v.pause();
  pp.onclick=toggle;v.onclick=toggle;
  v.onplay=()=>pp.textContent='❚❚';v.onpause=()=>pp.textContent='▶';
  v.ontimeupdate=upd;v.onloadedmetadata=upd;v.onended=()=>cb.onEnded&&cb.onEnded();
  seek.oninput=()=>{if(v.duration)v.currentTime=seek.value/1000*v.duration};
  $('.vol').oninput=e=>{v.volume=+e.target.value;v.muted=v.volume===0;$('.mute').textContent=v.muted?'🔇':'🔊'};
  $('.mute').onclick=()=>{v.muted=!v.muted;$('.mute').textContent=v.muted?'🔇':'🔊'};
  $('.fs').onclick=()=>{const c=$('.vp');document.fullscreenElement?document.exitFullscreen():(c.requestFullscreen||c.webkitRequestFullscreen||(()=>{})).call(c)};
  $('.qual').onchange=e=>{const t=v.currentTime,play=!v.paused;v.src=src[e.target.value].url;v.onloadedmetadata=()=>{v.currentTime=t;upd();play&&v.play()}};
  let tries=0;const D=window.DEMO_URLS||[];
  v.onerror=()=>{
    if(ep.demo&&tries<D.length){tries++;v.src=D[(D.indexOf(src[0].url)+tries)%D.length];v.load();return}
    box.innerHTML=this.msg('Video yuklanmadi',`Internetni tekshiring yoki boshqa havola kiriting. <a href="${U.esc(ep.videoUrl)}" target="_blank" rel="noopener noreferrer">Havolani alohida ochib ko‘rish</a>`)};
}};
