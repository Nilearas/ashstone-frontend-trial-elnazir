/**
 * Text utility functions for data sanitization and cleaning
 */

/**
 * Sanitize text by removing encoding artifacts and replacing them with proper characters
 * @param {string} text - The text to clean
 * @returns {string} - The cleaned text
 */
export function sanitizeText(text) {
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
 * Format tags for display - convert to uppercase and clean
 * @param {string|Array} tags - Tags to format
 * @returns {string} - Formatted tag string
 */
export function formatTags(tags) {
	if (!tags) return '';
	
	if (Array.isArray(tags)) {
		return tags.map(tag => sanitizeText(tag).toUpperCase()).join(', ');
	}
	
	return sanitizeText(tags).toUpperCase();
}
