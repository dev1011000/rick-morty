import { Component, type ErrorInfo, type ReactNode } from 'react';

import './error-boundary.scss';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className='error-boundary'>
          Something went wrong. Please reload the page.
        </div>
      );
    }
    return this.props.children;
  }
}
