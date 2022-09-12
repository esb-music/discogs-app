/**
 * @author Burkhardt Renz
 * A thin wrapper for localStorage ithat make it easier to
 * get and set json objects
 */

export const localStore = ((() => {

  let _getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  let _setItem = (key, item) => {
    return localStorage.setItem(key, JSON.stringify(item));
  };

  let _clear = () => {
    localStorage.clear();
  };

  return {
    getItem: _getItem,
    setItem: _setItem,
    clear: _clear
  };
})());
