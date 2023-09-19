document.getElementById('searchBtn').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
  
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';
  
      if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron usuarios.</p>';
      } else {
        const filteredUsers = data.filter(user => user.name.toLowerCase().includes(searchInput));
  
        if (filteredUsers.length === 0) {
          resultsContainer.innerHTML = '<p>No se encontraron usuarios con ese fragmento de nombre.</p>';
        } else {
          filteredUsers.forEach(user => {
            // Crear un elemento para el nombre de usuario.
            const userNameElement = document.createElement('p');
            userNameElement.innerHTML = `<strong>${user.name}</strong>`;
            userNameElement.className = 'user-name';
  
            // Agregar el nombre de usuario al contenedor de resultados.
            resultsContainer.appendChild(userNameElement);
  
            // Agregar un evento clic para mostrar los detalles del usuario al hacer clic en el nombre.
            userNameElement.addEventListener('click', () => {
              // Crear una tarjeta superpuesta para mostrar los detalles del usuario.
              const modal = document.createElement('div');
              modal.className = 'modal fade show';
              modal.style.display = 'block';
              modal.tabIndex = '-1';
              modal.setAttribute('role', 'dialog');
              modal.innerHTML = `
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">${user.name}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: rgb(30, 67, 87);">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="thumbnail">
                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Foto de perfil" class="profile-image-full">
                      </div>
                      <br>
                      <p><strong>Email:</strong> ${user.email}</p>
                      <p><strong>Dirección:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}</p>
                      <p><strong>Teléfono:</strong> ${user.phone}</p>
                      <!-- Agrega más campos según tus necesidades -->
                    </div>

                  </div>
                </div>
              `;
  
              // Agregar la tarjeta superpuesta al cuerpo del documento.
              document.body.appendChild(modal);
  
              // Manejar el cierre de la tarjeta superpuesta.
              modal.querySelector('.close').addEventListener('click', () => {
                modal.style.display = 'none';
                modal.remove();
              });
  
              // Añadir estilos para la imagen de perfil.
              const profileImage = modal.querySelector('.profile-image-full');
              profileImage.style.maxWidth = '100%'; // Hacer que la imagen sea responsiva
            });
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  