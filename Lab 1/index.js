function myFunction() {
    alert("Subscriber added: " + document.getElementById("email").value);
}

window.onload = function() {
    document.getElementById("subscribe-form").addEventListener("submit", myFunction);
}
    