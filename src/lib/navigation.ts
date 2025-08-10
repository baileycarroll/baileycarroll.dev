// Journal Navigation Data Structure
export interface JournalTab {
  id: string;
  label: string;
  icon: string; // Elder Scrolls style icon name
  route: string;
  completionPercent: number;
  isLocked?: boolean;
  description?: string;
  category?: "main" | "author" | "content";
  order: number;
}

export interface JournalSection {
  id: string;
  title: string;
  tabs: JournalTab[];
  isUnlocked: boolean;
}

// Static completion percentages for sections
const staticCompletionPercentages = {
  home: 100, // Always complete
  about: 85, // Static content
  resume: 90, // Static content
  projects: 75, // Static content
  articles: 60, // Dynamic based on content
  poetry: 40, // Dynamic based on content
  books: 25, // Dynamic based on content
} as const;

// Mock content data for dynamic completion calculation
// In a real implementation, this would come from your CMS or database
const publishedArticles = [
  { id: 1, title: "A Journey Through Acolyte" },
  { id: 2, title: "The Art of Code" },
  { id: 3, title: "Building Scalable Systems" },
  { id: 4, title: "Frontend Performance" },
  { id: 5, title: "Backend Architecture" },
  { id: 6, title: "DevOps Best Practices" },
];

const publishedPoems = [
  { id: 1, title: "A Nameless Muse" },
  { id: 2, title: "No Longer the Poet" },
  { id: 3, title: "Singing Me Home" },
];

const publishedBooks = [{ id: 1, title: "The Developer's Journey" }];

// Dynamic completion calculation
function calculateDynamicCompletion(tabId: string): number {
  switch (tabId) {
    case "articles":
      // Calculate based on number of articles published
      return Math.min(100, (publishedArticles.length / 10) * 100);
    case "poetry":
      // Calculate based on number of poems published
      return Math.min(100, (publishedPoems.length / 5) * 100);
    case "books":
      // Calculate based on number of books published
      return Math.min(100, (publishedBooks.length / 3) * 100);
    default:
      return (
        staticCompletionPercentages[
          tabId as keyof typeof staticCompletionPercentages
        ] || 0
      );
  }
}

export const journalTabs: JournalTab[] = [
  {
    id: "home",
    label: "Character Sheet",
    icon: "user-circle",
    route: "/",
    completionPercent: staticCompletionPercentages.home,
    category: "main",
    order: 1,
  },
  {
    id: "about",
    label: "Background",
    icon: "book-open",
    route: "/about",
    completionPercent: staticCompletionPercentages.about,
    category: "main",
    order: 2,
  },
  {
    id: "resume",
    label: "Skills & Experience",
    icon: "shield-check",
    route: "/resume",
    completionPercent: staticCompletionPercentages.resume,
    category: "main",
    order: 3,
  },
  {
    id: "projects",
    label: "Guild Contracts",
    icon: "briefcase",
    route: "/projects",
    completionPercent: staticCompletionPercentages.projects,
    category: "main",
    order: 4,
  },
  {
    id: "articles",
    label: "Scrolls of Knowledge",
    icon: "document-text",
    route: "/articles",
    completionPercent: calculateDynamicCompletion("articles"),
    category: "content",
    order: 5,
  },
  {
    id: "poetry",
    label: "Songs of the Bard",
    icon: "musical-note",
    route: "/poetry",
    completionPercent: calculateDynamicCompletion("poetry"),
    category: "content",
    order: 6,
  },
  {
    id: "books",
    label: "Tomes of Wisdom",
    icon: "library",
    route: "/books",
    completionPercent: calculateDynamicCompletion("books"),
    category: "content",
    order: 7,
  },
];

// Helper functions
export function getTabById(id: string): JournalTab | undefined {
  return journalTabs.find((tab) => tab.id === id);
}

export function getTabsByCategory(
  category: JournalTab["category"]
): JournalTab[] {
  return journalTabs.filter((tab) => tab.category === category);
}

export function getTotalCompletion(): number {
  const total = journalTabs.reduce(
    (sum, tab) => sum + tab.completionPercent,
    0
  );
  return Math.round(total / journalTabs.length);
}
