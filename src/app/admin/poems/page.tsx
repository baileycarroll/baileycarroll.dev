"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import AdminTable from "../components/ui/AdminTable";
import AdminForm, { FormField, FormInput, FormTextarea, FormSelect } from "../components/ui/AdminForm";
import type { DatabasePoem } from "@/services/types";

interface PoemFormData {
  title: string;
  status: string;
  excerpt: string;
  summary: string;
  content: string;
  slug: string;
  tags: string;
  categories: string;
}

export default function PoemsPage() {
  const [poems, setPoems] = useState<DatabasePoem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPoem, setEditingPoem] = useState<DatabasePoem | null>(null);
  const [formData, setFormData] = useState<PoemFormData>({
    title: "",
    status: "draft",
    excerpt: "",
    summary: "",
    content: "",
    slug: "",
    tags: "",
    categories: ""
  });
  const [formErrors, setFormErrors] = useState<Partial<PoemFormData>>({});
  const [submitting, setSubmitting] = useState(false);

  // Load poems on component mount
  useEffect(() => {
    loadPoems();
  }, []);

  const loadPoems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/poems');
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Poems data:', data);
        setPoems(data);
      } else {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        console.error("Failed to load poems:", errorData);
        throw new Error(errorData.error || response.statusText);
      }
    } catch (error) {
      console.error("Error loading poems:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingPoem(null);
    setFormData({
      title: "",
      status: "draft",
      excerpt: "",
      summary: "",
      content: "",
      slug: "",
      tags: "",
      categories: ""
    });
    setFormErrors({});
    setShowForm(true);
  };

  const handleEdit = (poem: DatabasePoem) => {
    setEditingPoem(poem);
    setFormData({
      title: poem.title,
      status: poem.status,
      excerpt: poem.excerpt,
      summary: poem.summary,
      content: poem.content,
      slug: poem.slug,
      tags: poem.tags.map(t => typeof t === 'string' ? t : t.tag).join(", "),
      categories: poem.categories.map(c => typeof c === 'string' ? c : c.category).join(", ")
    });
    setFormErrors({});
    setShowForm(true);
  };

  const handleDelete = async (poem: DatabasePoem) => {
    if (window.confirm(`Are you sure you want to delete "${poem.title}"?`)) {
      try {
        const response = await fetch(`/api/admin/poems/${poem.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await loadPoems();
        } else {
          console.error("Failed to delete poem:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting poem:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors: Partial<PoemFormData> = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.excerpt.trim()) errors.excerpt = "Excerpt is required";
    if (!formData.summary.trim()) errors.summary = "Summary is required";
    if (!formData.content.trim()) errors.content = "Content is required";
    if (!formData.slug.trim()) errors.slug = "Slug is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setSubmitting(true);
      
      const tags = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean);
      const categories = formData.categories.split(",").map(cat => cat.trim()).filter(Boolean);
      
      const poemData = {
        title: formData.title.trim(),
        status: formData.status,
        excerpt: formData.excerpt.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        slug: formData.slug.trim()
      };

      let response;
      if (editingPoem) {
        response = await fetch(`/api/admin/poems/${editingPoem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ poemData, tags, categories }),
        });
      } else {
        response = await fetch('/api/admin/poems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ poemData, tags, categories }),
        });
      }

      if (response.ok) {
        await loadPoems();
        setShowForm(false);
        setEditingPoem(null);
      } else {
        const errorData = await response.json();
        console.error("Failed to save poem:", errorData.error);
        alert(`Failed to save poem: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error saving poem:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPoem(null);
    setFormErrors({});
  };

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" }
  ];

  const columns = [
    {
      key: 'title' as keyof DatabasePoem,
      label: 'Title',
      sortable: true,
      render: (value: string, poem: DatabasePoem) => (
        <div>
          <div className="font-medium text-white">{value}</div>
          <div className="text-xs text-neutral-400">{poem.slug}</div>
        </div>
      )
    },
    {
      key: 'status' as keyof DatabasePoem,
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'published' ? 'bg-green-500/20 text-green-400' :
          value === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-neutral-500/20 text-neutral-400'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'excerpt' as keyof DatabasePoem,
      label: 'Excerpt',
      render: (value: string) => (
        <div className="max-w-xs truncate text-sm text-neutral-300">
          {value}
        </div>
      )
    },
    {
      key: 'tags' as keyof DatabasePoem,
      label: 'Tags',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
              {tag}
            </span>
          ))}
          {value.length > 3 && (
            <span className="px-2 py-1 text-xs bg-neutral-600 text-neutral-300 rounded-full">
              +{value.length - 3}
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Poems</h1>
          <p className="text-neutral-400">Manage your poetry and creative writing</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Poem
        </button>
      </div>

      {/* Poems Table */}
      <AdminTable
        data={poems}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        emptyMessage="No poems found. Create your first poem to get started."
      />

      {/* Create/Edit Form Modal */}
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
                title={editingPoem ? "Edit Poem" : "Create New Poem"}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={submitting}
                showCloseButton
                onClose={handleCancel}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField label="Title" required error={formErrors.title}>
                    <FormInput
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter poem title"
                      error={formErrors.title}
                      required
                    />
                  </FormField>

                  <FormField label="Status" required>
                    <FormSelect
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      options={statusOptions}
                      required
                    />
                  </FormField>

                  <FormField label="Slug" required error={formErrors.slug}>
                    <FormInput
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="poem-slug"
                      error={formErrors.slug}
                      required
                    />
                  </FormField>

                  <FormField label="Tags" helpText="Comma-separated tags">
                    <FormInput
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="tag1, tag2, tag3"
                    />
                  </FormField>

                  <FormField label="Categories" helpText="Comma-separated categories">
                    <FormInput
                      value={formData.categories}
                      onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
                      placeholder="category1, category2"
                    />
                  </FormField>
                </div>

                <FormField label="Excerpt" required error={formErrors.excerpt}>
                  <FormTextarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief excerpt or teaser"
                    error={formErrors.excerpt}
                    required
                    rows={3}
                  />
                </FormField>

                <FormField label="Summary" required error={formErrors.summary}>
                  <FormTextarea
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Summary of the poem"
                    error={formErrors.summary}
                    required
                    rows={3}
                  />
                </FormField>

                <FormField label="Content" required error={formErrors.content}>
                  <FormTextarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Poem content (supports Markdown)"
                    error={formErrors.content}
                    required
                    rows={20}
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
