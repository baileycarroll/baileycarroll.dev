"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';

interface DashboardStats {
  articles: number;
  poems: number;
  projects: number;
  skills: number;
  experiences: number;
  publishedPoems: number;
  featuredProjects: number;
}

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    articles: 0,
    poems: 0,
    projects: 0,
    skills: 0,
    experiences: 0,
    publishedPoems: 0,
    featuredProjects: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session && !isPending) {
      loadDashboardStats();
    }
  }, [session, isPending]);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      
      const [articlesResponse, poemsResponse, projectsResponse, skillsResponse, experiencesResponse] = await Promise.all([
        fetch('/api/admin/articles'),
        fetch('/api/admin/poems'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/skills'),
        fetch('/api/admin/experiences')
      ]);

      const [articles, poems, projects, skills, experiences] = await Promise.all([
        articlesResponse.json(),
        poemsResponse.json(),
        projectsResponse.json(),
        skillsResponse.json(),
        experiencesResponse.json()
      ]);

      // Ensure all responses are arrays and handle potential errors
      const articlesArray = Array.isArray(articles) ? articles : [];
      const poemsArray = Array.isArray(poems) ? poems : [];
      const projectsArray = Array.isArray(projects) ? projects : [];
      const skillsArray = Array.isArray(skills) ? skills : [];
      const experiencesArray = Array.isArray(experiences) ? experiences : [];

      setStats({
        articles: articlesArray.length,
        poems: poemsArray.length,
        projects: projectsArray.length,
        skills: skillsArray.length,
        experiences: experiencesArray.length,
        publishedPoems: poemsArray.filter((p: any) => p.status === 'published').length,
        featuredProjects: projectsArray.filter((p: any) => p.featured).length
      });
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

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
        {session && (
          <Paragraph className="text-sm text-neutral-500 mt-2">
            Logged in as: {session.user.email}
          </Paragraph>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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

        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Paragraph className="text-neutral-400 text-sm">Total Experiences</Paragraph>
              <Heading Level={3} className="text-2xl font-bold">
                {loading ? "..." : stats.experiences}
              </Heading>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary text-xl">🏢</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Paragraph className="text-neutral-400 text-sm">Published Poems</Paragraph>
              <Heading Level={3} className="text-2xl font-bold">
                {loading ? "..." : stats.publishedPoems}
              </Heading>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <span className="text-green-500 text-xl">✅</span>
            </div>
          </div>
        </Card>

        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Paragraph className="text-neutral-400 text-sm">Featured Projects</Paragraph>
              <Heading Level={3} className="text-2xl font-bold">
                {loading ? "..." : stats.featuredProjects}
              </Heading>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <span className="text-yellow-500 text-xl">⭐</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card variant="elevated" className="p-6">
        <Heading Level={3} className="mb-4">Quick Actions</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          <Link href="/admin/experiences" className="p-4 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 hover:border-primary/30 transition-all text-left">
            <div className="text-primary text-lg mb-2">🏢</div>
            <Heading Level={4} className="text-sm font-medium mb-1">Create Experience</Heading>
            <Paragraph className="text-xs text-neutral-400">Add a new experience</Paragraph>
          </Link>
        </div>
      </Card>
    </div>
  );
}
