async function identifyOrchidWithPlantNet() {
    const fileInput = document.getElementById('orchidPhoto');
    const file = fileInput.files[0];
  
    if (!file) {
      alert("Por favor, sube una foto de la orquídea.");
      return;
    }
  
    // Mostrar la imagen en el formulario
    const imgElement = document.createElement('img');
    imgElement.src = URL.createObjectURL(file);
    imgElement.width = 200; // Tamaño de la imagen
    document.getElementById('imageContainer').innerHTML = ''; // Limpiar contenedor
    document.getElementById('imageContainer').appendChild(imgElement);
  
    // Crear el FormData para enviar la imagen
    const formData = new FormData();
    formData.append("images", file);
    formData.append("organs", "flower"); // Puedes ajustar esto si necesitas
  
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    const apiEndpoint = 'https://my-api.plantnet.org/v2/identify/{all}?api-key=2b10zq2jx8ItA0M2IcAvr9TK1u';
  
    try {
      const response = await fetch(corsProxy + encodeURIComponent(apiEndpoint), {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en la API: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
      const data = await response.json();
  
      if (!data.results || data.results.length === 0) {
        alert("No se encontraron resultados para la orquídea.");
        return;
      }
  
      const orchidName = data.results[0].species.scientificNameWithoutAuthor;
  
      document.getElementById('orchidType').value = orchidName;
    } catch (error) {
      console.error("Error identificando la orquídea:", error);
      alert("Hubo un error identificando la orquídea: " + error.message);
    }
  }
  
  document.getElementById('orchidPhoto').addEventListener('change', identifyOrchidWithPlantNet);