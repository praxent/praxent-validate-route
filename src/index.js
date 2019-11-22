const authenticateRequest = require('./methods/authenticateRequest');
const validateRequest = require('./methods/validateRequest');

const validate = (gatewayToken) => (config) => (req, res) => {
  const { requireAuth, requiredParams, type, action } = config;

  const reducer = (prev, next) => (prev.success ? next : prev);
  const compose = (...fns) => fns.reduce(reducer);

  const { success, error } = compose(
    authenticateRequest(requireAuth, req.headers.token, gatewayToken),
    validateRequest(req[type], requiredParams),
  );

  return success ? action(req, res) : res.json({ success, error });
};

module.exports = (gatewayToken) => validate(gatewayToken)
