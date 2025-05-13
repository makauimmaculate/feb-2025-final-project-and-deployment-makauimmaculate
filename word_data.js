// An array of word objects; cycle by date
const words = [
  { word: "Serendipity", pron: "seh-ren-DIH-puh-tee", pos: "noun",
    def: "The occurrence of happy or beneficial events by chance.",
    ex: "Finding that rare book at the thrift shop was pure serendipity." },
  { word: "Ephemeral", pron: "ih-FEM-er-ul", pos: "adjective",
    def: "Lasting for a very short time.",
    ex: "Autumn’s beauty is ephemeral, so savor each colorful leaf." },
  { word: "Ineffable", pron: "in-EH-fuh-bul", pos: "adjective",
    def: "Too great or extreme to be expressed in words.",
    ex: "The beauty of the sunset was ineffable." },
  // …add as many days’ worth as you like
];

// Determine today’s index by date
const today = new Date();
const idx = today.getDate() % words.length;
const todayWord = words[idx];

// Populate “Today”
document.getElementById("wotd-word").textContent = todayWord.word;
document.getElementById("wotd-pronunciation").textContent = todayWord.pron;
document.getElementById("wotd-pos").textContent = todayWord.pos;
document.getElementById("wotd-definition").textContent = todayWord.def;
document.getElementById("wotd-example").textContent = `"${todayWord.ex}"`;

// Populate “Past Words” (last 5)
const slider = document.getElementById("slider");
const past = [];
for (let i = 1; i <= 5; i++) {
  past.push(words[(idx - i + words.length) % words.length]);
}
past.forEach(obj => {
  const card = document.createElement("div");
  card.className = "slide";
  card.innerHTML = `<h3>${obj.word}</h3><p class="pos">${obj.pos}</p>`;
  slider.appendChild(card);
});
