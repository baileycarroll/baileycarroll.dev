"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AdminTable, { Column } from '../components/ui/AdminTable';
import AdminForm, { FormField, FormInput, FormTextarea } from '../components/ui/AdminForm';

interface Experience {
  id: string;
  title: string;
  employer: string;
  startDate: string;
  endDate?: string;
  details: string;
  link?: string;
  order: number;
  featured: boolean;
  skills: Array<{ skill: { id: string; name: string; category: { name: string } } }>;
}

interface Skill {
  id: string;
  name: string;
  category: {
    name: string;
  };
}

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [skillsSearchTerm, setSkillsSearchTerm] = useState('');
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const skillsDropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    employer: '',
    startDate: '',
    endDate: '' as string | null,
    details: '',
    link: '',
    order: 0,
    featured: false,
    skillIds: [] as string[],
  });

  useEffect(() => {
    loadExperiences();
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

  const loadExperiences = async () => {
    try {
      const response = await fetch('/api/admin/experiences');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      } else {
        console.error('Failed to load experiences');
      }
    } catch (error) {
      console.error('Error loading experiences:', error);
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
      } else {
        console.error('Failed to load skills');
      }
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const handleCreateNew = () => {
    setEditingExperience(null);
    setFormData({
      title: '',
      employer: '',
      startDate: '',
      endDate: '',
      details: '',
      link: '',
      order: experiences.length,
      featured: false,
      skillIds: [],
    });
    setShowForm(true);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      title: experience.title,
      employer: experience.employer,
      startDate: experience.startDate,
      endDate: experience.endDate || '',
      details: experience.details,
      link: experience.link || '',
      order: experience.order,
      featured: experience.featured,
      skillIds: experience.skills.map(s => s.skill.id),
    });
    setShowForm(true);
  };

  const handleDelete = async (experience: Experience) => {
    if (confirm(`Are you sure you want to delete "${experience.title}" at ${experience.employer}?`)) {
      try {
        const response = await fetch(`/api/admin/experiences/${experience.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await loadExperiences();
        } else {
          console.error('Failed to delete experience');
        }
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExperience(null);
    setShowSkillsDropdown(false);
    setSkillsSearchTerm('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingExperience 
        ? `/api/admin/experiences/${editingExperience.id}`
        : '/api/admin/experiences';
      
      const method = editingExperience ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experienceData: {
            title: formData.title,
            employer: formData.employer,
            startDate: formData.startDate,
            endDate: formData.endDate || null,
            details: formData.details,
            link: formData.link || null,
            order: formData.order,
            featured: formData.featured,
          },
          skillIds: formData.skillIds,
        }),
      });

      if (response.ok) {
        await loadExperiences();
        setShowForm(false);
        setEditingExperience(null);
      } else {
        console.error('Failed to save experience');
      }
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const experienceColumns: Column<Experience>[] = [
    {
      key: 'title',
      label: 'Title',
      searchable: true,
    },
    {
      key: 'employer',
      label: 'Employer',
      searchable: true,
    },
    {
      key: 'startDate',
      label: 'Start Date',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'endDate',
      label: 'End Date',
      render: (value: string | null) => value ? new Date(value).toLocaleDateString() : 'Present',
    },
    {
      key: 'order',
      label: 'Order',
    },
    {
      key: 'featured',
      label: 'Featured',
      render: (value: boolean) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-600'
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
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {skill.skill.name}
            </span>
          ))}
          {value.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
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
        <h1 className="text-2xl font-bold text-white">Experience Management</h1>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Experience
        </button>
      </div>

      <AdminTable
        data={experiences}
        columns={experienceColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        emptyMessage="No experiences found. Create your first experience to get started."
        searchable={true}
        pagination={true}
        itemsPerPage={10}
        searchPlaceholder="Search experiences by title, employer, or skills..."
      />

      {/* Experience Form Modal */}
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
              className="w-full max-w-4xl max-h-[85vh]"
            >
              <AdminForm
                title={editingExperience ? "Edit Experience" : "Create New Experience"}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={false}
                showCloseButton
                onClose={handleCancel}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Job Title" required>
                    <FormInput
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Senior Software Engineer"
                      required
                    />
                  </FormField>

                  <FormField label="Employer" required>
                    <FormInput
                      type="text"
                      value={formData.employer}
                      onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                      placeholder="e.g., Tech Company Inc."
                      required
                    />
                  </FormField>

                  <FormField label="Start Date" required>
                    <FormInput
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </FormField>

                  <FormField label="End Date">
                    <FormInput
                      type="date"
                      value={formData.endDate || ''}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value || null })}
                    />
                  </FormField>

                  <FormField label="Order">
                    <FormInput
                      type="number"
                      value={formData.order.toString()}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </FormField>

                  <FormField label="Link">
                    <FormInput
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      placeholder="https://example.com"
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
                        <div className="text-sm font-medium text-neutral-200">Show on home page</div>
                        <div className="text-xs text-neutral-400">Mark this experience as featured to display it on the home page</div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        formData.featured 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {formData.featured ? 'Featured' : 'Hidden'}
                      </div>
                    </div>
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

                  <div className="md:col-span-2">
                    <FormField label="Details" required>
                      <FormTextarea
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="Describe your role, responsibilities, and achievements..."
                        rows={6}
                        required
                      />
                    </FormField>
                  </div>
                </div>
              </AdminForm>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
