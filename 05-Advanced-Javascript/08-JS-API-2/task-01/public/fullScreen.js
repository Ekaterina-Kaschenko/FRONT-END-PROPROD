function requestFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

var wrapper = document.querySelector('.content');

document.getElementsByClassName('button')[0].onclick = function () {
  var fsEnabled = document.fullscreenEnabled
    || document.webkitFullscreenEnabled
    || document.mozFullScreenEnabled
    || document.msFullscreenEnabled;
  var fsElement = document.fullscreenElement
    || document.webkitFullscreenElement
    || document.mozFullScreenElement
    || document.msFullscreenElement;

  if (!fsEnabled) {
    alert('Fullscreen is not enabled for this document')
    return;
  }

  if (fsElement) {
    exitFullscreen();
  } else {
    requestFullscreen(wrapper);
  }
};