// Constants
import { EMPTY_TEXT } from '@/constants';

/**
 * Display error message
 *
 * @param {Element} input - HTML Element
 * @param {string} msg - Show message
 */
const showErrorMessage = (input: Element, msg: string): void => {
  const parentElement = input.parentElement;

  parentElement?.querySelector('.error-message-input')?.remove();
  const createElementP = document.createElement('p');
  createElementP.classList.add('error-message', 'error-message-input');
  parentElement.appendChild(createElementP);
  const errMessageEl = parentElement.querySelector('.error-message');

  errMessageEl.innerHTML = msg;
}

/**
 * Clean error message
 *
 * @param {Element} element - HTML Element
 */
const cleanErrorMessage = (element: Element): void => {
  const parentElement = element.parentElement;
  parentElement.querySelector('.error-message-input').remove();
  showErrorMessage(element, EMPTY_TEXT);
}

/**
 * Hide element
 *
 * @param {Element} element - HTML Element
 */
const hideElement = (element: Element): void => {
  element.classList.add('hide');
}

/**
 * Show element
 *
 * @param {Element} element - HTML Element
 */
const showElement = (element: Element): void => {
  element.classList.remove('hide');
}

/**
 * Disable button
 *
 * @param {HTMLButtonElement} btn - HTML Button Element
 */
const disableElement = (btn: HTMLButtonElement): void => {
  btn.style.opacity = '0.5';
  btn.disabled = true;

  return;
}

/**
 * Cancel the disable button
 *
 * @param {HTMLButtonElement} btn - HTML Button Element
 */
const removeDisableElement = (btn: HTMLButtonElement): void => {
  btn.style.opacity = '1';
  btn.disabled = false;

  return
}

export const DocumentHelper = {
  showErrorMessage,
  cleanErrorMessage,
  hideElement,
  showElement,
  disableElement,
  removeDisableElement
};
