import { Component, ErrorInfo, ReactNode } from 'react';

import { Button } from '@/components/ui';

import classes from './error.boundary.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error Boundary caught:', error, errorInfo);
  }

  handleRefresh = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={classes.root}>
          <h2>Something went wrong!</h2>
          <Button onClick={this.handleRefresh}>Try Again</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
