# 🎯 BundleCraft Frontend

**Turn Printify Products Into Profitable Bundles**

A production-ready React frontend for the BundleCraft SaaS application that helps users import Printify products, create smart bundles, and generate copy-paste ready Etsy listings.

## 🚀 Live Demo

- **Production URL**: [https://bundlecraft.netlify.app](https://bundlecraft.netlify.app)
- **Status**: ✅ Production Ready & Deployed

## ✨ Features

### 🔐 Authentication & Subscription
- Complete sign up/sign in flow
- Stripe subscription integration ready
- Monthly ($29) and yearly ($279) plans
- Secure user session management

### 📱 Modern UI/UX
- Professional React frontend
- Etsy/Printify-style design
- Fully responsive design
- Smooth scrolling navigation
- Interactive demo dashboard

### 📦 Product Management
- Printify API integration
- Product import functionality
- Dashboard to manage products
- Real-time product selection

### 🎯 Smart Bundling
- Create bundles with 2-8 products
- AI-powered pricing (15% discount)
- Auto-generated SKUs
- Optimized product combinations

### 📝 Etsy Listing Generator
- Copy-paste ready listings
- SEO-optimized titles & descriptions
- Smart tag generation
- Pricing optimization

### 📊 Production Features
- Error boundary for crash protection
- Performance monitoring
- Analytics tracking
- Service worker for offline support
- SEO optimization with meta tags
- Core Web Vitals monitoring

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Styling**: CSS-in-JS with responsive design
- **SEO**: React Helmet for meta tags
- **Performance**: Web Vitals monitoring
- **Deployment**: Netlify with optimized build
- **Analytics**: Custom analytics system
- **PWA**: Service worker support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bundlecraft-frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Development
```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build

# Analyze build
npm run build:analyze
```

## 🌐 Deployment

### Netlify Deployment (Recommended)

1. **Connect Repository**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`

2. **Environment Variables**
   ```
   REACT_APP_API_BASE_URL=https://your-backend-api.com
   REACT_APP_PRINTIFY_API_URL=https://api.printify.com/v1
   REACT_APP_APP_NAME=BundleCraft
   REACT_APP_APP_VERSION=1.0.0
   REACT_APP_ENABLE_ANALYTICS=true
   REACT_APP_ENABLE_ERROR_REPORTING=true
   REACT_APP_DEBUG_MODE=false
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AuthPage.js     # Authentication page
│   ├── Dashboard.js    # Main dashboard
│   ├── ErrorBoundary.js # Error handling
│   ├── LandingPage.js  # Landing page
│   ├── LoadingSpinner.js # Loading component
│   ├── Navbar.js       # Navigation
│   └── SEO.js          # SEO component
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication context
├── config/             # Configuration
│   └── config.js       # App configuration
├── utils/              # Utilities
│   ├── analytics.js    # Analytics system
│   └── performance.js  # Performance monitoring
├── App.js              # Main app component
└── index.js            # Entry point

public/
├── index.html          # HTML template
├── manifest.json       # PWA manifest
├── robots.txt          # SEO robots
├── sw.js              # Service worker
└── _redirects         # Netlify redirects
```

## 🎯 Production Checklist

- ✅ Error boundary implemented
- ✅ Performance monitoring active
- ✅ SEO optimization complete
- ✅ Service worker registered
- ✅ Analytics tracking enabled
- ✅ Responsive design tested
- ✅ Cross-browser compatibility
- ✅ Security headers configured
- ✅ Build optimization enabled
- ✅ Netlify deployment ready
- ✅ All navigation buttons working
- ✅ Hero section CTA functional
- ✅ Smooth scrolling implemented
- ✅ Demo dashboard interactive
- ✅ Pricing buttons connected
- ✅ Bundle creation working

---

**Status**: 🚀 Production Ready & Deployed
**Version**: 1.0.0
**Last Updated**: 2025