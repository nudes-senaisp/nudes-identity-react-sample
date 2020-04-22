const getRoutesArray = (routes) => {
  if (!routes) return [];

  return Object.keys(routes).map((key) => {
    if (routes[key].routes) {
      return {
        ...routes[key],
        routes: getRoutesArray(routes[key].routes),
      };
    }

    return routes[key];
  });
};

export default getRoutesArray;
