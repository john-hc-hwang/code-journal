/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photoUrl');
var $img = document.querySelector('img');
$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
  if (event.target.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});
