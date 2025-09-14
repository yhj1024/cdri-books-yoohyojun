import { useState, useRef, useEffect } from 'react'

interface ImageProps {
  src?: string
  alt: string
  width: string
  height: string
  className?: string
  fallbackText?: string
}

export const Image = ({
  src,
  alt,
  width,
  height,
  className = '',
  fallbackText = '이미지 없음',
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  const containerClass = `relative overflow-hidden bg-[#F5F5F5] ${className}`

  return (
    <div ref={imgRef} className={containerClass} style={{ width, height }}>
      {!isInView && (
        // Skeleton
        <div className="w-full h-full bg-[#F5F5F5] animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 bg-[#E0E0E0] rounded animate-pulse" />
        </div>
      )}

      {isInView && (!src || hasError) && (
        // Fallback
        <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center">
          <span className="text-[#8D94A0] text-[12px] text-center leading-tight px-2">
            {fallbackText}
          </span>
        </div>
      )}

      {isInView && src && !hasError && (
        <>
          {!isLoaded && (
            // Loading skeleton while image loads
            <div className="absolute inset-0 bg-[#F5F5F5] animate-pulse flex items-center justify-center">
              <div className="w-6 h-6 bg-[#E0E0E0] rounded animate-pulse" />
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
          />
        </>
      )}
    </div>
  )
}
