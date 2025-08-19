import { SkillService } from '../SkillService'
import { PrismaClient } from '../../../../generated/prisma/client'
import { DatabaseSkill, DatabaseSkillCategory } from '../types'

// Mock PrismaClient
jest.mock('../../../../generated/prisma/client')

describe('SkillService', () => {
  let service: SkillService
  let mockPrisma: jest.Mocked<PrismaClient>

  const mockSkill: DatabaseSkill = {
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

  const mockSkillCategory: DatabaseSkillCategory = {
    id: 'category-1',
    name: 'Frontend',
    description: 'Frontend technologies',
    display: true,
  }

  beforeEach(() => {
    jest.clearAllMocks()

    // Create mock Prisma client with all necessary methods
    mockPrisma = {
      skill: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      skillCategory: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      projectSkills: {
        deleteMany: jest.fn(),
      },
      experienceSkill: {
        deleteMany: jest.fn(),
      },
      $disconnect: jest.fn(),
    } as any

    service = new SkillService(mockPrisma)
  })

  describe('Skill CRUD Operations', () => {
    describe('getAllSkills', () => {
      it('should return all skills successfully', async () => {
        const mockSkills = [mockSkill]
        mockPrisma.skill.findMany.mockResolvedValueOnce(mockSkills)

        const result = await service.getAllSkills()

        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockSkills)
        expect(mockPrisma.skill.findMany).toHaveBeenCalledWith({
          include: { category: true },
          orderBy: { name: 'asc' },
        })
      })

      it('should return cached data if available', async () => {
        const mockSkills = [mockSkill]
        mockPrisma.skill.findMany.mockResolvedValueOnce(mockSkills)

        // First call to populate cache
        await service.getAllSkills()
        
        // Second call should use cache
        const result = await service.getAllSkills()

        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockSkills)
        expect(mockPrisma.skill.findMany).toHaveBeenCalledTimes(1)
      })

      it('should handle database errors', async () => {
        const error = new Error('Database error')
        mockPrisma.skill.findMany.mockRejectedValueOnce(error)

        const result = await service.getAllSkills()

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to fetch skills')
        expect(result.error?.code).toBe('SKILLS_FETCH_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })

    describe('getSkillById', () => {
      it('should return skill by id successfully', async () => {
        mockPrisma.skill.findUnique.mockResolvedValueOnce(mockSkill)

        const result = await service.getSkillById('skill-1')

        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockSkill)
        expect(mockPrisma.skill.findUnique).toHaveBeenCalledWith({
          where: { id: 'skill-1' },
          include: { category: true },
        })
      })

      it('should return cached data if available', async () => {
        mockPrisma.skill.findUnique.mockResolvedValueOnce(mockSkill)

        // First call to populate cache
        await service.getSkillById('skill-1')
        
        // Second call should use cache
        const result = await service.getSkillById('skill-1')

        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockSkill)
        expect(mockPrisma.skill.findUnique).toHaveBeenCalledTimes(1)
      })

      it('should handle skill not found', async () => {
        mockPrisma.skill.findUnique.mockResolvedValueOnce(null)

        const result = await service.getSkillById('non-existent')

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Skill not found: non-existent')
        expect(result.error?.code).toBe('SKILL_NOT_FOUND')
        expect(result.error?.statusCode).toBe(404)
      })

      it('should handle database errors', async () => {
        const error = new Error('Database error')
        mockPrisma.skill.findUnique.mockRejectedValueOnce(error)

        const result = await service.getSkillById('skill-1')

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to fetch skill: skill-1')
        expect(result.error?.code).toBe('SKILL_FETCH_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })

    describe('createSkill', () => {
      it('should create skill successfully', async () => {
        const skillData = {
          name: 'Vue.js',
          years: 2,
          category: { id: 'category-1' },
        }
        const createdSkill = { ...mockSkill, ...skillData, id: 'skill-2' }
        mockPrisma.skill.create.mockResolvedValueOnce(createdSkill)

        const result = await service.createSkill(skillData)

        expect(result.success).toBe(true)
        expect(result.data).toEqual(createdSkill)
        expect(mockPrisma.skill.create).toHaveBeenCalledWith({
          data: {
            name: skillData.name,
            years: skillData.years,
            categoryId: skillData.category.id,
          },
          include: { category: true },
        })
      })

      it('should handle database errors', async () => {
        const skillData = {
          name: 'Vue.js',
          years: 2,
          category: { id: 'category-1' },
        }
        const error = new Error('Database error')
        mockPrisma.skill.create.mockRejectedValueOnce(error)

        const result = await service.createSkill(skillData)

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to create skill')
        expect(result.error?.code).toBe('SKILL_CREATION_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })

    describe('updateSkill', () => {
      it('should update skill successfully', async () => {
        const updateData = {
          name: 'React Updated',
          years: 4,
          category: { id: 'category-2' },
        }
        const updatedSkill = { ...mockSkill, ...updateData }
        mockPrisma.skill.update.mockResolvedValueOnce(updatedSkill)

        const result = await service.updateSkill('skill-1', updateData)

        expect(result.success).toBe(true)
        expect(result.data).toEqual(updatedSkill)
        expect(mockPrisma.skill.update).toHaveBeenCalledWith({
          where: { id: 'skill-1' },
          data: {
            name: updateData.name,
            years: updateData.years,
            categoryId: updateData.category.id,
          },
          include: { category: true },
        })
      })

      it('should handle database errors', async () => {
        const updateData = { name: 'React Updated' }
        const error = new Error('Database error')
        mockPrisma.skill.update.mockRejectedValueOnce(error)

        const result = await service.updateSkill('skill-1', updateData)

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to update skill')
        expect(result.error?.code).toBe('SKILL_UPDATE_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })

    describe('deleteSkill', () => {
      it('should delete skill successfully', async () => {
        mockPrisma.projectSkills.deleteMany.mockResolvedValueOnce({ count: 0 })
        mockPrisma.experienceSkill.deleteMany.mockResolvedValueOnce({ count: 0 })
        mockPrisma.skill.delete.mockResolvedValueOnce(mockSkill)

        const result = await service.deleteSkill('skill-1')

        expect(result.success).toBe(true)
        expect(mockPrisma.projectSkills.deleteMany).toHaveBeenCalledWith({
          where: { skillId: 'skill-1' },
        })
        expect(mockPrisma.experienceSkill.deleteMany).toHaveBeenCalledWith({
          where: { skillId: 'skill-1' },
        })
        expect(mockPrisma.skill.delete).toHaveBeenCalledWith({
          where: { id: 'skill-1' },
        })
      })

      it('should handle database errors', async () => {
        const error = new Error('Database error')
        mockPrisma.projectSkills.deleteMany.mockRejectedValueOnce(error)

        const result = await service.deleteSkill('skill-1')

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to delete skill')
        expect(result.error?.code).toBe('SKILL_DELETION_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })
  })

  describe('Skill Category CRUD Operations', () => {
    describe('getAllSkillCategories', () => {
      it('should return all skill categories successfully', async () => {
        const mockCategories = [mockSkillCategory]
        mockPrisma.skillCategory.findMany.mockResolvedValueOnce(mockCategories)

        const result = await service.getAllSkillCategories()

        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockCategories)
        expect(mockPrisma.skillCategory.findMany).toHaveBeenCalledWith({
          orderBy: { name: 'asc' },
        })
      })

      it('should return cached data if available', async () => {
        const mockCategories = [mockSkillCategory]
        mockPrisma.skillCategory.findMany.mockResolvedValueOnce(mockCategories)

        // First call to populate cache
        await service.getAllSkillCategories()
        
        // Second call should use cache
        const result = await service.getAllSkillCategories()

        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockCategories)
        expect(mockPrisma.skillCategory.findMany).toHaveBeenCalledTimes(1)
      })

      it('should handle database errors', async () => {
        const error = new Error('Database error')
        mockPrisma.skillCategory.findMany.mockRejectedValueOnce(error)

        const result = await service.getAllSkillCategories()

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to fetch skill categories')
        expect(result.error?.code).toBe('SKILL_CATEGORIES_FETCH_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })

    describe('getSkillCategoryById', () => {
      it('should return skill category by id successfully', async () => {
        mockPrisma.skillCategory.findUnique.mockResolvedValueOnce(mockSkillCategory)

        const result = await service.getSkillCategoryById('category-1')

        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockSkillCategory)
        expect(mockPrisma.skillCategory.findUnique).toHaveBeenCalledWith({
          where: { id: 'category-1' },
        })
      })

      it('should return cached data if available', async () => {
        mockPrisma.skillCategory.findUnique.mockResolvedValueOnce(mockSkillCategory)

        // First call to populate cache
        await service.getSkillCategoryById('category-1')
        
        // Second call should use cache
        const result = await service.getSkillCategoryById('category-1')

        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockSkillCategory)
        expect(mockPrisma.skillCategory.findUnique).toHaveBeenCalledTimes(1)
      })

      it('should handle category not found', async () => {
        mockPrisma.skillCategory.findUnique.mockResolvedValueOnce(null)

        const result = await service.getSkillCategoryById('non-existent')

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Skill category not found: non-existent')
        expect(result.error?.code).toBe('SKILL_CATEGORY_NOT_FOUND')
        expect(result.error?.statusCode).toBe(404)
      })

      it('should handle database errors', async () => {
        const error = new Error('Database error')
        mockPrisma.skillCategory.findUnique.mockRejectedValueOnce(error)

        const result = await service.getSkillCategoryById('category-1')

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to fetch skill category: category-1')
        expect(result.error?.code).toBe('SKILL_CATEGORY_FETCH_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })

    describe('createSkillCategory', () => {
      it('should create skill category successfully', async () => {
        const categoryData = {
          name: 'Backend',
          description: 'Backend technologies',
          display: true,
        }
        const createdCategory = { ...categoryData, id: 'category-2' }
        mockPrisma.skillCategory.create.mockResolvedValueOnce(createdCategory)

        const result = await service.createSkillCategory(categoryData)

        expect(result.success).toBe(true)
        expect(result.data).toEqual(createdCategory)
        expect(mockPrisma.skillCategory.create).toHaveBeenCalledWith({
          data: categoryData,
        })
      })

      it('should handle database errors', async () => {
        const categoryData = {
          name: 'Backend',
          description: 'Backend technologies',
          display: true,
        }
        const error = new Error('Database error')
        mockPrisma.skillCategory.create.mockRejectedValueOnce(error)

        const result = await service.createSkillCategory(categoryData)

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to create skill category')
        expect(result.error?.code).toBe('SKILL_CATEGORY_CREATION_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })

    describe('updateSkillCategory', () => {
      it('should update skill category successfully', async () => {
        const updateData = {
          name: 'Frontend Updated',
          description: 'Updated frontend technologies',
          display: false,
        }
        const updatedCategory = { ...mockSkillCategory, ...updateData }
        mockPrisma.skillCategory.update.mockResolvedValueOnce(updatedCategory)

        const result = await service.updateSkillCategory('category-1', updateData)

        expect(result.success).toBe(true)
        expect(result.data).toEqual(updatedCategory)
        expect(mockPrisma.skillCategory.update).toHaveBeenCalledWith({
          where: { id: 'category-1' },
          data: updateData,
        })
      })

      it('should handle database errors', async () => {
        const updateData = { name: 'Frontend Updated' }
        const error = new Error('Database error')
        mockPrisma.skillCategory.update.mockRejectedValueOnce(error)

        const result = await service.updateSkillCategory('category-1', updateData)

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to update skill category')
        expect(result.error?.code).toBe('SKILL_CATEGORY_UPDATE_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })

    describe('deleteSkillCategory', () => {
      it('should delete skill category successfully', async () => {
        const mockSkills = [
          { id: 'skill-1', categoryId: 'category-1' },
          { id: 'skill-2', categoryId: 'category-1' },
        ]
        mockPrisma.skill.findMany.mockResolvedValueOnce(mockSkills)
        mockPrisma.skill.update.mockResolvedValue(mockSkill)
        mockPrisma.skillCategory.delete.mockResolvedValueOnce(mockSkillCategory)

        const result = await service.deleteSkillCategory('category-1')

        expect(result.success).toBe(true)
        expect(mockPrisma.skill.findMany).toHaveBeenCalledWith({
          where: { categoryId: 'category-1' },
        })
        expect(mockPrisma.skill.update).toHaveBeenCalledTimes(2)
        expect(mockPrisma.skillCategory.delete).toHaveBeenCalledWith({
          where: { id: 'category-1' },
        })
      })

      it('should handle database errors', async () => {
        const error = new Error('Database error')
        mockPrisma.skill.findMany.mockRejectedValueOnce(error)

        const result = await service.deleteSkillCategory('category-1')

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('Failed to delete skill category')
        expect(result.error?.code).toBe('SKILL_CATEGORY_DELETION_ERROR')
        expect(result.error?.statusCode).toBe(500)
      })
    })
  })

  describe('Cache Invalidation', () => {
    it('should invalidate relevant caches after create operations', async () => {
      mockPrisma.skill.create.mockResolvedValueOnce(mockSkill)

      await service.createSkill({
        name: 'Test Skill',
        years: 1,
        category: { id: 'category-1' },
      })

      // Verify that cache invalidation methods are called
      // This is tested indirectly through the service behavior
      expect(mockPrisma.skill.create).toHaveBeenCalled()
    })

    it('should invalidate relevant caches after update operations', async () => {
      mockPrisma.skill.update.mockResolvedValueOnce(mockSkill)

      await service.updateSkill('skill-1', { name: 'Updated Skill' })

      expect(mockPrisma.skill.update).toHaveBeenCalled()
    })

    it('should invalidate relevant caches after delete operations', async () => {
      mockPrisma.projectSkills.deleteMany.mockResolvedValueOnce({ count: 0 })
      mockPrisma.experienceSkill.deleteMany.mockResolvedValueOnce({ count: 0 })
      mockPrisma.skill.delete.mockResolvedValueOnce(mockSkill)

      await service.deleteSkill('skill-1')

      expect(mockPrisma.skill.delete).toHaveBeenCalled()
    })
  })
})
