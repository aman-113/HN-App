# HN App - Hacker News Clone

A full-stack web application that scrapes and displays Hacker News stories with user authentication and bookmarking functionality.

## 📁 Project Structure

```
HN-App/
├── Backend/                    # Node.js Express server
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # User auth logic
│   │   ├── scrapeController.js# Scraping logic
│   │   ├── scraper.js         # Web scraper utility
│   │   └── storyController.js # Story operations
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   └── errorHandler.js    # Error handling
│   ├── models/
│   │   ├── Story.js           # Story schema
│   │   └── User.js            # User schema with bookmarks
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   ├── scrape.js          # Scrape endpoints
│   │   └── stories.js         # Story endpoints
│   ├── server.js              # Express app setup
│   └── package.json
│
├── Frontend/                   # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js      # Navigation bar
│   │   │   ├── StoryCard.js   # Story display card
│   │   │   └── SkeletonLoader.js # Loading skeleton
│   │   ├── context/
│   │   │   └── AuthContext.js # Authentication context
│   │   ├── pages/
│   │   │   ├── HomePage.js    # Stories list
│   │   │   ├── BookmarksPage.js# Bookmarked stories
│   │   │   ├── LoginPage.js   # Login form
│   │   │   └── RegisterPage.js# Sign up form
│   │   ├── utils/
│   │   │   └── api.js         # API calls
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## 🚀 Features

### Backend
- ✅ User authentication (Register, Login, JWT tokens)
- ✅ MongoDB database with user and story models
- ✅ Web scraping from Hacker News
- ✅ Story pagination and sorting
- ✅ Bookmark functionality (add/remove/get bookmarked stories)
- ✅ Error handling middleware
- ✅ Protected routes with JWT

### Frontend
- ✅ React-based UI
- ✅ User authentication pages (Login, Register)
- ✅ Home page with paginated story list
- ✅ Bookmarks page for saved stories
- ✅ Bookmark toggle functionality
- ✅ Responsive design
- ✅ Skeleton loading states
- ✅ Auth context for state management

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT authentication
- bcryptjs for password hashing

**Frontend:**
- React.js
- Context API for state management
- Axios for API calls
- CSS for styling

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user

### Stories
- `GET /api/stories` - Get all stories (with pagination)
- `GET /api/stories/:id` - Get single story
- `GET /api/stories/bookmarked` - Get user's bookmarks (requires auth)
- `POST /api/stories/:id/bookmark` - Toggle bookmark (requires auth)

### Scraping
- `POST /api/scrape` - Scrape Hacker News stories

## 🔧 Installation & Setup

### Backend Setup

```bash
cd Backend
npm install

# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5000

npm start
```

### Frontend Setup

```bash
cd Frontend
npm install

# Create .env file with:
# REACT_APP_API_URL=http://localhost:5000/api

npm start
```

## 📚 Key Functionalities

### Bookmark System
- Users can bookmark stories by clicking the bookmark button
- Toggle bookmark on/off
- View all bookmarked stories on dedicated page
- Bookmarks are stored in user document

### Pagination
- Stories are paginated with configurable page size
- Query parameters: `?page=1&limit=10`
- Response includes pagination metadata (total, totalPages, hasNextPage, hasPrevPage)

### Authentication
- JWT-based authentication
- Protected routes require valid token
- Password hashing with bcryptjs
- Token stored in browser localStorage (Frontend)

## 🔐 Authentication Flow

1. User registers with username, email, password
2. Password is hashed and stored
3. User logs in with email/password
4. JWT token is issued
5. Token sent with every protected request
6. Token verified by `protect` middleware

## 📖 Usage Examples

### Get Stories with Pagination
```bash
GET /api/stories?page=1&limit=20
```

### Bookmark a Story
```bash
POST /api/stories/{storyId}/bookmark
Headers: Authorization: Bearer {token}
```

### Get My Bookmarks
```bash
GET /api/stories/bookmarked
Headers: Authorization: Bearer {token}
```

## 📝 Notes

- Old duplicate files (root level config, package.json, server.js) have been removed
- Frontend folder added to repository
- All code is tracked with git commits

## 🚀 Deployment

Ready to deploy on services like:
- Backend: Heroku, Vercel, Railway, AWS
- Frontend: Vercel, Netlify, GitHub Pages
- Database: MongoDB Atlas

## 📄 License

This project is open source.

## 👨‍💻 Author

Created as a Hacker News clone application demonstrating full-stack development.
