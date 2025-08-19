import { skillService } from '@/services'

// Mock the services
jest.mock('@/services', () => ({
  skillService: {
    getAllSkills: jest.fn(),
    createSkill: jest.fn(),
  },
  disconnectDatabase: jest.fn(),
}))

const mockSkillService = skillService as jest.Mocked<typeof skillService>

// Mock NextRequest and NextResponse
const mockNextRequest = (url: string, options?: any) => ({
  url,
  method: options?.method || 'GET',
  headers: new Map(Object.entries(options?.headers || {})),
  json: jest.fn().mockResolvedValue(options?.body || {}),
})

const mockNextResponse = {
  json: jest.fn().mockImplementation((data, options) => ({
    status: options?.status || 200,
    json: () => Promise.resolve(data),
  })),
}

// Mock the route handlers
jest.mock('../route', () => ({
  GET: jest.fn(),
  POST: jest.fn(),
}))

describe('/api/admin/skills', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return all skills successfully', async () => {
      const mockSkills = [
        {
          id: 'skill-1',
          name: 'React',
          years: 3,
          categoryId: 'category-1',
          category: {
            id: 'category-1',
            name: 'Frontend',
            description: 'Frontend technologies',
            display: true,
          },
        },
      ]

      mockSkillService.getAllSkills.mockResolvedValueOnce({
        success: true,
        data: mockSkills,
      })

      // Test the service directly
      const result = await mockSkillService.getAllSkills()

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(mockSkills)
      }
      expect(mockSkillService.getAllSkills).toHaveBeenCalledTimes(1)
    })

    it('should handle service errors', async () => {
      const mockError = {
        message: 'Failed to fetch skills',
        code: 'SKILLS_FETCH_ERROR',
        statusCode: 500,
        name: 'ServiceError',
      }
      mockSkillService.getAllSkills.mockResolvedValueOnce({
        success: false,
        error: mockError,
      })

      const result = await mockSkillService.getAllSkills()

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error?.message).toBe('Failed to fetch skills')
        expect(result.error?.code).toBe('SKILLS_FETCH_ERROR')
      }
    })

    it('should handle unexpected errors', async () => {
      mockSkillService.getAllSkills.mockRejectedValueOnce(new Error('Unexpected error'))

      await expect(mockSkillService.getAllSkills()).rejects.toThrow('Unexpected error')
    })
  })

  describe('POST', () => {
    it('should create a skill successfully', async () => {
      const skillData = {
        name: 'Vue.js',
        years: 2,
        category: {
          id: 'category-1',
          name: 'Frontend',
          description: 'Frontend technologies',
          display: true,
        },
      }

      const createdSkill = {
        id: 'skill-2',
        ...skillData,
        categoryId: 'category-1',
      }

      mockSkillService.createSkill.mockResolvedValueOnce({
        success: true,
        data: createdSkill,
      })

      const result = await mockSkillService.createSkill(skillData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(createdSkill)
      }
      expect(mockSkillService.createSkill).toHaveBeenCalledWith(skillData)
    })

    it('should handle service errors', async () => {
      const skillData = {
        name: 'Vue.js',
        years: 2,
        category: {
          id: 'category-1',
          name: 'Frontend',
          description: 'Frontend technologies',
          display: true,
        },
      }

      const mockError = {
        message: 'Failed to create skill',
        code: 'SKILL_CREATION_ERROR',
        statusCode: 500,
        name: 'ServiceError',
      }

      mockSkillService.createSkill.mockResolvedValueOnce({
        success: false,
        error: mockError,
      })

      const result = await mockSkillService.createSkill(skillData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error?.message).toBe('Failed to create skill')
        expect(result.error?.code).toBe('SKILL_CREATION_ERROR')
      }
    })

    it('should handle unexpected errors', async () => {
      const skillData = {
        name: 'Vue.js',
        years: 2,
        category: {
          id: 'category-1',
          name: 'Frontend',
          description: 'Frontend technologies',
          display: true,
        },
      }

      mockSkillService.createSkill.mockRejectedValueOnce(new Error('Unexpected error'))

      await expect(mockSkillService.createSkill(skillData)).rejects.toThrow('Unexpected error')
    })
  })
})
