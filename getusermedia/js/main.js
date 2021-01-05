var video = document.querySelector('video');
var constraints = {
    audio: true,
    video: true
}

function handleSuccess(stream) {
    var videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', constraints);
    console.log('Using video device: ' + videoTracks[0].label);
    stream.onremovetrack = function() {
        console.log('Stream ended');
    };
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
  }

async function getMedia(constraints) {
let stream = null;

try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
} catch(e) {
    console.log(e);
}
}

document.querySelector('#showVideo').addEventListener('click', () => getMedia(constraints));