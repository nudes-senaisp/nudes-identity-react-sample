import flatRoutes from './flatRoutes';

const getRoutesByGroup = (routes, groupKey) =>
  flatRoutes(routes).filter((route) => route.groupKey === groupKey);

export default getRoutesByGroup;
