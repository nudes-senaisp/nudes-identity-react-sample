const getBreadcrumb = (route, breadcrumb = []) => {
  let result = breadcrumb;

  if (route.parent) {
    result = [...getBreadcrumb(route.parent, breadcrumb)];
  }

  return [
    ...result,
    {
      path: route.path,
      breadcrumbName: route.path === '/app' ? 'Início' : route.name,
    },
  ];
};

const getRouteBreadcrumb = (route) => getBreadcrumb(route);

export default getRouteBreadcrumb;
