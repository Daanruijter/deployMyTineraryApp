
// rootReducer.js

// import userReducer from "./userReducer";


// const rootReducer = combineReducers({
//     cities: citiesReducer,
//     filter: filterCityReducer,
//     filteredCities: sendFilteredCityReducer,
//     itineraries: itineraryReducer,
//     cityName: cityNameReducer,
//     // userReducer: userReducer
// });

//userreducer.js//

// import {
//     SEND_USER_REGISTRATIONDATA
   
// } from '../actions/userTypes'


// const initialState = {
    
//     user: ''
  
    
// }

// const reducer = (state = initialState, action) => {
//     console.log("line15" + action.type)
//     switch (action.type) {
//         case SEND_USER_REGISTRATIONDATA:
//             return {
//                 ...state,
//                 user: action.payload
//             }
        
         

//         default:
//             return state
//     }
// }
// export default reducer

//userTypes.js//
// export const SEND_USER_REGISTRATIONDATA = 'SEND_USER_REGISTRATIONDATA'

//userActions.js//
// import  {
    //     SEND_USER_REGISTRATIONDATA
        
    // } from './userTypes'
    
    
    // export const sendUserRegistrationData = user => {
        
    //     return {
    //         type: SEND_USER_REGISTRATIONDATA,
    //         payload: user
    //     }
    // }

//createaccount.js//
//in handlesubmit//
// this.props.sendUserRegistrationData(user)

//get data from Redux//
// const mapStateToProps = state => {
//   return {
//     users: state.userReducer.users
//   };
// };

// //fires actions to Redux (in this case the fetchfunction)//
// const mapDispatchToProps = dispatch => {
//   return {
//     sendUserRegistrationData: user => dispatch(sendUserRegistrationData(user)),
//   };   
// };


// export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
    
    