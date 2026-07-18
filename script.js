/* ==========================================
   EK DOORDARSHI
   SCRIPT.JS - PART 1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

/* ==========================
   REVEAL ON SCROLL
========================== */

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.2
});

hiddenElements.forEach((el)=>observer.observe(el));

/* ==========================
   PROGRESS BAR
========================== */

const progressBar=document.getElementById("progressBar");

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop;

const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const progress=(scrollTop/height)*100;

progressBar.style.width=progress+"%";

});

/* ==========================
   RIPPLE EFFECT
========================== */

document.querySelectorAll(".btn").forEach((button)=>{

button.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

ripple.classList.add("ripple");

const rect=button.getBoundingClientRect();

ripple.style.left=e.clientX-rect.left+"px";

ripple.style.top=e.clientY-rect.top+"px";

button.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},700);

});

});

/* ==========================
   CATEGORY FILTER
========================== */

document.querySelectorAll(".categories button").forEach(button=>{

button.addEventListener("click",function(){

const category=this.textContent.trim();

document.querySelectorAll(".categories button").forEach(btn=>{

btn.classList.remove("active");

});

this.classList.add("active");

document.querySelectorAll(".card").forEach(card=>{

const cardTag=card.querySelector(".tag").textContent.trim();

if(category==="All"){

card.style.display="block";

}else{

card.style.display=cardTag===category?"block":"none";

}

});

});

});

/* ==========================
   LIVE SEARCH
========================== */

const search=document.getElementById("searchInput");

if(search){

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".card").forEach((card)=>{

const text=card.innerText.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

/* ==========================
   CURSOR GLOW
========================== */

const glow=document.createElement("div");

glow.className="cursor-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});

/* ==========================
   CARD FLOAT
========================== */

document.querySelectorAll(".card").forEach((card)=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px) scale(1.03)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0) scale(1)";

});

});

/* ==========================
   BUTTON HOVER GLOW
========================== */

document.querySelectorAll(".btn").forEach((btn)=>{

btn.addEventListener("mouseenter",()=>{

btn.style.boxShadow="0 20px 45px rgba(140,35,60,.45)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.boxShadow="";

});

});

});

/* ==========================================
   SCRIPT.JS - PART 2
   Premium Effects
========================================== */

/* ==========================
   TYPEWRITER
========================== */

const hero=document.querySelector(".hero-text");

if(hero){

const text=hero.innerHTML.replace(/<br>/g,"\n");

hero.innerHTML="";

let i=0;

function type(){

if(i<text.length){

if(text.charAt(i)==="\n"){

hero.innerHTML+="<br>";

}else{

hero.innerHTML+=text.charAt(i);

}

i++;

setTimeout(type,45);

}

}

setTimeout(type,500);

}

/* ==========================
   FLOATING MOON
========================== */

const moon=document.querySelector(".moon");

if(moon){

window.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.clientX)/60;

const y=(window.innerHeight/2-e.clientY)/60;

moon.style.transform=`translate(${x}px,${y}px)`;

});

}

/* ==========================
   ACTIVE NAV
========================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach((section)=>{

const top=section.offsetTop-150;

if(scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach((link)=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* ==========================
   BACK TO TOP
========================== */

const topBtn=document.createElement("button");

topBtn.id="topBtn";

topBtn.innerHTML="↑";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.classList.add("show");

}else{

topBtn.classList.remove("show");

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/* ==========================
   RANDOM CARD DELAY
========================== */

document.querySelectorAll(".card").forEach((card,index)=>{

card.style.animationDelay=index*0.15+"s";

});

/* ==========================
   PARALLAX HERO
========================== */

window.addEventListener("scroll",()=>{

const scroll=window.scrollY;

const header=document.querySelector("header");

if(header){

header.style.transform=`translateY(${scroll*0.15}px)`;

}

});

/* ==========================
   NAVBAR SHADOW
========================== */

const nav=document.querySelector("nav");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

nav.style.background="rgba(18,8,10,.88)";

nav.style.boxShadow="0 20px 50px rgba(0,0,0,.45)";

}else{

nav.style.background="rgba(20,8,10,.55)";

nav.style.boxShadow="none";

}

});

/* ==========================
   TWINKLING STARS
========================== */

const stars=document.querySelector(".stars");

if(stars){

setInterval(()=>{

stars.style.opacity=Math.random()*0.25+0.08;

},1800);

}

/* ==========================
   LOADER
========================== */

const loader=document.createElement("div");

loader.className="loader";

loader.innerHTML=`<div class="loader-circle"></div>`;

document.body.prepend(loader);

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.classList.add("hidden");

},800);

});

/* ==========================
   POEM CARD TILT
========================== */

document.querySelectorAll(".card").forEach((card)=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=(x-rect.width/2)/18;

const rotateX=(rect.height/2-y)/18;

card.style.transform=

`perspective(900px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="perspective(900px) rotateX(0) rotateY(0)";

});

});

/* ==========================
   FOOTER YEAR
========================== */

const year=document.querySelector("#year");

if(year){

year.textContent=new Date().getFullYear();

}

console.log("🌙 Ek Doordarshi Loaded Successfully");

/* ==========================
   HERO SCROLL
========================== */

const scrollBtn=document.querySelector(".scroll-down");

if(scrollBtn){

scrollBtn.addEventListener("click",()=>{

document.querySelector("#poems").scrollIntoView({

behavior:"smooth"

});

});

}

/* ==========================
   SMOOTH SCROLL FOR ALL LINKS
========================== */

const trail = document.createElement("div");
trail.id = "trail";
document.body.appendChild(trail);

document.addEventListener("mousemove",(e)=>{

    for(let i=0;i<8;i++){

        const dust=document.createElement("div");
        dust.className="stardust";

        dust.style.left=e.clientX+"px";
        dust.style.top=e.clientY+"px";

        const angle=Math.random()*Math.PI*2;
        const distance=Math.random()*18;

        dust.style.setProperty(
            "--x",
            Math.cos(angle)*distance+"px"
        );

        dust.style.setProperty(
            "--y",
            Math.sin(angle)*distance+"px"
        );

        dust.style.width=(Math.random()*2+1)+"px";
        dust.style.height=dust.style.width;

        dust.style.opacity=Math.random()*0.5+0.3;

        trail.appendChild(dust);

        setTimeout(()=>{
            dust.remove();
        },1400);

    }

});
