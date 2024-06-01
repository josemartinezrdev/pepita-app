// Función para obtener datos de la API
export async function getData(baseUrl, endpoint, id) {
    // Recibe dos parámetros: la URL base y un endpoint para saber a qué datos acceder
    const url = `${baseUrl}/${endpoint}/${id}`; // Constante donde se junta la URL base y el endpoint
    try {
        const response = await fetch(url); // Se guarda la respuesta del GET a la API en una constante
        if (!response.ok) { // Verifica si la respuesta no es exitosa
            throw new Error(`Error en la solicitud: ${response.statusText}`); // Lanza un error con el mensaje de estado
        }
        return await response.json(); // Retorna la respuesta convertida a formato JSON
    } catch (error) {
        console.error('Error en GET:', error); // Imprime el error en la consola
        throw error; // Vuelve a lanzar el error para ser manejado por quien llama a la función
    }
}

// Función para enviar datos a la API usando el método POST
export async function postData(baseUrl, endpoint, data) {
    const url = `${baseUrl}/${endpoint}`; // Constante donde se junta la URL base y el endpoint
    try {
        const response = await fetch(url, {
            method: 'POST', // Especifica el método HTTP como POST
            headers: {
                'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud es JSON
            },
            body: JSON.stringify(data) // Convierte los datos a JSON para enviarlos en el cuerpo de la solicitud
        });
        if (!response.ok) { // Verifica si la respuesta no es exitosa
            const errorText = await response.text(); // Lee el texto del error de la respuesta
            throw new Error(`Error en la solicitud: ${response.statusText} - ${errorText}`); // Lanza un error con el mensaje de estado y el texto del error
        }
        return await response.json(); // Retorna la respuesta convertida a formato JSON
    } catch (error) {
        console.error('Error en POST:', error); // Imprime el error en la consola
        throw error; // Vuelve a lanzar el error para ser manejado por quien llama a la función
    }
}

// Función para actualizar datos en la API usando el método PUT
export async function putData(baseUrl, endpoint, data, id) {
    const url = `${baseUrl}/${endpoint}/${id}`; // Constante donde se junta la URL base, el endpoint y el ID del recurso a actualizar
    try {
        const response = await fetch(url, {
            method: 'PUT', // Especifica el método HTTP como PUT
            headers: {
                'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud es JSON
            },
            body: JSON.stringify(data) // Convierte los datos a JSON para enviarlos en el cuerpo de la solicitud
        });
        if (!response.ok) { // Verifica si la respuesta no es exitosa
            const errorText = await response.text(); // Lee el texto del error de la respuesta
            throw new Error(`Error en la solicitud: ${response.statusText} - ${errorText}`); // Lanza un error con el mensaje de estado y el texto del error
        }
        return await response.json(); // Retorna la respuesta convertida a formato JSON
    } catch (error) {
        console.error('Error en PUT:', error); // Imprime el error en la consola
        throw error; // Vuelve a lanzar el error para ser manejado por quien llama a la función
    }
}
