# 🎬 MovieMate

MovieMate is a full-stack movie and TV show tracking web app. Users can securely sign up, log in, and manage their personal watchlist with features like filtering, updating, and browsing—all with a clean UI.

---

## 🚀 Tech Stack

- **Frontend**: React.js (with CSS)
- **Backend**: Django REST Framework
- **Database**: SQLite
- **Authentication**: Token-based using `djangorestframework-simplejwt`

---

## 📦 Features

- 🔐 User Signup/Login
- 🎥 Add Movies/TV Shows
- 📄 View All Entries with Timestamp
- 🎛️ Filter by:
  - Genre
  - Platform
  - Watch Status
- 📝 Edit Movies/TV Shows
- 🔐 Token-Based Authentication
- 📑 Protected API Endpoints
- 🚪 Logout

---

## ⚙️ Setup Steps

### Backend (Django)
```bash
# 1. Navigate to backend
cd moviemate-backend

# 2. Create virtual environment (optional but recommended)
python -m venv env
env\Scripts\activate  # On Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run migrations
python manage.py migrate

# 5. Start backend server
python manage.py runserver
```
### Frontend (React)
```bash
# 1. Navigate to frontend
cd moviemate-frontend

# 2. Install dependencies
npm install

# 3. Start frontend server
npm start
```

---

### 🙌 Author

- **Meghana Santhosh**  
  GitHub: [@meghanasanthosh1907](https://github.com/meghanasanthosh1907)

---

### 📜 License

This project is open-source and free to use.

