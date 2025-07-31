#!/bin/bash

echo "🚀 Building Epic Timeline for deployment..."

# Install dependencies
npm install

# Build the project
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build files are in the 'build' directory"
echo ""
echo "🌐 To deploy to Netlify:"
echo "1. Push this code to GitHub/GitLab"
echo "2. Connect your repository to Netlify"
echo "3. Set build command: npm run build"
echo "4. Set publish directory: build"
echo ""
echo "📦 Or drag and drop the 'build' folder to Netlify"
echo ""
echo "🎉 Your Epic Timeline is ready for deployment!"