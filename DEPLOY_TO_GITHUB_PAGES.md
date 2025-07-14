# 🚀 Deploy BundleCraft to GitHub Pages

This guide will help you deploy your BundleCraft application to GitHub Pages with automatic CI/CD deployment.

## 📋 What's Already Configured

✅ **GitHub Actions Workflow** - Automatic deployment on push to main  
✅ **gh-pages Package** - Manual deployment option  
✅ **SPA Routing Support** - 404.html handles client-side routing  
✅ **Optimized Build** - Production-ready React build  
✅ **SEO Ready** - Meta tags and social media optimization  

## 🔧 Quick Setup (5 minutes)

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it: `bundlecraft-frontend` (or any name you prefer)
3. Make it **public** (required for free GitHub Pages)
4. Don't initialize with README (we already have one)

### Step 2: Initialize Git and Push

```bash
# Navigate to your project
cd c:/Users/jtorc/Desktop/bundlecraft-frontend

# Initialize git
git init
git add .
git commit -m "Initial commit: BundleCraft ready for GitHub Pages"

# Connect to GitHub
git remote add origin https://github.com/jpwiggins/bundlecraft-frontend.git
git branch -M main
git push -u origin main
```

### Step 3: Update Configuration

**✅ Already Updated:**
```json
"homepage": "https://jpwiggins.github.io/bundlecraft-frontend"
```

**✅ Meta tags already updated:**
```html
<meta property="og:url" content="https://jpwiggins.github.io/bundlecraft-frontend/" />
<meta property="twitter:url" content="https://jpwiggins.github.io/bundlecraft-frontend/" />
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select **"GitHub Actions"**
5. Save the settings

### Step 5: Deploy

```bash
# Commit your configuration changes
git add package.json public/index.html
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

**That's it!** GitHub Actions will automatically build and deploy your app.

## 🌐 Access Your Live App

Your app will be available at:
```
https://jpwiggins.github.io/bundlecraft-frontend/
```

Deployment usually takes 2-5 minutes. Check the **Actions** tab in your repository to monitor progress.

## 🔄 Automatic Deployments

Every time you push to the `main` branch:
1. GitHub Actions runs automatically
2. Installs dependencies with `npm ci`
3. Builds the React app with `npm run build`
4. Deploys to GitHub Pages

## 🛠️ Manual Deployment (Alternative)

You can also deploy manually:

```bash
npm run deploy
```

This uses the gh-pages package to build and deploy directly.

## 📁 What's Included

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Automatic deployment on push to main
- Node.js 18 environment
- Optimized caching
- Error handling

### SPA Routing Support
- `public/404.html` - Handles client-side routing
- `public/index.html` - GitHub Pages routing script

### Production Optimizations
- Performance monitoring
- SEO meta tags
- Service worker ready
- Error boundaries

## 🐛 Troubleshooting

### Deployment Failed
- Check **Actions** tab for error details
- Ensure repository is public
- Verify homepage URL in package.json

### App Not Loading
- Wait 5-10 minutes for DNS propagation
- Check browser console for errors
- Verify GitHub Pages is enabled in settings

### 404 Errors
- The 404.html file handles routing
- Make sure it exists in the public folder
- Check that the routing script is in index.html

## 🎯 Features Working on GitHub Pages

✅ **Landing Page** - Hero section, pricing, features  
✅ **Authentication** - Sign up/login flow  
✅ **Dashboard** - Product import, bundle creation  
✅ **Bundle Creator** - 2-8 product selection, 15% discount  
✅ **Etsy Listing Generator** - Copy-paste ready listings  
✅ **Responsive Design** - Works on all devices  
✅ **Performance Optimized** - Fast loading times  

## 🚀 Next Steps

After deployment:

1. **Test all functionality** on the live site
2. **Share your app** with users
3. **Set up custom domain** (optional)
4. **Monitor performance** using built-in analytics
5. **Update content** as needed

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Verify all configuration files
3. Ensure repository is public
4. Wait for DNS propagation

---

## 🎉 Success!

Your BundleCraft app is now live at:
**https://YOUR_USERNAME.github.io/bundlecraft-frontend/**

Perfect for:
- Showcasing to potential users
- Testing all features
- Sharing with stakeholders
- Production use

**Enjoy your deployed BundleCraft application!** 🎯