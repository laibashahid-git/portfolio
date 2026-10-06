// 1. Typing Animation Logic - FIXED (no delay)
const texts = ["Frontend Developer", "UI Designer", "React Learner"];
let count = 0, index = 1, current = "", isDeleting = false;
function type(){
    if(count === texts.length) count = 0;
    current = texts[count];

    if(isDeleting){
        document.getElementById("typing").innerText = current.substring(0, index - 1);
        index--;
    } else {
        document.getElementById("typing").innerText = current.substring(0, index);
        index++;
    }

    let speed = 120;
    if(isDeleting) speed = 50;

    if(!isDeleting && index > current.length){
        speed = 1500;
        isDeleting = true;
        index = current.length;
    } else if(isDeleting && index === 0){
        isDeleting = false;
        count++;
        index = 1;
        speed = 300;
    }
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

// 2.1 Beautiful Section Slide-Up Animation on Scroll
const observerOptions = {
    threshold: 0.15
};
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('section-visible');
        }
    });
}, observerOptions);

document.querySelectorAll("section").forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
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

// 4. Contact Form Logic - Professional English
document.getElementById("contactForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    let name = document.getElementById("name").value;
    document.getElementById("formStatus").innerText = `Thank you ${name}! Your message has been delivered successfully. I'll get back to you soon.`;
    document.getElementById("formStatus").style.color = "#0ea5e9";
    e.target.reset();
    setTimeout(()=>{document.getElementById("formStatus").innerText = ""}, 5000);
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
