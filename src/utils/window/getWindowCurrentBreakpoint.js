const getWindowCurrentBreakpoint = (width) => {
  if (width < 576) return 'xs';

  if (width >= 576 && width < 768) return 'sm';

  if (width >= 768 && width < 992) return 'md';

  if (width >= 992 && width < 1200) return 'lg';

  if (width >= 1200 && width < 1600) return 'xl';

  return 'xxl';
};

export default getWindowCurrentBreakpoint;
