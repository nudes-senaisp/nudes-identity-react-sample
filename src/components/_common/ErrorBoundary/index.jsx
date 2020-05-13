import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    console.log(error, info);
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <h1>Algo deu errado.</h1>;
    }

    return this.props.children; // eslint-disable-line
  }
}

export default ErrorBoundary;
