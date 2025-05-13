let slides = document.querySelectorAll("#slider .slide");
let curr = 0;
function show(i){
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}
setInterval(() => {
  curr = (curr + 1) % slides.length;
  show(curr);
}, 3000);
show(0);
