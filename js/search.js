const Search={
match(a,q){q=q.trim().toLowerCase();return !q||[a.title,a.originalTitle,a.year,...a.genres].join(' ').toLowerCase().includes(q)},
run(q){return q.trim()?ANIME.filter(a=>Search.match(a,q)):[]},
init(){
  const o=document.createElement('div');o.className='s-overlay';o.hidden=true;
  o.innerHTML='<div class="s-panel" role="dialog" aria-label="Qidiruv"><input type="search" id="sInput" placeholder="Anime nomi, original nomi, janr yoki yil…" autocomplete="off"><div id="sRes" class="s-res"></div></div>';
  document.body.appendChild(o);this.o=o;this.i=o.querySelector('input');this.r=o.querySelector('#sRes');
  this.i.addEventListener('input',()=>this.render());
  o.addEventListener('click',e=>{if(e.target===o)this.close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')this.close()});
},
open(){this.o.hidden=false;this.i.focus();this.render()},
close(){this.o.hidden=true},
render(){
  const q=this.i.value,l=this.run(q);
  if(!q.trim()){this.r.innerHTML='<p class="muted pad">Yozishni boshlang…</p>';return}
  this.r.innerHTML=l.length?l.slice(0,12).map(a=>`<a class="s-item" href="details.html?id=${a.id}"><img data-pid="${a.id}" src="${U.poster(a)}" alt="" onerror="this.onerror=null;this.src=U.gen(${a.id})"><div><b>${U.esc(a.title)}</b><span class="muted">${a.year} · ${a.genres.join(', ')} · ★ ${a.rating}</span></div></a>`).join('')+(l.length>12?`<a class="s-item" href="anime.html?q=${encodeURIComponent(q)}"><b>Barcha ${l.length} natijani ko‘rish</b></a>`:''):'<p class="pad center">Anime topilmadi</p>';
}};
