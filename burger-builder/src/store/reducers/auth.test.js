import reducer from './auth.js';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    authRedirectPath: '/',
    loading: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  const action = {
    type: actionTypes.AUTH_SUCCESS,
    idToken: 'some-token',
    userId: 'some-id',
  }
  const expectedState = {
    token: 'some-token',
    userId: 'some-id',
    error: null,
    authRedirectPath: '/',
    loading: false,
  };

  it('should return the token upon login', () => {
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
