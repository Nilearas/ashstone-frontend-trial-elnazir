import React from 'react';
import { sanitizeText, formatTags } from '../../utils/textUtils';
import './PostCard.css';

/**
 * PostCard component with strict data mapping according to JSON structure
 * 
 * @param {Object} props
 * @param {Object} props.post - Post data object from JSON API
 * @param {string} props.post.id - Unique post identifier
 * @param {string} props.post.title - Post title (mapped to main heading)
 * @param {string} props.post.img - Primary image URL (1x resolution)
 * @param {string} props.post.img_2x - High-resolution image URL (2x)
 * @param {string} props.post.tag - Category tag (displayed as uppercase red label)
 * @param {string} props.post.autor - Author name (API typo handling required)
 * @param {string} props.post.date - Publication date
 * @param {string|number} props.post.views - View count
 * @param {string} props.post.text - Post text content (sanitized)
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.className - Additional CSS classes
 */
export default function PostCard({ 
	post, 
	onClick, 
	className = ''
}) {
	// Handle missing or invalid post data gracefully
	if (!post) {
		return null;
	}

	// Strict data mapping according to requirements
	const title = post.title || 'Untitled Post';
	const tags = post.tag; // Tag data now added by API hook
	const autor = post.autor || 'Unknown Author'; // Strict API typo handling
	const date = post.date || 'No date';
	const views = post.views || 0;
	const text = sanitizeText(post.text);

	// Format view count safely
	const formattedViews = typeof views === 'number' 
		? views.toLocaleString() 
		: views.toString();

	// Generate safe alt text for accessibility
	const altText = title;

	return (
		<div 
			className={`post-card ${className}`.trim()} 
			onClick={onClick} 
			tabIndex={0} 
			role="button"
			aria-label={`Read more about ${title}`}
		>
			<div className="post-card__img-wrapper">
				<img
					src={post.img}
					srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
					alt={altText}
					className="post-card__img"
					loading="lazy"
					// Prevent layout shift
					style={{ aspectRatio: '16/9' }}
				/>
			</div>
			<div className="post-card__content">
				{/* Tags as small, uppercase, red category label above title */}
				{tags && (
					<div className="post-card__tag-container">
						<span className="post-card__tag">{tags}</span>
					</div>
				)}
				
				{/* Title as most prominent element */}
				<h3 className="post-card__title">{title}</h3>
				
				{/* Meta Information - Single line directly under title */}
				<div className="post-card__meta">
					<span className="post-card__author">{autor}</span>
					<span className="post-card__date">{date}</span>
					<span className="post-card__views">{formattedViews} views</span>
				</div>
				
				{/* Post description text - 3 line truncation */}
				<div className="post-card__description">
					{text}
				</div>
				
			</div>
		</div>
	);
}
