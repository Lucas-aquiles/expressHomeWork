document.addEventListener('DOMContentLoaded', () => {
    const btnGet = document.getElementById('btn-get');
    // const resultElement = document.getElementById('result'); // Elemento HTML donde mostrar el resultado
  
    btnGet.addEventListener('click', () => {
      fetch('http://localhost:3000/peticion') // Reemplaza "/ruta-de-tu-api" con la ruta de tu API o recurso a solicitar
        .then(response => response.json())
        .then(data => {
            const messageElement = document.getElementById('message');
            const additionalMessageElement = document.getElementById('additionalMessage');
      
            // Renderiza la información en los elementos HTML correspondientes
            messageElement.textContent = data.message;
            additionalMessageElement.textContent = data.additionalMessage;
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
    });
  });