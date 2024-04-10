fetch('http://localhost:3000/todos')
    .then((response) => {
        response.json()
            .then((datas) => {
                console.log(datas[0].todolist);
                afficherElementsSurPage(datas[0].todolist); // Appeller la fonction pour afficher les tâches sur la page
            })
            .catch(error => console.error("Erreur:", error));
    })



// Fonction pour afficher la liste des tâches sur la page web
function afficherElementsSurPage(elements) {
    const appDiv = document.getElementById('app');



    // Parcourir tous les éléments de la liste et les afficher sur la page web
    elements.forEach(element => {
        // Création du conteneur principal pour chaque tâche avec la classe "card" de Bootstrap
        const taskCard = document.createElement('div');
        taskCard.classList.add('card', 'mb-3');

        // Création du contenu de la carte avec la classe "card-body" de Bootstrap
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Création du conteneur pour le titre de la tâche et "Terminée : Oui/Non"
        const titleAndStatusContainer = document.createElement('div');
        titleAndStatusContainer.classList.add('d-flex', 'justify-content-between');

        // Titre de la tâche avec la classe "card-title" de Bootstrap
        const title = document.createElement('h2');
        title.classList.add('card-title');
        title.textContent = `${element.text}`;
        title.style.color = '#0d6efd';

        // Statut "Terminée : Oui/Non" avec la classe "card-text" de Bootstrap
        const is_complete = document.createElement('h4');
        is_complete.classList.add('card-text');
        is_complete.textContent = `Terminée : ${element.is_complete ? 'Oui' : 'Non'}`;
        if (element.is_complete) {
            is_complete.classList.add('text-success'); // Couleur verte pour "Oui"
        } else {
            is_complete.classList.add('text-danger'); // Couleur rouge pour "Non"
        }

        // Ajout du titre de la tâche et du statut "Terminée : Oui/Non" au conteneur
        titleAndStatusContainer.appendChild(title);
        titleAndStatusContainer.appendChild(is_complete);

        // Ajout du conteneur au contenu de la carte
        cardBody.appendChild(titleAndStatusContainer);

        // Informations supplémentaires avec la classe "card-text" de Bootstrap
        const created = document.createElement('p');
        created.classList.add('card-text');
        created.textContent = `Créée : ${element.created_at}`;
        created.style.color = '#1abc9c';

        const tags = document.createElement('p');
        tags.classList.add('card-text', 'fst-italic');
        tags.textContent = `Tags : ${element.Tags}`;

        // Création du bouton "Afficher les détails"
        const button = document.createElement("button");
        button.textContent = "Afficher les détails";

        button.addEventListener("click", function () {
            window.location.href = "file:///C:/Users/elodi/Documents/GDU/ToDoList2/todos-front/item.html"
        });

        // Ajout des éléments au contenu de la carte
        cardBody.appendChild(created);
        cardBody.appendChild(tags);
        cardBody.appendChild(button);

        // Ajout du contenu de la carte à la carte elle-même
        taskCard.appendChild(cardBody);

        // Ajout de la carte à la division principale de l'application
        appDiv.appendChild(taskCard);
    });
}
