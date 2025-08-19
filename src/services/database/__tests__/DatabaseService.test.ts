import { DatabaseService } from '../DatabaseService'
import { PrismaClient } from '../../../../generated/prisma/client'


// Mock PrismaClient
jest.mock('../../../../generated/prisma/client')

// Create a concrete implementation of DatabaseService for testing
class TestDatabaseService extends DatabaseService {
  constructor(prisma: PrismaClient) {
    super(prisma)
  }

  // Expose protected methods for testing
  public testGetCacheKey(operation: string, params: Record<string, unknown>): string {
    return this.getCacheKey(operation, params)
  }

  public testGetFromCache<T>(key: string): T | null {
    return this.getFromCache<T>(key)
  }

  public testSetCache<T>(key: string, data: T, ttl?: number): void {
    return this.setCache(key, data, ttl)
  }

  public testInvalidateCache(pattern: string): void {
    return this.invalidateCache(pattern)
  }
}

describe('DatabaseService', () => {
  let service: TestDatabaseService
  let mockPrisma: jest.Mocked<PrismaClient>

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()

    // Create mock Prisma client
    mockPrisma = {
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      $queryRaw: jest.fn(),
    } as any

    service = new TestDatabaseService(mockPrisma)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  describe('Connection Management', () => {
    describe('connect', () => {
      it('should successfully connect to database', async () => {
        mockPrisma.$connect.mockResolvedValueOnce(undefined)

        const result = await service.connect()

        expect(result.success).toBe(true)
        expect(mockPrisma.$connect).toHaveBeenCalledTimes(1)
      })

      it('should handle connection errors', async () => {
        const error = new Error('Connection failed')
        mockPrisma.$connect.mockRejectedValueOnce(error)

        const result = await service.connect()

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to establish database connection')
        expect(result.error?.code).toBe('DB_CONNECTION_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })

    describe('disconnect', () => {
      it('should successfully disconnect from database', async () => {
        mockPrisma.$disconnect.mockResolvedValueOnce(undefined)

        const result = await service.disconnect()

        expect(result.success).toBe(true)
        expect(mockPrisma.$disconnect).toHaveBeenCalledTimes(1)
      })

      it('should handle disconnection errors', async () => {
        const error = new Error('Disconnection failed')
        mockPrisma.$disconnect.mockRejectedValueOnce(error)

        const result = await service.disconnect()

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to close database connection')
        expect(result.error?.code).toBe('DB_DISCONNECTION_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })

    describe('healthCheck', () => {
      it('should return true for healthy database', async () => {
        mockPrisma.$queryRaw.mockResolvedValueOnce([{ '1': 1 }])

        const result = await service.healthCheck()

        expect(result.success).toBe(true)
        expect(result.data).toBe(true)
        expect(mockPrisma.$queryRaw).toHaveBeenCalledWith(['SELECT 1'])
      })

      it('should handle health check errors', async () => {
        const error = new Error('Database unavailable')
        mockPrisma.$queryRaw.mockRejectedValueOnce(error)

        const result = await service.healthCheck()

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Database health check failed')
        expect(result.error?.code).toBe('DB_HEALTH_CHECK_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })
  })

  describe('Cache Management', () => {
    describe('getCacheKey', () => {
      it('should generate consistent cache keys', () => {
        const key1 = service.testGetCacheKey('testOperation', { id: '123', name: 'test' })
        const key2 = service.testGetCacheKey('testOperation', { id: '123', name: 'test' })

        expect(key1).toBe(key2)
        expect(key1).toContain('testOperation')
        expect(key1).toContain('123')
        expect(key1).toContain('test')
      })

      it('should handle different parameters', () => {
        const key1 = service.testGetCacheKey('testOperation', { id: '123' })
        const key2 = service.testGetCacheKey('testOperation', { id: '456' })

        expect(key1).not.toBe(key2)
      })
    })

    describe('setCache and getFromCache', () => {
      it('should store and retrieve cached data', () => {
        const testData = { id: '123', name: 'test' }
        const cacheKey = service.testGetCacheKey('testOperation', { id: '123' })

        service.testSetCache(cacheKey, testData)
        const retrieved = service.testGetFromCache<typeof testData>(cacheKey)

        expect(retrieved).toEqual(testData)
      })

      it('should return null for non-existent cache entries', () => {
        const retrieved = service.testGetFromCache('non-existent-key')
        expect(retrieved).toBeNull()
      })

      it('should respect TTL and expire cached data', () => {
        jest.useFakeTimers()
        const testData = { id: '123', name: 'test' }
        const cacheKey = service.testGetCacheKey('testOperation', { id: '123' })

        // Set cache with 1 second TTL
        service.testSetCache(cacheKey, testData, 1000)

        // Advance time by 1.1 seconds
        jest.advanceTimersByTime(1100)

        const retrieved = service.testGetFromCache<typeof testData>(cacheKey)
        expect(retrieved).toBeNull()

        jest.useRealTimers()
      })

      it('should use default TTL when not specified', () => {
        jest.useFakeTimers()
        const testData = { id: '123', name: 'test' }
        const cacheKey = service.testGetCacheKey('testOperation', { id: '123' })

        service.testSetCache(cacheKey, testData)

        // Advance time by default TTL (5 minutes) + 1 second
        jest.advanceTimersByTime(5 * 60 * 1000 + 1000)

        const retrieved = service.testGetFromCache<typeof testData>(cacheKey)
        expect(retrieved).toBeNull()

        jest.useRealTimers()
      })
    })

    describe('invalidateCache', () => {
      it('should remove cache entries matching pattern', () => {
        const testData1 = { id: '123', name: 'test1' }
        const testData2 = { id: '456', name: 'test2' }
        const testData3 = { id: '789', name: 'other' }

        const key1 = service.testGetCacheKey('getAllSkills', {})
        const key2 = service.testGetCacheKey('getSkillById', { id: '123' })
        const key3 = service.testGetCacheKey('getAllProjects', {})

        service.testSetCache(key1, testData1)
        service.testSetCache(key2, testData2)
        service.testSetCache(key3, testData3)

        // Invalidate only getAllSkills cache
        service.testInvalidateCache('getAllSkills')

        expect(service.testGetFromCache(key1)).toBeNull()
        expect(service.testGetFromCache(key2)).toEqual(testData2) // Should still exist
        expect(service.testGetFromCache(key3)).toEqual(testData3) // Should still exist
      })

      it('should handle partial pattern matches', () => {
        const testData = { id: '123', name: 'test' }
        const key = service.testGetCacheKey('getSkillById', { id: '123' })

        service.testSetCache(key, testData)
        service.testInvalidateCache('getSkill')

        expect(service.testGetFromCache(key)).toBeNull()
      })
    })
  })

  describe('Utility Methods', () => {
    describe('failure', () => {
      it('should create failure result with correct structure', () => {
        const error = new Error('Test error')
        const result = service['failure']('Test message', 'TEST_ERROR', 400, error)

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Test message')
        expect(result.error?.code).toBe('TEST_ERROR')
        expect(result.error?.statusCode).toBe(400)
        expect(result.error?.originalError).toBe(error)
      })

      it('should create failure result without original error', () => {
        const result = service['failure']('Test message', 'TEST_ERROR', 500)

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Test message')
        expect(result.error?.code).toBe('TEST_ERROR')
        expect(result.error?.statusCode).toBe(500)
        expect(result.error?.originalError).toBeUndefined()
      })
    })

    describe('log', () => {
      it('should log in development environment', () => {
        const originalEnv = process.env.NODE_ENV
        process.env.NODE_ENV = 'development'
        
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
        
        service['log']('testMethod', 'Test message', { data: 'test' })
        
        expect(consoleSpy).toHaveBeenCalledWith(
          '[TestDatabaseService.testMethod] Test message',
          { data: 'test' }
        )
        
        consoleSpy.mockRestore()
        process.env.NODE_ENV = originalEnv
      })

      it('should not log in production environment', () => {
        const originalEnv = process.env.NODE_ENV
        process.env.NODE_ENV = 'production'
        
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
        
        service['log']('testMethod', 'Test message')
        
        expect(consoleSpy).not.toHaveBeenCalled()
        
        consoleSpy.mockRestore()
        process.env.NODE_ENV = originalEnv
      })
    })
  })

  describe('Cache Cleanup', () => {
    it('should automatically clean up expired cache entries', () => {
      jest.useFakeTimers()
      
      const testData = { id: '123', name: 'test' }
      const cacheKey = service.testGetCacheKey('testOperation', { id: '123' })

      // Set cache with short TTL
      service.testSetCache(cacheKey, testData, 1000)

      // Advance time to trigger cleanup (10 minutes)
      jest.advanceTimersByTime(10 * 60 * 1000)

      // Cache should be cleaned up
      const retrieved = service.testGetFromCache<typeof testData>(cacheKey)
      expect(retrieved).toBeNull()

      jest.useRealTimers()
    })
  })
})
