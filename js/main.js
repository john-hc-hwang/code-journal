/* global data */
/* exported data */

var $title = document.querySelector('#title');
var $photoUrl = document.querySelector('#photoUrl');
var $notes = document.querySelector('#notes');
var $img = document.querySelector('img');

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
  if (event.target.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

var $form = document.forms[0];
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var newObj = {};

  newObj.title = $title.value;
  newObj.photoUrl = $photoUrl.value;
  newObj.notes = $notes.value;
  newObj.entryId = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(newObj);
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
});

window.addEventListener('beforeunload', function (event) {
  var entryJSON = JSON.stringify(data.entries);
  localStorage.setItem('entries', entryJSON);
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});
