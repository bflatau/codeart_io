/**
 * This utility function creates a reducer function with an action map that is
 * provided when the reducer is created.
 *
 * @param initialState
 * @param actionMap
 * @returns {Function}
 */
const createReducer = (initialState, actionMap) => (
  state = initialState,
  action = {}
) => (actionMap[action.type] ? actionMap[action.type](state, action) : state);

export default createReducer;
