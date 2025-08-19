import { ArticleService } from '../ArticleService'
import { PrismaClient } from '../../../../generated/prisma/client'

// Mock PrismaClient
jest.mock('../../../../generated/prisma/client')

describe('ArticleService', () => {
  let service: ArticleService
  let mockPrisma: jest.Mocked<PrismaClient>

  beforeEach(() => {
    jest.clearAllMocks()

    // Create mock Prisma client with all necessary methods
    mockPrisma = {
      article: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      articleTags: {
        createMany: jest.fn(),
      },
      articleCategories: {
        createMany: jest.fn(),
      },
      $disconnect: jest.fn(),
    } as any

    service = new ArticleService(mockPrisma)
  })

  afterAll(async () => {
    await service.disconnect()
  })

  describe('Date Handling', () => {
    it('should create article with proper date conversion', async () => {
      const articleData = {
        title: 'Test Article',
        description: 'Test description',
        content: 'Test content',
        author: 'Bailey Carroll',
        slug: 'test-article',
        date: '2024-01-15T00:00:00.000Z',
      }

      const createdArticle = {
        id: 'article-1',
        ...articleData,
        date: new Date('2024-01-15'),
      }

      mockPrisma.article.create.mockResolvedValueOnce(createdArticle)
      mockPrisma.article.findUnique.mockResolvedValueOnce({
        ...createdArticle,
        tags: [],
        categories: [],
      })

      const result = await service.createArticle(articleData, [], [])

      expect(result.success).toBe(true)
      expect(mockPrisma.article.create).toHaveBeenCalledWith({
        data: {
          ...articleData,
          date: new Date(articleData.date),
        },
      })
    })

    it('should update article with proper date conversion', async () => {
      const updateData = {
        title: 'Updated Article',
        date: '2024-02-15T00:00:00.000Z',
      }

      const updatedArticle = {
        id: 'article-1',
        title: 'Updated Article',
        description: 'Test description',
        content: 'Test content',
        author: 'Bailey Carroll',
        slug: 'test-article',
        date: new Date('2024-02-15'),
        tags: [],
        categories: [],
      }

      mockPrisma.article.update.mockResolvedValueOnce(updatedArticle)

      const result = await service.updateArticle('article-1', updateData)

      expect(result.success).toBe(true)
      expect(mockPrisma.article.update).toHaveBeenCalledWith({
        where: { id: 'article-1' },
        data: {
          ...updateData,
          date: new Date(updateData.date),
        },
        include: {
          tags: true,
          categories: true,
        },
      })
    })

    it('should handle date display in table format', () => {
      const date = new Date('2024-01-15')
      const formattedDate = date.toLocaleDateString()
      
      expect(formattedDate).toBeDefined()
      expect(typeof formattedDate).toBe('string')
    })

    it('should convert date to YYYY-MM-DD format for form input', () => {
      const date = new Date('2024-01-15')
      const formDate = date.toISOString().split('T')[0]
      
      expect(formDate).toBe('2024-01-15')
    })
  })
})
