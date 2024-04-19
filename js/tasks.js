fetch('http://localhost:3000/todos')
    .then((response) => {
        response.json()
            .then((datas) => {
                console.log(datas[0].todolist);
                afficherElementsSurPage(datas[0].todolist);
            })
            .catch(error => console.error("Erreur:", error));
    })

const form = document.createElement('form');
form.style.width = '100%';

const taskInput = document.createElement('input');
taskInput.type = 'text';
taskInput.id = 'taskText';
taskInput.required = true;
taskInput.placeholder = 'Nom de la tâche à ajouter';
taskInput.style.width = '100%';

const tagsInput = document.createElement('input');
tagsInput.type = 'text';
tagsInput.id = 'tags';
tagsInput.placeholder = 'Tags (séparés par des virgules)';
tagsInput.style.width = '85%';


const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = 'Ajouter une tâche';
submitButton.classList.add('btn', 'btn-primary');
submitButton.style.marginLeft = '20px';

form.appendChild(taskInput);
form.appendChild(tagsInput);
form.appendChild(submitButton);


const appDiv = document.getElementById('app');
appDiv.appendChild(form);

const space = document.createElement('div');
space.style.marginBottom = '50px';
appDiv.appendChild(space);

const statButtonContainer = document.createElement('div');
statButtonContainer.classList.add('d-flex', 'justify-content-center');

const statButton = document.createElement('button');
statButton.type = 'button';
statButton.textContent = 'Voir les statistiques des tâches';
statButton.classList.add('btn', 'btn-info');

statButton.addEventListener("click", function () {
    window.location.href = 'stat.html';
});

statButtonContainer.appendChild(statButton);
appDiv.appendChild(statButtonContainer);

const space2 = document.createElement('div');
space2.style.marginBottom = '50px';
appDiv.appendChild(space2);

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskText = document.getElementById('taskText').value;
    const tagsText = document.getElementById('tags').value;

    const newTask = {
        text: taskText,
        is_complete: false,
        created_at: new Date(),
        Tags: tagsText.split(',')
    };

    const status = newTask.is_complete ? 'Terminée' : 'À faire';
    console.log(`Statut de la nouvelle tâche : ${status}`)

    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
        .then(response => response.json())
        .then(datas => {
            console.log('Tâche ajoutée :', datas);
            afficherElementsSurPage([datas]);
        })
        .catch(error => console.error('Erreur :', error));
});

function afficherElementsSurPage(elements) {
    const appDiv = document.getElementById('app');
    elements.sort((a, b) => a.is_complete - b.is_complete);

    elements.forEach(element => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('card', 'mb-3');

        if (element.is_complete) {
            taskCard.classList.add('bg-white');
        } else {
            taskCard.classList.add('bg-warning');
        }

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        cardBody.addEventListener('mouseover', function () {
            if (element.is_complete) {
                cardBody.style.backgroundColor = '#6e42c155';
            } else {
                cardBody.style.backgroundColor = '#F5F5F5';
            }
        });

        cardBody.addEventListener('mouseout', function () {
            if (element.is_complete) {
                cardBody.style.backgroundColor = '';
            } else {
                cardBody.style.backgroundColor = '';
            }
        });

        const titleAndStatusContainer = document.createElement('div');
        titleAndStatusContainer.classList.add('d-flex', 'justify-content-between');

        const title = document.createElement('h2');
        title.classList.add('card-title');
        title.textContent = `${element.text}`;
        title.style.color = 'black';

        const is_complete = document.createElement('h4');
        is_complete.classList.add('card-text');
        is_complete.textContent = `Terminée : ${element.is_complete ? 'Oui' : 'Non'}`;
        if (element.is_complete) {
            is_complete.classList.add('text-success');
        } else {
            is_complete.classList.add('text-danger');
        }

        titleAndStatusContainer.appendChild(title);
        titleAndStatusContainer.appendChild(is_complete);
        cardBody.appendChild(titleAndStatusContainer);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-flex', 'justify-content-end', 'mt-3');

        const button = document.createElement("button");
        button.textContent = "Afficher les détails";
        button.classList.add('btn', 'btn-secondary');

        button.addEventListener("click", function () {
            const taskTitle = element.text;
            const taskCreatedAt = element.created_at;
            const taskIsComplete = element.is_complete;
            const taskTags = element.Tags;

            const taskDetails = {
                title: taskTitle,
                createdAt: taskCreatedAt,
                isComplete: taskIsComplete,
                tags: taskTags
            };
            localStorage.setItem('taskDetails', JSON.stringify(taskDetails));

            window.location.href = `item.html?id=${element.id}`;
        });

        buttonContainer.appendChild(button);

        cardBody.appendChild(buttonContainer);
        taskCard.appendChild(cardBody);
        appDiv.appendChild(taskCard);

    });

}


