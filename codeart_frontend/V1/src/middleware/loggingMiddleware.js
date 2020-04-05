const logger = store => next => action => {
  console.log('dispatched ====>', action);

  return next(action);
};

export default logger;
