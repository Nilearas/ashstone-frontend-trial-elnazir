import React from 'react';
import { sanitizeText } from '../../utils/textUtils';
import './Modal.css';

/**
 * Reusable Modal component with comprehensive prop support
 * 
 * @param {Object} props
 * @param {Object} props.post - Post data object to display
 * @param {Function} props.onClose - Close handler function
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {string} props.size - Modal size variant ('small', 'medium', 'large')
 * @param {boolean} props.showCloseButton - Whether to show close button
 * @param {boolean} props.closeOnOverlayClick - Whether clicking overlay closes modal
 */
export default function Modal({ 
	post, 
	onClose, 
	className = '',
	isOpen = true,
	size = 'medium',
	showCloseButton = true,
	closeOnOverlayClick = true
}) {
	// Don't render if modal is closed or no post data
	if (!isOpen || !post) {
		return null;
	}

	function handleOverlayClick(e) {
		if (closeOnOverlayClick && e.target === e.currentTarget) {
			onClose?.();
		}
	}

	function handleClose() {
		onClose?.();
	}

	// Handle escape key press
	React.useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};

		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	// Prevent body scroll when modal is open
	React.useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);

	// Smart content detection based on title
	const title = (post.title || '').toLowerCase();
	const isVideo = title.includes('video');
	const isGallery = title.includes('gallery');

	const sizeClasses = {
		small: 'modal--small',
		medium: 'modal--medium',
		large: 'modal--large'
	};

	// Render content based on type
	const renderContent = () => {
		if (isVideo) {
			return (
				<div className="modal-video">
					<div className="modal-video-placeholder">
						Video Player Placeholder
					</div>
				</div>
			);
		}

		if (isGallery) {
			return (
				<div className="modal-gallery">
					<div className="modal-gallery-grid">
						{[1, 2, 3, 4].map((item) => (
							<div key={item} className="modal-gallery-item">
								<div className="modal-gallery-placeholder">
									Image {item}
								</div>
							</div>
						))}
					</div>
				</div>
			);
		}

		return (
			<div className="modal-text custom-scrollbar">
				{sanitizeText(post.text) || 'No content available.'}
			</div>
		);
	};

	return (
		<div 
			className={`modal-overlay ${className}`.trim()} 
			onClick={handleOverlayClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby={`modal-title-${post.id || 'default'}`}
		>
			<div className={`modal-content ${sizeClasses[size] || sizeClasses.medium} custom-scrollbar`}>
				{showCloseButton && (
					<button 
						className="modal-close" 
						onClick={handleClose} 
						aria-label="Close modal"
						type="button"
					>
						×
					</button>
				)}
				<h2 
					id={`modal-title-${post.id || 'default'}`}
					className="modal-title"
				>
					{post.title || 'Untitled Post'}
				</h2>
				<div className="modal-meta">
					{post.autor && (
						<span className="modal-author">
							By {post.autor}
						</span>
					)}
					{post.date && (
						<span className="modal-date">
							{post.date}
						</span>
					)}
				</div>
				{renderContent()}
				
				{/* Share buttons */}
				<div className="modal-share">
					<span className="modal-share-label">Share:</span>
					<div className="modal-share-buttons">
						<button className="modal-share-btn" aria-label="Share on Facebook">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
							</svg>
						</button>
						<button className="modal-share-btn" aria-label="Share on Twitter">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
							</svg>
						</button>
						<button className="modal-share-btn" aria-label="Share on Pinterest">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146A9.957 9.957 0 0012 20c5.523 0 10-4.477 10-10S17.523 0 12 0z"/>
							</svg>
						</button>
						<button className="modal-share-btn" aria-label="Share via Email">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
