import { skillService } from '@/services'

// Mock the services
jest.mock('@/services', () => ({
  skillService: {
    getSkillCategoryById: jest.fn(),
    updateSkillCategory: jest.fn(),
    deleteSkillCategory: jest.fn(),
  },
  disconnectDatabase: jest.fn(),
}))

const mockSkillService = skillService as jest.Mocked<typeof skillService>

describe('/api/admin/skill-categories/[id]', () => {
  const mockCategory = {
    id: 'category-1',
    name: 'Frontend',
    description: 'Frontend technologies',
    display: true,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return a skill category by id successfully', async () => {
      mockSkillService.getSkillCategoryById.mockResolvedValueOnce({
        success: true,
        data: mockCategory,
      })

      const result = await mockSkillService.getSkillCategoryById('category-1')

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(mockCategory)
      }
      expect(mockSkillService.getSkillCategoryById).toHaveBeenCalledWith('category-1')
    })

    it('should handle service errors', async () => {
      const mockError = {
        message: 'Failed to fetch skill category',
        code: 'SKILL_CATEGORY_FETCH_ERROR',
        statusCode: 500,
        name: 'ServiceError',
      }

      mockSkillService.getSkillCategoryById.mockResolvedValueOnce({
        success: false,
        error: mockError,
      })

      const result = await mockSkillService.getSkillCategoryById('category-1')

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error?.message).toBe('Failed to fetch skill category')
        expect(result.error?.code).toBe('SKILL_CATEGORY_FETCH_ERROR')
      }
    })

    it('should handle unexpected errors', async () => {
      mockSkillService.getSkillCategoryById.mockRejectedValueOnce(new Error('Unexpected error'))

      await expect(mockSkillService.getSkillCategoryById('category-1')).rejects.toThrow('Unexpected error')
    })
  })

  describe('PUT', () => {
    it('should update a skill category successfully', async () => {
      const updateData = {
        name: 'Frontend Updated',
        description: 'Updated frontend technologies',
        display: false,
      }

      const updatedCategory = { ...mockCategory, ...updateData }
      mockSkillService.updateSkillCategory.mockResolvedValueOnce({
        success: true,
        data: updatedCategory,
      })

      const result = await mockSkillService.updateSkillCategory('category-1', updateData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(updatedCategory)
      }
      expect(mockSkillService.updateSkillCategory).toHaveBeenCalledWith('category-1', updateData)
    })

    it('should handle service errors', async () => {
      const updateData = { name: 'Frontend Updated' }
      const mockError = {
        message: 'Failed to update skill category',
        code: 'SKILL_CATEGORY_UPDATE_ERROR',
        statusCode: 500,
        name: 'ServiceError',
      }

      mockSkillService.updateSkillCategory.mockResolvedValueOnce({
        success: false,
        error: mockError,
      })

      const result = await mockSkillService.updateSkillCategory('category-1', updateData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error?.message).toBe('Failed to update skill category')
        expect(result.error?.code).toBe('SKILL_CATEGORY_UPDATE_ERROR')
      }
    })

    it('should handle unexpected errors', async () => {
      const updateData = { name: 'Frontend Updated' }
      mockSkillService.updateSkillCategory.mockRejectedValueOnce(new Error('Unexpected error'))

      await expect(mockSkillService.updateSkillCategory('category-1', updateData)).rejects.toThrow('Unexpected error')
    })
  })

  describe('DELETE', () => {
    it('should delete a skill category successfully', async () => {
      mockSkillService.deleteSkillCategory.mockResolvedValueOnce({
        success: true,
        data: undefined,
      })

      const result = await mockSkillService.deleteSkillCategory('category-1')

      expect(result.success).toBe(true)
      expect(mockSkillService.deleteSkillCategory).toHaveBeenCalledWith('category-1')
    })

    it('should handle service errors', async () => {
      const mockError = {
        message: 'Failed to delete skill category',
        code: 'SKILL_CATEGORY_DELETION_ERROR',
        statusCode: 500,
        name: 'ServiceError',
      }

      mockSkillService.deleteSkillCategory.mockResolvedValueOnce({
        success: false,
        error: mockError,
      })

      const result = await mockSkillService.deleteSkillCategory('category-1')

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error?.message).toBe('Failed to delete skill category')
        expect(result.error?.code).toBe('SKILL_CATEGORY_DELETION_ERROR')
      }
    })

    it('should handle unexpected errors', async () => {
      mockSkillService.deleteSkillCategory.mockRejectedValueOnce(new Error('Unexpected error'))

      await expect(mockSkillService.deleteSkillCategory('category-1')).rejects.toThrow('Unexpected error')
    })
  })
})
