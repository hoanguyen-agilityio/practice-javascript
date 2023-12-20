export class LoaderHelper {
  /**
   * Hide loader
   *
   * @param {Element} element - Element of loader
   */
  static hideLoader(element: Element): void {
    element.classList.remove('loader-show');
  }

  /**
   * Show modal
   *
   * @param {Element} element - Element of modal
   */
  static showLoader(element: Element): void {
    element.classList.add('loader-show');
  }
}
