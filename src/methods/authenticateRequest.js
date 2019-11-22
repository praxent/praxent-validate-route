module.exports = (authRequired, token, gatewayToken) => {
  const success = !authRequired || token === gatewayToken;
  return {
    success,
    error: success ? null : 'Authentication error.',
  };
};
