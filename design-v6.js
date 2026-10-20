/* First-party SVG motion. No libraries, network requests, storage or analytics. */
(() => {
 'use strict';
 const motion=matchMedia('(prefers-reduced-motion: reduce)'), fine=matchMedia('(hover: hover) and (pointer: fine)');
 const ns='http://www.w3.org/2000/svg',stages=new Set();
 const el=(tag,attrs={},text)=>{const n=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));if(text!==undefined)n.textContent=text;return n};
 const line=(s,d,main=true,i=0)=>{const p=el('path',{d,class:`fiber ${main?'fiber-main':'fiber-secondary'}`,pathLength:1});if(main)p.style.opacity=.35+(i%6)*.09;s.append(p);return p};
 const dot=(s,x,y,core=false)=>s.append(el('circle',{cx:x,cy:y,r:core?7:4,class:core?'anchor-core':'anchor'}));
 const label=(s,x,y,t,cls='')=>s.append(el('text',{x,y,'text-anchor':'middle',class:cls},t));
 const paper=(s,x,y,w=46)=>{const g=el('g',{transform:`translate(${x} ${y})`});for(let i=2;i>=0;i--)g.append(el('rect',{x:i*5,y:-i*5,width:w,height:w*1.3,rx:2,fill:'#fff',stroke:'#adc2e5','stroke-width':.9}));for(let i=0;i<4;i++)g.append(el('path',{d:`M 10 ${14+i*8} h ${w-20-(i===3?8:0)}`,stroke:i===0?'#2455ef':'#bdcde4','stroke-width':1.5,fill:'none'}));s.append(g)};
 function art(type,names){
  const s=el('svg',{viewBox:'0 0 600 330',class:'signal-svg','aria-hidden':'true',focusable:'false'}),g=el('g',{class:'fiber-lines'});s.append(g);let route;
  if(type==='transcription'){
   for(let j=0;j<19;j++){let d='';for(let x=70;x<=530;x+=3){const env=Math.sin(Math.PI*(x-70)/460)**2,h=x<300?Math.sin(x*.13+j*.12)*43*env:Math.sin(x*.035+j*.09)*13;d+=`${x===70?'M':'L'}${x} ${(151+(j-9)*3.8+h).toFixed(2)} `}const p=line(g,d,j%3!==0,j);if(j===9)route=p}
   for(let j=0;j<4;j++)s.append(el('path',{d:`M 396 ${224+j*9} h ${j===3?67:116}`,stroke:'#8ea8d0','stroke-width':2,opacity:.7}));dot(s,70,151);dot(s,300,151,true);dot(s,530,151);
  }else if(type==='planner'){
   for(let col=0;col<5;col++){s.append(el('path',{d:`M ${130+col*80} 78 V 225`,stroke:'#c5d3e8','stroke-width':.7}));for(let r=0;r<3;r++){const shift=(col*7+r*13)%28;s.append(el('rect',{x:132+col*80,y:94+r*42+shift/3,width:34+shift,height:16,rx:3,fill:r===col%3?'#2455ef':'#c1d2ef',opacity:r===col%3?.8:.65}))}}
   for(let j=0;j<14;j++){const d=`M 65 ${170+j*3} C 125 ${150+j*3}, 139 ${55+j*3}, 252 ${56+j*3} S 425 ${225+j*2}, 535 ${165+j*2}`,p=line(g,d,j%4!==0,j);if(j===7)route=p}dot(s,65,191);dot(s,300,127,true);dot(s,535,179);
  }else if(type==='research'){
   for(let n=0;n<5;n++){const y=66+n*40;dot(s,81,y);for(let j=0;j<5;j++){const p=line(g,`M 83 ${y+j*2} C 177 ${y+j*2}, 182 ${137+j*3}, 299 ${137+j*3} S 428 ${110+n*17}, 527 ${110+n*17}`,n%2===0,n+j);if(n===2&&j===2)route=p}}
   dot(s,299,143,true);for(let r=0;r<5;r++)s.append(el('rect',{x:464,y:103+r*17,width:65,height:8,rx:1,fill:r%2===0?'#e3ebf8':'#fff',stroke:'#93aed6','stroke-width':.7}));
  }else if(type==='workspace'){
   for(let j=0;j<21;j++){const x=j*3.5,d=`M ${86+x} 185 C ${135+x} 35, ${385+x*.45} 30, ${458+x*.22} 151 C ${505-x*.2} 265, ${222-x*.35} 281, ${193-x*.4} 176 C ${175-x*.24} 84, ${381-x*.18} 72, ${465+x*.3} 169`,p=line(g,d,j%4!==0,j);if(j===10)route=p}
   const pane=el('g',{transform:'translate(248 111)'});pane.append(el('rect',{width:103,height:70,rx:4,fill:'#fff',stroke:'#8faee0','stroke-width':1}),el('path',{d:'M 0 15 H 103 M 27 15 V 70',stroke:'#c1d0e7',fill:'none'}),el('path',{d:'M 38 30 l 8 6 -8 6 M 54 46 h 19',stroke:'#2455ef','stroke-width':2,fill:'none'}));s.append(pane);dot(s,105,151);dot(s,299,76,true);dot(s,492,170);
  }else if(type==='documents'){
   for(let j=0;j<25;j++){const f=j-12,d=`M 105 ${165+f*2.3} C 200 ${165+f*2.3}, 206 ${68+f*3}, 300 ${68+f*3} C 397 ${68+f*3}, 396 ${168-f*2.3}, 499 ${168-f*2.3}`,p=line(g,d,j%4!==0,j);if(j===12)route=p}paper(s,79,141,43);paper(s,469,144,43);s.append(el('circle',{cx:300,cy:134,r:31,fill:'#fff',stroke:'#aac0e7'}),el('path',{d:'m 287 134 9 9 18 -21',fill:'none',stroke:'#2455ef','stroke-width':2.3,'stroke-linecap':'round','stroke-linejoin':'round'}));dot(s,300,68,true);
  }else if(type==='listings'){
   for(let j=0;j<22;j++){const f=j-11,p=line(g,`M 104 ${161+f*2} C 163 ${161+f*2}, 216 ${77+f*2.6}, 295 ${95+f*2.6} S 413 ${239-f*2.3}, 493 ${161-f*2}`,j%3!==0,j);if(j===11)route=p}paper(s,69,117,48);const p=el('g',{transform:'translate(457 99)'});p.append(el('rect',{width:80,height:111,rx:3,fill:'white',stroke:'#9db7de'}),el('rect',{x:9,y:10,width:62,height:41,rx:2,fill:'#d5e2f6'}),el('path',{d:'M 9 65 h 48 M 9 74 h 60 M 9 83 h 37 M 9 96 h 23',fill:'none',stroke:'#96afd2','stroke-width':2}));s.append(p);dot(s,300,95,true);
  }else{
   for(let j=0;j<25;j++){const f=j-12,p=line(g,`M 73 ${126+f*3} C 173 ${126+f*3}, 193 ${198-f*1.7}, 300 ${162-f*1.7} S 420 ${86+f*2.5}, 527 ${149+f*2.5}`,j%4!==0,j);if(j===12)route=p}for(let j=0;j<10;j++)line(g,`M 300 ${162+j*2} C 343 ${200+j*2}, 334 ${240+j*2}, 400 ${240+j*2} H 480`,false,j);dot(s,73,126);dot(s,300,162,true);dot(s,527,149);s.append(el('path',{d:'M 467 233 v 27 m 7 -17 v 17 m 7 -10 v 10',stroke:'#90a9d0','stroke-width':2,fill:'none'}));
  }
  [110,300,490].forEach((x,i)=>label(s,x,286,names[i]||'',i===1?'art-heading':''));const packet=el('circle',{r:4,class:'packet'});s.append(packet);s.dataset.art=type;return{svg:s,route,packet};
 }
 function play(stage,assembly=false){
  if(stage._playing)return;
  if(motion.matches){stage.dataset.played='true';return}
  const{route,packet}=stage._art;if(!route)return;stage._playing=true;stage.classList.add('is-playing');
  if(assembly&&typeof route.animate==='function')stage.querySelectorAll('.fiber').forEach((p,i)=>p.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:850,delay:(i%9)*20,easing:'cubic-bezier(.22,1,.36,1)'}));
  let length;try{length=route.getTotalLength()}catch{stage._playing=false;stage.classList.remove('is-playing');return}
  const start=performance.now(),duration=assembly?1100:1250;
  const tick=now=>{if(document.hidden||motion.matches||!stage.isConnected){stage._playing=false;stage.classList.remove('is-playing');return}const progress=Math.min(1,(now-start)/duration),p=route.getPointAtLength(length*progress);packet.setAttribute('cx',p.x);packet.setAttribute('cy',p.y);if(progress<1)requestAnimationFrame(tick);else{stage._playing=false;stage.classList.remove('is-playing');stage.dataset.played='true'}};requestAnimationFrame(tick);
 }
 function stage(type,names,interactive=false){
  const box=document.createElement('div');box.className='signal-stage';if(interactive)box.dataset.interactive='true';const scene=document.createElement('div');scene.className='signal-scene';box._art=art(type,names);scene.append(box._art.svg);box.append(scene);
  const controls=document.createElement('div');controls.className='signal-controls';const caption=document.createElement('span');caption.className='signal-caption';caption.textContent='Схема процесса';controls.append(caption);
  if(interactive){const b=document.createElement('button');b.type='button';b.className='signal-play';const icon=el('svg',{viewBox:'0 0 12 12','aria-hidden':'true'});icon.append(el('path',{d:'M 3 1.5 10 6 3 10.5 Z'}));b.append(icon,document.createTextNode('Показать движение'));b.addEventListener('click',()=>play(box));controls.append(b)}box.append(controls);
  let queued=false,x=0,y=0;box.addEventListener('pointermove',e=>{if(!fine.matches||motion.matches||e.pointerType==='touch')return;const r=box.getBoundingClientRect();x=(e.clientX-r.left)/r.width-.5;y=(e.clientY-r.top)/r.height-.5;if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;box.style.setProperty('--pitch',`${-y*10}deg`);box.style.setProperty('--yaw',`${x*13}deg`)})}},{passive:true});box.addEventListener('pointerleave',()=>{box.style.setProperty('--pitch','0deg');box.style.setProperty('--yaw','0deg')});box.addEventListener('pointerenter',e=>{if(fine.matches&&e.pointerType!=='touch')play(box)});stages.add(box);return box;
 }
 const topicArt={clients:['orders',['Обращения','Обработка','Следующий шаг']],operations:['orders',['Задачи','Ответственный','Результат']],information:['documents',['Исходники','Проверка','Документы']],systems:['research',['Источники','Связь','Сервисы']],ai:['workspace',['Данные','Проверка','Решение']]};
 const scope=document.querySelector('.scope-description');let current;
 if(scope){
  // Keep animation controls outside the live region: announce changed copy, not SVG rebuilding.
  const copy=document.createElement('div');copy.className='topic-copy';copy.setAttribute('aria-live','polite');copy.setAttribute('aria-atomic','true');
  while(scope.firstChild)copy.append(scope.firstChild);
  scope.removeAttribute('aria-live');scope.removeAttribute('aria-atomic');
  current=stage(...topicArt.clients,true);scope.append(current,copy);
 }
 document.querySelectorAll('[data-topic]').forEach(button=>button.addEventListener('click',()=>{if(!current||!topicArt[button.dataset.topic])return;const next=stage(...topicArt[button.dataset.topic],true);stages.delete(current);current.replaceWith(next);current=next;play(next,true)}));
 document.querySelectorAll('.flow-graphic').forEach(graph=>{const type=graph.closest('[data-project]')?.dataset.project||'orders',names=[...graph.querySelectorAll('.flow-node span')].map(n=>n.textContent.trim()),visual=stage(type,names,Boolean(graph.closest('.case-flow')));visual.setAttribute('role','group');visual.setAttribute('aria-label',graph.getAttribute('aria-label')||'Схема проекта');graph.hidden=true;graph.style.display='none';graph.after(visual)});
 const author=document.querySelector('.author');
 if(author){const mark=document.createElement('div');mark.className='portrait-mark';mark.setAttribute('aria-hidden','true');const icon=el('svg',{viewBox:'0 0 48 48'});for(let i=0;i<3;i++)icon.append(el('path',{d:`M ${8+i*8} 8 v ${15-i*4} Q ${8+i*8} 39 ${24+i*8} 39 H 40`,fill:'none',stroke:'currentColor','stroke-width':1.7,'stroke-linecap':'round'}));mark.append(icon);author.append(mark)}
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){play(entry.target,true);observer.unobserve(entry.target)}}),{threshold:.33});stages.forEach(s=>observer.observe(s))}
 let queued=false;
 const scroll=()=>{queued=false;if(!author||motion.matches||innerWidth<681)return;const progress=Math.max(0,Math.min(1,(120-author.getBoundingClientRect().top)/550));author.style.setProperty('--portrait-turn',`${2.8-progress*5.6}deg`);author.dataset.scrollPosition=progress.toFixed(2)};
 if(author){addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(scroll)}},{passive:true});scroll()}
 motion.addEventListener('change',()=>{if(motion.matches)stages.forEach(s=>{s.style.removeProperty('--pitch');s.style.removeProperty('--yaw');s.querySelectorAll('.fiber').forEach(p=>p.getAnimations().forEach(a=>a.cancel()))})});
})();
