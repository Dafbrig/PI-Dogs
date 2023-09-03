// Definición del estado inicial del almacenamiento
const initialState = {
    dogs: [],           // Lista de perros
    allDogs: [],        // Lista completa de perros sin filtros
    temperaments: [],   // Lista de temperamentos
    breeds: [],         // Lista de razas o grupos de razas
    details: []         // Detalles de un perro específico
}

// Reductor de Redux que procesa las acciones y actualiza el estado
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            // Actualiza la lista de perros y la lista completa de perros
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case "GET_DOGS_BY_NAME":
            // Filtra la lista completa de perros por nombre
            return {
                ...state,
                allDogs: action.payload,
            }
        case 'GET_DOGS_BY_TEMP':
            // Filtra la lista completa de perros por temperamento
            return {
                ...state,
                allDogs: action.payload,
            }
        case 'GET_BREEDS':
            // Actualiza la lista de razas o grupos de razas
            return {
                ...state,
                breeds: action.payload
            }
        case 'GET_TEMPERAMENTS_LIST':
            // Actualiza la lista de temperamentos
            return {
                ...state,
                temperaments: action.payload
            }
        case 'GET_DOGS_BY_BREED':
            // Filtra la lista de perros por raza o grupo de razas
            const allDogs = state.dogs;
            if (action.payload === 'all') return allDogs;
            return {
                ...state,
                allDogs: action.payload,
                dogs: allDogs
            }
        case 'FILTER_CREATED':
            // Filtra la lista de perros por origen (creados por el usuario o en la base de datos)
            const createdFilter = action.payload === 'created' ?
                state.dogs.filter(el => el.createdInDB === true) :
                state.dogs.filter(el => !el.createdInDB);
            return {
                ...state,
                allDogs: createdFilter,
            }
        case 'ORDER_BY_NAME':
            // Ordena la lista de perros por nombre (ascendente o descendente)
            const sortedArr = action.payload === 'asc' ?
                [...state.dogs].sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (b.name > a.name) { return -1 }
                    return 0;
                }) :
                [...state.dogs].sort(function (a, b) {
                    if (a.name > b.name) { return -1; }
                    if (b.name > a.name) { return 1; }
                    return 0;
                })
            return {
                ...state,
                allDogs: sortedArr
            }
        case 'ORDER_BY_WEIGHT':
            // Ordena la lista de perros por peso (ascendente o descendente)
            const sortedWeight = action.payload === 'asc' ?
                [...state.dogs].sort(function (a, b) {
                    if(a.weight_min === null) { return 0 }
                    if (a.weight_min < b.weight_min) { return 1 }
                    if (b.weight_min < a.weight_min) { return -1 }
                    return 0;
                }) :
                [...state.dogs].sort(function (a, b) {
                    if(a.weight_min === null) { return 0 }
                    if (a.weight_min < b.weight_min) { return -1; }
                    if (b.weight_min < a.weight_min) { return 1; }
                    return 0;
                })
            return {
                ...state,
                allDogs: sortedWeight
            }
        case 'FILTER_BY_MAX_WEIGHT':
            // Filtra la lista de perros por peso máximo
            const everyDog = state.allDogs;
            const weightMAXFiltered = action.payload === 'all' ?
                everyDog :
                everyDog.filter(el => el.weight_max <= action.payload)
            return {
                ...state,
                allDogs: weightMAXFiltered
            }
        case 'FILTER_BY_MIN_WEIGHT':
            // Filtra la lista de perros por peso mínimo
            const allDoguis = state.allDogs;
            const weightMINFiltered = action.payload === 'all' ?
                allDoguis :
                allDoguis.filter(el => el.weight_min >= action.payload)
            return {
                ...state,
                allDogs: weightMINFiltered
            }
        case 'POST_DOG':
            // No parece actualizar el estado, puede requerir acción adicional
            return {
                ...state
            }
        case 'GET_DETAILS':
            // Actualiza los detalles de un perro específico
            return {
                ...state,
                details: action.payload
            }
        case 'DELETE_DETAILS':
            // Elimina los detalles de un perro específico
            return {
                ...state,
                details: []
            }
        default:
            return state
    }
}

export default rootReducer;
