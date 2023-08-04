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
  if (name.length === 0) {
    osc1.frequency.value = 0;
    osc2.frequency.value = 0;
    return;
  }
  osc1.frequency.value = frequency[name][0];
  osc2.frequency.value = frequency[name][1];
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <section class="h-screen w-full lg:w-1/2 mx-auto py-10 relative">
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
// Keep track of selected wave
let selected: WaveType | string = "";

function start() {
  osc1.start();
  osc2.start();
  oscillatorStarted = true;
}

function stop() {
  osc1.stop();
  osc2.stop();
  oscillatorStarted = false;
}

// Iterate over the buttons and add a click event listener to each
// When a button is clicked, update the oscillator frequency based on the mapped id
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    const id = target.id as WaveType;

    if (selected === id) {
      stop();
      selected = "";
    } else {
      selected = id;
      updateOscillatorFrequency(id);
      if (!oscillatorStarted) {
        start();
      }
    }
  });
});
