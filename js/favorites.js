(()=>{
const list=U.qs('#favList');if(!list)return;
function render(){
  const f=Store.favs().map(U.byId).filter(Boolean);
  U.qs('#favN').textContent=`(${f.length})`;
  U.qs('#clear').hidden=!f.length;
  list.innerHTML=f.length?U.grid(f):U.empty('Hali sevimlilar yo‘q','Yoqqan animeingizdagi ♥ tugmasini bosing — u shu yerda saqlanadi.','<a class="btn" href="anime.html">Animelarni ko‘rish</a>');
}
U.qs('#clear').onclick=()=>{if(confirm('Barcha sevimlilar o‘chirilsinmi?')){Store.clearFavs();Site.updateFav();render()}};
document.addEventListener('favchange',render);
render();
})();
