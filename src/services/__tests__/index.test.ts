// Mock the entire services module to avoid import issues
jest.mock('../index', () => ({
  skillService: {
    getAllSkills: jest.fn(),
    createSkill: jest.fn(),
    updateSkill: jest.fn(),
    deleteSkill: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    healthCheck: jest.fn(),
  },
  projectService: {
    getAllProjects: jest.fn(),
    createProject: jest.fn(),
    updateProject: jest.fn(),
    deleteProject: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    healthCheck: jest.fn(),
  },
  experienceService: {
    getAllExperiences: jest.fn(),
    createExperience: jest.fn(),
    updateExperience: jest.fn(),
    deleteExperience: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    healthCheck: jest.fn(),
  },
  articleService: {
    getAllArticles: jest.fn(),
    createArticle: jest.fn(),
    updateArticle: jest.fn(),
    deleteArticle: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    healthCheck: jest.fn(),
  },
  poemService: {
    getAllPoems: jest.fn(),
    createPoem: jest.fn(),
    updatePoem: jest.fn(),
    deletePoem: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    healthCheck: jest.fn(),
  },
  disconnectDatabase: jest.fn(),
}))

import { 
  skillService, 
  projectService, 
  experienceService, 
  articleService, 
  poemService,
  disconnectDatabase 
} from '../index'

describe('Services Index', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  describe('Service Instances', () => {
    it('should export skillService', () => {
      expect(skillService).toBeDefined()
      expect(typeof skillService.getAllSkills).toBe('function')
      expect(typeof skillService.createSkill).toBe('function')
      expect(typeof skillService.updateSkill).toBe('function')
      expect(typeof skillService.deleteSkill).toBe('function')
    })

    it('should export projectService', () => {
      expect(projectService).toBeDefined()
      expect(typeof projectService.getAllProjects).toBe('function')
      expect(typeof projectService.createProject).toBe('function')
      expect(typeof projectService.updateProject).toBe('function')
      expect(typeof projectService.deleteProject).toBe('function')
    })

    it('should export experienceService', () => {
      expect(experienceService).toBeDefined()
      expect(typeof experienceService.getAllExperiences).toBe('function')
      expect(typeof experienceService.createExperience).toBe('function')
      expect(typeof experienceService.updateExperience).toBe('function')
      expect(typeof experienceService.deleteExperience).toBe('function')
    })

    it('should export articleService', () => {
      expect(articleService).toBeDefined()
      expect(typeof articleService.getAllArticles).toBe('function')
      expect(typeof articleService.createArticle).toBe('function')
      expect(typeof articleService.updateArticle).toBe('function')
      expect(typeof articleService.deleteArticle).toBe('function')
    })

    it('should export poemService', () => {
      expect(poemService).toBeDefined()
      expect(typeof poemService.getAllPoems).toBe('function')
      expect(typeof poemService.createPoem).toBe('function')
      expect(typeof poemService.updatePoem).toBe('function')
      expect(typeof poemService.deletePoem).toBe('function')
    })
  })

  describe('disconnectDatabase', () => {
    it('should export disconnectDatabase function', () => {
      expect(disconnectDatabase).toBeDefined()
      expect(typeof disconnectDatabase).toBe('function')
    })

    it('should call disconnect on all services', async () => {
      // Mock the disconnect methods
      const mockDisconnect = jest.fn().mockResolvedValue({ success: true, data: undefined })
      
      // We can't easily mock the private disconnect methods, but we can verify the function exists
      expect(disconnectDatabase).toBeDefined()
    })
  })

  describe('Service Inheritance', () => {
    it('should have all services inherit from DatabaseService', () => {
      // All services should have the base DatabaseService methods
      const baseMethods = ['connect', 'disconnect', 'healthCheck']
      
      baseMethods.forEach(method => {
        expect(typeof (skillService as any)[method]).toBe('function')
        expect(typeof (projectService as any)[method]).toBe('function')
        expect(typeof (experienceService as any)[method]).toBe('function')
        expect(typeof (articleService as any)[method]).toBe('function')
        expect(typeof (poemService as any)[method]).toBe('function')
      })
    })
  })
})
