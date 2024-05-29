const url = 'https://665637279f970b3b36c4a8f5.mockapi.io/'
class apiService {
    static async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error en GET:', error);
            throw error;
        }
    }
    static async post(url,data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error en la solicitud: ${response.statusText} - ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error en POST:', error);
            throw error;
        }
    }
}