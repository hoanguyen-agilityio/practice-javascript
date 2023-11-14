import { EMAIL_REGEX } from "../constants/regex.constant";
import { MESSAGES } from "../constants/message.constant";

class FormValidate {
  /**
   * Email check function is not valid
   * 
   * @param {string} value - Comparative value
   */
  isValidEmail(value) {
    return EMAIL_REGEX.test(value);
  }

  /**
   * Checks for an empty value
   * 
   * @param {*} value - Comparative value
   */
  isEmpty(value) {
    return !value;
  }
}

export const formValidate = new FormValidate();
