document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');

    if (taskId) {
        const taskDetails = JSON.parse(localStorage.getItem('taskDetails'));

        const appDiv = document.getElementById('app');
        initApp(appDiv);
        createTaskCard(appDiv, taskDetails);
        createReturnButton(appDiv);

    } else {
        console.error("ID de tâche non trouvé dans l'URL");
    }
});

function initApp(appDiv) {
    appDiv.style.display = 'flex';
    appDiv.style.flexDirection = 'column';
    appDiv.style.alignItems = 'center';
    appDiv.style.justifyContent = 'center';
}

function createTaskCard(appDiv, taskDetails) {
    const mastheadHeading = document.querySelector('.masthead-heading');
    mastheadHeading.textContent = taskDetails.title;

    const taskCard = document.createElement('div');
    taskCard.classList.add('card', 'text-center', 'border-primary', 'bg-light');
    taskCard.style.width = '60%';

    if (taskDetails.isComplete) {
        taskCard.classList.add('bg-white');
    } else {
        taskCard.style.backgroundColor = '#F5F5F5';
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const isComplete = document.createElement('h4');
    isComplete.classList.add('card-text');
    isComplete.textContent = `Terminée : ${taskDetails.isComplete ? 'Oui' : 'Non'}`;
    if (taskDetails.isComplete) {
        isComplete.classList.add('text-success');
    } else {
        isComplete.classList.add('text-danger');
    }

    cardBody.appendChild(isComplete);

    const createdAt = document.createElement('p');
    createdAt.textContent = `Créée : ${formatDate(taskDetails.createdAt)}`;
    createdAt.style.color = 'purple';
    createdAt.style.fontSize = '20px';

    const tags = document.createElement('p');
    tags.style.fontStyle = 'italic';
    tags.textContent = `Tags:  ${taskDetails.tags}`;

    cardBody.appendChild(createdAt);
    cardBody.appendChild(tags);
    taskCard.appendChild(cardBody);

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

    buttonsContainer.appendChild(completeButton);
    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(reopenButton);
    taskCard.appendChild(buttonsContainer);

    appDiv.appendChild(taskCard);
}

function createReturnButton(appDiv) {
    const returnButton = document.createElement('button');
    returnButton.textContent = 'Retour à la liste';
    returnButton.classList.add('btn', 'btn-info');
    returnButton.style.marginTop = '20px';
    returnButton.addEventListener('click', () => {
        window.history.back();
    });
    appDiv.appendChild(returnButton);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleString('fr-FR', options);
}

function markAsComplete(taskId) {
    fetch(`http://localhost:3000/todos/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_complete: true })
    })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => console.error('Erreur :', error));
}

function deleteTask(taskId) {
    fetch(`http://localhost:3000/todos/${taskId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
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
        })
        .catch(error => console.error('Erreur :', error));
}
