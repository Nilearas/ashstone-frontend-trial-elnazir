import React, { useState } from 'react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import './Navbar.css';

const menu = [
  { 
    label: 'Demos', 
    href: '#demos',
    submenu: [
      { label: 'Classic Blog', href: '#classic-blog' },
      { label: 'Grid Layout', href: '#grid-layout' },
      { label: 'Creative Feed', href: '#creative-feed' }
    ]
  },
  { 
    label: 'Post', 
    href: '#post',
    submenu: [
      { label: 'Post Header', href: '#post-header' },
      { label: 'Post Layout', href: '#post-layout' },
      { label: 'Share Button', href: '#share-button' },
      { label: 'Gallery Post', href: '#gallery-post' },
      { label: 'Video Post', href: '#video-post' }
    ]
  },
  { 
    label: 'Features', 
    href: '#features',
    submenu: [
      { label: 'Typography', href: '#typography' },
      { label: 'Colors', href: '#colors' },
      { label: 'Components', href: '#components' },
      { label: 'Utilities', href: '#utilities' }
    ]
  },
  { 
    label: 'Categories', 
    href: '#categories',
    submenu: [
      { label: 'Lifestyle', href: '#lifestyle' },
      { label: 'Style', href: '#style' },
      { label: 'Travel', href: '#travel' },
      { label: 'Music', href: '#music' },
      { label: 'Events', href: '#events' }
    ]
  },
  { 
    label: 'Shop', 
    href: '#shop',
    submenu: [
      { label: 'Products', href: '#products' },
      { label: 'Collections', href: '#collections' },
      { label: 'Deals', href: '#deals' },
      { label: 'Support', href: '#support' }
    ]
  },
  { label: 'Buy Now', href: '#buy-now', isCTA: true }
];

export default function Navbar() {
  const { isVisible } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSubmenus, setExpandedSubmenus] = useState({});

  const toggleSubmenu = (index) => {
    setExpandedSubmenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSearchClick = () => {
    // Toggle search input visibility
    const searchContainer = document.querySelector('.post-list__search-container');
    const searchInput = document.querySelector('.post-list__search');
    
    if (searchContainer && searchInput) {
      const isVisible = searchContainer.classList.contains('post-list__search-container--visible');
      
      if (isVisible) {
        searchContainer.classList.remove('post-list__search-container--visible');
        searchInput.value = '';
        // Trigger search change to clear results
        const event = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(event);
      } else {
        searchContainer.classList.add('post-list__search-container--visible');
        setTimeout(() => {
          searchInput.focus();
        }, 300); // Wait for animation
      }
    }
  };

  return (
    <>
      <nav className={`navbar${isVisible ? '' : ' navbar--hidden'}`}>
        <div className="navbar__container">
          {/* Mobile Header - Hamburger Left, Logo Center, Search Right */}
          <div className="navbar__mobile-header">
            <button className="navbar__hamburger" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu">
              <span/>
              <span/>
              <span/>
            </button>
            <div className="navbar__logo">LOGOTYPE</div>
            <button className="navbar__search" onClick={handleSearchClick} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
          
          {/* Desktop Header - Logo Centered */}
          <div className="navbar__desktop-header">
            <div className="navbar__logo">LOGOTYPE</div>
          </div>
          
          {/* Desktop Navbar - Centered Below Logo */}
          <div className="navbar__nav-line">
            {/* Horizontal Menu - Main Navigation */}
            <ul className="navbar__menu">
              {menu.map((item, idx) => (
                <li key={idx} className={`navbar__item${item.submenu ? ' navbar__item--has-submenu' : ''}${item.isCTA ? ' navbar__item--cta' : ''}`}> 
                  <a href={item.href} className={item.isCTA ? 'navbar__cta' : ''}>
                    {item.label}
                    {item.submenu && (
                      <svg className="navbar__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </a>
                  {item.submenu && (
                    <ul className="navbar__submenu">
                      {item.submenu.map((sub, subIdx) => (
                        <li key={subIdx}><a href={sub.href}>{sub.label}</a></li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Mobile Sidebar */}
      <div className={`navbar__sidebar${mobileOpen ? ' navbar__sidebar--open' : ''}`}>
        <div className="navbar__sidebar-header">
          <div className="navbar__sidebar-logo">LOGOTYPE</div>
          <button className="navbar__sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close sidebar">×</button>
        </div>
        <div className="navbar__sidebar-content">
          <ul className="navbar__sidebar-menu">
            {menu.map((item, idx) => (
              <li key={idx} className="navbar__sidebar-item">
                <button 
                  className={`navbar__sidebar-link${item.submenu ? ' navbar__sidebar-link--has-submenu' : ''}`}
                  onClick={() => item.submenu ? toggleSubmenu(idx) : setMobileOpen(false)}
                >
                  {item.label}
                  {item.submenu && (
                    <svg className="navbar__sidebar-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                {item.submenu && (
                  <ul className={`navbar__sidebar-submenu${expandedSubmenus[idx] ? ' navbar__sidebar-submenu--open' : ''}`}>
                    {item.submenu.map((sub, subIdx) => (
                      <li key={subIdx}>
                        <a href={sub.href} onClick={() => setMobileOpen(false)}>{sub.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="navbar-placeholder" />
    </>
  );
}
