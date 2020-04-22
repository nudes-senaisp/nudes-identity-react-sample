import pathToRegexp from 'path-to-regexp';

const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, currentPath) =>
      matchKeys.concat(
        flatMenuKeys.filter((item) => pathToRegexp(item).test(currentPath)),
      ),
    [],
  );

export default getMenuMatchKeys;
