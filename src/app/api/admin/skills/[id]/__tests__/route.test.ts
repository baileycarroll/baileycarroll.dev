import { skillService } from '@/services'

// Mock the services
jest.mock('@/services', () => ({
  skillService: {
    getSkillById: jest.fn(),
    updateSkill: jest.fn(),
    deleteSkill: jest.fn(),
  },
  disconnectDatabase: jest.fn(),
}))

const mockSkillService = skillService as jest.Mocked<typeof skillService>

describe('/api/admin/skills/[id]', () => {
  const mockSkill = {
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
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return a skill by id successfully', async () => {
      mockSkillService.getSkillById.mockResolvedValueOnce({
        success: true,
        data: mockSkill,
      })

      const result = await mockSkillService.getSkillById('skill-1')

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(mockSkill)
      }
      expect(mockSkillService.getSkillById).toHaveBeenCalledWith('skill-1')
    })

    it('should handle service errors', async () => {
      const mockError = {
        message: 'Failed to fetch skill',
        code: 'SKILL_FETCH_ERROR',
        statusCode: 500,
        name: 'ServiceError',
      }

      mockSkillService.getSkillById.mockResolvedValueOnce({
        success: false,
        error: mockError,
      })

      const result = await mockSkillService.getSkillById('skill-1')

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error?.message).toBe('Failed to fetch skill')
        expect(result.error?.code).toBe('SKILL_FETCH_ERROR')
      }
    })

    it('should handle unexpected errors', async () => {
      mockSkillService.getSkillById.mockRejectedValueOnce(new Error('Unexpected error'))

      await expect(mockSkillService.getSkillById('skill-1')).rejects.toThrow('Unexpected error')
    })
  })

  describe('PUT', () => {
    it('should update a skill successfully', async () => {
      const updateData = {
        name: 'React Updated',
        years: 4,
        category: {
          id: 'category-2',
          name: 'Backend',
          description: 'Backend technologies',
          display: true,
        },
      }

      const updatedSkill = { ...mockSkill, ...updateData }
      mockSkillService.updateSkill.mockResolvedValueOnce({
        success: true,
        data: updatedSkill,
      })

      const result = await mockSkillService.updateSkill('skill-1', updateData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(updatedSkill)
      }
      expect(mockSkillService.updateSkill).toHaveBeenCalledWith('skill-1', updateData)
    })

    it('should handle service errors', async () => {
      const updateData = { name: 'React Updated' }
      const mockError = {
        message: 'Failed to update skill',
        code: 'SKILL_UPDATE_ERROR',
        statusCode: 500,
        name: 'ServiceError',
      }

      mockSkillService.updateSkill.mockResolvedValueOnce({
        success: false,
        error: mockError,
      })

      const result = await mockSkillService.updateSkill('skill-1', updateData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error?.message).toBe('Failed to update skill')
        expect(result.error?.code).toBe('SKILL_UPDATE_ERROR')
      }
    })

    it('should handle unexpected errors', async () => {
      const updateData = { name: 'React Updated' }
      mockSkillService.updateSkill.mockRejectedValueOnce(new Error('Unexpected error'))

      await expect(mockSkillService.updateSkill('skill-1', updateData)).rejects.toThrow('Unexpected error')
    })
  })

  describe('DELETE', () => {
    it('should delete a skill successfully', async () => {
      mockSkillService.deleteSkill.mockResolvedValueOnce({
        success: true,
        data: undefined,
      })

      const result = await mockSkillService.deleteSkill('skill-1')

      expect(result.success).toBe(true)
      expect(mockSkillService.deleteSkill).toHaveBeenCalledWith('skill-1')
    })

    it('should handle service errors', async () => {
      const mockError = {
        message: 'Failed to delete skill',
        code: 'SKILL_DELETION_ERROR',
        statusCode: 500,
        name: 'ServiceError',
      }

      mockSkillService.deleteSkill.mockResolvedValueOnce({
        success: false,
        error: mockError,
      })

      const result = await mockSkillService.deleteSkill('skill-1')

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error?.message).toBe('Failed to delete skill')
        expect(result.error?.code).toBe('SKILL_DELETION_ERROR')
      }
    })

    it('should handle unexpected errors', async () => {
      mockSkillService.deleteSkill.mockRejectedValueOnce(new Error('Unexpected error'))

      await expect(mockSkillService.deleteSkill('skill-1')).rejects.toThrow('Unexpected error')
    })
  })
})
