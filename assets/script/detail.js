// Retrieve
document.getElementById("search").value = localStorage.getItem("search");
document.getElementById('submit').click();
function playlist() {
  let trac = "${track}";
  if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("trac", trac);
    window.location.href = "playlistnew.html";
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}
