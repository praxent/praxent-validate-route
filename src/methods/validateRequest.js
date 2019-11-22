module.exports = (body, requiredParams) => {
  const reducer = (prev, item) => (body[item] ? prev : prev.concat(body[item]));
  const errors = requiredParams ? requiredParams.reduce(reducer, []) : [];

  const success = !errors.length;
  const error = success
    ? null
    : `Validation error, missing params: ${errors.join(', ')}`;

  return { success, error };
};
