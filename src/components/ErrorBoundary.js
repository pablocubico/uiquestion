import { Component } from "react";
import '../styles/Errors.css';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // TODO: log somewhere
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.errorInfo) {
      return <div className="errorMessage">Something went wrong.</div>;
    }
    return this.props.children;
  }
}
