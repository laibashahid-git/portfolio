// 1. Typing Animation Logic
const texts = ["Frontend Developer", "UI Designer", "React Learner"];
let count = 0, index = 0, current = "", isDeleting = false;
function type(){
    if(count === texts.length) count = 0;
    current = texts[count];
    if(isDeleting){ document.getElementById("typing").innerText = current.substring(0, index--); }
    else{ document.getElementById("typing").innerText = current.substring(0, index++); }
    let speed = 120;
    if(isDeleting) speed = 60;
    if(!isDeleting && index === current.length){ speed = 1500; isDeleting = true; }
    else if(isDeleting && index === 0){ isDeleting = false; count++; speed = 500; }
    setTimeout(type, speed);
}
type();

// 2. Scroll Animation + Active Nav Link
window.addEventListener("scroll", ()=>{
    document.getElementById("header").classList.toggle("scrolled", window.scrollY > 50);
    // reveal cards
    document.querySelectorAll(".card").forEach(card=>{
        if(card.getBoundingClientRect().top < window.innerHeight - 50) card.classList.add("show");
    });
    // skill bars animation
    document.querySelectorAll(".fill").forEach(bar=>{
        if(bar.getBoundingClientRect().top < window.innerHeight){
            bar.style.width = bar.dataset.width;
        }
    });
    // active link
    let sections = document.querySelectorAll("section");
    sections.forEach(sec=>{
        if(window.scrollY >= sec.offsetTop - 150){
            document.querySelectorAll("nav ul a").forEach(a=>a.classList.remove("active"));
            document.querySelector(`nav ul a[href="#${sec.id}"]`)?.classList.add("active");
        }
    });
});

// 3. Project Filter Logic
document.querySelectorAll(".f-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
        document.querySelectorAll(".f-btn").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        let filter = btn.dataset.filter;
        document.querySelectorAll(".card").forEach(card=>{
            if(filter === "all" || card.dataset.category === filter){
                card.style.display = "block";
                setTimeout(()=>card.classList.add("show"),100);
            } else { card.style.display = "none"; }
        });
    });
});

// 4. Contact Form Logic
document.getElementById("contactForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    let name = document.getElementById("name").value;
    document.getElementById("formStatus").innerText = `شکریہ ${name}! آپ کا میسج موصول ہو گیا ہے ❤️ میں جلد جواب دوں گی۔`;
    e.target.reset();
    setTimeout(()=>{document.getElementById("formStatus").innerText = ""}, 4000);
});

// 5. Mobile Menu Logic
document.getElementById("menuBtn").addEventListener("click", ()=>{
    document.getElementById("navLinks").classList.toggle("open");
});
document.querySelectorAll("nav ul a").forEach(a=>a.addEventListener("click", ()=>{
    document.getElementById("navLinks").classList.remove("open");
}));

// Trigger initial animations
window.dispatchEvent(new Event("scroll"));