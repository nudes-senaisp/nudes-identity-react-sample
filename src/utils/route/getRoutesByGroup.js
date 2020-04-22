import { flatRoutes } from '.';

const getRoutesByGroup = (routes, groupKey) =>
  flatRoutes(routes).filter((route) => route.groupKey === groupKey);

export default getRoutesByGroup;
