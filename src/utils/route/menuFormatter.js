import { isEmpty } from 'lodash';

const getMenuData = (appRoutes) =>
  appRoutes
    .map((route) => {
      if (!isEmpty(route.menu)) {
        const {
          path,
          claims,
          routes,
          name,
          menu: { icon },
        } = route;

        return {
          name,
          claims,
          icon,
          routes,
          path: path.substring(1),
        };
      }
      return null;
    })
    .filter((data) => data !== null);

const formatMenu = (data, parentPath = '/', parentClaims) =>
  data.map((item) => {
    const path = parentPath + item.path;

    const result = {
      ...item,
      path,
      claims: item.claims || parentClaims,
    };

    if (item.routes) {
      const innerMenu = getMenuData(item.routes);

      result.routes = formatMenu(innerMenu, `/`, item.claims);
    }

    return result;
  });

const menuFormatter = (routes) => formatMenu(getMenuData(routes));

export default menuFormatter;
