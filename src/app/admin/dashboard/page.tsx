"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import { 
  articleService, 
  poemService, 
  projectService, 
  skillService 
} from "@/services";

interface DashboardStats {
  articles: number;
  poems: number;
  projects: number;
  skills: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    articles: 0,
    poems: 0,
    projects: 0,
    skills: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      
      const [articlesResult, poemsResult, projectsResult, skillsResult] = await Promise.all([
        articleService.getAllArticles(),
        poemService.getAllPoems(),
        projectService.getAllProjects(),
        skillService.getAllSkills()
      ]);

      setStats({
        articles: articlesResult.success ? articlesResult.data.length : 0,
        poems: poemsResult.success ? poemsResult.data.length : 0,
        projects: projectsResult.success ? projectsResult.data.length : 0,
        skills: skillsResult.success ? skillsResult.data.length : 0
      });
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <Heading Level={1} className="text-3xl font-bold mb-2">
          Admin Dashboard
        </Heading>
        <Paragraph className="text-neutral-400">
          Welcome to the admin portal. Manage your content and site configuration from here.
        </Paragraph>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Paragraph className="text-neutral-400 text-sm">Total Articles</Paragraph>
              <Heading Level={3} className="text-2xl font-bold">
                {loading ? "..." : stats.articles}
              </Heading>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary text-xl">📄</span>
            </div>
          </div>
        </Card>

        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Paragraph className="text-neutral-400 text-sm">Total Poems</Paragraph>
              <Heading Level={3} className="text-2xl font-bold">
                {loading ? "..." : stats.poems}
              </Heading>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary text-xl">📝</span>
            </div>
          </div>
        </Card>

        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Paragraph className="text-neutral-400 text-sm">Total Projects</Paragraph>
              <Heading Level={3} className="text-2xl font-bold">
                {loading ? "..." : stats.projects}
              </Heading>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary text-xl">💼</span>
            </div>
          </div>
        </Card>

        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Paragraph className="text-neutral-400 text-sm">Total Skills</Paragraph>
              <Heading Level={3} className="text-2xl font-bold">
                {loading ? "..." : stats.skills}
              </Heading>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary text-xl">🛠️</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card variant="elevated" className="p-6">
        <Heading Level={3} className="mb-4">Quick Actions</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/articles" className="p-4 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 hover:border-primary/30 transition-all text-left">
            <div className="text-primary text-lg mb-2">📄</div>
            <Heading Level={4} className="text-sm font-medium mb-1">Create Article</Heading>
            <Paragraph className="text-xs text-neutral-400">Add a new blog post</Paragraph>
          </Link>
          
          <Link href="/admin/poems" className="p-4 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 hover:border-primary/30 transition-all text-left">
            <div className="text-primary text-lg mb-2">📝</div>
            <Heading Level={4} className="text-sm font-medium mb-1">Create Poem</Heading>
            <Paragraph className="text-xs text-neutral-400">Add a new poem</Paragraph>
          </Link>
          
          <Link href="/admin/projects" className="p-4 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 hover:border-primary/30 transition-all text-left">
            <div className="text-primary text-lg mb-2">💼</div>
            <Heading Level={4} className="text-sm font-medium mb-1">Create Project</Heading>
            <Paragraph className="text-xs text-neutral-400">Add a new project</Paragraph>
          </Link>
        </div>
      </Card>
    </div>
  );
}
