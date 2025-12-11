/**
 * Validation utilities for models
 */

/**
 * Validate email format
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone number (Japanese format)
 */
export const validatePhone = (phone) => {
    // Japanese phone format: 0X0-XXXX-XXXX or 0XX-XXX-XXXX
    const phoneRegex = /^0\d{1,4}-\d{1,4}-\d{4}$/;
    return phoneRegex.test(phone);
};

/**
 * Validate date is not in the future
 */
export const validatePastDate = (date) => {
    return new Date(date) <= new Date();
};

/**
 * Validate date is in the future
 */
export const validateFutureDate = (date) => {
    return new Date(date) > new Date();
};

/**
 * Validate string length
 */
export const validateLength = (str, min, max) => {
    const length = str ? str.length : 0;
    return length >= min && length <= max;
};

/**
 * Validate required field
 */
export const validateRequired = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
};

/**
 * Validate number range
 */
export const validateRange = (num, min, max) => {
    return num >= min && num <= max;
};

/**
 * Validate enum value
 */
export const validateEnum = (value, allowedValues) => {
    return allowedValues.includes(value);
};

/**
 * Validate URL format
 */
export const validateUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Validate ObjectId
 */
export const validateObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

/**
 * Custom validator for Mongoose schema
 */
export const createValidator = (validatorFn, message) => {
    return {
        validator: validatorFn,
        message: message
    };
};

export default {
    validateEmail,
    validatePhone,
    validatePastDate,
    validateFutureDate,
    validateLength,
    validateRequired,
    validateRange,
    validateEnum,
    validateUrl,
    validateObjectId,
    createValidator
};
