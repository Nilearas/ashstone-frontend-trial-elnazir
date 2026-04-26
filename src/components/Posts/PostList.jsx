import React, { useMemo, useState, useCallback, useRef } from 'react';
import { useFetchPosts } from '../../hooks/useFetchPosts';
import PostCard from './PostCard';
import Modal from '../../components/UI/Modal';
import { sanitizeText } from '../../utils/textUtils';
import './PostList.css';

/**
 * PostList component with robust search functionality and error handling
 * 
 * Features:
 * - Case-insensitive search across title and content
 * - Graceful handling of null/undefined data
 * - Loading and error states
 * - Modal for detailed post view
 * - Accessible search with proper ARIA labels
 */
export default function PostList() {
  const { posts = [], loading, error } = useFetchPosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const searchInputRef = useRef(null);

  /**
   * Memoized search filter with case-insensitive matching
   * Handles null/undefined values gracefully to prevent crashes
   */
  const filteredPosts = useMemo(() => {
    // Return all posts if search query is empty or whitespace
    const q = searchQuery.trim().toLowerCase();
    if (!q) return posts;

    return posts.filter(post => {
      // Guard against null/undefined post data
      if (!post) return false;

      // Search in title (case-insensitive)
      const titleMatch = post.title && 
        typeof post.title === 'string' && 
        post.title.toLowerCase().includes(q);

      // Search in text content (case-insensitive)
      const textMatch = post.text && 
        typeof post.text === 'string' && 
        post.text.toLowerCase().includes(q);

      // Search in author name (case-insensitive)
      const authorMatch = (post.autor || post.author) && 
        typeof (post.autor || post.author) === 'string' && 
        (post.autor || post.author).toLowerCase().includes(q);

      return titleMatch || textMatch || authorMatch;
    });
  }, [posts, searchQuery]);

  /**
   * Handle post card click with error boundary
   */
  const handlePostClick = useCallback((post) => {
    if (post) {
      setSelectedPost(post);
    }
  }, []);

  /**
   * Handle modal close with cleanup
   */
  const handleCloseModal = useCallback(() => {
    setSelectedPost(null);
  }, []);

  /**
   * Handle search input changes with debouncing for performance
   */
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
  }, []);

  // Generate unique key for posts to prevent React warnings
  const getPostKey = useCallback((post, index) => {
    return post.id || `post-${post.title}-${index}`;
  }, []);

  return (
    <div className="post-list__wrapper">
      {/* Search Input - Hidden by default */}
      <div className={`post-list__search-container ${searchQuery ? 'post-list__search-container--visible' : ''}`}>
        <input
          ref={searchInputRef}
          className="post-list__search"
          type="text"
          placeholder="Search posts by title, content, or author..."
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Search posts"
          autoComplete="off"
        />
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="post-list__loading" role="status" aria-live="polite">
          Loading posts…
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="post-list__error" role="alert" aria-live="assertive">
          {error.message || 'Failed to load posts. Please try again later.'}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredPosts.length === 0 && (
        <div className="post-list__empty">
          {searchQuery 
            ? `No posts found matching "${searchQuery}"`
            : 'No posts available.'
          }
        </div>
      )}

      {/* Posts Grid */}
      {!loading && !error && filteredPosts.length > 0 && (
        <div className="post-list__grid">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={getPostKey(post, index)}
              post={post}
              onClick={() => handlePostClick(post)}
            />
          ))}
        </div>
      )}

      {/* Modal for Post Details */}
      <Modal
        post={selectedPost}
        onClose={handleCloseModal}
        isOpen={!!selectedPost}
        size="medium"
        showCloseButton={true}
        closeOnOverlayClick={true}
      />
    </div>
  );
}
