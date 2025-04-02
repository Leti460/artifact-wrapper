document.addEventListener("DOMContentLoaded", function () {
    if (window.embed) {
        console.log("Twitch Embed instance is accessible!");

        // Example: Change the channel dynamically


        // Example: Listen for Twitch Embed events
        window.embed.addEventListener(Twitch.Embed.VIDEO_READY, function() {
           console.log('Video is ready inside script.js!');
           console.log(window.embed.getPlaybackStats().displayResolution);
            // Set up resize listener after the embed is ready
            window.addEventListener('resize', debounce(updateIframeSize, 200));
            // Initial size update once the video is ready
            updateIframeSize();
        });
    } else {
        console.error("Twitch Embed instance not found!");
    }
});

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
    videoIframe.style.position = "absolute"; // Absolute positioning to pin it to the top-left
    videoIframe.style.top = "0"; // Pin it to the top of the page
    videoIframe.style.left = "0"; // Pin it to the left of the page
    videoIframe.style.zIndex = "1000"; // High z-index to appear above other elements
}

function updateIframeSize() {
    console.log("update");
    if (window.embed) {
        let playbackStats = window.embed.getPlaybackStats();
        if (playbackStats && playbackStats.displayResolution) {
            setTimeout(function() {
                playbackStats = window.embed.getPlaybackStats();
                const resolution = playbackStats.displayResolution;
                const [width, height] = resolution.split("x");
                console.log(resolution);
                console.log(width);
                console.log(height);

            if (videoIframe) {
                videoIframe.width = `${width}px`;
                videoIframe.height = `${height}px`;
            }
        }, 300);
        }
    }
}

updateIframeSize();

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
