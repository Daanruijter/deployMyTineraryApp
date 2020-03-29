import {
   
    SEND_FILTERED_CITY_REDUCER
} from '../actions/cityTypes'


const initialState = {
 
    filteredCitiesFiltered: ''
    
}

const reducer = (state = initialState, action) => {
   
    switch (action.type) {
       
            case SEND_FILTERED_CITY_REDUCER:
                return {
                    filteredCitiesFiltered: action.value
                }

        default:
            return state
    }
}
export default reducer