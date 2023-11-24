// Constants
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

  /**
   * Hide element
   *
   * @param {HTMLElement} element - Element
   */
  static hideElement(element) {
    element.classList.add('hide');
  }

  /**
   * Show element
   *
   * @param {HTMLElement} element - Element
   */
  static showElement(element) {
    element.classList.remove('hide');
  }
  
  /**
   * Disable button
   * 
   * @param {*} btn - element button
   */
  static disableBtn(btn) {
    btn.disabled = true;
    btn.style.opacity = '0.5';

    return;
  }

  /**
   * Cancel the disable button
   * 
   * @param {*} btn - element button
   */
  static removeDisableBtn(btn) {
    btn.disabled = false;
  }
}
