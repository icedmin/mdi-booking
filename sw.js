/* MDI Booking — 폰 알림 받기 (화면 저장·캐시 없음) */
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{
  let d={};try{d=e.data?e.data.json():{}}catch(_){d={title:"MDI Booking",body:e.data&&e.data.text()}}
  e.waitUntil(self.registration.showNotification(d.title||"MDI Booking",{
    body:d.body||"",tag:d.tag||undefined,renotify:true,icon:"icon-192.png",badge:"icon-192.png",data:{url:d.url||"./"}}));
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  const url=new URL((e.notification.data&&e.notification.data.url)||"./",self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(ws=>{
    for(const w of ws){if(w.url.startsWith(self.registration.scope)&&"focus" in w)return w.focus()}
    return self.clients.openWindow(url);
  }));
});
