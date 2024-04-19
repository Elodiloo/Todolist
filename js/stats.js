document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(tasks => {
            console.log(tasks[0].todolist);
            const appDiv = document.getElementById('app');

            const totalTasks = tasks[0].todolist.length;
            const completedTasks = tasks[0].todolist.filter(task => task.is_complete).length;
            const pendingTasks = totalTasks - completedTasks;

            const statsContainer = document.createElement('div');
            const statsHTML = `
                <h1 id="total-tasks" style="text-align: center;">Nombre total de tâches: ${totalTasks}</h1>
                <h2 id="completed-tasks" style="text-align: center;">Tâches terminées: ${completedTasks}</h2>
                <h2 id="pending-tasks" style="text-align: center;">Tâches à faire: ${pendingTasks}</h2>
            `;

            statsContainer.innerHTML = statsHTML;

            appDiv.appendChild(statsContainer);

            const completedTasksElement = statsContainer.querySelector('#completed-tasks');
            completedTasksElement.style.color = 'green';

            const pendingTasksElement = statsContainer.querySelector('#pending-tasks');
            pendingTasksElement.style.color = 'red';

            const space = document.createElement('div');
            space.style.height = '20px';
            appDiv.appendChild(space);

            const progressBarContainer = document.createElement('div');
            progressBarContainer.id = 'progress-bar-container';
            progressBarContainer.style.width = '50%';
            progressBarContainer.style.height = '40px';
            progressBarContainer.style.backgroundColor = 'red';
            progressBarContainer.style.borderRadius = '15px';
            progressBarContainer.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.3)';

            const progressBar = document.createElement('div');
            progressBar.style.width = `${(completedTasks / totalTasks) * 100}%`;
            progressBar.style.height = '100%';
            progressBar.style.background = 'linear-gradient(to right, #4caf50, #8bc34a)';
            progressBar.style.borderRadius = '15px';

            progressBarContainer.appendChild(progressBar);
            appDiv.appendChild(progressBarContainer);

            const spaceAfterProgressBar = document.createElement('div');
            spaceAfterProgressBar.style.height = '50px';
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
