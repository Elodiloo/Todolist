//Faire requête fetch pour récupérer les données
fetch("http://localhost:3000/todos")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur de récupération des données");
        }
        return response.json();
    })
    .then(data => {
        // Traitement des données récupérées 
        console.log(data);
    })
    .catch(error => {
        console.error("Erreur:", error);
    });