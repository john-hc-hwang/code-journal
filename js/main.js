/* global data */
/* exported data */

var $title = document.querySelector('#title');
var $photoUrl = document.querySelector('#photoUrl');
var $notes = document.querySelector('#notes');
var $img = document.querySelector('.imgEntry');

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

/* <div class="row">
          <div class="container">
            <div class="mediaview">
              <div class="column-half">
                <div class="img-container">
                  <img src="http://justice4cecil.weebly.com/uploads/5/2/3/3/52333429/2377089_orig.png"
                    alt="image placeholder">
                </div>
              </div>
              <div class="column-half">
                <p class="entryTitle">Monke</p>
                <p class="entryNotes">Monkey with AK47 Monkey with AK47 Monkey with AK47 Monkey with AK47
                  Monkey with AK47 Monkey with AK47 </p>
              </div>
            </div>
          </div>
        </div> */

var entryItems = localStorage.getItem('entries');
var entries = JSON.parse(entryItems);

var $ul = document.querySelector('ul');
window.addEventListener('DOMContentLoaded', loadDom);

function loadDom(event) {
  if (entries.length === 0) {
    return;
  }

  for (var i = 0; i < entries.length; i++) {
    var $row = document.createElement('div');
    $row.className = 'row';

    var $container = document.createElement('div');
    $container.className = 'container';

    $row.appendChild($container);

    var $mediaview = document.createElement('div');
    $mediaview.className = 'mediaview';

    $container.appendChild($mediaview);

    var $colhalf = document.createElement('div');
    $colhalf.className = 'column-half';

    $mediaview.appendChild($colhalf);

    var $imgContainer = document.createElement('div');
    $imgContainer.className = 'img-container';

    $colhalf.appendChild($imgContainer);

    var $image = document.createElement('img');
    $image.setAttribute('src', entries[i].photoUrl);
    $image.setAttribute('alt', entries[i].title);

    $imgContainer.appendChild($image);

    var $colhalf2 = document.createElement('div');
    $colhalf2.className = 'column-half';

    $mediaview.appendChild($colhalf2);

    var $entryTitle = document.createElement('p');
    $entryTitle.className = 'entryTitle';
    $entryTitle.textContent = entries[i].title;

    $colhalf2.appendChild($entryTitle);

    var $entryNotes = document.createElement('p');
    $entryNotes.className = 'entryNotes';
    $entryNotes.textContent = entries[i].notes;

    $colhalf2.appendChild($entryNotes);
    $ul.appendChild($row);
  }
}
