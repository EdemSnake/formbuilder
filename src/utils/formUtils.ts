// Returns an error message string or an empty string if everything is ok
export function validateField(field, value) {
    // Required field check
    if (field.required) {
      const isEmpty = field.type === 'checkbox' ? !value : value === '';
      if (isEmpty) return 'This field is required';
    }
  
    // Email format check
    if (field.type === 'email' && value) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(value)) return 'Invalid email format';
    }
  
    // Number bounds check (min/max)
    if (field.type === 'number' && value !== '') {
      const num = Number(value);
      if (isNaN(num)) return 'Must be a number';
      if (field.min !== undefined && num < field.min) {
        return `Minimum value is ${field.min}`;
      }
      if (field.max !== undefined && num > field.max) {
        return `Maximum value is ${field.max}`;
      }
    }
  
    // TODO: Add other types (date, textarea, etc.)
  
    return '';
  }
  
  // Formats the raw value before updating state
  export function formatValue(field, rawValue) {
    // Trim whitespace for text and email inputs
    if (field.type === 'text' || field.type === 'email') {
      return rawValue.trim();
    }
    // Add other formatting logic (dates, phone numbers, etc.) here
    return rawValue;
  }
  