import "./style.css";
// @ts-ignore
const Tone = globalThis.Tone;

// Wave types https://www.medicalnewstoday.com/articles/320019#how-do-binaural-beats-work
type WaveType = "gamma" | "beta" | "alpha" | "theta" | "delta";
const frequency: Record<WaveType, number[]> = {
  gamma: [30, 50],
  beta: [14, 30],
  alpha: [8, 14],
  theta: [4, 8],
  delta: [0.1, 4],
};

let tone1 = frequency.alpha[0];
let tone2 = frequency.alpha[1];

// Create two oscillators
const osc1 = new Tone.Oscillator(tone1, "sine").toDestination();
const osc2 = new Tone.Oscillator(tone2, "sine").toDestination();

function updateOscillatorFrequency(name: WaveType) {
  osc1.frequency.value = frequency[name][0];
  osc2.frequency.value = frequency[name][1];
}

const StopSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
`;

const StartSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
</svg>
`;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <section class="h-screen w-full md:w-1/2 mx-auto py-10 relative">
    <button id="toggleBtn" class="md:0 -mt-5 uppercase block mx-auto md:absolute -left-10 rounded-full p-1 bg-white text-black border-white mb-4 md:mb-0">${StartSVG}</button>
    <div class="flex flex-col justify-between h-full gap-2 text-4xl text-white">
      <button id="gamma" class="tracking-widest hover:scale-[1.03] transition uppercase font-bold font-serif h-full bg-violet-600 sm:border-4 border-black focus:border-white">Gamma</button>
      <button id="beta" class="tracking-widest hover:scale-[1.03] transition uppercase font-bold font-serif h-full bg-blue-600 sm:border-4 border-black focus:border-white">Beta</button>
      <button id="alpha" class="tracking-widest hover:scale-[1.03] transition uppercase font-bold font-serif h-full bg-green-600 sm:border-4 border-black focus:border-white">Alpha</button>
      <button id="theta" class="tracking-widest hover:scale-[1.03] transition uppercase font-bold font-serif h-full bg-yellow-600 sm:border-4 border-black focus:border-white">Theta</button>
      <button id="delta" class="tracking-widest hover:scale-[1.03] transition uppercase font-bold font-serif h-full bg-red-600 sm:border-4 border-black focus:border-white">Delta</button>
    </div>
  </section>
`;

// Keep track of the oscillator state
let oscillatorStarted = false;

function start() {
  osc1.start();
  osc2.start();
  oscillatorStarted = true;
  toggleBtn.innerHTML = StopSVG;
}

function stop() {
  osc1.stop();
  osc2.stop();
  oscillatorStarted = false;
  toggleBtn.innerHTML = StartSVG;
}

function toggleOscillators() {
  if (!oscillatorStarted) {
    start();
    return;
  }
  stop();
}

// Start and stop the oscillators when the user clicks the buttons
const toggleBtn = document.getElementById("toggleBtn")!;
toggleBtn.addEventListener("click", toggleOscillators);

// Iterate over the buttons and add a click event listener to each
// When a button is clicked, update the oscillator frequency based on the mapped id
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    const id = target.id as WaveType;
    updateOscillatorFrequency(id);
    if (!oscillatorStarted) {
      start();
    }
  });
});
