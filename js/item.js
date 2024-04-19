document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');

    console.log(taskId)

    if (taskId) {
        const taskDetails = JSON.parse(localStorage.getItem('taskDetails'));
        console.log(taskDetails);

        const mastheadHeading = document.querySelector('.masthead-heading');
        mastheadHeading.textContent = taskDetails.title;

        const appDiv = document.getElementById('app');
        appDiv.style.display = 'flex';
        appDiv.style.flexDirection = 'column';
        appDiv.style.alignItems = 'center';
        appDiv.style.justifyContent = 'center';

        const taskCard = document.createElement('div');
        taskCard.classList.add('card', 'text-center');
        taskCard.style.width = '60%';

        if (taskDetails.isComplete) {
            taskCard.classList.add('bg-white');
        } else {
            taskCard.style.backgroundColor = '#F5F5F5';
        }

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const StatusContainer = document.createElement('div');

        const is_complete = document.createElement('h4');
        is_complete.classList.add('card-text');
        is_complete.textContent = `Terminée : ${taskDetails.isComplete ? 'Oui' : 'Non'}`;
        if (taskDetails.isComplete) {
            is_complete.classList.add('text-success');
        } else {
            is_complete.classList.add('text-danger');
        }

        StatusContainer.appendChild(is_complete);
        cardBody.appendChild(is_complete);

        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            return new Date(dateString).toLocaleString('fr-FR', options);
        }

        const createdAt = document.createElement('p');
        createdAt.textContent = `Créée : ${formatDate(taskDetails.createdAt)}`;
        createdAt.style.color = 'purple';
        createdAt.style.fontSize = '20px';

        console.log(createdAt);

        const Tags = document.createElement('p');
        Tags.style.fontStyle = 'italic';
        Tags.textContent = `Tags:  ${taskDetails.tags}`;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.justifyContent = 'center';
        buttonsContainer.style.marginBottom = '20px';

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Terminer';
        completeButton.classList.add('btn', 'btn-success');
        completeButton.style.marginRight = '30px';
        completeButton.addEventListener('click', () => markAsComplete(taskId));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.style.marginRight = '30px';
        deleteButton.addEventListener('click', () => deleteTask(taskId));

        const reopenButton = document.createElement('button');
        reopenButton.textContent = 'Réouvrir';
        reopenButton.classList.add('btn', 'btn-warning');
        reopenButton.addEventListener('click', () => markAsReopened(taskId));

        cardBody.appendChild(createdAt);
        cardBody.appendChild(Tags);
        taskCard.appendChild(cardBody);
        buttonsContainer.appendChild(completeButton);
        buttonsContainer.appendChild(deleteButton);
        buttonsContainer.appendChild(reopenButton);
        taskCard.appendChild(buttonsContainer);
        appDiv.appendChild(taskCard);

        const returnButton = document.createElement('button');
        returnButton.textContent = 'Retour à la liste';
        returnButton.classList.add('btn', 'btn-info');
        returnButton.style.marginTop = '20px';
        returnButton.addEventListener('click', () => {
            window.history.back();
        });
        appDiv.appendChild(returnButton);

    } else {
        console.error("ID de tâche non trouvé dans l'URL");
    }
});

function markAsComplete(taskId) {
    console.log(`Mise à jour de la tâche avec l'ID ${taskId}.`);
    fetch(`http://localhost:3000/todos/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_complete: true })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Tâche mise à jour :', data);
        })
        .catch(error => console.error('Erreur :', error));
}

function deleteTask(taskId) {
    fetch(`http://localhost:3000/todos/${taskId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log(`Tâche avec l'ID ${taskId} supprimée.`);
            } else {
                console.error(`Erreur lors de la suppression de la tâche avec l'ID ${taskId}.`);
            }
        })
        .catch(error => console.error('Erreur :', error));
}

function markAsReopened(taskId) {
    fetch(`http://localhost:3000/todos/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_complete: false })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Tâche mise à jour :', data);
        })
        .catch(error => console.error('Erreur :', error));
}
