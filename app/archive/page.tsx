'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type FilterCategory = 'All' | 'Technology' | 'Design' | 'AI' | 'Culture' | 'Engineering';

interface Post {
  id: string;
  title: string;
  url: string;
  category: string;
  source: string;
  date: string;
}

export default function Archive() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from Airtable via API
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/posts');
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        }

        setPosts(data.posts || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const categories: FilterCategory[] = ['All', 'Technology', 'Design', 'AI', 'Culture', 'Engineering'];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">OR</span>
              </div>
              <h1 className="text-lg sm:text-xl font-semibold">Ocean Road Archive</h1>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {filteredPosts.length} posts
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Title and Description */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Inspiration from the Ocean Road team</h2>
          <p className="text-sm sm:text-base text-gray-600">
            A curated collection of inspiration links shared by the team. Ideas, references, and things worth remembering.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {isFiltersOpen ? '[close]' : '[open]'}
                </button>
              </div>

              {isFiltersOpen && (
                <div className="space-y-6">
                  {/* Sources */}
                  <div>
                    <button
                      onClick={() => setIsSourcesOpen(!isSourcesOpen)}
                      className="flex items-center justify-between w-full text-sm text-gray-700 hover:text-gray-900"
                    >
                      <span>{isSourcesOpen ? '[-]' : '[+]'} All sources</span>
                      <span className="text-gray-500">0</span>
                    </button>
                    {isSourcesOpen && (
                      <div className="mt-2 pl-4 text-sm text-gray-600">
                        {/* Source options would go here */}
                      </div>
                    )}
                  </div>

                  {/* Categories */}
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            selectedCategory === category
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {loading ? (
              <div className="text-center py-12 sm:py-16 text-gray-500">
                Loading posts...
              </div>
            ) : error ? (
              <div className="text-center py-12 sm:py-16">
                <p className="text-red-600 mb-2">{error}</p>
                <p className="text-sm text-gray-500">Check the AIRTABLE_SETUP.md file for configuration instructions</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12 sm:py-16 text-gray-500">
                No posts found
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base sm:text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors break-words"
                        >
                          {post.title}
                        </a>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-gray-600">
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="hidden sm:inline">{post.source}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
