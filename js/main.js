/* global data */
/* exported data */

var $title = document.querySelector('#title');
var $photoUrl = document.querySelector('#photoUrl');
var $notes = document.querySelector('#notes');
var $img = document.querySelector('.imgPreview');
var $noEntry = document.querySelector('.noEntry');
var $editEntry = document.querySelector('.edit.hidden');
var $new = document.querySelector('.new');

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
  if (event.target.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

var $form = document.forms[0];
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  $noEntry.className = 'noEntry hidden';

  if (data.editing !== null) {
    data.entries[data.entries.length - data.editing.entryId].title = $title.value;
    data.entries[data.entries.length - data.editing.entryId].photoUrl = $photoUrl.value;
    data.entries[data.entries.length - data.editing.entryId].notes = $notes.value;
    data.entries[data.entries.length - data.editing.entryId].entryId = data.editing.entryId;

    for (var i = 0; i < data.entries.length; i++) {
      var firstChild = $ul.firstElementChild;
      $ul.removeChild(firstChild);
    }
    renderAppend(data.entries);
  } else {
    renderPrepend();
  }
  data.editing = null;
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $img.setAttribute('alt', 'image placeholder');

  $form.className = 'hidden';
  $hiddenEntry.removeAttribute('class');
});

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});

var dataItems = localStorage.getItem('data');
var dataObj = JSON.parse(dataItems);

data.view = dataObj.view;
data.entries = dataObj.entries;
data.editing = dataObj.editing;
data.nextEntryId = dataObj.nextEntryId;
data.editing = null;

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
        <div class="flex">
          <p class="entryTitle">Monke</p>
          <div class="column-full flex end edit-container">
            <div>
              <img src="images/edit.PNG" alt="edit icon">
            </div>
          </div>
        </div>
        <p class="entryNotes">Monkey with AK47 Monkey with AK47 Monkey with AK47 Monkey with AK47
        Monkey with AK47 Monkey with AK47 </p>
      </div>
    </div>
  </div>
</div> */

window.addEventListener('DOMContentLoaded', loadDom);

function loadDom(event) {
  if (data.entries.length === 0) {
    $noEntry.className = 'noEntry';
    return;
  }
  renderAppend(data.entries);
}

var $ul = document.querySelector('ul');
$ul.addEventListener('click', function (event) {
  if (event.target.getAttribute('data-entry-id') !== null) {
    $form.removeAttribute('class');
    $hiddenEntry.className = 'hidden';
    $new.className = 'new hidden';
    $editEntry.className = 'edit';

    for (var i = 0; i < data.entries.length; i++) {
      if (event.target.getAttribute('data-entry-id') === data.entries[i].entryId.toString()) {
        data.editing = data.entries[i];
      }
    }

    $title.value = data.editing.title;
    $photoUrl.value = data.editing.photoUrl;
    $notes.value = data.editing.notes;
    $img.setAttribute('src', $photoUrl.value);
    $img.setAttribute('alt', $title.value);
  }
});

var $hiddenEntry = document.querySelector('.entry.hidden');
var $navEntries = document.querySelector('.entries');
$navEntries.addEventListener('click', function (event) {
  $form.className = 'hidden';
  $hiddenEntry.removeAttribute('class');
  data.editing = null;
});

var $newEntry = document.querySelector('.newEntry');
$newEntry.addEventListener('click', function (event) {
  $form.removeAttribute('class');
  $hiddenEntry.className = 'hidden';
  $new.className = 'new';
  $editEntry.className = 'edit hidden';
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $img.setAttribute('alt', 'image placeholder');
  data.editing = null;
});

function renderPrepend() {
  var newObj = {};

  newObj.title = $title.value;
  newObj.photoUrl = $photoUrl.value;
  newObj.notes = $notes.value;
  newObj.entryId = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(newObj);

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
  $image.setAttribute('src', newObj.photoUrl);
  $image.setAttribute('alt', newObj.title);

  $imgContainer.appendChild($image);

  var $colhalf2 = document.createElement('div');
  $colhalf2.className = 'column-half';

  $mediaview.appendChild($colhalf2);

  var $divflex = document.createElement('div');
  $divflex.className = 'flex';

  $colhalf2.appendChild($divflex);

  var $entryTitle = document.createElement('p');
  $entryTitle.className = 'entryTitle';
  $entryTitle.textContent = newObj.title;

  $divflex.appendChild($entryTitle);

  var $editContainer = document.createElement('div');
  $editContainer.className = 'column-full flex end edit-container';
  $divflex.appendChild($editContainer);

  var $div = document.createElement('div');
  $div.className = 'fixedWidth';
  $editContainer.appendChild($div);

  var $edit = document.createElement('img');
  $edit.setAttribute('src', 'images/edit.PNG');
  $edit.setAttribute('alt', 'edit icon');
  $edit.setAttribute('data-entry-id', newObj.entryId);
  $edit.className = 'editButton';

  $div.appendChild($edit);

  var $entryNotes = document.createElement('p');
  $entryNotes.className = 'entryNotes';
  $entryNotes.textContent = newObj.notes;

  $colhalf2.appendChild($entryNotes);

  $ul.prepend($row);
}

function renderAppend(entry) {
  for (var elem of entry) {
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
    $image.setAttribute('src', elem.photoUrl);
    $image.setAttribute('alt', elem.title);

    $imgContainer.appendChild($image);

    var $colhalf2 = document.createElement('div');
    $colhalf2.className = 'column-half';

    $mediaview.appendChild($colhalf2);

    var $divflex = document.createElement('div');
    $divflex.className = 'flex';

    $colhalf2.appendChild($divflex);

    var $entryTitle = document.createElement('p');
    $entryTitle.className = 'entryTitle';
    $entryTitle.textContent = elem.title;

    $divflex.appendChild($entryTitle);

    var $editContainer = document.createElement('div');
    $editContainer.className = 'column-full flex end edit-container';
    $divflex.appendChild($editContainer);

    var $div = document.createElement('div');
    $div.className = 'fixedWidth';
    $editContainer.appendChild($div);

    var $edit = document.createElement('img');
    $edit.setAttribute('src', 'images/edit.PNG');
    $edit.setAttribute('alt', 'edit icon');
    $edit.setAttribute('data-entry-id', elem.entryId);
    $edit.className = 'editButton';

    $div.appendChild($edit);

    var $entryNotes = document.createElement('p');
    $entryNotes.className = 'entryNotes';
    $entryNotes.textContent = elem.notes;

    $colhalf2.appendChild($entryNotes);
    $ul.append($row);
  }
}
