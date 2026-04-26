import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for tracking scroll direction and managing navbar visibility
 * 
 * Logic:
 * - Navbar is always visible when scroll position < 200px from top
 * - When scrolling down beyond 200px, navbar hides to maximize content visibility
 * - When scrolling up from any position, navbar immediately shows for easy navigation
 * - Uses passive event listener for better performance
 * 
 * @returns {Object} { direction: 'up'|'down', scrollY: number, isVisible: boolean }
 */
export function useScrollDirection() {
	const [scrollY, setScrollY] = useState(() => {
		// Handle SSR case where window might not be available
		return typeof window !== 'undefined' ? window.scrollY : 0;
	});
	const [direction, setDirection] = useState('up');
	const [isVisible, setIsVisible] = useState(true);
	const lastScrollY = useRef(() => {
		return typeof window !== 'undefined' ? window.scrollY : 0;
	});

	useEffect(() => {
		// Skip if window is not available (SSR)
		if (typeof window === 'undefined') return;

		let ticking = false;
		
		function handleScroll() {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const currentY = window.scrollY;
					setScrollY(currentY);

					// Always show navbar when near the top (first 200px)
					if (currentY < 200) {
						setIsVisible(true);
					} else {
						// Hide when scrolling down, show when scrolling up
						if (currentY > lastScrollY.current) {
							setDirection('down');
							setIsVisible(false);
						} else if (currentY < lastScrollY.current) {
							setDirection('up');
							setIsVisible(true);
						}
					}
					lastScrollY.current = currentY;
					ticking = false;
				});
				ticking = true;
			}
		}

		// Use passive listener for better scroll performance
		window.addEventListener('scroll', handleScroll, { passive: true });
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return { direction, scrollY, isVisible };
}
