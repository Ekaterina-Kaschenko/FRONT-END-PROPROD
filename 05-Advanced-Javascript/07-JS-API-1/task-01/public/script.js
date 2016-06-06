var start, end, files, fileSize, flag, formData;
var progress = document.getElementsByClassName('loader-progress')[0];
var loader = document.getElementsByClassName('loader')[0];
var button = document.getElementsByClassName('readDropZone')[0];
var uploaded = document.getElementsByClassName('uploaded')[0];
var uploaders = [];
var list = '';
var CHUNK_SIZE = CHUNK_SIZE || 128;
var dropZone = document.getElementsByClassName('dropsone__items-wrapper')[0];
function initiate() {
  dropZone.addEventListener('dragenter', function (event) {
    event.preventDefault();
  },false);
  dropZone.addEventListener('dragover', function (event) {
    event.preventDefault();
  },false);
  dropZone.addEventListener('drop', dropped, false);
}

var bytesToKb = function (bytes) {
  if (!bytes) { return "0.00 B"; }
  var e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes/Math.pow(1024, e)).toFixed(2)+' ' + ' KMGTP'.charAt(e) + 'B';
};

function dropped(event) {
  var list = '';
  event.preventDefault();
  files = Array.prototype.map.call(event.dataTransfer.files, function (item) {
    return item;
  });
  files.forEach(function (item) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var source = event.target.result;
      var template =
        '<ul data-draggable="target">' +
          '<li data-draggable="item" class="target item-wrapper">' +
            '<div class="item-wrapper__img"> <img src="' + source + '"></div>' +
            '<div class="item-wrapper__descr">' +
              '<div class="item-wrapper__name">' + item.name + '</div>' +
              '<div class="item-wrapper__size">' + bytesToKb(item.size) + '</div>' +
            '</div>' +
          '</li>' +
        '</ul>';

      list += template;
      dropZone.innerHTML = list;
    };
    reader.readAsDataURL(item);
  });
}
window.addEventListener('load', initiate, false);
dropZone.addEventListener('drop', dropped, false);

   var upload = function (file, name, size, flag, start, end) {
    var xhr = new XMLHttpRequest();
    formData = new FormData();
    formData.append('name', name);
    formData.append('start', start);
    //formData.append('lastChunk', flag);
    formData.append('lastChunk', end >= size);
    formData.append('chunk', file);

    end = start + CHUNK_SIZE;

    xhr.open('POST', '/jsapiupload', true);

    xhr.upload.onprogress = function (event) {
      console.log(progress);
      if (event.lengthComputable) {
        progress.value = Math.round((end / size) * 100);
        progress.textContent = parseFloat(progress.value) + '%';
        console.log(parseFloat(progress.value) + '%');
        progress.style.width = progress.textContent;
      }

    };

    xhr.onload = function (event) {
          if (progress.textContent === '100%') {
        //console.log(xhr.response);
        progress.classList.add('success');

        //uploaded.innerHTML = '<div><img src="' + JSON.parse(xhr.response).fileUrl + '" /></div>';
        //     var image = document.createElement('img');
        //     image.style.width = '100px';
        //     image.style.height = '100px';
        //     image.src = JSON.parse(xhr.response).fileUrl;
        //     uploaded.appendChild(image);

      }
    };
    xhr.send(formData);
  };
  var startChank = 0;
  var endChank = CHUNK_SIZE;
  button.addEventListener('click', function getFile() {
    if (!files || !files.length) {
      return;
    }
    var file = files[0];
    var fileName = files[0].name;
    fileSize = files[0].size;
    console.log(fileName, fileSize, file);

    if (endChank >= fileSize) {
      upload(file.slice(startChank, endChank), fileName, fileSize, true, startChank, endChank);
      startChank = 0;
      endChank = CHUNK_SIZE;
      files.shift();
      setTimeout(getFile, 0);
    } else {
      upload(file.slice(startChank, endChank), fileName, fileSize, false, startChank, endChank);
      startChank = endChank;
      endChank = startChank + CHUNK_SIZE;
      setTimeout(getFile, 0);
    }
  });
