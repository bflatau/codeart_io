/**
 * createActionTypes takes an array of action type strings and an
 * optional prefix that defaults to 'GLOBAL'.
 *
 * Returns a { key: value } map of the action types with the
 * prefix prepended to the value.
 *
 * @param actions
 * @param prefix
 * @returns {*}
 */
const createActionTypes = (prefix, actions) => {
  if (!prefix || typeof prefix !== 'string')
    throw new Error('Action type prefix must be a string');

  if (!Array.isArray(actions) || actions.length === 0)
    throw new Error('Action type actions must be a non-empty array');

  return actions.reduce(
    (actionTypes, currentValue) => ({
      ...actionTypes,
      currentValue: `${prefix}_${currentValue}`,
    }),
    {}
  );
};
export default createActionTypes;
