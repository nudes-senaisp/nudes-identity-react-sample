const formatRoutes = (routes, parent) =>
  routes.reduce((prev, curr) => {
    const { key } = curr;

    let currItem = {
      ...curr,
    };

    if (parent) {
      currItem = {
        ...currItem,
        path: `${parent.path}/${key}`,
        parent,
      };
    } else {
      currItem = {
        ...currItem,
        path: `/${key}`,
      };
    }

    if (curr.routes && curr.routes.length >= 1) {
      currItem = {
        ...currItem,
        routes: formatRoutes(curr.routes, currItem),
      };
    }

    return [...prev, currItem];
  }, []);

export default formatRoutes;
