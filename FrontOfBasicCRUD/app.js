document.addEventListener('DOMContentLoaded', () => {
    // Detecta la página actual en función del atributo 'data-page' en el <body>
    const currentPage = document.body.getAttribute('data-page');

    if (currentPage === 'login') {
        setupLogin();
    } else if (currentPage === 'crud') {
        setupCRUD();
    }
});

// Configuración del Login
function setupLogin() {
    console.log('Configurando Login...');
    document.getElementById('loginForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://localhost:7231/api/Auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Guarda el token en el almacenamiento local
                localStorage.setItem('token', data.token);
                alert(`¡Bienvenido, ${data.fullName}!`);

                // Redirige al CRUD
                window.location.href = 'crud.html';
            } else {
                alert('Credenciales incorrectas.');
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            alert('Ocurrió un error al intentar iniciar sesión.');
        }
    });
}

// Configuración del CRUD
function setupCRUD() {
    console.log('Configurando CRUD...');

    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Por favor, inicia sesión.');
        window.location.href = 'index.html'; // Redirige al login si no hay token
        return;
    }

    // Configurar el botón de logout
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('token'); // Elimina el token
        alert('Sesión cerrada.');
        window.location.href = 'index.html'; // Redirige al login
    });

    // Cargar clientes al iniciar
    fetchCustomers();

    document.getElementById('editCustomerForm').addEventListener('submit', async function (e) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
    
        const token = localStorage.getItem('token'); // Recupera el token del almacenamiento local
        const id = document.getElementById('editCustomerId').value; // Obtiene el ID del cliente a editar
    
        // Obtiene los valores del formulario de edición
        const updatedCustomer = {
            firstName: document.getElementById('editFirstName').value,
            lastName: document.getElementById('editLastName').value,
            email: document.getElementById('editEmail').value,
            phoneNumber: document.getElementById('editPhoneNumber').value,
            address: document.getElementById('editAddress').value,
            city: document.getElementById('editCity').value,
            postalCode: document.getElementById('editPostalCode').value,
            dateOfBirth: document.getElementById('editDateOfBirth').value,
        };
    
        try {
            // Realiza la solicitud PUT para actualizar el cliente
            const response = await fetch(`https://localhost:7231/api/Customers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Envía el token en el encabezado
                },
                body: JSON.stringify(updatedCustomer), // Convierte el objeto a JSON
            });
    
            if (!response.ok) {
                throw new Error('No se pudo actualizar el cliente.');
            }
    
            alert('Cliente actualizado exitosamente.');
    
            // Recarga los datos en la tabla
            fetchCustomers();
    
            // Cierra el modal de edición
            const editModal = bootstrap.Modal.getInstance(document.getElementById('editCustomerModal'));
            editModal.hide();
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
            alert('No se pudo actualizar el cliente.');
        }
    });

    // Configurar el evento para añadir clientes
    document.getElementById('addCustomerForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const customer = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postalCode').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
        };

        try {
            await fetch('https://localhost:7231/api/Customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Envía el token en el encabezado
                },
                body: JSON.stringify(customer),
            });

            alert('Cliente añadido exitosamente.');
            fetchCustomers();

            // Cierra el modal y reinicia el formulario
            const addModal = bootstrap.Modal.getInstance(document.getElementById('addCustomerModal'));
            addModal.hide();
            document.getElementById('addCustomerForm').reset();
        } catch (error) {
            console.error('Error al añadir cliente:', error);
            alert('No se pudo añadir el cliente.');
        }
    });
}

// Función para obtener y mostrar clientes
async function fetchCustomers() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('https://localhost:7231/api/Customers', {
            headers: {
                'Authorization': `Bearer ${token}`, // Envía el token en el encabezado
            },
        });

        if (!response.ok) {
            throw new Error('Error al cargar clientes.');
        }

        const customers = await response.json();

        const tableBody = document.getElementById('customerTable');
        tableBody.innerHTML = ''; // Limpia la tabla

        customers.forEach((customer, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${customer.firstName}</td>
                    <td>${customer.lastName}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phoneNumber || ''}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="showEditModal(${customer.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${customer.id})">Eliminar</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error al cargar clientes:', error);
        alert('No se pudieron cargar los clientes.');
    }
}

// Función para mostrar el modal de edición (reutilizado del código anterior)
async function showEditModal(id) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`https://localhost:7231/api/Customers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Envía el token en el encabezado
            },
        });

        if (!response.ok) {
            throw new Error('Error al cargar cliente para editar.');
        }

        const customer = await response.json();

        // Llena el formulario del modal con los datos del cliente
        document.getElementById('editCustomerId').value = id;
        document.getElementById('editFirstName').value = customer.firstName;
        document.getElementById('editLastName').value = customer.lastName;
        document.getElementById('editEmail').value = customer.email;
        document.getElementById('editPhoneNumber').value = customer.phoneNumber;
        document.getElementById('editAddress').value = customer.address;
        document.getElementById('editCity').value = customer.city;
        document.getElementById('editPostalCode').value = customer.postalCode;
        document.getElementById('editDateOfBirth').value = customer.dateOfBirth;

        // Muestra el modal de edición
        const editModal = new bootstrap.Modal(document.getElementById('editCustomerModal'));
        editModal.show();
    } catch (error) {
        console.error('Error al cargar cliente para editar:', error);
        alert('No se pudo cargar el cliente para editar.');
    }
}

// Función para eliminar clientes
async function deleteCustomer(id) {
    const token = localStorage.getItem('token');
    try {
        await fetch(`https://localhost:7231/api/Customers/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Envía el token en el encabezado
            },
        });

        alert('Cliente eliminado.');
        fetchCustomers(); // Recargar los datos de clientes
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        alert('No se pudo eliminar el cliente.');
    }
}
