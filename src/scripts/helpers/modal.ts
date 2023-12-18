export class ModalHelper {
  /**
   * Hide modal
   *
   * @param {HTMLElement} element - Element of modal
   */
  static hideModal(element: HTMLElement): void {
    element.classList.remove('modal-show');
  }

  /**
   * Show modal
   *
   * @param {HTMLElement} element - Element of modal
   */
  static showModal(element: HTMLElement): void {
    element.classList.add('modal-show');
  }
}
