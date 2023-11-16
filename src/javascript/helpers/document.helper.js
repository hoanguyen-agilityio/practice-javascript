import { EMPTY_TEXT } from '../constants/message.constant';

export class DocumentHelper {
  
  /**
   * Display error message
   *
   * @param {HtmlInputElement} input - Input element
   * @param {string} msg - Show message
   */
  static showErrorMessage(input, msg) {
    const errMessageEl = input.parentElement.querySelector('.error-message');

    errMessageEl.innerHTML = msg;
  }

  /**
    * Clean error message
    *
    * @param {HtmlInputElement} element - Element input
    */
  static cleanErrorMessage(element) {
    this.showErrorMessage(element, EMPTY_TEXT);
  }
}
