function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const videoParam = getQueryParam('video');

let videoIframe = null;

if (videoParam) {
    videoIframe = document.createElement("iframe");
    videoIframe.src = videoParam;
    videoIframe.width = "100%";
    videoIframe.height = "100%";
    videoIframe.allowFullscreen = true;
    videoIframe.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    document.getElementById("twitch-embed").prepend(videoIframe);
    videoIframe.style.position = "absolute"; 
    videoIframe.style.top = "0"; 
    videoIframe.style.left = "0"; 
    videoIframe.style.zIndex = "1000";
    videoIframe.style.border = "none";
    videoIframe.style.padding = "0";
    videoIframe.style.margin = "0";
    videoIframe.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.embed) {
        console.log("Twitch Embed instance is accessible!");

        window.embed.addEventListener(Twitch.Player.READY, function() {
           console.log('Video is ready inside script.js!');
           setTimeout(updateIframeSize, 1000);
           setTimeout(updateIframeSize, 5000);
           window.addEventListener('resize', debounce(updateIframeSize, 1000));
        });
    } else {
        console.error("Twitch Embed instance not found!");
    }
});


function updateIframeSize() {
    if (videoIframe && window.embed) {
        const playbackStats = window.embed.getPlaybackStats();

        if (playbackStats && playbackStats.displayResolution) {
            const resolution = playbackStats.displayResolution;
            const [width, height] = resolution.split("x");

            console.log("Updated Resolution:", resolution);
            console.log("Width:", width);
            console.log("Height:", height);

            videoIframe.width = `${width}px`;
            videoIframe.height = `${height}px`;
        } else {
            console.warn("Playback stats or display resolution not available yet.");
        }
    } else {
        console.error("Video iframe or Twitch embed instance not found.");
    }
}

// Debounce function to limit how often the updateIframeSize is called
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}