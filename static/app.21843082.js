parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A2T1":[function(require,module,exports) {
let e=document.querySelector(".ball");const t=document.querySelector(".action"),n=document.querySelectorAll(".layer"),o=document.querySelector(".tap-zone"),r=document.querySelector(".wrapper"),l=document.querySelector(".game-view"),a=document.querySelector(".player-name"),d=document.getElementById("game-over-label"),c=document.getElementById("start-label"),i=document.querySelector(".warning"),s=document.getElementById("score"),u=document.getElementById("high-score"),m=document.querySelector(".change-name-btn"),p=document.querySelector(".leaderboard-btn"),h=document.querySelector(".settings"),y=document.querySelector(".quality-btn"),f=document.querySelector(".modal-name"),g=document.querySelector(".modal-leaderboard"),b=document.querySelector(".leaderboard-wrapper"),E=document.querySelector(".modal-leaderboard .popup"),L=document.querySelector(".name-btn"),T=document.querySelector(".warning-text"),q=document.querySelector(".close-leaderboard");let S,x=!1,v=.92,C=!0,w=!1,M=0,H=0,$=0,A=1,k="click",I=localStorage.getItem("bouncy-quality")||"high";y.textContent=`Quality: ${I}`;let F=[],j=[],B=[];const z="/score/";function P(e){("touchstart"===k||"click"===k&&" "===e.key)&&(e.preventDefault(),C&&w?D():x||C||N())}function D(){if($=0,s.innerHTML=`Score: ${$}`,M=0,x=!1,A=1,C=!1,w=!1,d.style.display="none",o.innerHTML="Jump",!e){const n=document.createElement("div");for(let e=0;e<4;e++){const e=document.createElement("div");e.classList.add("quarter"),n.appendChild(e)}n.classList.add("ball"),t.appendChild(n),e=n}J(),O(),c.style.display="none",h.style.display="none"}function N(){const t=.7;let n,o;x=!0;let r,l=-10;function a(r){if(e){const l=r-n;if(M-=t*(l-o),(M/=v)<=0)return M=0,x=!1,void(e.style.bottom=M+"px");e.style.bottom=M+"px",requestAnimationFrame(a),o=l}}requestAnimationFrame(function d(c){if(e){void 0===n&&(n=c,o=0);const i=c-n;M+=t*(i-o),M*=v,e.style.bottom=M+"px",(r=M-l)>t&&M<200?requestAnimationFrame(d):requestAnimationFrame(a),l=M,o=i}})}function O(){let e=5e3*Math.random()+5e3,t=setTimeout(()=>{C||(A=(Number(A)+.1).toFixed(1),O(),F=F.filter(e=>e!==t))},e);F.push(t)}function J(){let e,n,o,r=3e3*Math.random()+1e3,l=1e3;const a=document.createElement("div");a.classList.add("obstacle"),a.classList.add(I),t.appendChild(a),a.style.left=l+"px",o=requestAnimationFrame(function r(d){void 0===e&&(e=d,n=0);const c=d-e,i=.5*(c-n)*A;if(l>-60&&l<60&&M<60)Q();else{if(l<-60)return j=j.filter(e=>e!==o),t.removeChild(a),$+=10*A,void(s.innerHTML=`Score: ${$}`);l-=i,a.style.left=l+"px",j=j.filter(e=>e!==o),o=requestAnimationFrame(r),j.push(o),n=c}}),j.push(o);let d=setTimeout(()=>{C||(J(),F=F.filter(e=>e!==d))},r);F.push(d)}async function Q(){for(F.forEach(e=>{clearTimeout(e)}),F=[],j.forEach(e=>{cancelAnimationFrame(e)}),j=[],d.style.display="flex",c.style.display="block",h.style.display="flex",C=!0;t.firstChild;)t.removeChild(t.lastChild);if(e=null,o.innerHTML="Start",$>H){w=!1,g.style.display="flex",b.innerHTML="<p>Loading, please wait...</p>";const e=await Y();K(e.leaderboard,e.personal)}else w=!0}async function Y(){const e=await fetch(z,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:S,score:$})}).then(e=>e.json()).catch(e=>{te(e)});return H=e.personal.score,u.innerHTML=`High score: ${H}`,e}function R(){b.innerHTML="<p>Loading, please wait...</p>",fetch(z).then(e=>e.json()).then(e=>K(e)).catch(e=>{te(e)})}function G(e){e.stopPropagation(),w=!1,g.style.display="flex",R()}function K(e,t){if("object"==typeof e){if(leaderboardTable=V(e),b.innerHTML="",b.appendChild(leaderboardTable),t)if(t.position<11){document.querySelector(`.modal-leaderboard tbody tr:nth-child(${t.position})`).classList.add("player-in-leaderboard")}else{const e=document.querySelector(".modal-leaderboard tbody"),n=document.createElement("tr"),o=document.createElement("td");o.innerText=t.position;const r=document.createElement("td");r.innerText=t.name;const l=document.createElement("td");l.innerText=t.score,n.appendChild(o),n.appendChild(r),n.appendChild(l),e.appendChild(n)}}else"string"==typeof e&&(b.innerHTML=`<h2>${e}</h2>`)}function U(e){e.stopPropagation(),g.style.display="none",w=!0}function V(e){const t=document.createElement("table"),n=document.createElement("thead");t.appendChild(n);const o=document.createElement("tr");n.appendChild(o);const r=document.createElement("th");r.innerText="#:";const l=document.createElement("th");l.innerText="Name:";const a=document.createElement("th");a.innerText="Score:",o.appendChild(r),o.appendChild(l),o.appendChild(a);const d=document.createElement("tbody");return t.appendChild(d),e.forEach((e,t)=>{const n=document.createElement("tr"),o=document.createElement("td");o.innerText=t+1;const r=document.createElement("td");r.innerText=e.name;const l=document.createElement("td");l.innerText=e.score,n.appendChild(o),n.appendChild(r),n.appendChild(l),d.appendChild(n)}),t}function W(e){fetch(`${z}/${e}/`).then(e=>e.json()).then(e=>{e.score?(H=e.score,u.innerHTML=`High score: ${H}`):(H=0,u.innerHTML="High score: none")}).catch(e=>{te(e)})}function X(){n.forEach((e,t,n)=>{Z(e,t,n.length)})}function Z(e,t,n){const o=1e3*(2*Math.random()+2/A);if("low"!==I){const n=t+1,o=30/n/A;let r=1050;const l=Math.round(10*Math.random()+60)+20*n,a=document.createElement("div");a.classList.add("background-element"),a.classList.add(I),e.appendChild(a),a.style.left=r+"px",a.style.height=Math.round(60*Math.random()+60)*n+"px",a.style.width=Math.round(50*Math.random()+50)*n+"px",a.style.backgroundColor=`rgb(${l}, ${l}, ${l+40})`,a.style.zIndex=n,a.style.padding=10*n+"px";const d=Math.round((parseInt(a.style.height)-25)/(30*n));if("high"===I)for(let e=0;e<d;e++){const e=document.createElement("div");e.classList.add("row"),a.appendChild(e);const t=parseInt(a.style.width)>20*n*3?3:2;for(let o=0;o<t;o++){const t=document.createElement("div");t.classList.add("window"),t.style.height=10*n+"px",t.style.width=10*n+"px",e.appendChild(t)}}a.style.animationDuration=o+"s";let c=setTimeout(()=>{e.removeChild(a),B.filter(e=>e!==c)},1e3*o);B.push(c)}setTimeout(()=>{Z(e,t,n)},o)}function _(e){e.preventDefault();const t=document.getElementById("name").value.trim();let n=new RegExp(/^[a-z0-9]+$/i).test(t),o=t.length>2&&t.length<14;return n&&o?(S=t,f.style.display="none",w=!0,c.style.display="block",h.style.display="flex",a.innerHTML=S,W(S)):n?(i.removeAttribute("hidden"),T.innerHTML="Minimum 3, maximum 13 characters"):(i.removeAttribute("hidden"),T.innerHTML="Only letters and numbers are allowed."),!1}function ee(e){f.style.display="flex",w=!1,c.style.display="none",h.style.display="none"}function te(e){const t=document.createElement("div"),n=document.querySelector(".wrapper");t.innerHTML=`<p>Something went wrong: ${e}</p>`,t.classList.add("error-popup"),n.appendChild(t),setTimeout(()=>{n.removeChild(t)},5e3)}function ne(e){e.stopPropagation(),"low"===I?(I="high",document.querySelectorAll(".background-element").forEach(e=>e.classList.replace("low","high"))):"mid"===I?(I="low",document.querySelectorAll(".background-element").forEach(e=>e.remove()),B.forEach(e=>{clearTimeout(e)}),B=[]):"high"===I&&(I="mid",document.querySelectorAll(".window").forEach(e=>e.remove()),document.querySelectorAll(".background-element").forEach(e=>e.classList.replace("high","mid"))),localStorage.setItem("bouncy-quality",I),y.textContent=`Quality: ${I}`}function oe(){if(screen.width<1e3){const e=screen.width;r.classList.add("fullscreen");const t=e/1100;l.style.transform=`scale(${t>1?1:t})`,o.style.transform=`scale(${t>1?1:t}) translateY(-50%)`}else r.classList.remove("fullscreen"),l.style.transform="",o.style.transform="translateY(-50%)"}"ontouchstart"in document.documentElement?(k="touchstart",o.style.display="flex",c.innerHTML="<h2>Tap to start</h2>",o.addEventListener("touchstart",P),o.innerHTML="Start"):document.addEventListener("keydown",P),L.addEventListener(k,_),m.addEventListener(k,ee),p.addEventListener(k,G),q.addEventListener(k,U),y.addEventListener(k,ne),window.onresize=oe,oe(),X();
},{}]},{},["A2T1"], null)
//# sourceMappingURL=app.21843082.js.map