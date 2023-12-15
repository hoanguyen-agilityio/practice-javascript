// Constants
import { EMPTY_TEXT } from '@/constant';

export class DocumentHelper {

  /**
   * Display error message
   *
   * @param {HTMLElement} input - HTML Element
   * @param {string} msg - Show message
   */
  static showErrorMessage(input: HTMLElement, msg: string): void {
    const errMessageEl = input.parentElement.querySelector('.error-message');

    errMessageEl.innerHTML = msg;
  }

  /**
    * Clean error message
    *
    * @param {HTMLElement} element - HTML Element
    */
  static cleanErrorMessage(element: HTMLElement): void {
    this.showErrorMessage(element, EMPTY_TEXT);
  }

  /**
   * Hide element
   *
   * @param {HTMLElement} element - HTML Element
   */
  static hideElement(element: HTMLElement): void {
    element.classList.add('hide');
  }

  /**
   * Show element
   *
   * @param {HTMLElement} element - HTML Element
   */
  static showElement(element: HTMLElement): void {
    element.classList.remove('hide');
  }

  /**
   * Disable button
   *
   * @param {HTMLButtonElement} btn - HTML Button Element
   */
  static disableBtn(btn: HTMLButtonElement): void {
    btn.style.opacity = '0.5';
    btn.disabled = true;

    return;
  }

  /**
   * Cancel the disable button
   *
   * @param {HTMLButtonElement} btn - HTML Button Element
   */
  static removeDisableBtn(btn: HTMLButtonElement): void {
    btn.style.opacity = '1';
    btn.disabled = false;

    return
  }
}
