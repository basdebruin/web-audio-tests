// audiocontext noise sample test

let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx, 
    source, 
    frameCount, 
    myArrayBuffer;

// Stereo
let channels = 2;
let playing = false;

function init() {
    // start new AudioContext, create buffer
    audioCtx = new AudioContext();
    frameCount = audioCtx.sampleRate * 2.0;
    // 2 channels, 2 second buffer
    myArrayBuffer = audioCtx.createBuffer(channels, frameCount, audioCtx.sampleRate);
}

function start() {
    if (!audioCtx) {
        init();
    }

    playing = true;
    

    for (let channel = 0; channel < channels; channel++) {
        // This gives us the actual array that contains the data
        let nowBuffering = myArrayBuffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {

            // Fill the buffer with white noise;
            // just random values between -1.0 and 1.0
            nowBuffering[i] = Math.random() * 2 - 1;

        }
    }


    // Make buffer source and play it
    playBuffer(audioCtx);

}

function playBuffer(ctx) {
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    source = ctx.createBufferSource();
    // set the buffer in the AudioBufferSourceNode
    source.buffer = myArrayBuffer;
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(audioCtx.destination);
    // start the source playing
    source.start();

    // restart buffer when ended
    source.onended = () => {
        if (playing) {
            start();
        }
    }

    // TODO:
    // restarting and recreating the buffer every time causes hick-ups, could probably be done better
}

function stop() {
    playing = false;
    source.stop();
}