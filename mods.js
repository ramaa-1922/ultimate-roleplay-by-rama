/* Safe, declarative mod loader.
   Mods are JSON manifests, not arbitrary JavaScript. This avoids eval() and limits
   mods to approved content additions. Never paste unknown executable code here. */
window.Mods = (() => {
 const apiVersion=1;
 const allowedTypes=["location","item","job","quest","event"];
 function validate(mod){
  if(!mod||typeof mod!=="object")throw Error("Mod harus berupa objek JSON.");
  if(!/^[a-z0-9_-]{3,32}$/i.test(mod.id||""))throw Error("ID mod harus 3-32 karakter (huruf/angka/_/-).");
  if(!mod.name||typeof mod.name!=="string"||mod.name.length>50)throw Error("Nama mod wajib diisi (maks. 50 karakter).");
  if(mod.apiVersion!==apiVersion)throw Error("Versi API tidak kompatibel. Gunakan apiVersion: 1.");
  if(!Array.isArray(mod.content)||mod.content.length>30)throw Error("content harus berupa array maksimal 30 data.");
  mod.content.forEach(x=>{
   if(!allowedTypes.includes(x.type))throw Error("Jenis konten tidak diizinkan: "+x.type);
   if(!x.id||!x.name||typeof x.name!=="string")throw Error("Setiap konten wajib memiliki id dan name.");
   if(x.name.length>60)throw Error("Nama konten maksimal 60 karakter.");
   if(x.description&&String(x.description).length>240)throw Error("Deskripsi maksimal 240 karakter.");
  });
  return true;
 }
 function list(){return Game.state.mods||[]}
 function install(raw){const mod=typeof raw==="string"?JSON.parse(raw):raw;validate(mod);if(list().some(m=>m.id===mod.id))throw Error("ID mod sudah digunakan.");mod.enabled=true;Game.state.mods.push(mod);Game.log("Mod dipasang: "+mod.name);Game.save();return mod}
 function toggle(id){const m=list().find(x=>x.id===id);if(!m)throw Error("Mod tidak ditemukan.");m.enabled=!m.enabled;Game.save()}
 function remove(id){Game.state.mods= list().filter(x=>x.id!==id);Game.save()}
 function content(type){return list().filter(m=>m.enabled).flatMap(m=>m.content.filter(x=>x.type===type))}
 return {apiVersion,validate,install,toggle,remove,list,content,allowedTypes};
})();