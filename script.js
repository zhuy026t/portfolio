
// =========================
// INIT ELEMENTS
// =========================

const loading = document.getElementById("loading");
const main = document.getElementById("main");

const mouseLight = document.querySelector(".mouse-light");

const typingEl = document.getElementById("typing");

const album = document.getElementById("album");

const audio = new Audio("assets/music.mp3");

const playBtn = document.getElementById("playPause");
const muteBtn = document.getElementById("mute");

const seek = document.getElementById("seek");

const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");

const musicCard = document.querySelector(".music-card");

let isPlaying = false;
let isMuted = false;
// =========================
// ENTER SYSTEM
// =========================

window.addEventListener("click", () => {

    if (!loading) return;

    loading.style.opacity = "0";

    loading.style.pointerEvents = "none";

    setTimeout(() => {

        loading.style.display = "none";

        main.style.opacity = "1";

    }, 800);

});

// =========================
// MOUSE LIGHT FOLLOW
// =========================

window.addEventListener("mousemove", (e) => {

    if (!mouseLight) return;

    mouseLight.style.left = e.clientX + "px";

    mouseLight.style.top = e.clientY + "px";

});

// =========================
// TYPEWRITER (ABOUT ME)
// =========================

const aboutList = [
    "Chat GPT user",
    "Gemini Pro user",
    "Discord Bot Developer",
    "Roblox Developer",
    "Open Source Contributor"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {

    const currentText = aboutList[textIndex];

    if (!deleting) {

        typingEl.textContent = currentText.substring(0, charIndex);

        charIndex++;

        if (charIndex > currentText.length) {

            deleting = true;

            setTimeout(typeWriter, 1800); // đợi 1.8s rồi mới xóa

            return;
        }

    } else {

        typingEl.textContent = currentText.substring(0, charIndex);

        charIndex--;

        if (charIndex < 0) {

            deleting = false;

            textIndex++;

            if (textIndex >= aboutList.length)
                textIndex = 0;

            charIndex = 0;
        }

    }

    setTimeout(typeWriter, deleting ? 30 : 55);

}

typeWriter();
// =========================
// SIMPLE HOVER FX HOOK
// =========================

document.querySelectorAll(".frame, .stat, .music-card").forEach(el => {

    el.addEventListener("mouseenter", () => {

        el.classList.add("active");

    });

    el.addEventListener("mouseleave", () => {

        el.classList.remove("active");

    });

});

// =========================
// MUSIC ELEMENTS
// =========================


// =========================
// LOAD MUSIC
// =========================

audio.volume = 0.1;

// fix browser autoplay block
document.addEventListener("click", () => {
    audio.play().catch(() => {});
}, { once: true });


/* ======================================
   COUNTER ANIMATION
====================================== */

function animateValue(id,start,end,duration){

    const obj=document.getElementById(id);

    if(!obj) return;

    let startTime=null;

    function step(timestamp){

        if(!startTime) startTime=timestamp;

        const progress=Math.min((timestamp-startTime)/duration,1);

        const value=Math.floor(progress*(end-start)+start);

        obj.innerText=value.toLocaleString();

        if(progress<1){

            requestAnimationFrame(step);

        }

    }

    requestAnimationFrame(step);

}

animateValue("projectCount",0,24,1200);



/* ======================================
   VISITS
====================================== */

let visits=localStorage.getItem("portfolio_visits");

if(!visits){

    visits=1;

}else{

    visits=parseInt(visits)+1;

}

localStorage.setItem("portfolio_visits",visits);

const visitElement=document.getElementById("visitCount");

if(visitElement){

    visitElement.innerHTML=visits.toLocaleString();

}




/* ======================================
   RIPPLE EFFECT
====================================== */

document.querySelectorAll("button,a").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";

ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});



/* ======================================
   RANDOM ONLINE USER
====================================== */

const online=document.getElementById("onlineUsers");

if(online){

setInterval(()=>{

online.innerHTML=150+Math.floor(Math.random()*40);

},3000);

}


/* ==========================================
   PARTICLE NETWORK
========================================== */

const canvas = document.getElementById("particles");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

const PARTICLE_COUNT = 150;
const MAX_DISTANCE = 140;

const mouse = {
    x: null,
    y: null
};

// ==========================
// CREATE PARTICLES
// ==========================

for(let i = 0; i < PARTICLE_COUNT; i++){

    particles.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        dx: (Math.random() - .5) * .35,

        dy: (Math.random() - .5) * .35,

        r: Math.random() * 2 + 1

    });

}

// ==========================
// MOUSE
// ==========================

window.addEventListener("mousemove",(e)=>{

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

window.addEventListener("mouseleave",()=>{

    mouse.x = null;
    mouse.y = null;

});

// ==========================
// DRAW
// ==========================

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // -------- PARTICLES --------

    particles.forEach(p=>{

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.r,
            0,
            Math.PI*2
        );

        ctx.fillStyle="rgba(255,255,255,.9)";

        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ffffff";

        ctx.fill();

        ctx.shadowBlur = 0;

    });

    // -------- PARTICLE LINKS --------

    for(let i=0;i<particles.length;i++){

        for(let j=i+1;j<particles.length;j++){

            const dx = particles[i].x - particles[j].x;

            const dy = particles[i].y - particles[j].y;

            const distance = Math.sqrt(dx*dx + dy*dy);

            if(distance < MAX_DISTANCE){

                const opacity = (1 - distance / MAX_DISTANCE) * .18;

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(255,255,255,${opacity})`;

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        }

    }

    // -------- MOUSE LINKS --------

    if(mouse.x != null){

        particles.forEach(p=>{

            const dx = mouse.x - p.x;

            const dy = mouse.y - p.y;

            const dist = Math.sqrt(dx*dx + dy*dy);

            if(dist < 180){

                ctx.beginPath();

                ctx.moveTo(mouse.x,mouse.y);

                ctx.lineTo(p.x,p.y);

                ctx.strokeStyle =
                `rgba(255,255,255,${
                    (1-dist/180)*0.22
                })`;

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        });

    }

    // -------- MOVE --------

    particles.forEach(p=>{

        p.x += p.dx;
        p.y += p.dy;

        if(p.x < 0){
            p.x = canvas.width;
        }

        if(p.x > canvas.width){
            p.x = 0;
        }

        if(p.y < 0){
            p.y = canvas.height;
        }

        if(p.y > canvas.height){
            p.y = 0;
        }

    });

    requestAnimationFrame(draw);

}

draw();

// ==========================
// RESIZE
// ==========================

window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});
/* ======================================
   MUSIC VISUAL EFFECT
====================================== */

if(album){

audio.addEventListener("play",()=>{

album.style.animationPlayState="running";

});

audio.addEventListener("pause",()=>{

album.style.animationPlayState="paused";

});

}



/* ======================================
   SOCIAL HOVER
====================================== */

document.querySelectorAll(".socials a").forEach(link=>{

link.addEventListener("mouseenter",()=>{

link.style.transform="translateY(-4px) scale(1.03)";

});

link.addEventListener("mouseleave",()=>{

link.style.transform="";

});

});


const card=document.querySelector(".profile-card");

document.addEventListener("mousemove",(e)=>{

    const x=e.clientX/window.innerWidth;

    const y=e.clientY/window.innerHeight;

    const rx=(0.5-y)*10;

    const ry=(x-0.5)*10;

    card.style.transform=

    `perspective(1200px)
    rotateX(${rx}deg)
    rotateY(${ry}deg)`;

});

playBtn?.addEventListener("click",()=>{

    if(audio.paused){

        audio.play();

        playBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

    }else{

        audio.pause();

        playBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';

    }

});


muteBtn?.addEventListener("click",()=>{

    audio.muted = !audio.muted;

    muteBtn.innerHTML = audio.muted
    ? '<i class="fa-solid fa-volume-xmark"></i>'
    : '<i class="fa-solid fa-volume-high"></i>';

});


audio.addEventListener("timeupdate",()=>{

    if(!seek) return;

    seek.value =
    audio.currentTime/audio.duration*100 || 0;

});


seek?.addEventListener("input",()=>{

    audio.currentTime =
    seek.value/100*audio.duration;

});

/* ================= THỜI TIẾT (ĐỒNG NAI) ================= */
async function fetchWeather() {
    // Tọa độ Trảng Dài, Đồng Nai
    const lat = 10.98;
    const lon = 106.84;
    
    // API Open-Meteo (Không cần Key)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Asia%2FBangkok`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const temp = Math.round(data.current.temperature_2m);
        const weatherCode = data.current.weather_code;
        
        // Map mã thời tiết thành icon FontAwesome
        let iconClass = "fa-solid fa-cloud-sun"; // Mặc định
        
        if (weatherCode === 0) {
            iconClass = "fa-solid fa-sun"; // Trời quang
        } else if (weatherCode >= 1 && weatherCode <= 3) {
            iconClass = "fa-solid fa-cloud-sun"; // Ít mây
        } else if (weatherCode === 45 || weatherCode === 48) {
            iconClass = "fa-solid fa-smog"; // Có sương mù
        } else if (weatherCode >= 51 && weatherCode <= 67) {
            iconClass = "fa-solid fa-cloud-rain"; // Có mưa
        } else if (weatherCode >= 95 && weatherCode <= 99) {
            iconClass = "fa-solid fa-cloud-bolt"; // Có dông bão
        }

        // Cập nhật giao diện
        const weatherText = document.getElementById("weatherText");
        const weatherIcon = document.getElementById("weatherIcon");

        if (weatherText && weatherIcon) {
            weatherText.innerHTML = `Đồng Nai • ${temp}°C`;
            weatherIcon.className = iconClass;
        }

    } catch (error) {
        console.error("Lỗi khi tải dữ liệu thời tiết:", error);
        document.getElementById("weatherText").innerHTML = "Không có kết nối";
        document.getElementById("weatherIcon").className = "fa-solid fa-triangle-exclamation";
    }
}

// Chạy hàm khi trang web vừa tải xong
document.addEventListener("DOMContentLoaded", () => {
    fetchWeather();
});