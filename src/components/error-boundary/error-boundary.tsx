import { Component, type ReactNode, type ErrorInfo } from 'react'
import { ErrorFallback } from './error-fallback'
import type { ErrorFallbackProps } from './error-fallback'

interface Props {
  children: ReactNode
  fallback?: (props: ErrorFallbackProps) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  level?: 'page' | 'section' | 'component'
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로깅
    console.error('ErrorBoundary caught:', error, errorInfo)

    this.setState({ errorInfo })

    // 외부 에러 핸들러 호출
    this.props.onError?.(error, errorInfo)
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    const { hasError, error, errorInfo } = this.state
    const { children, fallback, level = 'component' } = this.props

    if (hasError && error) {
      const errorProps: ErrorFallbackProps = {
        error,
        errorInfo,
        resetErrorBoundary: this.resetErrorBoundary,
        errorCount: 0,
        level,
      }

      // 커스텀 fallback이 있으면 사용, 없으면 기본 ErrorFallback 사용
      return fallback ? <>{fallback(errorProps)}</> : <ErrorFallback {...errorProps} />
    }

    return children
  }
}
