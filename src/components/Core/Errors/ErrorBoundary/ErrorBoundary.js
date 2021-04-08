import { Component } from 'react';
import CodeError from '../CodeError';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <CodeError />;
        }

        return this.props.children;
    };
}

export default ErrorBoundary;