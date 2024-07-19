document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('DOMContentLoaded', () => {
        fetch('http://localhost:3000/dogs')
            .then(response => response.json())
            .then(dogs => {
                const tableBody = document.querySelector('#dog-table tbody');
                tableBody.innerHTML = ''; // Clear existing rows
                dogs.forEach(dog => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${dog.name}</td>
                        <td>${dog.breed}</td>
                        <td>${dog.sex}</td>
                        <td><button class="edit-button" data-id="${dog.id}">Edit</button></td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    });
    document.querySelector('#form').addEventListener('submit', (event) => {
        event.preventDefault();
        const dogId = event.target.dataset.id;
        const updatedDog = {
            name: document.querySelector('#name').value,
            breed: document.querySelector('#breed').value,
            sex: document.querySelector('#sex').value
        };
    
        fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDog)
        })
        .then(response => response.json())
        .then(() => {
            
            fetch('http://localhost:3000/dogs')
                .then(response => response.json())
                .then(dogs => {
                    const tableBody = document.querySelector('#dog-table tbody');
                    tableBody.innerHTML = ''; 
                    dogs.forEach(dog => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${dog.name}</td>
                            <td>${dog.breed}</td>
                            <td>${dog.sex}</td>
                            <td><button class="edit-button" data-id="${dog.id}">Edit</button></td>
                        `;
                        tableBody.appendChild(row);
                    });
                });
            
            document.querySelector('#form').reset();
        });
    });
    
    
})