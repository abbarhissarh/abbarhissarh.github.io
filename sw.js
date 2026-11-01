const C='ss-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url),same=u.origin===location.origin;
  if(!same&&u.hostname!=='www.gstatic.com')return;
  if(same){e.respondWith(fetch(r).then(x=>{const k=x.clone();caches.open(C).then(c=>c.put(r,k));return x}).catch(()=>caches.match(r)))}
  else{e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{const k=x.clone();caches.open(C).then(c=>c.put(r,k));return x})))}
});
