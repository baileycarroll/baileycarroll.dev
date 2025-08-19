"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AdminTable from '../components/ui/AdminTable';
import AdminForm from '../components/ui/AdminForm';
import { DatabaseSkill, DatabaseSkillCategory } from '@/services/database/types';

interface SkillFormData {
  name: string;
  years: number;
  categoryId: string;
}

interface CategoryFormData {
  name: string;
  description: string;
  display: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<DatabaseSkill[]>([]);
  const [categories, setCategories] = useState<DatabaseSkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<DatabaseSkill | null>(null);
  const [editingCategory, setEditingCategory] = useState<DatabaseSkillCategory | null>(null);
  const [skillFormData, setSkillFormData] = useState<SkillFormData>({
    name: '',
    years: 1,
    categoryId: ''
  });
  const [categoryFormData, setCategoryFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    display: true
  });
  const [skillFormErrors, setSkillFormErrors] = useState<FormErrors>({});
  const [categoryFormErrors, setCategoryFormErrors] = useState<FormErrors>({});
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSkills();
    loadCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  const loadSkills = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/skills');
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      } else {
        console.error("Failed to load skills:", response.statusText);
      }
    } catch (error) {
      console.error("Error loading skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/admin/skill-categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Failed to load categories:", response.statusText);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleCreateNewSkill = () => {
    setEditingSkill(null);
    setSkillFormData({
      name: '',
      years: 1,
      categoryId: categories.length > 0 ? categories[0].id : ''
    });
    setSkillFormErrors({});
    setCategorySearchTerm('');
    setShowCategoryDropdown(false);
    setShowSkillForm(true);
  };

  const handleCreateNewCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({
      name: '',
      description: '',
      display: true
    });
    setCategoryFormErrors({});
    setShowCategoryForm(true);
  };

  const handleEditSkill = (skill: DatabaseSkill) => {
    setEditingSkill(skill);
    setSkillFormData({
      name: skill.name,
      years: skill.years,
      categoryId: skill.category?.id || ''
    });
    setSkillFormErrors({});
    setCategorySearchTerm('');
    setShowCategoryDropdown(false);
    setShowSkillForm(true);
  };

  const handleEditCategory = (category: DatabaseSkillCategory) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category.name,
      description: category.description || '',
      display: category.display
    });
    setCategoryFormErrors({});
    setShowCategoryForm(true);
  };

  const handleDeleteSkill = async (skill: DatabaseSkill) => {
    if (window.confirm(`Are you sure you want to delete "${skill.name}"?`)) {
      try {
        const response = await fetch(`/api/admin/skills/${skill.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await loadSkills();
        } else {
          console.error("Failed to delete skill:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    }
  };

  const handleDeleteCategory = async (category: DatabaseSkillCategory) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"? This will also delete all skills in this category.`)) {
      try {
        const response = await fetch(`/api/admin/skill-categories/${category.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await loadCategories();
          await loadSkills(); // Reload skills as some may have been deleted
        } else {
          console.error("Failed to delete category:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors: FormErrors = {};
    if (!skillFormData.name.trim()) errors.name = "Name is required";
    if (skillFormData.years < 0) errors.years = "Years must be positive";
    if (!skillFormData.categoryId) errors.categoryId = "Category is required";

    if (Object.keys(errors).length > 0) {
      setSkillFormErrors(errors);
      return;
    }

    try {
      setSubmitting(true);
      
      const skillData = {
        name: skillFormData.name.trim(),
        years: skillFormData.years,
        category: { id: skillFormData.categoryId }
      };

      let response;
      if (editingSkill) {
        response = await fetch(`/api/admin/skills/${editingSkill.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ skillData })
        });
      } else {
        response = await fetch('/api/admin/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ skillData })
        });
      }

      if (response.ok) {
        await loadSkills();
        setShowSkillForm(false);
        setEditingSkill(null);
      } else {
        const errorData = await response.json();
        console.error("Failed to save skill:", errorData.error);
        alert(`Failed to save skill: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Failed to save skill");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors: FormErrors = {};
    if (!categoryFormData.name.trim()) errors.name = "Name is required";

    if (Object.keys(errors).length > 0) {
      setCategoryFormErrors(errors);
      return;
    }

    try {
      setSubmitting(true);
      
      const categoryData = {
        name: categoryFormData.name.trim(),
        description: categoryFormData.description.trim() || null,
        display: categoryFormData.display
      };

      let response;
      if (editingCategory) {
        response = await fetch(`/api/admin/skill-categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categoryData })
        });
      } else {
        response = await fetch('/api/admin/skill-categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categoryData })
        });
      }

      if (response.ok) {
        const newCategory = await response.json();
        await loadCategories();
        setShowCategoryForm(false);
        setEditingCategory(null);
        
        // If we're creating a category from the skill form, auto-select it
        if (showSkillForm && !editingSkill) {
          setSkillFormData(prev => ({
            ...prev,
            categoryId: newCategory.id
          }));
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to save category:", errorData.error);
        alert(`Failed to save category: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkillCancel = () => {
    setShowSkillForm(false);
    setEditingSkill(null);
    setSkillFormErrors({});
  };

  const handleCategoryCancel = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
    setCategoryFormErrors({});
  };

  const skillColumns = [
    {
      key: 'name' as keyof DatabaseSkill,
      label: 'Skill Name',
      sortable: true,
      searchable: true,
      render: (value: string) => (
        <div className="font-medium text-white">{value}</div>
      )
    },
    {
      key: 'years' as keyof DatabaseSkill,
      label: 'Years',
      sortable: true,
      searchable: true,
      render: (value: number) => (
        <span className="text-neutral-300">{value} years</span>
      )
    },
    {
      key: 'category' as keyof DatabaseSkill,
      label: 'Category',
      searchable: true,
      render: (value: DatabaseSkillCategory | null) => (
        <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
          {value?.name || 'No category'}
        </span>
      )
    }
  ];

  const categoryColumns = [
    {
      key: 'name' as keyof DatabaseSkillCategory,
      label: 'Category Name',
      sortable: true,
      searchable: true,
      render: (value: string) => (
        <div className="font-medium text-white">{value}</div>
      )
    },
    {
      key: 'description' as keyof DatabaseSkillCategory,
      label: 'Description',
      searchable: true,
      render: (value: string | null) => (
        <div className="max-w-xs truncate text-sm text-neutral-300">
          {value || 'No description'}
        </div>
      )
    },
    {
      key: 'display' as keyof DatabaseSkillCategory,
      label: 'Display',
      render: (value: boolean) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {value ? 'Visible' : 'Hidden'}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills & Categories</h1>
          <p className="text-neutral-400">Manage your technical skills and skill categories</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCreateNewCategory}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            New Category
          </button>
          <button
            onClick={handleCreateNewSkill}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            New Skill
          </button>
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Skills</h2>
        <AdminTable
          data={skills}
          columns={skillColumns}
          onEdit={handleEditSkill}
          onDelete={handleDeleteSkill}
          loading={loading}
          emptyMessage="No skills found. Create your first skill to get started."
          searchable={true}
          pagination={true}
          itemsPerPage={10}
          searchPlaceholder="Search skills by name, years, or category..."
        />
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Categories</h2>
        <AdminTable
          data={categories}
          columns={categoryColumns}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          loading={loading}
          emptyMessage="No categories found. Create your first category to get started."
          searchable={true}
          pagination={true}
          itemsPerPage={5}
          searchPlaceholder="Search categories by name or description..."
        />
      </div>

      {/* Skill Form Modal */}
      <AnimatePresence>
        {showSkillForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleSkillCancel}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[85vh]"
            >
              <AdminForm
                title={editingSkill ? "Edit Skill" : "Create New Skill"}
                onSubmit={handleSkillSubmit}
                onCancel={handleSkillCancel}
                loading={submitting}
                showCloseButton
                onClose={handleSkillCancel}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-200 mb-2">
                      Skill Name *
                    </label>
                    <input
                      type="text"
                      value={skillFormData.name}
                      onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                      className={`w-full px-3 py-2 bg-neutral-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        skillFormErrors.name ? 'border-red-500' : 'border-neutral-600'
                      }`}
                      placeholder="e.g., React, Python, Docker"
                    />
                    {skillFormErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{skillFormErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-200 mb-2">
                      Years of Experience *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={skillFormData.years}
                      onChange={(e) => setSkillFormData({ ...skillFormData, years: parseInt(e.target.value) || 0 })}
                      className={`w-full px-3 py-2 bg-neutral-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        skillFormErrors.years ? 'border-red-500' : 'border-neutral-600'
                      }`}
                      placeholder="0"
                    />
                    {skillFormErrors.years && (
                      <p className="text-red-500 text-sm mt-1">{skillFormErrors.years}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 mb-2">
                    <label className="block text-sm font-medium text-neutral-200 mb-2">
                      Category *
                    </label>
                    <div className="relative" ref={categoryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        className={`w-full px-3 py-2 bg-neutral-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between ${
                          skillFormErrors.categoryId ? 'border-red-500' : 'border-neutral-600'
                        }`}
                      >
                        <span className={skillFormData.categoryId ? 'text-neutral-200' : 'text-neutral-400'}>
                          {skillFormData.categoryId 
                            ? categories.find(c => c.id === skillFormData.categoryId)?.name 
                            : 'Select a category'
                          }
                        </span>
                        <ChevronDownIcon className={`w-4 h-4 text-neutral-400 transition-transform ${
                          showCategoryDropdown ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      <AnimatePresence>
                        {showCategoryDropdown && (
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
                                  value={categorySearchTerm}
                                  onChange={(e) => setCategorySearchTerm(e.target.value)}
                                  placeholder="Search categories..."
                                  className="w-full pl-9 pr-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-neutral-200 placeholder-neutral-400 text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            </div>
                            
                            {/* Category List */}
                            <div className="max-h-48 overflow-y-auto">
                              {filteredCategories.length > 0 ? (
                                <>
                                  {filteredCategories.map((category) => (
                                    <button
                                      key={category.id}
                                      type="button"
                                      onClick={() => {
                                        setSkillFormData({ ...skillFormData, categoryId: category.id });
                                        setShowCategoryDropdown(false);
                                        setCategorySearchTerm('');
                                      }}
                                      className="w-full px-3 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-700 transition-colors"
                                    >
                                      {category.name}
                                    </button>
                                  ))}
                                  {/* Create New Category Option */}
                                  {categorySearchTerm.trim() && (
                                    <div className="border-t border-neutral-700">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setShowCategoryDropdown(false);
                                          setCategorySearchTerm('');
                                          // Open category form with pre-filled name
                                          setCategoryFormData({
                                            name: categorySearchTerm.trim(),
                                            description: '',
                                            display: true
                                          });
                                          setShowCategoryForm(true);
                                        }}
                                        className="w-full px-3 py-2 text-left text-sm text-primary hover:bg-primary/10 transition-colors flex items-center gap-2"
                                      >
                                        <PlusIcon className="w-4 h-4" />
                                        Create "{categorySearchTerm.trim()}"
                                      </button>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="px-3 py-2 text-sm text-neutral-400">
                                  {categorySearchTerm.trim() ? (
                                    <div className="space-y-2">
                                      <div>No categories found</div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setShowCategoryDropdown(false);
                                          setCategorySearchTerm('');
                                          // Open category form with pre-filled name
                                          setCategoryFormData({
                                            name: categorySearchTerm.trim(),
                                            description: '',
                                            display: true
                                          });
                                          setShowCategoryForm(true);
                                        }}
                                        className="w-full px-3 py-2 text-left text-sm text-primary hover:bg-primary/10 transition-colors flex items-center gap-2 border border-primary/30 rounded"
                                      >
                                        <PlusIcon className="w-4 h-4" />
                                        Create "{categorySearchTerm.trim()}"
                                      </button>
                                    </div>
                                  ) : (
                                    "No categories found"
                                  )}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {skillFormErrors.categoryId && (
                      <p className="text-red-500 text-sm mt-1">{skillFormErrors.categoryId}</p>
                    )}
                  </div>
                </div>
              </AdminForm>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Form Modal */}
      <AnimatePresence>
        {showCategoryForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCategoryCancel}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[85vh]"
            >
              <AdminForm
                title={editingCategory ? "Edit Category" : "Create New Category"}
                onSubmit={handleCategorySubmit}
                onCancel={handleCategoryCancel}
                loading={submitting}
                showCloseButton
                onClose={handleCategoryCancel}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-200 mb-2">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      value={categoryFormData.name}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                      className={`w-full px-3 py-2 bg-neutral-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        categoryFormErrors.name ? 'border-red-500' : 'border-neutral-600'
                      }`}
                      placeholder="e.g., Frontend, Backend, Mobile"
                    />
                    {categoryFormErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{categoryFormErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-200 mb-2">
                      Description
                    </label>
                    <textarea
                      value={categoryFormData.description}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Optional description of this category"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex items-center gap-3 p-3 bg-neutral-800/50 border border-neutral-700 rounded-lg hover:border-primary/30 transition-colors cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={categoryFormData.display}
                          onChange={(e) => setCategoryFormData({ ...categoryFormData, display: e.target.checked })}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                          categoryFormData.display
                            ? 'bg-primary border-primary'
                            : 'bg-neutral-700 border-neutral-600'
                        }`}>
                          {categoryFormData.display && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-neutral-200">
                          Display on frontend
                        </span>
                        <p className="text-xs text-neutral-400 mt-1">
                          Show this category on the public resume page
                        </p>
                      </div>
                      <div className={`px-2 py-1 text-xs rounded-full ${
                        categoryFormData.display
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {categoryFormData.display ? 'Visible' : 'Hidden'}
                      </div>
                    </label>
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
