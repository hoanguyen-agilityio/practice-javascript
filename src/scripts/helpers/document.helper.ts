// Constants
import { EMPTY_TEXT } from '@/constant';

export class DocumentHelper {
  
  /**
   * Display error message
   *
   * @param {HtmlInputElement} input - Input element
   * @param {string} msg - Show message
   */
  static showErrorMessage(input: Element, msg: string) {
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
    btn.style.opacity = '0.5';
    btn.disabled = true;

    return;
  }

  /**
   * Cancel the disable button
   * 
   * @param {*} btn - element button
   */
  static removeDisableBtn(btn) {
    btn.style.opacity = '1';
    btn.disabled = false;

    return
  }
}
