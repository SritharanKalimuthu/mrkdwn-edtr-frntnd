# 📝 Markdown Editor

A web-based Markdown editor built with NextJS (frontend) and Node.js + MongoDB (backend), with file storage integrated via Google Drive API. 

## 🚀 Features

- Create, edit, and save markdown documents.
- List all your markdown boards.
- Auto-sync with Google Drive for file storage.
- Open and render markdown content dynamically on board click.
- MongoDB-backed metadata storage.

## 📁 Project Structure

### Frontend (NextJS)
- Lists markdown boards.
- Redirects to `/pages/board/:fileId` to view & edit individual markdown files.
- Loads markdown content dynamically using `fileId`.

### Backend (Node.js + Express)
- Handles Google Drive API authentication.
- CRUD operations for files stored in Google Drive.
- MongoDB stores metadata (file info, user data, etc.).

## ⚙️ Tech Stack

- **Frontend**: NextJS, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Cloud Storage**: Google Drive API

## 🧑‍💻 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/SritharanKalimuthu/markdown-editor
cd markdown-editor
```

### 2. Install dependencies

#### Backend
```bash
cd markdown-editor-backend
npm install
```

#### Frontend
```bash
cd markdown-editor-frontend
npm install
```

### 3. Environment Setup

#### Backend `.env` example:
```env
PORT=3000
MONGO_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
REDIRECT_URI=your_oauth_redirect_uri
REFRESH_TOKEN=your_refresh_token
```

### 4. Run the App

#### Backend
```bash
cd markdown-editor-backend
npm run dev
```

#### Frontend
```bash
cd markdown-editor-frontend
npm run dev
```

## 🛡️ Troubleshooting

- `ETIMEDOUT` MongoDB errors? → Check your IP whitelist in [MongoDB Atlas](https://cloud.mongodb.com).
- Google Drive auth issues? → Refresh the token and ensure correct OAuth scopes.

## 📄 License

MIT

---
