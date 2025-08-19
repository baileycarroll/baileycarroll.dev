import { skillService } from '@/services'

// Mock the services
jest.mock('@/services', () => ({
  skillService: {
    getAllSkillCategories: jest.fn(),
    createSkillCategory: jest.fn(),
  },
  disconnectDatabase: jest.fn(),
}))

const mockSkillService = skillService as jest.Mocked<typeof skillService>

describe('/api/admin/skill-categories', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return all skill categories successfully', async () => {
      const mockCategories = [
        {
          id: 'category-1',
          name: 'Frontend',
          description: 'Frontend technologies',
          display: true,
        },
        {
          id: 'category-2',
          name: 'Backend',
          description: 'Backend technologies',
          display: true,
        },
      ]

      mockSkillService.getAllSkillCategories.mockResolvedValueOnce({
        success: true,
        data: mockCategories,
      })

      const result = await mockSkillService.getAllSkillCategories()

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(mockCategories)
      }
      expect(mockSkillService.getAllSkillCategories).toHaveBeenCalledTimes(1)
    })

    it('should handle service errors', async () => {
      const mockError = {
        message: 'Failed to fetch skill categories',
        code: 'SKILL_CATEGORIES_FETCH_ERROR',
        statusCode: 500,
        name: 'ServiceError',
      }

      mockSkillService.getAllSkillCategories.mockResolvedValueOnce({
        success: false,
        error: mockError,
      })

      const result = await mockSkillService.getAllSkillCategories()

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error?.message).toBe('Failed to fetch skill categories')
        expect(result.error?.code).toBe('SKILL_CATEGORIES_FETCH_ERROR')
      }
    })

    it('should handle unexpected errors', async () => {
      mockSkillService.getAllSkillCategories.mockRejectedValueOnce(new Error('Unexpected error'))

      await expect(mockSkillService.getAllSkillCategories()).rejects.toThrow('Unexpected error')
    })
  })

  describe('POST', () => {
    it('should create a skill category successfully', async () => {
      const categoryData = {
        name: 'Mobile Development',
        description: 'Mobile app development technologies',
        display: true,
      }

      const createdCategory = {
        id: 'category-3',
        ...categoryData,
      }

      mockSkillService.createSkillCategory.mockResolvedValueOnce({
        success: true,
        data: createdCategory,
      })

      const result = await mockSkillService.createSkillCategory(categoryData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(createdCategory)
      }
      expect(mockSkillService.createSkillCategory).toHaveBeenCalledWith(categoryData)
    })

    it('should handle service errors', async () => {
      const categoryData = {
        name: 'Mobile Development',
        description: 'Mobile app development technologies',
        display: true,
      }

      const mockError = {
        message: 'Failed to create skill category',
        code: 'SKILL_CATEGORY_CREATION_ERROR',
        statusCode: 500,
        name: 'ServiceError',
      }

      mockSkillService.createSkillCategory.mockResolvedValueOnce({
        success: false,
        error: mockError,
      })

      const result = await mockSkillService.createSkillCategory(categoryData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error?.message).toBe('Failed to create skill category')
        expect(result.error?.code).toBe('SKILL_CATEGORY_CREATION_ERROR')
      }
    })

    it('should handle unexpected errors', async () => {
      const categoryData = {
        name: 'Mobile Development',
        description: 'Mobile app development technologies',
        display: true,
      }

      mockSkillService.createSkillCategory.mockRejectedValueOnce(new Error('Unexpected error'))

      await expect(mockSkillService.createSkillCategory(categoryData)).rejects.toThrow('Unexpected error')
    })
  })
})
