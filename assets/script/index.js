function myFunction() {
  var x = document.getElementById("homeimg");
  x.style.display = "none";
  let search = document.getElementById("search").value;
  if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("search", search);
    window.location.href = "detail.html";
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}