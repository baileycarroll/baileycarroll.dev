"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import AdminTable from "../components/ui/AdminTable";
import AdminForm, { FormField, FormInput, FormTextarea, DateField } from "../components/ui/AdminForm";
import type { DatabaseArticle } from "@/services/types";

interface ArticleFormData {
  title: string;
  description: string;
  content: string;
  author: string;
  slug: string;
  date: string;
  tags: string;
  categories: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<DatabaseArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<DatabaseArticle | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    description: "",
    content: "",
    author: "",
    slug: "",
    date: new Date().toISOString().split('T')[0], // Default to today
    tags: "",
    categories: ""
  });
  const [formErrors, setFormErrors] = useState<Partial<ArticleFormData>>({});
  const [submitting, setSubmitting] = useState(false);

  // Load articles on component mount
  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        console.error("Failed to load articles:", response.statusText);
      }
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      description: "",
      content: "",
      author: "Bailey Carroll",
      slug: "",
      date: new Date().toISOString().split('T')[0], // Default to today
      tags: "",
      categories: ""
    });
    setFormErrors({});
    setShowForm(true);
  };

  const handleEdit = (article: DatabaseArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      description: article.description,
      content: article.content,
      author: "Bailey Carroll",
      slug: article.slug,
      date: article.date.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
      tags: article.tags.join(", "),
      categories: article.categories.join(", ")
    });
    setFormErrors({});
    setShowForm(true);
  };

  const handleDelete = async (article: DatabaseArticle) => {
    if (window.confirm(`Are you sure you want to delete "${article.title}"?`)) {
      try {
        const response = await fetch(`/api/admin/articles/${article.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await loadArticles();
        } else {
          console.error("Failed to delete article:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors: Partial<ArticleFormData> = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (!formData.content.trim()) errors.content = "Content is required";
    if (!formData.slug.trim()) errors.slug = "Slug is required";
    if (!formData.date) errors.date = "Published date is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

      // Note: Slug validation will be handled by the database unique constraint

    try {
      setSubmitting(true);
      
      const tags = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean);
      const categories = formData.categories.split(",").map(cat => cat.trim()).filter(Boolean);
      
      const articleData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        slug: formData.slug.trim(),
        date: new Date(formData.date).toISOString()
      };

      let response;
      if (editingArticle) {
        response = await fetch(`/api/admin/articles/${editingArticle.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ articleData }),
        });
      } else {
        response = await fetch('/api/admin/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ articleData, tags, categories }),
        });
      }

      if (response.ok) {
        await loadArticles();
        setShowForm(false);
        setEditingArticle(null);
      } else {
        const errorData = await response.json();
        console.error("Failed to save article:", errorData.error);
        alert(`Failed to save article: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error saving article:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingArticle(null);
    setFormErrors({});
  };

  const columns = [
    {
      key: 'title' as keyof DatabaseArticle,
      label: 'Title',
      sortable: true,
      render: (value: string, article: DatabaseArticle) => (
        <div>
          <div className="font-medium text-white">{value}</div>
          <div className="text-xs text-neutral-400">{article.slug}</div>
        </div>
      )
    },
    {
      key: 'author' as keyof DatabaseArticle,
      label: 'Author',
      sortable: true
    },
    {
      key: 'date' as keyof DatabaseArticle,
      label: 'Date',
      sortable: true,
      render: (value: Date | string) => {
        if (value instanceof Date) {
          return value.toLocaleDateString();
        }
        if (typeof value === 'string') {
          return new Date(value).toLocaleDateString();
        }
        return 'Invalid date';
      }
    },
    {
      key: 'tags' as keyof DatabaseArticle,
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
          <h1 className="text-2xl font-bold text-white">Articles</h1>
          <p className="text-neutral-400">Manage your blog articles and content</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Article
        </button>
      </div>

      {/* Articles Table */}
      <AdminTable
        data={articles}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        emptyMessage="No articles found. Create your first article to get started."
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
                title={editingArticle ? "Edit Article" : "Create New Article"}
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
                      placeholder="Enter article title"
                      error={formErrors.title}
                      required
                    />
                  </FormField>

                  <FormField label="Author">
                    <FormInput
                      value={formData.author}
                      onChange={() => {}} // No-op for disabled field
                      disabled
                      placeholder="Bailey Carroll"
                    />
                  </FormField>

                  <FormField label="Slug" required error={formErrors.slug}>
                    <FormInput
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="article-slug"
                      error={formErrors.slug}
                      required
                    />
                  </FormField>

                  <DateField
                    label="Published Date"
                    value={formData.date}
                    onChange={(value) => setFormData({ ...formData, date: value })}
                    error={formErrors.date}
                    required
                  />

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

                <FormField label="Description" required error={formErrors.description}>
                  <FormTextarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the article"
                    error={formErrors.description}
                    required
                    rows={3}
                  />
                </FormField>

                <FormField label="Content" required error={formErrors.content}>
                  <FormTextarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Article content (supports Markdown)"
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
