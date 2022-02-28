import { combineReducers } from "redux";

const init = {
  medicine: [],
  reports: []
}

export const reducer = (state = init.medicine, action) => {
  switch (action.type) {
    case 'ADD_MEDICINE':
      return [...state, action.payload]
    case 'DELETE_MEDICINE':
      return state.filter((item) => item.id !== action.payload.id)
    case "RESET_MEDICINE_ITEM":
      return init.medicine
    default:
      return state
  }
}

export const addPatient_Reports = (state = init.reports, action) => {
  switch (action.type) {
    case 'ADD_REPORTS':
      return [...state, action.payload]
    case 'DELETE_REPORTS':
      return state.filter((item) => item.id !== action.payload.id)
    case "RESET_REPORTS_ITEM":
      return init.reports
    default:
      return state
  }
}
// export const remove_listReducer = (state = init.medicine, action) => {
//     return (action.type === 'remove_medicine') ? state.filter((item) => item.id !== action.payload.id) : state;
// };

const appReducer = combineReducers({ reducer, addPatient_Reports })

export default appReducer;