# Epic Timeline

A modern, epic timeline website built with React that showcases events with a stunning dark theme design. Features a simple CMS for managing timeline events and is ready for deployment on Netlify.

![Epic Timeline](https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop)

## ✨ Features

### Timeline View
- **Epic Dark Design**: Modern, sleek interface with dark theme and golden accents
- **Vertical Timeline Navigation**: Interactive timeline with event titles on the left and dates on the right
- **Central Media Display**: Large, prominent image display for selected events
- **Stacked Image Context**: Adjacent events shown as stacked images for visual context
- **Smooth Animations**: Framer Motion powered transitions and hover effects
- **Event Details**: Complete event information including body text, tags, and custom metadata

### CMS (Content Management System)
- **Add/Edit/Delete Events**: Full CRUD operations for timeline events
- **Image Management**: URL-based image system with preview functionality
- **Tag System**: Flexible tagging system for event categorization
- **Custom Metadata**: Extensible metadata fields for future customization
- **Real-time Preview**: Live preview of images and form data
- **Local Storage**: Data persistence using browser localStorage

### Technical Features
- **React 18**: Latest React features and hooks
- **Styled Components**: CSS-in-JS for maintainable styling
- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Works on desktop and mobile devices
- **No Backend Required**: Client-side only, perfect for static hosting
- **Netlify Ready**: Optimized for Netlify deployment

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd epic-timeline
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
epic-timeline/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Timeline.js      # Main timeline component
│   │   └── CMS.js          # Content management system
│   ├── context/
│   │   └── TimelineContext.js # State management
│   ├── App.js              # Main app component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json
├── netlify.toml            # Netlify configuration
└── README.md
```

## 🎨 Design Features

### Timeline Interface
- **Dark Frame**: Elegant dark border surrounding the timeline
- **Vertical Navigation**: Timeline events arranged vertically on left and right
- **Golden Highlights**: Selected events highlighted in golden yellow
- **Red Selection Line**: Dynamic red line connecting selected event
- **Central Focus**: Large image display in the center
- **Contextual Stacking**: Adjacent events shown as background images

### Color Scheme
- **Primary Background**: `#000000` (Pure Black)
- **Frame Background**: `#111111` (Dark Gray)
- **Accent Color**: `#ff4444` (Red)
- **Highlight Color**: `#ffd700` (Golden Yellow)
- **Text Colors**: `#ffffff` (White), `#cccccc` (Light Gray)

## 📝 Event Structure

Each timeline event contains:

```javascript
{
  id: "unique-id",
  title: "Event Title",
  date: "MAY 15",
  bodyText: "Event description...",
  imageUrl: "https://example.com/image.jpg",
  tags: ["Tag1", "Tag2", "Tag3"],
  metadata: {
    category: "Sports",
    location: "New York",
    // ... custom fields
  }
}
```

### Required Fields
- **title**: Event title (displayed on timeline)
- **date**: Event date (displayed on timeline)
- **bodyText**: Event description
- **imageUrl**: Image URL for the event

### Optional Fields
- **tags**: Array of tags for categorization
- **metadata**: Object for custom fields (fully customizable)

## 🛠️ CMS Features

### Adding Events
1. Navigate to the CMS page (`/cms`)
2. Click "Add Event" button
3. Fill in the required fields:
   - Title
   - Date
   - Body Text
   - Image URL
4. Add optional tags and metadata
5. Click "Add Event" to save

### Editing Events
1. Click on any event in the events list
2. Modify the fields as needed
3. Click "Update Event" to save changes

### Custom Metadata
- Add custom fields like "category", "location", "attendees", etc.
- Each event can have different metadata fields
- Metadata is displayed below the event details on the timeline

## 🚀 Deployment

### Netlify Deployment

1. **Connect to Netlify**
   - Push your code to GitHub/GitLab
   - Connect your repository to Netlify

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: `18`

3. **Environment Variables** (if needed)
   - Add any environment variables in Netlify dashboard

4. **Deploy**
   - Netlify will automatically build and deploy your site

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload to Netlify**
   - Drag and drop the `build` folder to Netlify
   - Or use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=build
   ```

## 🎯 Customization

### Adding New Features
- **Video Support**: Extend the image system to support video URLs
- **Categories**: Add category filtering to the timeline
- **Search**: Implement search functionality
- **Export/Import**: Add data export/import capabilities
- **Themes**: Create multiple theme options

### Styling Customization
- Modify colors in the styled components
- Adjust animations in Framer Motion components
- Customize typography in the global CSS
- Add new visual effects and transitions

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Adding Dependencies

```bash
npm install package-name
```

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use styled-components for styling
- Implement proper error handling

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Built with ❤️ using React, Styled Components, and Framer Motion**