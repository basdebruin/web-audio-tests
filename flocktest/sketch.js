// flocking.js test

var enviro = flock.init();


// DEFINE SYNTH

var mySynth = flock.synth({
    synthDef: {
        id: "filter",
        ugen: "flock.ugen.filter.moog",
        cutoff: 2000,
        resonance: {
            ugen: "flock.ugen.sinOsc",
            freq: 0.5,
            mul: 0.5,
            add: 0.5
        },
        source: {
            id: "tone",
            ugen: "flock.ugen.triOsc",
            freq: 200,
            mul: {
                id: "dust",
                ugen: "flock.ugen.dust",
                density: 100,
                mul: 0.5,
            }
        },
        mul: 0.5
    }
})


// START AND STOP

function start() {
    enviro.start();
    console.log("started enviro");
}

function stop() {
    enviro.stop();
    console.log("stopped enviro");
}


// SLIDERS

var slider1 = document.getElementById('slider01');
var label1 =  document.getElementById('label01');

slider1.oninput = function() {
    // label
    label1.innerHTML = "Frequency: " + this.value;
    //
    let v = parseInt(this.value);
    mySynth.set({
        "tone.freq": v
    });
}

var slider2 = document.getElementById('slider02');
var label2 =  document.getElementById('label02');

slider2.oninput = function() {
    // label
    label2.innerHTML = "Dust: " + this.value;
    //
    let v = parseInt(this.value);
    mySynth.set({
        "dust.density": v
    });
}

var slider3 = document.getElementById('slider03');
var label3 =  document.getElementById('label03');

slider3.oninput = function() {
    // label
    label3.innerHTML = "Filter Cutoff: " + this.value;
    //
    let v = parseInt(this.value);
    mySynth.set({
        "filter.cutoff": v
    });
}