import { useEffect, useState } from 'react';

const DATA_URL = 'https://cloud.codesupply.co/endpoint/react/data.json';
const REQUEST_TIMEOUT = 10000; // 10 seconds

/**
 * Clean text by removing encoding artifacts and replacing them with proper characters
 * @param {string} text - The text to clean
 * @returns {string} - The cleaned text
 */
function cleanText(text) {
	if (!text || typeof text !== 'string') {
		return text || '';
	}

	return text
		// Replace common encoding artifacts
		.replace(/â€¦/g, '…') // Ellipsis
		.replace(/â€"/g, '"') // Left double quote
		.replace(/â€/g, '"') // Right double quote
		.replace(/â€˜/g, "'") // Left single quote
		.replace(/â€™/g, "'") // Right single quote
		.replace(/â€"/g, '"') // Left double quote alternative
		.replace(/â€/g, '"') // Right double quote alternative
		.replace(/â€"'/g, "'") // Left single quote alternative
		.replace(/â€"'/g, "'") // Right single quote alternative
		.replace(/â€"¢/g, '•') // Bullet
		.replace(/â€""/g, '–') // En dash
		.replace(/â€""/g, '—') // Em dash
		.replace(/Â/g, '') // Remove non-breaking space artifacts
		.replace(/\s+/g, ' ') // Normalize multiple spaces
		.trim();
}

/**
 * Generate appropriate tag based on post title content
 * @param {string} title - The post title
 * @returns {string} - Generated tag category
 */
function generateTagFromTitle(title) {
	if (!title || typeof title !== 'string') {
		return 'General';
	}

	const titleLower = title.toLowerCase();
	
	// Generate tags based on title keywords
	if (titleLower.includes('eat') || titleLower.includes('food') || titleLower.includes('right')) {
		return 'Lifestyle';
	} else if (titleLower.includes('look') || titleLower.includes('balance') || titleLower.includes('style')) {
		return 'Style';
	} else if (titleLower.includes('rome') || titleLower.includes('travel') || titleLower.includes('bikes') || titleLower.includes('wheels')) {
		return 'Travel';
	} else if (titleLower.includes('room') || titleLower.includes('design') || titleLower.includes('living')) {
		return 'Style';
	} else if (titleLower.includes('music') || titleLower.includes('songs') || titleLower.includes('playlist')) {
		return 'Music';
	} else if (titleLower.includes('events') || titleLower.includes('table')) {
		return 'Events';
	} else {
		// Default categories based on title patterns
		if (titleLower.includes('fun') || titleLower.includes('things')) {
			return 'Lifestyle';
		} else if (titleLower.includes('color') || titleLower.includes('colorful')) {
			return 'Style';
		} else if (titleLower.includes('city')) {
			return 'Travel';
		}
	}
	
	return 'Lifestyle'; // Default fallback
}

/**
 * Custom hook for fetching and validating posts data
 * 
 * Features:
 * - Request timeout handling
 * - Data validation and sanitization
 * - Graceful error handling with fallbacks
 * - Memory leak prevention with cleanup
 * - Handles API typo 'autor' consistently
 * 
 * @returns {Object} { posts: Array, loading: boolean, error: Error|null }
 */
export function useFetchPosts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;
		let timeoutId;

		/**
		 * Validate and sanitize post data
		 * Ensures required fields exist and handles API typos
		 */
		const validatePostData = (rawPosts) => {
			if (!Array.isArray(rawPosts)) {
				return [];
			}

			return rawPosts.map((post, index) => {
				// Ensure post object exists
				if (!post || typeof post !== 'object') {
					return null;
				}

				// Validate and sanitize required fields
				return {
					id: post.id || `post-${index}`,
					title: cleanText(post.title) || 'Untitled Post',
					text: cleanText(post.text) || 'No content available.',
					img: post.img || '',
					img_2x: post.img_2x || post.img || '', // Fallback to 1x if 2x missing
					tag: post.tag || generateTagFromTitle(post.title), // Add tag if missing
					autor: post.autor || post.author || 'Unknown Author', // Handle API typo
					date: post.date || new Date().toLocaleDateString(),
					views: post.views || 0,
				};
			}).filter(Boolean); // Remove null entries
		};

		/**
		 * Fetch posts with timeout and error handling
		 */
		const fetchPosts = async () => {
			try {
				// Set up timeout
				timeoutId = setTimeout(() => {
					throw new Error('Request timeout: Failed to load posts within 10 seconds');
				}, REQUEST_TIMEOUT);

				const response = await fetch(DATA_URL, {
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
				});

				// Clear timeout on successful response
				clearTimeout(timeoutId);

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}: ${response.statusText}`);
				}

				const data = await response.json();
				
				if (isMounted) {
					const validatedPosts = validatePostData(data);
					setPosts(validatedPosts);
					setError(null);
				}
			} catch (err) {
				if (isMounted) {
					// Provide more user-friendly error messages
					let errorMessage = 'Failed to load posts. Please try again later.';
					
					if (err.name === 'TypeError' && err.message.includes('fetch')) {
						errorMessage = 'Network error: Please check your internet connection.';
					} else if (err.message.includes('timeout')) {
						errorMessage = 'Request timeout: Server is taking too long to respond.';
					} else if (err.message.includes('HTTP 404')) {
						errorMessage = 'Posts not found: The requested resource is unavailable.';
					} else if (err.message.includes('HTTP 5')) {
						errorMessage = 'Server error: Please try again in a few minutes.';
					}

					setError(new Error(errorMessage));
					setPosts([]); // Clear posts on error
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		fetchPosts();

		// Cleanup function
		return () => {
			isMounted = false;
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, []);

	return { posts, loading, error };
}
