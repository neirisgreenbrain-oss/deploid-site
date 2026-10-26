/* A finite example, never an invented client result. No trackers or dependencies. */
(() => {
 'use strict';
 const root=document.querySelector('.hero-workshop');
 if(!root)return;
 const scene=root.querySelector('.workshop-scene'),button=root.querySelector('.workshop-play');
 const status=root.querySelector('.workshop-status'),items=[...root.querySelectorAll('.workshop-result li')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
 root.classList.add('has-workshop');
 let timers=[],running=false,seen=false,frame=0;
 const cancel=()=>{timers.forEach(clearTimeout);timers=[];running=false;scene.classList.remove('is-running');button.disabled=false;button.querySelector('span').textContent='Показать процесс'};
 const finish=()=>{running=false;scene.classList.remove('is-running');scene.classList.add('is-complete');items.forEach(x=>x.classList.add('is-done'));status.textContent='Результат проверен и передан в работу.';button.disabled=false;button.querySelector('span').textContent='Повторить процесс'};
 const play=()=>{
  cancel();seen=true;scene.classList.remove('is-complete');items.forEach(x=>x.classList.remove('is-done'));
  if(reduced.matches){finish();return}
  running=true;scene.classList.add('is-running');button.disabled=true;button.querySelector('span').textContent='Процесс идёт';
  status.textContent='Получаем запрос из ваших сервисов.';
  timers.push(setTimeout(()=>{items[0].classList.add('is-done');status.textContent='Обрабатываем данные по правилам процесса.'},1100));
  timers.push(setTimeout(()=>{items[1].classList.add('is-done');status.textContent='Проверяем результат перед передачей.'},2300));
  timers.push(setTimeout(finish,3700));
 };
 button.addEventListener('click',play);
 const reset=()=>{scene.style.setProperty('--rx','0deg');scene.style.setProperty('--ry','0deg')};
 scene.addEventListener('pointermove',e=>{
  if(!fine.matches||reduced.matches||e.pointerType==='touch')return;
  const rect=scene.getBoundingClientRect(),x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;
  cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{scene.style.setProperty('--rx',(-y*6).toFixed(2)+'deg');scene.style.setProperty('--ry',(x*7).toFixed(2)+'deg')});
 },{passive:true});
 scene.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);reset()});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);reset();if(running){cancel();status.textContent='Связываем данные, обработку и проверку.'}}});
 reduced.addEventListener('change',()=>{reset();if(reduced.matches&&running){cancel();finish()}});
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting&&!seen&&!reduced.matches){play()}
   else if(!entry.isIntersecting&&running){cancel();status.textContent='Связываем данные, обработку и проверку.'}
  }),{threshold:.45});observer.observe(scene);
 }
})();
