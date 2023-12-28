document.getElementById("formControl").addEventListener("submit", handleSubmit);
fetchBookmarks();

function handleSubmit(e) {
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("url").value;

  var bookmark = {
    name: siteName,
    url: siteUrl,
  };

  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    console.log(bookmarks);
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  document.getElementById("formControl").reset();

  e.preventDefault();
}

function deleteBookmark(bookmarks, url) {
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  fetchBookmarks();
}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var bookmarkResult = document.getElementsByClassName("bookmarkResult")[0];
  console.log(bookmarkResult)

  bookmarkResult.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var site = bookmarks[i].url;

    bookmarkResult.innerHTML+= `
      <div class = 'bookmark'>
        <h3>${name}</h3>
        <a id = "visit" target = "_blank" href = "${addHttp(url)}" >Visit</a>
        <a id = "delete" target = "_blank" href = "${addHttp(
          url
        )}" onClick = "deleteBookmark(${bookmarks}, ${url})">Delete</a>
      </div>
    `;
  }

  function addHttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
    }
    return url;
  }
}
