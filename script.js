/* ==========================================
   EK DOORDARSHI
   SCRIPT.JS
========================================== */

/* Current Year */

document.getElementById("year").textContent =
new Date().getFullYear();


/* ==========================================
   STARS
========================================== */

const stars = document.getElementById("stars");

for(let i=0;i<180;i++){

const star=document.createElement("span");

const size=Math.random()*3+1;

star.style.width=size+"px";
star.style.height=size+"px";

star.style.left=Math.random()*100+"%";
star.style.top=Math.random()*100+"%";

star.style.animationDelay=Math.random()*8+"s";

stars.appendChild(star);

}


/* ==========================================
   SEARCH
========================================== */

const searchInput=document.getElementById("searchInput");

const cards=document.querySelectorAll(".card");

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

cards.forEach(card=>{

card.style.display=

card.innerText.toLowerCase().includes(value)

?

"block"

:

"none";

});

});
const moon=document.querySelector(".moon");

document.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth-.5)*25;
const y=(e.clientY/window.innerHeight-.5)*25;

moon.style.transform=
`translate(${x}px,${y}px)`;

});


/* ==========================================
   CATEGORY FILTER
========================================== */

const buttons=document.querySelectorAll(".categories button");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

buttons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const filter=button.dataset.filter;

cards.forEach(card=>{

if(filter==="all"){

card.style.display="block";

return;

}

card.style.display=

card.classList.contains(filter)

?

"block"

:

"none";

});

});

});


/* ==========================================
   PROGRESS BAR
========================================== */

const progress=document.getElementById("progressBar");

window.addEventListener("scroll",()=>{

const total=

document.documentElement.scrollHeight-

window.innerHeight;

const current=

(window.scrollY/total)*100;

progress.style.width=current+"%";

});


/* ==========================================
   REVEAL ON SCROLL
========================================== */

const observer=

new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section,.card").forEach(el=>{

observer.observe(el);

});

/* ==========================================
   SMOOTH NAV
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(

this.getAttribute("href")

).scrollIntoView({

behavior:"smooth"

});

});

});
