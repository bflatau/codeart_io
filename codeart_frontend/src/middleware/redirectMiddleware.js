export default function redirectMiddleware(history) {
  return ({ dispatch, getState }) => next => action => {
    next(action);

    const { meta = {} } = action;
    const { redirectTo } = meta;

    if (!redirectTo) {
      return;
    }

    history.replace(redirectTo);
  };
}
