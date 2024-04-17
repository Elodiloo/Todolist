document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(tasks => {
            console.log(tasks[0].todolist);
            const appDiv = document.getElementById('app');

            let totalTasks = tasks[0].todolist.length;
            let completedTasks = tasks[0].todolist.filter(task => task.is_complete).length;
            let pendingTasks = totalTasks - completedTasks;

            const statsContainer = document.createElement('div');
            const statsHTML = `
                <h1 style="text-align: center;">Nombre total de tâches: ${totalTasks}</h1>
                <h2 id="completed-tasks" style="text-align: center;">Tâches terminées: ${completedTasks}</h2>
                <h2 id="pending-tasks" style="text-align: center;">Tâches à faire: ${pendingTasks}</h2>
            `;

            statsContainer.innerHTML = statsHTML;

            appDiv.appendChild(statsContainer);

            const completedTasksElement = document.getElementById('completed-tasks');
            completedTasksElement.style.color = 'green';

            const pendingTasksElement = document.getElementById('pending-tasks');
            pendingTasksElement.style.color = 'red';

            // Ajout de l'espace entre les tâches à faire et la barre de progression
            const space = document.createElement('div');
            space.style.height = '20px'; // Définissez la hauteur de l'espace selon vos besoins
            appDiv.appendChild(space);

            const progressBarContainer = document.createElement('div');
            progressBarContainer.id = 'progress-bar-container';
            progressBarContainer.style.width = '50%'; // Changer la largeur selon vos besoins
            progressBarContainer.style.height = '40px'; // Changer la hauteur selon vos besoins
            progressBarContainer.style.backgroundColor = 'red'; // Changer la couleur de fond selon vos besoins

            const progressBar = document.createElement('div');
            progressBar.style.width = `${(completedTasks / totalTasks) * 100}%`;
            progressBar.style.height = '100%';
            progressBar.style.backgroundColor = 'green'; // Changer la couleur de la jauge selon vos besoins

            progressBarContainer.appendChild(progressBar);
            appDiv.appendChild(progressBarContainer);

            const spaceAfterProgressBar = document.createElement('div');
            spaceAfterProgressBar.style.height = '20px'; // Définissez la hauteur de l'espace selon vos besoins
            appDiv.appendChild(spaceAfterProgressBar);

            appDiv.appendChild(listButton);

            appDiv.style.display = 'flex';
            appDiv.style.flexDirection = 'column';
            appDiv.style.alignItems = 'center';
            appDiv.style.justifyContent = 'center';
        })

    const listButton = document.createElement('button');
    listButton.type = 'button';
    listButton.textContent = 'Retourner sur la liste de tâches';
    listButton.classList.add('btn', 'btn-info');

    listButton.addEventListener("click", function () {
        window.location.href = 'tasks.html';
    });

});
