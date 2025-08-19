import { ServiceResult, ServiceError } from '../types'

describe('Service Types', () => {
  describe('ServiceResult', () => {
    it('should allow success result with data', () => {
      const successResult: ServiceResult<string> = {
        success: true,
        data: 'test data',
      }

      expect(successResult.success).toBe(true)
      expect(successResult.data).toBe('test data')
      expect(successResult.error).toBeUndefined()
    })

    it('should allow failure result with error', () => {
      const error = new ServiceError('Test error', 'TEST_ERROR', 500)
      const failureResult: ServiceResult<string> = {
        success: false,
        error,
      }

      expect(failureResult.success).toBe(false)
      expect(failureResult.error).toBe(error)
      expect(failureResult.data).toBeUndefined()
    })

    it('should work with complex data types', () => {
      interface ComplexData {
        id: string
        name: string
        items: string[]
      }

      const complexData: ComplexData = {
        id: '123',
        name: 'Test',
        items: ['item1', 'item2'],
      }

      const successResult: ServiceResult<ComplexData> = {
        success: true,
        data: complexData,
      }

      expect(successResult.success).toBe(true)
      expect(successResult.data).toEqual(complexData)
    })
  })

  describe('ServiceError', () => {
    it('should create ServiceError with all properties', () => {
      const originalError = new Error('Original error')
      const serviceError = new ServiceError(
        'Service error message',
        'SERVICE_ERROR',
        500,
        originalError
      )

      expect(serviceError.message).toBe('Service error message')
      expect(serviceError.code).toBe('SERVICE_ERROR')
      expect(serviceError.statusCode).toBe(500)
      expect(serviceError.originalError).toBe(originalError)
    })

    it('should create ServiceError without original error', () => {
      const serviceError = new ServiceError(
        'Service error message',
        'SERVICE_ERROR',
        400
      )

      expect(serviceError.message).toBe('Service error message')
      expect(serviceError.code).toBe('SERVICE_ERROR')
      expect(serviceError.statusCode).toBe(400)
      expect(serviceError.originalError).toBeUndefined()
    })

    it('should inherit from Error', () => {
      const serviceError = new ServiceError(
        'Test error',
        'TEST_ERROR',
        500
      )

      expect(serviceError instanceof Error).toBe(true)
      expect(serviceError.name).toBe('ServiceError')
    })

    it('should have stack trace', () => {
      const serviceError = new ServiceError(
        'Test error',
        'TEST_ERROR',
        500
      )

      expect(serviceError.stack).toBeDefined()
      expect(typeof serviceError.stack).toBe('string')
    })
  })

  describe('Type Compatibility', () => {
    it('should be compatible with async functions', async () => {
      const asyncFunction = async (): Promise<ServiceResult<string>> => {
        return {
          success: true,
          data: 'async result',
        }
      }

      const result = await asyncFunction()
      expect(result.success).toBe(true)
      expect(result.data).toBe('async result')
    })

    it('should handle error cases in async functions', async () => {
      const asyncFunction = async (): Promise<ServiceResult<string>> => {
        return {
          success: false,
          error: new ServiceError('Async error', 'ASYNC_ERROR', 500),
        }
      }

      const result = await asyncFunction()
      expect(result.success).toBe(false)
      expect(result.error?.message).toBe('Async error')
      expect(result.error?.code).toBe('ASYNC_ERROR')
    })
  })

  describe('Error Handling Patterns', () => {
    it('should support try-catch patterns', () => {
      const createError = (): ServiceResult<string> => {
        try {
          throw new Error('Something went wrong')
        } catch (error) {
          return {
            success: false,
            error: new ServiceError(
              'Failed to process request',
              'PROCESSING_ERROR',
              500,
              error instanceof Error ? error : new Error('Unknown error')
            ),
          }
        }
      }

      const result = createError()
      expect(result.success).toBe(false)
      expect(result.error?.message).toBe('Failed to process request')
      expect(result.error?.code).toBe('PROCESSING_ERROR')
      expect(result.error?.originalError).toBeDefined()
    })

    it('should support conditional success/failure', () => {
      const processData = (data: string | null): ServiceResult<string> => {
        if (!data) {
          return {
            success: false,
            error: new ServiceError('Data is required', 'VALIDATION_ERROR', 400),
          }
        }

        return {
          success: true,
          data: data.toUpperCase(),
        }
      }

      const successResult = processData('test')
      expect(successResult.success).toBe(true)
      expect(successResult.data).toBe('TEST')

      const failureResult = processData(null)
      expect(failureResult.success).toBe(false)
      expect(failureResult.error?.message).toBe('Data is required')
      expect(failureResult.error?.code).toBe('VALIDATION_ERROR')
      expect(failureResult.error?.statusCode).toBe(400)
    })
  })
})
