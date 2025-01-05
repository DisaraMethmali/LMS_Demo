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

# Install Flask and CORS
pip install Flask flask-cors      

Replace username, password, and lms_demo with your actual MySQL username, password, and the database name you created.

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
