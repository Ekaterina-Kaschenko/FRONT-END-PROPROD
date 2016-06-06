var makeLinkCancellable, redirect, links;
makeLinkCancellable = function(link) {
  var clicked = false;
  var interval;
  link.onclick = function(event) {
    if (clicked) {
      clicked = false;
      clearInterval(interval);
      return clicked;
    }
    var count, $span;
    clicked = true;
    count   = 3;
    $span   = link.getElementsByTagName('span')[0];
    $span.innerHTML = count;
    interval = setInterval(function() {
      if (!count) {
        clearInterval(interval);
        redirect(link.href);
        return;
      }
      $span.innerHTML = count--;
    }, 1000);
    event.preventDefault();
  };
};

redirect = function(url) { window.location.href = url; };

links = document.querySelectorAll('a');
for (var i = 0; i < links.length; i++) { makeLinkCancellable(links[i]); }
