
var gsap=window.gsap,ST=window.ScrollTrigger;
if(gsap&&ST)gsap.registerPlugin(ST);

function animNum(el,from,to,suf,dur,dec){var s=null;function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/dur,1),e=1-Math.pow(1-p,3),v=from+(to-from)*e;el.textContent=(dec?v.toFixed(dec):Math.floor(v))+suf;if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}

function drawLine(id,data,delay,h){setTimeout(function(){var c=document.getElementById(id);if(!c)return;var ctx=c.getContext('2d');c.width=c.offsetWidth||280;c.height=h||70;var w=c.width,ch=c.height,max=Math.max.apply(null,data),step=w/(data.length-1);var g=ctx.createLinearGradient(0,0,0,ch);g.addColorStop(0,'rgba(255,106,26,.22)');g.addColorStop(1,'rgba(255,106,26,0)');ctx.beginPath();data.forEach(function(v,i){var x=i*step,y=ch-(v/max)*ch*.82;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.lineTo((data.length-1)*step,ch);ctx.lineTo(0,ch);ctx.closePath();ctx.fillStyle=g;ctx.fill();var d=0;function seg(){if(d>=data.length-1)return;ctx.beginPath();ctx.moveTo(d*step,ch-(data[d]/max)*ch*.82);ctx.lineTo((d+1)*step,ch-(data[d+1]/max)*ch*.82);ctx.strokeStyle='#ff6a1a';ctx.lineWidth=1.8;ctx.stroke();d++;setTimeout(seg,55);}seg();},delay);}

var screenStarted=false;
function startScreenContent(){
  if(screenStarted)return;screenStarted=true;
  document.querySelectorAll('#mon-l .bar-fill').forEach(function(b){b.style.width=b.getAttribute('data-w')+'%';});
  animNum(document.getElementById('roas-n'),0,2.6,'x',2400,1);
  var f=document.getElementById('roas-fill');if(f)f.style.width='78%';
  drawLine('chart-c',[0.4,0.8,0.7,1.1,1.4,1.2,1.8,2.0,1.9,2.4,2.6],400,80);
  [{id:'kpi-cpm',v:'€6.4'},{id:'kpi-ctr',v:'1.7%'},{id:'kpi-cpf',v:'€1.8'},{id:'kpi-cr',v:'2.3%'}].forEach(function(k,i){setTimeout(function(){var el=document.getElementById(k.id);if(el)el.textContent=k.v;},500+i*260);});
  [0,1,2,3,4].forEach(function(i){setTimeout(function(){var n=document.getElementById('pn'+i),c=document.getElementById('pc'+i);if(n)n.classList.add('on');if(c)c.classList.add('on');},800+i*300);});
  ['<em>META</em> · TOFU activated','<em>YT</em> · CPF €1.84 ✓','<em>META</em> · LAL 2.1M reach','<em>EMAIL</em> · Flow 1 · 847 leads','<em>GOOGLE</em> · CTR 1.6%'].forEach(function(m,i){setTimeout(function(){var feed=document.getElementById('feed');if(!feed)return;var d=document.createElement('div');d.className='feed-item';d.innerHTML=m;feed.insertBefore(d,feed.firstChild);if(feed.children.length>5)feed.removeChild(feed.lastChild);},900+i*500);});
  ['mb-l','mb-c','mb-r'].forEach(function(id){setTimeout(function(){var el=document.getElementById(id);if(el)el.classList.add('lit');},300);});
}

// ── 1. LENIS ──
var lenis;
try{
  lenis=new Lenis({duration:1.4,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t));},smoothWheel:true,wheelMultiplier:0.9});
  function lenisRaf(t){lenis.raf(t);requestAnimationFrame(lenisRaf);}
  requestAnimationFrame(lenisRaf);
  if(ST){lenis.on('scroll',ST.update);gsap.ticker.add(function(t){lenis.raf(t*1000);});gsap.ticker.lagSmoothing(0);}
}catch(e){}

// ── HERO SCROLL ANIMATION ──
if(gsap&&ST){
  ST.create({
    trigger:'#hero-pin',start:'top top',end:'bottom bottom',scrub:1.4,
    onUpdate:function(self){
      var p=self.progress;
      var sp=document.getElementById('sp-fill'),sl=document.getElementById('sp-label');
      if(sp)sp.style.width=Math.round(p*100)+'%';
      if(sl)sl.textContent=Math.round(p*100)+'%';
      var ml=document.getElementById('mon-l'),mc=document.getElementById('mon-c'),mr=document.getElementById('mon-r');
      if(!ml||!mc||!mr)return;
      if(p<0.5){
        var t=p/0.5,ease=1-Math.pow(1-t,4);
        var sL=1.4-0.5*ease,sC=1.3-0.3*ease,sR=1.4-0.53*ease;
        var lX=-900+900*ease,cY=-800+800*ease,rX=900-900*ease;
        var rL=22-4*ease,rR=-22+4*ease,rX2=4-2*ease,rXC=6-4*ease,op=Math.min(1,t*1.8);
        ml.style.transform='rotateY('+rL+'deg) rotateX('+rX2+'deg) scale('+sL+') translateX('+lX+'px)';
        ml.style.opacity=op;
        mc.style.transform='translateX(-50%) rotateX('+rXC+'deg) translateY('+cY+'px) scale('+sC+')';
        mc.style.opacity=op;
        mr.style.transform='rotateY('+rR+'deg) rotateX('+rX2+'deg) scale('+sR+') translateX('+rX+'px)';
        mr.style.opacity=op;
        var glow=document.getElementById('hero-glow');
        if(glow)glow.style.opacity=ease*1.5;
        if(t>0.75)startScreenContent();
      }else{
        var t2=(p-0.5)/0.5,drift=t2*40;
        ml.style.transform='rotateY(18deg) rotateX(2deg) scale(.9) translateX(-'+drift+'px)';ml.style.opacity=1;
        mc.style.transform='translateX(-50%) rotateX(2deg) translateY(0) scale(1)';mc.style.opacity=1;
        mr.style.transform='rotateY(-18deg) rotateX(2deg) scale(.87) translateX('+drift+'px)';mr.style.opacity=1;
        startScreenContent();
      }
    }
  });
  ST.create({trigger:'#hero-pin',start:'bottom bottom',once:true,onEnter:function(){['mon-l','mon-c','mon-r'].forEach(function(id){var el=document.getElementById(id);if(el)el.classList.add('floating');});}});

  var panels=document.querySelectorAll('.ppanel'),tabs=document.querySelectorAll('.ptab'),active=0;
  function activatePhase(i){if(i===active)return;active=i;tabs.forEach(function(t,ti){t.classList.toggle('active',ti===i);});panels[i].querySelectorAll('.bar-fill').forEach(function(b){b.style.width='0%';setTimeout(function(){b.style.width=b.getAttribute('data-w')+'%';},80);});if(i===3){var br=document.getElementById('bofu-roas');if(br)animNum(br,0,2.8,'x',1800,1);}}
  setTimeout(function(){document.querySelectorAll('.p0-bar').forEach(function(b){b.style.width=b.getAttribute('data-w')+'%';});},400);
  panels.forEach(function(p,i){ST.create({trigger:p,start:'top center',end:'bottom center',onEnter:function(){activatePhase(i);},onEnterBack:function(){activatePhase(i);}});});
  tabs.forEach(function(tab){tab.addEventListener('click',function(){panels[parseInt(tab.getAttribute('data-phase'))].scrollIntoView({behavior:'smooth',block:'center'});});});
}else{
  setTimeout(function(){var ml=document.getElementById('mon-l'),mc=document.getElementById('mon-c'),mr=document.getElementById('mon-r');if(ml){ml.style.transform='rotateY(18deg) rotateX(2deg) scale(.9)';ml.style.opacity=1;ml.style.transition='all 1.2s ease';}if(mc){mc.style.transform='translateX(-50%) rotateX(2deg)';mc.style.opacity=1;mc.style.transition='all 1.3s ease';}if(mr){mr.style.transform='rotateY(-18deg) rotateX(2deg) scale(.87)';mr.style.opacity=1;mr.style.transition='all 1.2s ease';}setTimeout(startScreenContent,800);},600);
}

setInterval(function(){var feed=document.getElementById('feed');if(!feed)return;var arr=['<em>META</em> · Lead €11.40','<em>EMAIL</em> · Open 41%','<em>YT</em> · +1,200 subs','<em>META</em> · ROAS 2.8x','<em>ITHACA</em> · +340 today'];var d=document.createElement('div');d.className='feed-item';d.innerHTML=arr[Math.floor(Math.random()*arr.length)];feed.insertBefore(d,feed.firstChild);if(feed.children.length>5)feed.removeChild(feed.lastChild);},3000);

var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.rev').forEach(function(el){obs.observe(el);});
var counted={};
new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!counted[e.target.id]){counted[e.target.id]=true;e.target.querySelectorAll('.cnt').forEach(function(c){animNum(c,0,parseInt(c.getAttribute('data-to')),'',1600,0);});setTimeout(function(){e.target.querySelectorAll('.num-cell').forEach(function(n){n.classList.add('go');});},400);}});},{threshold:.2}).observe(document.getElementById('numbers'));

// ── 2. SCRAMBLE ──
(function(){
  var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?';
  document.querySelectorAll('[data-final]').forEach(function(el,i){
    var final=el.getAttribute('data-final');
    setTimeout(function(){
      var frame=0,maxF=final.length*5+10;
      var iv=setInterval(function(){
        var out='';
        for(var j=0;j<final.length;j++){
          if(frame>j*4+8)out+=final[j];
          else if(final[j]===' ')out+=' ';
          else out+=chars[Math.floor(Math.random()*chars.length)];
        }
        el.textContent=out;frame++;
        if(frame>maxF){el.textContent=final;clearInterval(iv);}
      },40);
    },400+i*180);
  });
})();

// ── 3. MAGNETIC BUTTON ──
(function(){
  var wrap=document.getElementById('mag-wrap'),btn=document.getElementById('mag-btn');
  if(!wrap||!btn)return;
  var strength=28;
  wrap.addEventListener('mousemove',function(e){
    var rect=wrap.getBoundingClientRect(),cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
    var dx=e.clientX-cx,dy=e.clientY-cy,dist=Math.sqrt(dx*dx+dy*dy),maxD=120;
    if(dist<maxD){var pull=(1-dist/maxD)*strength,mx=(dx/dist)*pull,my=(dy/dist)*pull;btn.style.transform='translate('+mx+'px,'+my+'px) scale(1.06)';wrap.style.transform='translate('+(mx*.3)+'px,'+(my*.3)+'px)';}
  });
  wrap.addEventListener('mouseleave',function(){btn.style.transform='translate(0,0) scale(1)';wrap.style.transform='translate(0,0)';});
  btn.addEventListener('click',function(e){
    var rip=document.createElement('span'),rect=btn.getBoundingClientRect();
    rip.style.cssText='position:absolute;width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.5);transform:translate(-50%,-50%) scale(0);animation:ripple .6s ease forwards;left:'+(e.clientX-rect.left)+'px;top:'+(e.clientY-rect.top)+'px;pointer-events:none;';
    btn.appendChild(rip);setTimeout(function(){rip.remove();},700);
  });
  var s=document.createElement('style');s.textContent='@keyframes ripple{to{transform:translate(-50%,-50%) scale(20);opacity:0;}}';document.head.appendChild(s);
})();

// ── 4. DRAGGABLE CLIENTS RAIL ──
(function(){
  var wrap=document.getElementById('cli-rail-wrap'),rail=document.getElementById('cli-rail');
  if(!wrap||!rail)return;
  var isDragging=false,startX,scrollLeft,velocity=0,lastX=0,momentum,autoScroll=true,autoPos=0;
  // Duplicate for infinite
  rail.innerHTML=rail.innerHTML+rail.innerHTML;
  var autoIv=setInterval(function(){
    if(!isDragging&&autoScroll){
      autoPos+=0.5;
      var max=rail.scrollWidth/2;
      if(autoPos>=max)autoPos=0;
      rail.style.transform='translateX(-'+autoPos+'px)';
    }
  },16);
  wrap.addEventListener('mousedown',function(e){isDragging=true;autoScroll=false;wrap.classList.add('grabbing');startX=e.pageX;scrollLeft=autoPos;lastX=e.pageX;velocity=0;clearInterval(momentum);e.preventDefault();});
  document.addEventListener('mousemove',function(e){if(!isDragging)return;velocity=e.pageX-lastX;lastX=e.pageX;var w=startX-e.pageX,max=rail.scrollWidth/2;autoPos=Math.max(0,Math.min(scrollLeft+w,max));rail.style.transform='translateX(-'+autoPos+'px)';});
  document.addEventListener('mouseup',function(){if(!isDragging)return;isDragging=false;wrap.classList.remove('grabbing');var v=velocity;momentum=setInterval(function(){v*=.92;autoPos-=v;var max=rail.scrollWidth/2;if(autoPos<0)autoPos=0;if(autoPos>max)autoPos=max;rail.style.transform='translateX(-'+autoPos+'px)';if(Math.abs(v)<0.3){clearInterval(momentum);setTimeout(function(){autoScroll=true;},2000);}},16);});
  // 3D tilt on hover
  rail.querySelectorAll('.cli').forEach(function(card){
    card.addEventListener('mousemove',function(e){var r=card.getBoundingClientRect(),cx=(e.clientX-r.left)/r.width-.5,cy=(e.clientY-r.top)/r.height-.5;card.style.transform='translateY(-6px) rotateX('+(-cy*8)+'deg) rotateY('+(cx*8)+'deg)';card.style.transition='transform .1s ease';});
    card.addEventListener('mouseleave',function(){card.style.transform='';card.style.transition='transform .4s ease';});
  });
})();

// ── CURSOR TRAIL ──
(function(){
  var dot=document.getElementById('cur-dot');
  var letters=[document.getElementById('cl-0'),document.getElementById('cl-1'),document.getElementById('cl-2'),document.getElementById('cl-3'),document.getElementById('cl-4'),document.getElementById('cl-5')];
  var mx=window.innerWidth/2,my=window.innerHeight/2,active=false,hideTimer;
  var positions=[];for(var i=0;i<6;i++)positions.push({x:mx,y:my});
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;active=true;clearTimeout(hideTimer);hideTimer=setTimeout(function(){active=false;letters.forEach(function(l){if(l)l.style.opacity='0';});},1200);});
  document.addEventListener('mouseleave',function(){active=false;if(dot)dot.style.opacity='0';letters.forEach(function(l){if(l)l.style.opacity='0';});});
  function lerp(a,b,t){return a+(b-a)*t;}
  function animate(){
    requestAnimationFrame(animate);
    if(dot){dot.style.left=mx+'px';dot.style.top=my+'px';}
    if(!active)return;
    for(var i=0;i<6;i++){
      var lag=0.12-i*0.012;
      positions[i].x=lerp(positions[i].x,i===0?mx:positions[i-1].x,lag+0.05);
      positions[i].y=lerp(positions[i].y,i===0?my:positions[i-1].y,lag+0.05);
      var letter=letters[i];if(!letter)continue;
      letter.style.left=positions[i].x+'px';
      letter.style.top=(positions[i].y-24-i*4)+'px';
      letter.style.opacity=(0.9-i*0.12);
      letter.style.transform='translate(-50%,-50%) scale('+(1-i*0.06)+')';
      var r=Math.round(255-i*15),g=Math.round(106-i*14);
      letter.style.color='rgb('+r+','+g+',26)';
      letter.style.textShadow='0 0 '+(16-i*2)+'px rgba('+r+','+g+',26,'+(0.7-i*0.1)+')';
    }
  }
  animate();
})();
