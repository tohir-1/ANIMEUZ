const Store=(()=>{
let ok=true;try{localStorage.setItem('_t','1');localStorage.removeItem('_t')}catch(e){ok=false}
const mem={};
const get=(k,d)=>{try{const v=ok?localStorage.getItem(k):mem[k];return v==null?d:JSON.parse(v)}catch(e){return d}};
const set=(k,v)=>{try{ok?localStorage.setItem(k,JSON.stringify(v)):mem[k]=JSON.stringify(v)}catch(e){}};
return{get,set,
 favs:()=>get('animeuz_favs',[]),
 isFav:id=>get('animeuz_favs',[]).includes(id),
 toggleFav(id){let f=get('animeuz_favs',[]);const had=f.includes(id);f=had?f.filter(x=>x!==id):[...f,id];set('animeuz_favs',f);return !had},
 clearFavs:()=>set('animeuz_favs',[]),
 theme:()=>get('animeuz_theme','dark'),setTheme:t=>set('animeuz_theme',t),
 last:()=>get('animeuz_last',null),setLast:(id,ep)=>set('animeuz_last',{id,ep})};
})();
