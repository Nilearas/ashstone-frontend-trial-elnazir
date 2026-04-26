# Frontend Elnazir - React Blog UI

A pixel-perfect blog interface built with React and Vite, featuring responsive design, functional navigation, and modern UI patterns. This project demonstrates advanced frontend development with strict adherence to Figma specifications and robust modal scroll management.

## 🚀 Overview

This project is a comprehensive React blog application that showcases modern frontend development practices. Built with Vite for optimal performance, it features a clean white aesthetic, functional navigation with dropdowns, search functionality, and responsive post grid layout. The application is optimized for both desktop and mobile experiences with smooth animations, professional styling, and robust modal scroll management.

## ✨ Core Features

### 1. Responsive Navigation System
- **Desktop**: Centered LOGOTYPE with horizontal navigation menu
- **Mobile**: Hamburger (left), LOGOTYPE (center), Search (right) layout
- **CSS-only Dropdowns**: Hover-based submenus for Demos, Post, Features, Categories
- **Sticky Header**: Intelligent hide/show behavior on scroll (200px threshold)
- **Buy Now Button**: Clean text link styling matching other navigation items

### 2. Advanced Search Functionality
- **Toggle Search**: Click search icon to reveal/hide search input
- **Real-time Filtering**: Case-insensitive search across titles, content, and authors
- **Smooth Animations**: CSS transitions for search input appearance
- **Instant Results**: Dynamic post filtering as you type

### 3. Post Grid System
- **Responsive Layout**: 3-column desktop, 2-column tablet, 1-column mobile
- **Pixel Perfect**: Exact px spacing (24px desktop, 20px tablet, 16px mobile)
- **Post Cards**: Clean white design with red category tags
- **Metadata Layout**: Author, date, and views positioned below title
- **Retina Images**: srcset support for high-resolution displays

### 4. Modern UI Design
- **Pure White Background**: Clean, minimalist aesthetic throughout
- **Typography**: Roboto font with rem units for scalable text
- **Color Scheme**: Black text, red accents, muted grey metadata
- **Custom Scrollbar**: 6px dark scrollbar (#1A1A1A) with border-radius
- **Micro-interactions**: Smooth hover states and transitions

### 5. Modal System
- **Post Details**: Click any post to view full information
- **Smart Content**: Video, gallery, and text post detection
- **Share Functionality**: Built-in share buttons with hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Scroll Management**: Robust scroll restoration and scrollbar prevention
- **Figma Compliance**: Pure white background, black text, proper color palette

### 6. Performance Optimizations
- **Lazy Loading**: Images load as needed for better performance
- **Memoization**: Optimized search filtering with useMemo
- **RequestAnimationFrame**: Smooth scroll animations
- **Code Splitting**: Optimized bundle size for faster loading

## 🛠 Technical Stack

### Core Technologies
- **React 18**: Modern React with functional components and hooks
- **Vite**: Fast build tool with optimized development experience and production builds
- **CSS3**: Custom CSS with modern features (flexbox, grid, custom properties)
- **JavaScript ES6+**: Modern JavaScript with async/await and destructuring

### Architecture Decisions
- **Component-Based**: Modular, reusable React components
- **Custom Hooks**: Encapsulated logic for scroll behavior and data fetching
- **CSS-Only Dropdowns**: Reliable hover-based navigation without JavaScript
- **Responsive Design**: Mobile-first approach with media queries
- **Performance Optimization**: Memoization, lazy loading, and efficient rendering

### Data Management
- **API Integration**: Fetch posts from external JSON endpoint
- **Error Handling**: Graceful fallbacks for network failures
- **Data Sanitization**: Text cleaning and validation utilities
- **State Management**: React hooks for local state and side effects

## 📋 Prerequisites

- Node.js 16+ 
- npm package manager

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Opens the development server at `http://localhost:3000`

### Production Build
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing

## 🏗 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx      # Main navigation component
│   │   └── Navbar.css      # Navigation styles
│   ├── Posts/
│   │   ├── PostCard.jsx    # Individual post card component
│   │   ├── PostCard.css    # Post card styles
│   │   ├── PostList.jsx    # Post grid and search component
│   │   └── PostList.css    # Post list styles
│   └── UI/
│       ├── Modal.jsx        # Modal popup component
│       └── Modal.css        # Modal styles
├── hooks/
│   ├── useScrollDirection.js  # Scroll behavior hook
│   └── useFetchPosts.js       # Data fetching hook
├── utils/
│   └── textUtils.js         # Text processing utilities
├── App.jsx                  # Main application component
├── index.css                # Global styles
└── index.jsx                # Application entry point
```

## 🎯 Key Technical Implementations

### Scroll Direction Hook
```javascript
// Optimized scroll detection with requestAnimationFrame
// Handles edge cases and prevents layout shift
const { direction, scrollY, isVisible } = useScrollDirection();
```

### Responsive Grid System
```css
/* 3-column desktop, 2-column tablet, 1-column mobile */
.post-card {
  flex: 0 0 calc(33.333% - 16px);
}
```

### Custom Scrollbar
```css
/* Consistent dark theme scrollbar across all scrollable areas */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #4A4A4A #1A1A1A;
}
```

## 🔧 Development Features

- **Hot Module Replacement** for instant development feedback
- **Component Documentation** with comprehensive JSDoc comments
- **Error Handling** and debugging utilities
- **Performance Monitoring** with build optimization
- **Responsive Design Testing** across all device sizes

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

## 🚀 Vercel Deployment

This project is optimized for Vercel deployment:

### Automatic Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect it's a Vite project
4. Deploy with one click

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel (requires Vercel CLI)
vercel --prod
```

### Environment Variables (if needed)
Create a `.env.local` file for development:
```bash
VITE_API_URL=https://your-api-endpoint.com
```

### Deployment Configuration
The project includes:
- **vercel.json**: Custom deployment settings with distDir: "dist"
- **dist/** folder: Optimized production bundle
- **Static assets**: Properly served and cached

## 📦 Build Optimization

- **Bundle Size**: ~158KB (gzipped) for optimal loading
- **Code Splitting**: Automatic splitting for better performance
- **Asset Optimization**: Images and CSS minified
- **Tree Shaking**: Unused code automatically removed
- **Fast Builds**: Vite's optimized bundling for faster development and production builds

## 🤝 Contributing

This project serves as a technical demonstration. For production use, consider:
- Adding unit and integration tests
- Implementing CI/CD pipelines
- Adding content management capabilities
- Extending accessibility features

## 📄 License

This project is part of a technical challenge assessment.

---

**Built with ❤️ using React, Vite, and modern web standards**
