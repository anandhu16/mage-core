/**
 * Request Validation Middleware
 * Provides utilities for validating incoming request data
 */

/**
 * Validates required fields in request body
 * @param {Array<string>} requiredFields - Array of required field names
 * @returns {Function} Express middleware function
 */
exports.validateRequiredFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    
    // Check for missing required fields
    for (const field of requiredFields) {
      if (!req.body || req.body[field] === undefined || req.body[field] === null) {
        missingFields.push(field);
      }
    }
    
    // If there are missing fields, return an error response
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing required fields',
        details: {
          missingFields
        }
      });
    }
    
    // Continue to the next middleware/controller
    next();
  };
};

/**
 * Validates ID parameter format
 * @returns {Function} Express middleware function
 */
exports.validateIdParam = () => {
  return (req, res, next) => {
    const { id } = req.params;
    
    // Basic ID validation (customize as needed)
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid ID parameter'
      });
    }
    
    next();
  };
};

/**
 * Validates query parameters
 * @param {Object} allowedParams - Object mapping parameter names to validator functions
 * @returns {Function} Express middleware function
 */
exports.validateQueryParams = (allowedParams) => {
  return (req, res, next) => {
    const errors = [];
    
    // Check each query parameter against its validator
    for (const [param, validator] of Object.entries(allowedParams)) {
      if (req.query[param] !== undefined && !validator(req.query[param])) {
        errors.push(`Invalid value for query parameter: ${param}`);
      }
    }
    
    // If there are validation errors, return an error response
    if (errors.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Query parameter validation failed',
        details: {
          errors
        }
      });
    }
    
    next();
  };
};

