import { flatRoutes } from '.';

const getRoute = (routes, key) =>
  flatRoutes(routes).find((route) => route.key === key);

export default getRoute;
