function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const videoParam = getQueryParam('video');

if (videoParam) {
    const videoIframe = document.createElement("iframe");
    videoIframe.src = videoParam;
    videoIframe.width = "100%";
    videoIframe.height = "100%";
    videoIframe.allowFullscreen = true;
    videoIframe.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    document.getElementById("twitch-embed").prepend(videoIframe);
}