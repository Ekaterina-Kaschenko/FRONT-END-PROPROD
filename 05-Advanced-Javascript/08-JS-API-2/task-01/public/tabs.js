window.onload = function() {

  var container = document.getElementsByClassName('container')[0];
  var tabcon = document.getElementsByClassName('content')[0];
  var navitem = document.getElementById('tabHeader_1');
  var ident = navitem.id.split('_')[1];
  // console.log(ident);
  // console.log(navitem);
   var aaa = navitem.parentNode.setAttribute('data-current',ident);
  // console.log(aaa);

  navitem.setAttribute('class','tabActiveHeader'); //при клике на ссылку устанавливаю  класс tabActiveHeader и показываю его с контентом

  var pages = tabcon.getElementsByTagName('div');
  //console.log(pages); //прохожусь по всем контантам и скрываю их под дефолтной, поэтому цикл с 1
  for (var i = 1; i < pages.length; i++) {
    pages.item(i).style.display='none';
  }

  // var links = container.getElementsByTagName('a');
  // for (var i = 0; i < links.length; i++) {
  //   links[i].addEventListener('click', function (e) {
  //     var target = e.target; //по чему кликнули
  //     if (target.host === window.location.host) {
  //       console.log(target); //ссылка по которой кликнули, хост - доменное имя текущего сайта
  //       console.log(typeof window.location.host);
  //       console.log(window.location);
  //       event.preventDefault();
  //     }
  //
  //     function getPathname(url) { // получаю путь
  //       var a = document.createElement('a');
  //       a.href = url;
  //       console.log(url); // получаю линку выбранного таба
  //       console.log(a.pathname.slice(1)); // название линки
  //       return a.pathname;
  //     }
  //     var link = getPathname(target.href);
  //     console.log(link);
  //     var url = window.location.host;
  //     history.pushState({}, url, link);
  //     console.log(history.pushState({}, url, link));
  //   });
  // }

  var links = document.getElementsByClassName('tabs')[0];
  links.addEventListener('click', function(e) {
    var target = e.target;

    console.log( 'target', target );

    function getPathname(url) { // получаю путь
      var a = document.createElement('a');
      a.href = url;
      console.log(url); // получаю линку выбранного таба
      console.log(a.pathname.slice(1)); // название линки
      return a.pathname;
    }
    var link = getPathname(target.href);


  });




  function displayPage(e) { // передавать нназвание таба
    e.preventDefault();
    var current = this.parentNode.getAttribute('data-current');
    document.getElementById('tabHeader_' + current).removeAttribute('class');
    document.getElementById('tabpage_' + current).style.display = 'none';
    var ident = this.id.split('_')[1];

    this.setAttribute('class', 'tabActiveHeader');
    document.getElementById('tabpage_' + ident).style.display = 'block';
    this.parentNode.setAttribute('data-current', ident);
  }

  var tabs = container.getElementsByTagName('li');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].onclick = displayPage;
  }


};
