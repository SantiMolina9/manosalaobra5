const BASE_URL = "http://localhost:3000/"

const header = {
    'Content-Type': 'application/json',
    'auth': localStorage.getItem('token')
}

export const get = (url, setElements,setName) =>  {
    const response = fetch(`${BASE_URL}${url}`
        ,{
            method: 'GET',
            headers: header,
        })
        .then((response) => {
            return response.json()})
        .then((data) => {
            console.log('Respuesta de la API:', data);
            if(data.data.projectName){
                setName(data.data.projectName)
            }
            if (data.data) {
                setElements(data.data);
            } else {
                setElements(data);
            }
            })
        .catch((error) => {
            console.error('Error:', error);
        });
        ;
    return response;
}
