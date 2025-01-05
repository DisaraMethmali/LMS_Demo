# LMS_Demo
Here are the commands to set up the Flask and React + Vite project:

### 1. **Setting Up Flask Backend**

```bash
# Create project directory
mkdir flask-react-vite
cd flask-react-vite

# Create and set up Flask backend
mkdir backend
cd backend
python -m venv venv               # Create virtual environment
source venv/bin/activate          # Activate virtual environment (for Linux/Mac)
# For Windows
# venv\Scripts\activate
pip install Flask flask-cors      # Install Flask and CORS


# Run Flask app
flask run
```

### 2. **Setting Up React + Vite Frontend**

```bash
# Create React project using Vite
cd ..
npm create vite@latest frontend --template react
cd frontend

# Install dependencies
npm install

# Set up Vite proxy for Flask API in vite.config.js
echo "import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  # Proxy Flask API requests
    },
  },
})" > vite.config.js

# Run React frontend
npm run dev
```

### 3. **Testing**

```bash
# Run Flask backend
flask run

# Run React frontend
npm run dev
```

React will be available at `http://localhost:5173` and Flask at `http://localhost:5000`.
