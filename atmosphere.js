const starfield = document.getElementById("starfield");

for(let i=0;i<250;i++){

    const star=document.createElement("div");

    star.className="star";

    const size=Math.random()*3+1;

    star.style.width=size+"px";

    star.style.height=size+"px";

    star.style.left=Math.random()*100+"%";

    star.style.top=Math.random()*100+"%";

    star.style.opacity=Math.random();

    star.style.animationDuration=
    (2+Math.random()*5)+"s";

    starfield.appendChild(star);

}
const shootingContainer = document.getElementById("shooting-stars");

function createShootingStar(){

    const star = document.createElement("div");

    star.className = "shooting-star";

    star.style.left = Math.random()*80 + "%";

    star.style.top = Math.random()*40 + "%";

    star.style.animationDuration = (1.2 + Math.random()) + "s";

    shootingContainer.appendChild(star);

    setTimeout(() => {

        star.remove();

    }, 2500);

}

setInterval(() => {

    createShootingStar();

}, 4000);