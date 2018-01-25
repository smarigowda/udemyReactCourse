import * as actionTypes from './actions';

const initialState = {
  persons: []
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_PERSON) {
    const newPerson = {
      id: Math.random(), // not really unique but good enough here!
      name: action.payload.name,
      age: action.payload.age
    }
    const newPersons = state.persons.concat(newPerson);
    return {
      ...state,
      persons: newPersons
    }
  }

  if (action.type === actionTypes.REMOVE_PERSON) {
    return {
      ...state,
      persons: state.persons.filter(person => person.id !== action.id)
    }
  }

  return state;
}

export default reducer;