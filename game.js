/* Core game state and systems. Keep extension points in this file stable. */
window.Game = (() => {
 const KEY="rama_ultimate_roleplay_v1";
 const base={version:1,character:null,day:1,hour:8,money:500,health:100,energy:90,happiness:75,reputation:0,location:"Alun-Alun Kota",inventory:[{id:"roti",name:"Roti",qty:2}],job:null,xp:0,level:1,relationships:{},quests:["first_day"],completed:[],mods:[],log:[]};
 let state=structuredClone(base);
 const locations=[
  {id:"square",name:"Alun-Alun Kota",desc:"Pusat kota yang ramai. Banyak warga berkumpul di sini.",activity:"Istirahat dan bertemu warga"},
  {id:"market",name:"Pasar Sentosa",desc:"Tempat membeli kebutuhan sehari-hari.",activity:"Belanja kebutuhan"},
  {id:"cafe",name:"Kafe Senja",desc:"Kafe kecil dengan suasana nyaman.",activity:"Bersantai"},
  {id:"hospital",name:"Rumah Sakit Umum",desc:"Tempat memulihkan kesehatan.",activity:"Periksa kesehatan"},
  {id:"bank",name:"Bank Nusantara",desc:"Tempat mengelola tabungan.",activity:"Mengelola uang"},
  {id:"park",name:"Taman Kota",desc:"Ruang hijau untuk berolahraga.",activity:"Olahraga ringan"},
  {id:"home",name:"Rumah Sewa",desc:"Tempat tinggal sederhana milikmu.",activity:"Beristirahat"}
 ];
 const jobs=[{id:"courier",name:"Kurir Paket",pay:120,desc:"Antarkan paket di sekitar kota."},{id:"barista",name:"Barista",pay:150,desc:"Melayani pelanggan kafe."},{id:"shop",name:"Pegawai Toko",pay:135,desc:"Membantu operasional toko."}];
 const quests={first_day:{title:"Hari Pertama",desc:"Kunjungi Pasar Sentosa dan kenali lingkungan baru.",reward:100,xp:30}};
 function save(){localStorage.setItem(KEY,JSON.stringify(state))}
 function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.version===1){state={...structuredClone(base),...s};return true}}catch(e){console.error(e)}return false}
 function log(msg){state.log.unshift("Hari "+state.day+" "+String(state.hour).padStart(2,"0")+":00 — "+msg);state.log=state.log.slice(0,35);save()}
 function advance(hours=1){state.hour+=hours;while(state.hour>=24){state.hour-=24;state.day++;state.energy=Math.min(100,state.energy+20);log("Hari baru dimulai.")}save()}
 function spend(n){if(state.money<n)return false;state.money-=n;return true}
 function addItem(item,qty=1){let found=state.inventory.find(x=>x.id===item.id);if(found)found.qty+=qty;else state.inventory.push({...item,qty});save()}
 function completeQuest(id){if(state.completed.includes(id))return false;const q=quests[id];if(!q)return false;state.completed.push(id);state.money+=q.reward;state.xp+=q.xp;if(state.xp>=state.level*100){state.xp-=state.level*100;state.level++;log("Naik level! Sekarang level "+state.level+".")}log("Quest selesai: "+q.title+" (+"+q.reward+" uang, +"+q.xp+" EXP).");save();return true}
 return {get state(){return state},locations,jobs,quests,save,load,log,advance,spend,addItem,completeQuest,reset(){state=structuredClone(base);save()},setState(s){state=s;save()}};
})();