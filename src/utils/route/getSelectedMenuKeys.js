import getMenuMatchKeys from './getMenuMatchKeys';
import urlToList from './urlToList';

const getSelectedMenuKeys = (menuKeys, pathname) =>
  getMenuMatchKeys(menuKeys, urlToList(pathname));

export default getSelectedMenuKeys;
