(()=>{
const grid=U.qs('#grid');if(!grid)return;
const PER=24;let shown=PER;
const $=id=>U.qs('#'+id);
const opt=(l,v,t)=>`<option value="${v}">${t||v}</option>`;
$('fg').innerHTML=opt(0,'','Barcha janrlar')+GENRES.map(g=>opt(0,g)).join('');
$('fy').innerHTML=opt(0,'','Barcha yillar')+[...new Set(ANIME.map(a=>a.year))].sort((a,b)=>b-a).map(y=>opt(0,y)).join('');
$('fr').innerHTML=opt(0,'','Har qanday reyting')+[9,8,7,6].map(r=>opt(0,r,r+'+ reyting')).join('');
$('ft').innerHTML=opt(0,'','Barcha turlar')+[...new Set(ANIME.map(a=>a.type))].map(t=>opt(0,t)).join('');
$('fl').innerHTML=opt(0,'','A–Z')+'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l=>opt(0,l)).join('');
const p=new URLSearchParams(location.search);
if(p.get('q'))$('q').value=p.get('q');
if(p.get('g'))$('fg').value=p.get('g');
if(['popular','rating','newest','az'].includes(p.get('sort')))$('fs').value=p.get('sort');
function render(reset){
  if(reset)shown=PER;
  const q=$('q').value,g=$('fg').value,y=$('fy').value,r=$('fr').value,t=$('ft').value,l=$('fl').value,s=$('fs').value;
  let list=ANIME.filter(a=>(!g||a.genres.includes(g))&&(!y||a.year==y)&&(!r||a.rating>=+r)&&(!t||a.type===t)&&(!l||a.title[0].toUpperCase()===l)&&Search.match(a,q));
  const S={popular:(a,b)=>a.id-b.id,rating:(a,b)=>b.rating-a.rating,newest:(a,b)=>b.year-a.year||a.id-b.id,az:(a,b)=>a.title.localeCompare(b.title)};
  list.sort(S[s]);
  $('count').textContent=`${list.length} ta anime topildi`;
  grid.innerHTML=list.length?list.slice(0,shown).map(U.card).join(''):U.empty('Anime topilmadi','Boshqa so‘z yoki filtr bilan urinib ko‘ring.');
  $('more').hidden=list.length<=shown;
}
['fg','fy','fr','ft','fl','fs'].forEach(i=>$(i).onchange=()=>render(true));
$('q').oninput=()=>render(true);
$('more').onclick=()=>{shown+=PER;render()};
$('reset').onclick=()=>{$('q').value='';['fg','fy','fr','ft','fl'].forEach(i=>$(i).value='');$('fs').value='popular';render(true)};
render(true);
})();
