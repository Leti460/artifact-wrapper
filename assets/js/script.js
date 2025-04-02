function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const videoParam = getQueryParam('video');

if (videoParam) {
    const videoiframe = document.getElementById('video');
    videoiframe.src = videoParam;
    //videoiframe.outerHTML = `<iframe src="${videoParam}" width="100%" height="100%" frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
}