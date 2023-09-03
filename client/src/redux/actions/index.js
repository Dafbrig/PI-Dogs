import axios from 'axios';

// Acción para ordenar la lista de perros por nombre
export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

// Acción para ordenar la lista de perros por peso
export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

// Acción para obtener la lista completa de perros desde la API
export function getDogs() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

// Acción para filtrar perros por peso máximo
export function filterDogsByMAXWeight(payload) {
    return {
        type: 'FILTER_BY_MAX_WEIGHT',
        payload
    }
}

// Acción para filtrar perros por peso mínimo
export function filterDogsByMINWeight(payload) {
    return {
        type: 'FILTER_BY_MIN_WEIGHT',
        payload
    }
}

// Acción para buscar perros por nombre
export function getDogsByName(name) {
    return async function (dispatch) {
        const { data } = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: "GET_DOGS_BY_NAME",
            payload: data
        });
    };
}

// Acción para obtener la lista de temperamentos disponibles
export function getTemperamentsList() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/temperament');
        var listOfTemperaments = json.data.map(el => el.name)
        return dispatch({
            type: 'GET_TEMPERAMENTS_LIST',
            payload: listOfTemperaments
        });
    }
}

// Acción para agregar un nuevo perro
export function postDog(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/dogs', payload);
        return response;
    }
}

// Acción para filtrar perros por raza o grupo de razas
export function getDogsByBreed(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/breedGroup?breedGroup=${payload}`);
            return dispatch({
                type: 'GET_DOGS_BY_BREED',
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error on the filters in actions file")
        }
    }
}

// Acción para obtener la lista de razas o grupos de razas disponibles
export function getBreeds() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/breedGroups');
        return dispatch({
            type: 'GET_BREEDS',
            payload: json.data
        });
    }
}

// Acción para filtrar perros por temperamento
export function filterDogsByTemperament(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dog/?temperament=${payload}`);
            return dispatch({
                type: 'GET_DOGS_BY_TEMP',
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error on the filters in actions file")
        }
    }
}

// Acción para filtrar perros por origen (creados por el usuario o en la base de datos)
export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

// Acción para obtener los detalles de un perro específico por su ID
export function getDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// Acción para eliminar los detalles de un perro específico
export function deleteDetails() {
    return async function (dispatch){
    return dispatch({
        type: 'DELETE_DETAILS'
    })
}
}
