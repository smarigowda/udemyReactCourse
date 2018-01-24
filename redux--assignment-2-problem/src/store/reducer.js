import * as actionTypes from './actions';

const initialState = {
  persons: []
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_PERSON) {
    const newPerson = {
      id: Math.random(), // not really unique but good enough here!
      name: 'Max',
      age: Math.floor( Math.random() * 40 )
    }
    const newPersons = state.persons.concat(newPerson);
    return {
      persons: newPersons
    }
  }

  if (action.type === actionTypes.REMOVE_PERSON) {
    return {
      persons: state.persons.filter(person => person.id !== action.id)
    }
  }

  return state;
}

export default reducer;