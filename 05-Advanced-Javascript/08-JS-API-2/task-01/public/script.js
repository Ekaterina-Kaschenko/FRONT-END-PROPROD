'use strict';
(function() {
  var ITERATIONS = 100000000;
  var allTabs;
  var tabs;
  var content;
  var contentList;
  var routes;
  var i;
  var j;
  var fullscreenKey = document.querySelector('.fullscreen');
  fullscreenKey.addEventListener('click', function(e) {
      var currentTab = document.querySelector('.content-block.active');
      toggleFullScreen(currentTab);
  });
  //Function that generates random coordinates for point(x:[-r,r), y:[-r,r))
  //and checks if it is in a circle with radius r
  var generatePoint = function() {
    var r = 16;
    var x = Math.random() * r * 2 - r;
    var y = Math.random() * r * 2 - r;
    return (Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(r, 2))
  };

  //Return estimated value of Pi after all iterations
  var computePi = function() {
      var inCircle = 0;
      var i;
      for (i = 0; i < ITERATIONS; i++) {
          if (generatePoint()) {
              inCircle++;
          }
      }
      return inCircle / ITERATIONS * 4;
  };
  document.querySelector('#syncstart').addEventListener('click', function() {
      document.querySelector('#syncresult').innerHTML = computePi();
  });
  //Performs synchronous calculations of Pi after click on button
  allTabs = document.querySelectorAll('.tabs a');
  tabs = Array.apply(null, allTabs);
  content = document.querySelectorAll('.content-block');
  contentList = Array.apply(null, content);
  routes = {
      geolocation: '/geolocation',
      synccalculation: '/synccalculation',
      webworker: '/webworker'
  };
  tabs.forEach(function(tab) {
      tab.className = '';
      tab.addEventListener('click', createState);
      tab.addEventListener('click', showContent);
  });

  function createState(e) {
      e.preventDefault();
      if (!routes[e.target.pathname.slice(1)]) {
          window.history.pushState({}, 'title', '/default');
      } else {
          window.history.pushState({}, ''.concat(e.target.textContent), routes[e.target.pathname.slice(1)]);
      }
  }

  function showContent(e) {
      for (i = 0; i < contentList.length; i++) {
          if (contentList[i].dataset.content === ''.concat(window.location.pathname.slice(1))) {
              contentList[i].classList.add('active');
          } else {
              contentList[i].classList.remove('active');
          }
      }
      for (j = 0; j < tabs.length; j++) {
          if (tabs[j].parentNode.dataset.tab === ''.concat(window.location.pathname.slice(1))) {
              tabs[j].classList.add('active');
          } else {
              tabs[j].classList.remove('active');
          }
      }
  }
  window.onload = function(e) {
      window.history.replaceState({}, 'title', '/default');
      showContent(e);
  };

  function toggleFullScreen(element) {
      if (!element.fullscreenElement && !element.mozFullScreenElement && !element.webkitFullscreenElement && !element.msFullscreenElement) {
          if (element.requestFullscreen) {
              element.requestFullscreen();
          } else if (element.msRequestFullscreen) {
              element.msRequestFullscreen();
          } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen(element.ALLOW_KEYBOARD_INPUT);
          }
      } else {
          if (element.exitFullscreen) {
              element.exitFullscreen();
          } else if (element.msExitFullscreen) {
              element.msExitFullscreen();
          } else if (element.mozCancelFullScreen) {
              element.mozCancelFullScreen();
          } else if (element.webkitExitFullscreen) {
              element.webkitExitFullscreen();
          }
      }
  }
  var positionBlock = document.getElementById('geolocation');
  navigator.geolocation.getCurrentPosition(onSucessPosition, onErrorPosition, {
      enebleHighAccuracy: true
  });

  function onSucessPosition(position) {
      var data = '';
      console.log(position);
      data += '<img src="https://maps.googleapis.com/maps/api/staticmap?size=640x480&scale=1' +
          '&markers=label:0|' + position.coords.longitude + ',' + position.coords.latitude +
          '&markers=label:1%7C50.026060,36.223125`' +
          '">';

      positionBlock.innerHTML = data;
  }

  function onErrorPosition(error) {
      alert('error ' + error.code + '\n' + error.message);
  }
})();
