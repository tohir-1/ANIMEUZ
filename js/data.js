(function(){
const G={A:'Action',V:'Adventure',C:'Comedy',D:'Drama',F:'Fantasy',R:'Romance',H:'Horror',M:'Mystery',S:'Sci-Fi',P:'Sports',U:'Supernatural',T:'Thriller'};
const GUZ={Action:'jangari',Adventure:'sarguzasht',Comedy:'komediya',Drama:'drama',Fantasy:'fentezi',Romance:'romantik',Horror:'dahshat',Mystery:'sirli',"Sci-Fi":'ilmiy-fantastik',Sports:'sport',Supernatural:'g‘ayritabiiy',Thriller:'triller'};
// Demo (ochiq litsenziyali Blender filmlari). Haqiqiy qismlar uchun videoUrl ni o‘zingiz to‘ldiring.
const DEMO=['https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4','https://www.w3schools.com/html/mov_bbb.mp4','https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.360p.webm','https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'];
window.DEMO_URLS=DEMO;
// O‘Z VIDEOLARINGIZNI SHU YERDA ULANG (faqat huquqingiz bo‘lgan manbalar):
// VIDEOS[5]={pattern:'assets/videos/deathnote/{n}.mp4'};            // 1.mp4, 2.mp4, ...
// VIDEOS[1]={1:'https://.../naruto-1.mp4',2:{url:'https://youtu.be/XXXXXXXXXXX',type:'youtube'}};
const VIDEOS={};
const ONGOING=[2,7,8,43,78,80,81,82];
window.ANIME_IMG_NOTE='Rasmlar: assets/images/ID.jpg va ID-banner.jpg';
const rows=`Naruto|NARUTO|2002|8.0|220|TV|Pierrot|AVC
One Piece|ONE PIECE|1999|8.7|1100|TV|Toei Animation|AVC
Bleach|BLEACH|2004|7.9|366|TV|Pierrot|AUF
Attack on Titan|Shingeki no Kyojin|2013|8.5|87|TV|Wit Studio / MAPPA|ADT
Death Note|DEATH NOTE|2006|8.6|37|TV|Madhouse|MTU
Fullmetal Alchemist: Brotherhood|Hagane no Renkinjutsushi|2009|9.1|64|TV|Bones|AVDF
Demon Slayer|Kimetsu no Yaiba|2019|8.4|26|TV|ufotable|AFU
Jujutsu Kaisen|Jujutsu Kaisen|2020|8.5|47|TV|MAPPA|AUF
My Hero Academia|Boku no Hero Academia|2016|7.9|138|TV|Bones|AF
Dragon Ball Z|Dragon Ball Z|1989|8.2|291|TV|Toei Animation|AVF
Hunter x Hunter|Hunter x Hunter (2011)|2011|9.0|148|TV|Madhouse|AVF
One Punch Man|One Punch Man|2015|8.5|24|TV|Madhouse|ACS
Tokyo Ghoul|Tokyo Ghoul|2014|7.8|12|TV|Pierrot|AHU
Sword Art Online|Sword Art Online|2012|7.2|25|TV|A-1 Pictures|AVFR
Steins;Gate|Steins;Gate|2011|9.1|24|TV|White Fox|SDT
Cowboy Bebop|Cowboy Bebop|1998|8.8|26|TV|Sunrise|ASD
Code Geass|Code Geass: Hangyaku no Lelouch|2006|8.7|25|TV|Sunrise|ADS
Neon Genesis Evangelion|Shinseiki Evangelion|1995|8.3|26|TV|Gainax|ADS
Your Name|Kimi no Na wa.|2016|8.8|1|Movie|CoMix Wave Films|RDU
Spirited Away|Sen to Chihiro no Kamikakushi|2001|8.8|1|Movie|Studio Ghibli|VFU
Princess Mononoke|Mononoke-hime|1997|8.7|1|Movie|Studio Ghibli|AVF
Howl's Moving Castle|Hauru no Ugoku Shiro|2004|8.7|1|Movie|Studio Ghibli|VFR
My Neighbor Totoro|Tonari no Totoro|1988|8.3|1|Movie|Studio Ghibli|FU
Weathering with You|Tenki no Ko|2019|8.0|1|Movie|CoMix Wave Films|RDF
A Silent Voice|Koe no Katachi|2016|8.9|1|Movie|Kyoto Animation|DR
Haikyu!!|Haikyuu!!|2014|8.5|85|TV|Production I.G|PCD
Kuroko's Basketball|Kuroko no Basuke|2012|8.2|75|TV|Production I.G|PC
Slam Dunk|Slam Dunk|1993|8.5|101|TV|Toei Animation|PC
Blue Lock|Blue Lock|2022|8.2|24|TV|8bit|PD
Yuri!!! on Ice|Yuri!!! on Ice|2016|7.9|12|TV|MAPPA|PD
Free!|Free! Iwatobi Swim Club|2013|7.3|12|TV|Kyoto Animation|PC
Fruits Basket|Fruits Basket (2019)|2019|8.6|63|TV|TMS Entertainment|RDU
Toradora!|Toradora!|2008|8.1|25|TV|J.C.Staff|RCD
Your Lie in April|Shigatsu wa Kimi no Uso|2014|8.7|22|TV|A-1 Pictures|DR
Clannad: After Story|Clannad: After Story|2008|8.9|24|TV|Kyoto Animation|DRU
Kaguya-sama: Love Is War|Kaguya-sama wa Kokurasetai|2019|8.4|37|TV|A-1 Pictures|CR
Horimiya|Horimiya|2021|8.2|13|TV|CloverWorks|CR
Lovely Complex|Lovely Complex|2007|8.1|24|TV|Toei Animation|CR
Ouran High School Host Club|Ouran Koukou Host Club|2006|8.1|26|TV|Bones|CR
Gintama|Gintama|2006|8.9|201|TV|Sunrise|ACS
KonoSuba|Kono Subarashii Sekai ni Shukufuku wo!|2016|8.1|20|TV|Studio Deen|VCF
Mob Psycho 100|Mob Psycho 100|2016|8.5|37|TV|Bones|ACU
Spy x Family|Spy x Family|2022|8.6|25|TV|Wit Studio / CloverWorks|ACM
Chainsaw Man|Chainsaw Man|2022|8.4|12|TV|MAPPA|AHU
Vinland Saga|Vinland Saga|2019|8.7|48|TV|Wit Studio / MAPPA|AVD
Mushishi|Mushishi|2005|8.7|26|TV|Artland|VMU
Monster|Monster|2004|8.7|74|TV|Madhouse|MDT
Psycho-Pass|Psycho-Pass|2012|8.3|22|TV|Production I.G|AST
Ghost in the Shell|Koukaku Kidoutai|1995|8.0|1|Movie|Production I.G|ASM
Akira|Akira|1988|8.0|1|Movie|TMS Entertainment|AS
Made in Abyss|Made in Abyss|2017|8.7|13|TV|Kinema Citrus|VDM
Re:Zero|Re:Zero kara Hajimeru Isekai Seikatsu|2016|8.2|25|TV|White Fox|DFT
Overlord|Overlord|2015|7.9|13|TV|Madhouse|AFV
That Time I Got Reincarnated as a Slime|Tensei shitara Slime Datta Ken|2018|8.1|24|TV|8bit|AFC
Black Clover|Black Clover|2017|8.2|170|TV|Pierrot|AFC
Fairy Tail|Fairy Tail|2009|7.6|175|TV|A-1 Pictures / Satelight|AFV
Soul Eater|Soul Eater|2008|7.8|51|TV|Bones|AUF
Fire Force|Enen no Shouboutai|2019|7.7|48|TV|David Production|ASU
Dr. Stone|Dr. Stone|2019|8.3|24|TV|TMS Entertainment|VCS
The Promised Neverland|Yakusoku no Neverland|2019|8.5|12|TV|CloverWorks|HMT
Erased|Boku dake ga Inai Machi|2016|8.3|12|TV|A-1 Pictures|MTU
Another|Another|2012|7.5|12|TV|P.A. Works|HMU
Higurashi: When They Cry|Higurashi no Naku Koro ni|2006|7.9|26|TV|Studio Deen|HMT
Parasyte -the maxim-|Kiseijuu: Sei no Kakuritsu|2014|8.3|24|TV|Madhouse|AHS
Hellsing Ultimate|Hellsing Ultimate|2006|8.4|10|OVA|Madhouse|AH
Berserk|Berserk|1997|8.6|25|TV|OLM|AFH
Trigun|Trigun|1998|8.2|26|TV|Madhouse|ASV
Samurai Champloo|Samurai Champloo|2004|8.5|26|TV|Manglobe|AVC
Rurouni Kenshin|Rurouni Kenshin: Meiji Kenkaku Romantan|1996|8.3|94|TV|Studio Gallop|AVR
Inuyasha|InuYasha|2000|7.9|167|TV|Sunrise|AFR
Yu Yu Hakusho|Yuu Yuu Hakusho|1992|8.5|112|TV|Pierrot|AU
JoJo's Bizarre Adventure|JoJo no Kimyou na Bouken|2012|8.4|26|TV|David Production|AVU
Dororo|Dororo|2019|8.2|24|TV|MAPPA|AUD
Violet Evergarden|Violet Evergarden|2018|8.5|13|TV|Kyoto Animation|DFR
Anohana|Ano Hi Mita Hana no Namae wo Bokutachi wa Mada Shiranai.|2011|8.2|11|TV|A-1 Pictures|DU
Angel Beats!|Angel Beats!|2010|8.1|13|TV|P.A. Works|CDU
Bocchi the Rock!|Bocchi the Rock!|2022|8.8|12|TV|CloverWorks|C
Frieren: Beyond Journey's End|Sousou no Frieren|2023|9.3|28|TV|Madhouse|AVDF
Oshi no Ko|Oshi no Ko|2023|8.6|11|TV|Doga Kobo|DMU
Solo Leveling|Ore dake Level Up na Ken|2024|8.2|12|TV|A-1 Pictures|AVF
Dandadan|Dandadan|2024|8.5|12|TV|Science SARU|ACU
Kaiju No. 8|Kaijuu 8-gou|2024|8.3|12|TV|Production I.G|AS
Lycoris Recoil|Lycoris Recoil|2022|8.2|13|TV|A-1 Pictures|AT
Cyberpunk: Edgerunners|Cyberpunk: Edgerunners|2022|8.6|10|ONA|Trigger|ASD
Arcane|Arcane|2021|9.0|18|ONA|Fortiche|AFS
Dragon Ball|Dragon Ball|1986|7.9|153|TV|Toei Animation|AVC
Fate/Zero|Fate/Zero|2011|8.3|25|TV|ufotable|AFT
Fate/stay night: Unlimited Blade Works|Fate/stay night: Unlimited Blade Works|2014|8.2|26|TV|ufotable|AFR
Noragami|Noragami|2014|7.9|12|TV|Bones|AFU
Blue Exorcist|Ao no Exorcist|2011|7.6|25|TV|A-1 Pictures|AFU
The Seven Deadly Sins|Nanatsu no Taizai|2014|7.6|24|TV|A-1 Pictures|AVF
Assassination Classroom|Ansatsu Kyoushitsu|2015|8.1|22|TV|Lerche|AC
Akame ga Kill!|Akame ga Kill!|2014|7.5|24|TV|White Fox|AD
Future Diary|Mirai Nikki|2011|7.4|26|TV|Asread|MT
Death Parade|Death Parade|2015|8.2|12|TV|Madhouse|MTU
Welcome to the NHK|NHK ni Youkoso!|2006|8.2|24|TV|Gonzo|CDR
Great Teacher Onizuka|Great Teacher Onizuka|1999|8.7|43|TV|Pierrot|CD
Cells at Work!|Hataraku Saibou|2018|8.0|13|TV|David Production|CS
Space Brothers|Uchuu Kyoudai|2012|8.2|99|TV|A-1 Pictures|CDS
Run with the Wind|Kaze ga Tsuyoku Fuiteiru|2018|8.1|23|TV|Production I.G|DP
The Boy and the Heron|Kimitachi wa Dou Ikiru ka|2023|7.9|1|Movie|Studio Ghibli|DFV
Suzume|Suzume no Tojimari|2022|7.8|1|Movie|CoMix Wave Films|RFV
Grave of the Fireflies|Hotaru no Haka|1988|8.5|1|Movie|Studio Ghibli|D
Perfect Blue|Perfect Blue|1997|8.0|1|Movie|Madhouse|HMT
Mushoku Tensei|Mushoku Tensei: Isekai Ittara Honki Dasu|2021|8.3|23|TV|Studio Bind|AVD`.split('\n');
window.GENRES=Object.values(G);
window.GENRE_UZ=GUZ;
window.ANIME=rows.map((r,i)=>{
  const [title,originalTitle,year,rating,eps,type,studio,g]=r.split('|');
  const id=i+1,episodes=+eps,genres=[...g].map(c=>G[c]);
  const typeUz={TV:'teleserial',Movie:'to‘liq metrajli film',OVA:'OVA seriyasi',ONA:'ONA seriyasi'}[type];
  const list=[];
  for(let n=1;n<=Math.min(episodes,100);n++){
    const V=VIDEOS[id]||{};let c=V.pattern?{url:V.pattern.replace('{n}',n),type:V.type||'html5'}:V[n];
    if(typeof c==='string')c={url:c,type:'html5'};
    const demo=!c;
    list.push({number:n,title:type==='Movie'?'Film':n+'-qism',videoType:demo?'html5':(c.type||'html5'),videoUrl:demo?'':c.url,sources:demo?undefined:c.sources,demo:false});
  }
  return {id,title,originalTitle,poster:`assets/images/${id}.jpg`,banner:`assets/images/${id}-banner.jpg`,
    description:`${title} — ${year}-yilda ${studio} studiyasi tomonidan yaratilgan ${genres.map(x=>GUZ[x]).join(', ')} janridagi ${typeUz}. Jami qismlar soni: ${episodes}.`,
    genres,year:+year,rating:+rating,episodes,type,duration:type==='Movie'?'~110 daqiqa':type==='TV'?'~24 daqiqa':'~30 daqiqa',
    status:type==='Movie'||!ONGOING.includes(id)?'Completed':'Ongoing',studio,language:['Japanese','Uzbek'],trailerUrl:'',googleSearch:'',episodesList:list};
});
})();
