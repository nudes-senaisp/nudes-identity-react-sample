function defaultRequestInitialStateFactory(data = {}) {
  return {
    isLoading: false,
    error: null,
    data,
  };
}

export default defaultRequestInitialStateFactory;
