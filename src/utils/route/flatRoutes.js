const flatRoutes = (routes) =>
  routes.reduce((prev, curr) => {
    if (curr.routes && curr.routes.length >= 1) {
      return [...prev, curr, ...flatRoutes(curr.routes)];
    }
    return [...prev, curr];
  }, []);

export default flatRoutes;
