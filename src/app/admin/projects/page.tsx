"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AdminTable, { Column } from '../components/ui/AdminTable';
import AdminForm, { FormField, FormInput, FormTextarea, FormSelect, DateField } from '../components/ui/AdminForm';

interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
  url?: string;
  urlText?: string;
  logoUrl?: string;
  skills: Array<{ skill: { id: string; name: string; category: { name: string } } }>;
  categories: Array<{ category: string }>;
}

interface Skill {
  id: string;
  name: string;
  category: {
    name: string;
  };
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [skillsSearchTerm, setSkillsSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const skillsDropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'web',
    status: 'active',
    featured: false,
    startDate: '',
    endDate: '' as string | null,
    url: '',
    urlText: '',
    logoUrl: '',
    skillIds: [] as string[],
    categories: [] as string[],
  });

  useEffect(() => {
    loadProjects();
    loadSkills();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (skillsDropdownRef.current && !skillsDropdownRef.current.contains(event.target as Node)) {
        setShowSkillsDropdown(false);
        setSkillsSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter skills based on search term
  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(skillsSearchTerm.toLowerCase()) ||
    skill.category.name.toLowerCase().includes(skillsSearchTerm.toLowerCase())
  );

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error('Failed to load projects');
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSkills = async () => {
    try {
      const response = await fetch('/api/admin/skills');
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const handleCreateNew = () => {
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      type: 'web',
      status: 'active',
      featured: false,
      startDate: '',
      endDate: '',
      url: '',
      urlText: '',
      logoUrl: '',
      skillIds: [],
      categories: [],
    });
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      type: project.type,
      status: project.status,
      featured: project.featured,
      startDate: project.startDate,
      endDate: project.endDate || '',
      url: project.url || '',
      urlText: project.urlText || '',
      logoUrl: project.logoUrl || '',
      skillIds: project.skills.map(s => s.skill.id),
      categories: project.categories.map(c => c.category),
    });
    setShowForm(true);
  };

  const handleDelete = async (project: Project) => {
    if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
      try {
        const response = await fetch(`/api/admin/projects/${project.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await loadProjects();
        } else {
          console.error('Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
    setShowSkillsDropdown(false);
    setSkillsSearchTerm('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingProject 
        ? `/api/admin/projects/${editingProject.id}`
        : '/api/admin/projects';
      
      const method = editingProject ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectData: {
            name: formData.name,
            description: formData.description,
            type: formData.type,
            status: formData.status,
            featured: formData.featured,
            startDate: formData.startDate,
            endDate: formData.endDate || null,
            url: formData.url || null,
            urlText: formData.urlText || null,
            logoUrl: formData.logoUrl || null,
          },
          skillIds: formData.skillIds,
          categories: formData.categories,
        }),
      });

      if (response.ok) {
        await loadProjects();
        setShowForm(false);
        setEditingProject(null);
      } else {
        console.error('Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const projectColumns: Column<Project>[] = [
    {
      key: 'name',
      label: 'Name',
      searchable: true,
    },
    {
      key: 'type',
      label: 'Type',
      searchable: true,
    },
    {
      key: 'status',
      label: 'Status',
      searchable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active' ? 'bg-green-100 text-green-800' :
          value === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'featured',
      label: 'Featured',
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'skills',
      label: 'Skills',
      render: (value: Array<{ skill: { name: string; category: { name: string } } }>) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {skill.skill.name}
            </span>
          ))}
          {value.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{value.length - 2} more
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'categories',
      label: 'Categories',
      render: (value: Array<{ category: string }>) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((cat, index) => (
            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
              {cat.category}
            </span>
          ))}
          {value.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{value.length - 2} more
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Project Management</h1>
        <button
          onClick={handleCreateNew}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create New Project
        </button>
      </div>

      <AdminTable
        data={projects}
        columns={projectColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        emptyMessage="No projects found"
        searchable={true}
        pagination={true}
        itemsPerPage={10}
        searchPlaceholder="Search projects..."
      />

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl max-h-[95vh] overflow-y-auto"
            >
              <AdminForm
                title={editingProject ? 'Edit Project' : 'Create New Project'}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitLabel={editingProject ? 'Update Project' : 'Create Project'}
                loading={false}
                showCloseButton={true}
                onClose={handleCancel}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField label="Project Name" required>
                    <FormInput
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter project name"
                      required
                    />
                  </FormField>

                  <FormField label="Project Type" required>
                    <FormSelect
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                      options={[
                        { value: 'web', label: 'Web Application' },
                        { value: 'mobile', label: 'Mobile Application' },
                        { value: 'desktop', label: 'Desktop Application' },
                        { value: 'api', label: 'API/Backend' },
                        { value: 'other', label: 'Other' },
                      ]}
                    />
                  </FormField>

                  <FormField label="Status" required>
                    <FormSelect
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      required
                      options={[
                        { value: 'active', label: 'Active' },
                        { value: 'completed', label: 'Completed' },
                        { value: 'on-hold', label: 'On Hold' },
                        { value: 'cancelled', label: 'Cancelled' },
                      ]}
                    />
                  </FormField>

                  <FormField label="Featured">
                    <div 
                      className="flex items-center p-3 bg-neutral-700/50 border border-neutral-600 rounded-lg hover:bg-neutral-600/50 transition-colors cursor-pointer"
                      onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                          formData.featured 
                            ? 'bg-primary border-primary' 
                            : 'bg-neutral-700 border-neutral-500'
                        }`}>
                          {formData.featured && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-neutral-200">Display on frontend</div>
                        <div className="text-xs text-neutral-400">Mark this project as featured to highlight it</div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        formData.featured 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {formData.featured ? 'Visible' : 'Hidden'}
                      </div>
                    </div>
                  </FormField>

                  <DateField
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(value) => setFormData({ ...formData, startDate: value })}
                    required
                  />

                  <DateField
                    label="End Date"
                    value={formData.endDate || ''}
                    onChange={(value) => setFormData({ ...formData, endDate: value || null })}
                  />

                  <FormField label="Project URL">
                    <FormInput
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </FormField>

                  <FormField label="URL Text">
                    <FormInput
                      type="text"
                      value={formData.urlText}
                      onChange={(e) => setFormData({ ...formData, urlText: e.target.value })}
                      placeholder="Visit Project"
                    />
                  </FormField>

                  <FormField label="Logo URL">
                    <FormInput
                      type="url"
                      value={formData.logoUrl}
                      onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                      placeholder="https://example.com/logo.png"
                    />
                  </FormField>

                  <FormField label="Skills">
                    <div className="relative" ref={skillsDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                        className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all flex items-center justify-between text-neutral-200"
                      >
                        <span className="text-sm">
                          {formData.skillIds.length > 0 
                            ? `${formData.skillIds.length} skill${formData.skillIds.length !== 1 ? 's' : ''} selected`
                            : 'Select skills'
                          }
                        </span>
                        <ChevronDownIcon className={`w-4 h-4 text-neutral-400 transition-transform ${
                          showSkillsDropdown ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      <AnimatePresence>
                        {showSkillsDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-1 bg-neutral-800 border border-neutral-600 rounded-lg shadow-lg max-h-60 overflow-hidden"
                          >
                            {/* Search Input */}
                            <div className="p-2 border-b border-neutral-700">
                              <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input
                                  type="text"
                                  value={skillsSearchTerm}
                                  onChange={(e) => setSkillsSearchTerm(e.target.value)}
                                  placeholder="Search skills..."
                                  className="w-full pl-9 pr-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-neutral-200 placeholder-neutral-400 text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            </div>
                            
                            {/* Skills List */}
                            <div className="max-h-48 overflow-y-auto">
                              {filteredSkills.length > 0 ? (
                                filteredSkills.map((skill) => {
                                  const isSelected = formData.skillIds.includes(skill.id);
                                  return (
                                    <button
                                      key={skill.id}
                                      type="button"
                                      onClick={() => {
                                        const newSkillIds = isSelected
                                          ? formData.skillIds.filter(id => id !== skill.id)
                                          : [...formData.skillIds, skill.id];
                                        setFormData({ ...formData, skillIds: newSkillIds });
                                      }}
                                      className={`w-full px-3 py-2 text-left text-sm transition-colors flex items-center justify-between ${
                                        isSelected
                                          ? 'bg-primary/20 text-primary'
                                          : 'text-neutral-200 hover:bg-neutral-700'
                                      }`}
                                    >
                                      <span>{skill.name}</span>
                                      <span className="text-xs text-neutral-400">({skill.category.name})</span>
                                    </button>
                                  );
                                })
                              ) : (
                                <div className="px-3 py-2 text-sm text-neutral-400">
                                  No skills found
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FormField>

                  <FormField label="Categories">
                    <FormInput
                      type="text"
                      value={formData.categories.join(', ')}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        categories: e.target.value.split(',').map(cat => cat.trim()).filter(cat => cat)
                      })}
                      placeholder="Enter categories separated by commas"
                    />
                  </FormField>
                </div>

                <FormField label="Description" required>
                  <FormTextarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter project description"
                    rows={4}
                    required
                  />
                </FormField>
              </AdminForm>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
