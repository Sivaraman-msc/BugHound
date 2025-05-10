class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        return <h2>Something went wrong. Try refreshing the page.</h2>;
      }
      return this.props.children;
    }
  }
  
  <ErrorBoundary>
    <Login />
  </ErrorBoundary>