// Constants
import { EMAIL_REGEX, PASSWORD_REGEX, VALID_PHONE_NUMBER, NAME_REGEX, NAME_REGEX } from '../constants/regex.constant';
import { MESSAGES, EMPTY_TEXT } from '../constants/message.constant';

class Validate {
  /**
   * Checks for an empty value
   * 
   * @param {string} value - Comparative value
   */
    isEmpty(value) {
      return value;
    }

  /**
   * Email check function is not valid
   * 
   * @param {string} value - Comparative value
   */
  isValidEmail(value) {
    return EMAIL_REGEX.test(value);
  }

  /**
   * Check password rules
   * 
   * @param {string} value - Comparative value
   */
  isValidPassword(value) {
    return PASSWORD_REGEX.test(value);
  }

  /**
   * Check names contain only characters and no numbers
   * 
   * @param {*} value - Comparative value
   */
  isValidName(value) {
    return NAME_REGEX.test(value);
  }

  /**
   * Check the length of the phone number
   * 
   * @param {number} value - Comparative value
   */
  isValidPhoneNumber(value) {
    return VALID_PHONE_NUMBER.test(value);
  }

  /**
   * Function to check for empty input
   *
   * @param {object} data - The data object contains all the input elements 
   * @param {object} config - EX: config = { name: ['empty'], password: ['passwordFormat'] }
   */
  validateForm(data, config) {
    let formValidation = {
      isValid: true,
      errors: {},
    };
    
    // Point to the key in the data object
    Object.keys(data).forEach((key) => {
      const value = data[key];

      // There is a key in the config
      if (config[key]) {
        config[key].forEach((validationType) => {
          
          // If there is an empty word, continue to consider the isEmpty condition
          if (validationType === 'empty' && !this.isEmpty(value)) {
            formValidation.isValid = false;
            formValidation.errors[key] = MESSAGES.EMPTY;

            return;
          }

          // If there is an formatEmail word, continue to consider the isValidEmail condition
          if (!formValidation.errors[key] && validationType === 'formatEmail' && !this.isValidEmail(value)) {
            formValidation.isValid = false;
            formValidation.errors[key] = MESSAGES.EMAIL_WRONG_FORMAT;

            return;
          }

          // If there is an passwordRule word, continue to consider the isValidPassword condition
          if (!formValidation.errors[key] && validationType === 'passwordRule' && !this.isValidPassword(value)) {
            formValidation.isValid = false;
            formValidation.errors[key] = MESSAGES.PASSWORD_WRONG_FORMAT;

            return;
          }

          // If there is a number in the name, an error message will be output
          if (!formValidation.errors[key] && validationType === 'name' && !this.isValidName(value)) {
            formValidation.isValid = false;
            formValidation.errors[key] = MESSAGES.NAME_INVALID;

            return;
          }  

          // If the length of the phone number is not equal to 10 or the format is wrong, an error message will be output
          if (!formValidation.errors[key] && validationType === 'phone' && !this.isValidPhoneNumber(value)) {
            formValidation.isValid = false;
            formValidation.errors[key] = MESSAGES.PHONE_NUMBER_INVALID;

            return;
          }

          // If the above conditions are not met, the notification will not appear
          if (!formValidation.errors[key]) {
            formValidation.errors[key] = EMPTY_TEXT;
          }
        });
      }
    });

    return formValidation;
  }
}

export const validate = new Validate();
