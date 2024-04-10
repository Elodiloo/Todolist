let btn = document.getElementById('btn');
let prenom = document.getElementById("prenom");

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (prenom.value == "") {
        alert("Veuillez entrer votre prénom !");
    } else {
        localStorage.setItem("prenom", prenom.value);
        window.location.href = "tasks.html";
    }
})








