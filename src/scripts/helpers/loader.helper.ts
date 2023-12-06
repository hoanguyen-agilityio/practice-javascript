export class LoaderHelper {
  /**
   * Hide loader
   *
   * @param {HTMLElement} element - Element of loader
   */
  static hideLoader(element) {
    element.classList.remove('loader-show');
  }

  /**
   * Show modal
   *
   * @param {HTMLElement} element - Element of modal
   */
  static showLoader(element) {
    element.classList.add('loader-show');
  }
}