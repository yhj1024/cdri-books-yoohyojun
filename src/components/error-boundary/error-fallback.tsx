import type { ErrorInfo } from 'react'
import { Button } from '@/components/button'

export interface ErrorFallbackProps {
  error: Error
  errorInfo: ErrorInfo | null
  resetErrorBoundary: () => void
  errorCount: number
  level: 'page' | 'section' | 'component'
}

export const ErrorFallback = ({ error, resetErrorBoundary, level }: ErrorFallbackProps) => {
  // 에러 메시지 설정
  const getErrorMessage = () => {
    // 네트워크 에러
    if (error.message.includes('Network') || error.message.includes('fetch')) {
      return {
        title: '네트워크 연결 오류',
        description: '인터넷 연결을 확인해주세요.',
        icon: '🌐',
      }
    }

    // API 에러
    if (error.message.includes('API') || error.message.includes('404')) {
      return {
        title: '데이터를 불러올 수 없습니다',
        description: '잠시 후 다시 시도해주세요.',
        icon: '📡',
      }
    }

    // 기본 에러
    return {
      title: '문제가 발생했습니다',
      description: '페이지를 새로고침하거나 잠시 후 다시 시도해주세요.',
      icon: '⚠️',
    }
  }

  const { title, description, icon } = getErrorMessage()

  // 레벨별 다른 스타일 적용
  const containerClass = {
    page: 'min-h-screen',
    section: 'min-h-[400px]',
    component: 'min-h-[200px]',
  }[level]

  return (
    <div
      className={`flex flex-col items-center justify-center ${containerClass} p-8`}
      role="alert"
      aria-live="assertive"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">{description}</p>

      <div className="flex gap-4">
        <Button variant="primary" onClick={resetErrorBoundary} aria-label="다시 시도">
          다시 시도
        </Button>
        <Button
          variant="outline"
          onClick={() => (window.location.href = '/')}
          aria-label="홈으로 이동"
        >
          홈으로 이동
        </Button>
      </div>
    </div>
  )
}
