import "./style.css";
let tone1 = 20;
let tone2 = 10;
// @ts-ignore
const Tone = globalThis.Tone;
// Create two oscillators
let osc1 = new Tone.Oscillator(tone1, "sine").toDestination();
let osc2 = new Tone.Oscillator(tone2, "sine").toDestination();

type WaveType = "gamma" | "beta" | "alpha" | "theta" | "delta";
const frequency: Record<WaveType, number[]> = {
  gamma: [30, 50],
  beta: [14, 30],
  alpha: [8, 14],
  theta: [4, 8],
  delta: [0.1, 4],
};

function updateOscillatorFrequency(name: WaveType) {
  osc1.frequency.value = frequency[name][0];
  osc2.frequency.value = frequency[name][1];
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <section class="h-screen bg-blue-50 max-w-4xl mx-auto pt-20">
    <div class="flex flex-col">
      <button id="gamma">Gamma</button>
      <button id="beta">Beta</button>
      <button id="alpha">Alpha</button>
      <button id="theta">Theta</button>
      <button id="delta">Delta</button>
    </div>
    <button id="toggleBtn" class="mx-auto">Start</button>
  </section>
`;

let oscillatorStarted = false;
// Start both oscillators
function toggleOscillators() {
  if (!oscillatorStarted) {
    osc1.start();
    osc2.start();
    oscillatorStarted = true;
    toggleBtn.innerHTML = "Stop";
    return;
  }
  osc1.stop();
  osc2.stop();
  oscillatorStarted = false;
  toggleBtn.innerHTML = "Start";
}

// Start and stop the oscillators when the user clicks the buttons
const toggleBtn = document.getElementById("toggleBtn")!;
toggleBtn.addEventListener("click", toggleOscillators);

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    const id = target.id as WaveType;
    updateOscillatorFrequency(id);
  });
});
