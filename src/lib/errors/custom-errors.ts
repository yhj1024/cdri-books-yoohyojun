// 기본 커스텀 에러 클래스
export class AppError extends Error {
  public readonly isOperational: boolean
  public readonly statusCode: number

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.isOperational = isOperational

    // 스택 트레이스 캡처
    Error.captureStackTrace(this, this.constructor)
  }
}

// 네트워크 에러
export class NetworkError extends AppError {
  constructor(message: string = '네트워크 연결에 실패했습니다') {
    super(message, 0, true)
  }
}

// API 에러
export class ApiError extends AppError {
  public readonly endpoint?: string
  public readonly method?: string

  constructor(message: string, statusCode: number, endpoint?: string, method?: string) {
    super(message, statusCode, true)
    this.endpoint = endpoint
    this.method = method
  }
}

// 유효성 검사 에러
export class ValidationError extends AppError {
  constructor(message: string = '입력값이 유효하지 않습니다') {
    super(message, 400, true)
  }
}

// 서버 에러
export class ServerError extends AppError {
  constructor(message: string = '서버 오류가 발생했습니다', statusCode: number = 500) {
    super(message, statusCode, false)
  }
}

// 에러 타입 가드
export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError
}
