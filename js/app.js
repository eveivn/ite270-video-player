const video = document.getElementById('video');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const back10 = document.getElementById('back10');
const fwd10 = document.getElementById('fwd10');
const seek = document.getElementById('seek');
const timeEl = document.getElementById('time');
const volume = document.getElementById('volume');
const speed = document.getElementById('speed');
const ccBtn = document.getElementById('cc');
const pipBtn = document.getElementById('pip');
const fsBtn = document.getElementById('fs');
function fmt(s){ const m=Math.floor(s/60); const
sec=Math.floor(s%60).toString().padStart(2,'0'); return `${m}:${sec}`; }
video.addEventListener('loadedmetadata', updateTime);
video.addEventListener('timeupdate', updateTime);
function updateTime(){ const cur=video.currentTime||0, dur=video.duration||0;
timeEl.textContent=`${fmt(cur)} / ${fmt(dur)}`; seek.value = dur ? (cur/dur)*100 : 0; }
play .addEventListener('click', ()=>video.play());
pause.addEventListener('click', ()=>video.pause());
back10.addEventListener('click', ()=>video.currentTime = Math.max((video.currentTime||0)-10,
0));
fwd10 .addEventListener('click', ()=>video.currentTime = Math.min((video.currentTime||0)+10,
video.duration||0));
seek .addEventListener('input', (e)=>{ if(!video.duration) return; const
pct=Number(e.target.value)/100; video.currentTime = pct*video.duration; });
volume.addEventListener('input', (e)=> video.volume = Number(e.target.value));
speed .addEventListener('change', (e)=> video.playbackRate = Number(e.target.value));
ccBtn.addEventListener('click', ()=>{ const t=video.textTracks; if(!t||!t[0]) return; const
showing=t[0].mode==='showing'; t[0].mode=showing?'disabled':'showing';
ccBtn.setAttribute('aria-pressed', (!showing).toString()); });
pipBtn.addEventListener('click', async()=>{ try{ if(document.pictureInPictureElement) await
document.exitPictureInPicture(); else if(document.pictureInPictureEnabled) await
video.requestPictureInPicture(); }catch(e){} });
fsBtn .addEventListener('click', async()=>{ try{ if(document.fullscreenElement) await
document.exitFullscreen(); else await video.requestFullscreen(); }catch(e){} });
document.addEventListener('keydown', (e)=>{ const
tag=document.activeElement?.tagName?.toLowerCase();
if(['input','textarea','select','button'].includes(tag)) return; if(e.code==='Space'){
e.preventDefault(); video.paused?video.play():video.pause(); } if(e.code==='ArrowRight')
video.currentTime=Math.min((video.currentTime||0)+5, video.duration||0);
if(e.code==='ArrowLeft') video.currentTime=Math.max((video.currentTime||0)-5, 0);
if(e.code==='ArrowUp') video.volume=Math.min((video.volume||0)+.05,1);
if(e.code==='ArrowDown') video.volume=Math.max((video.volume||0)-.05,0); });

const themeSel=document.getElementById('theme');
function applyTheme(v){ document.body.setAttribute('data-theme', v);
localStorage.setItem('cp_theme', v); }
themeSel?.addEventListener('change', e=>applyTheme(e.target.value));
window.addEventListener('DOMContentLoaded', ()=>{ const
saved=localStorage.getItem('cp_theme')||'midnight'; if(themeSel){ themeSel.value=saved; }
applyTheme(saved); });