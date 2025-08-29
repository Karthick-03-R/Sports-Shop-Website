# Online Sports Shopping (React + MUI + JSON Server)

**What this project contains**
- `frontend/` : React app (Material-UI) with Products, Product Detail, Cart and routing.
- `backend/db.json` : JSON Server data (products).
- This is a small "Flipkart-like" sports shopping sample for learning and as a task submission.

---

## How to run locally (start to end)

1. Make sure you have **Node.js (>=14)** and **npm** installed.
2. Open two terminals.

**Terminal 1 — start JSON Server (backend)**
```bash
# from project root
npx json-server --watch backend/db.json --port 5000
```
This will expose the API at `http://localhost:5000/products`

**Terminal 2 — start React frontend**
```bash
cd frontend
npm install
npm start
```
Frontend runs at `http://localhost:3000` by default and will call the JSON server API.

---

## Build & Deployment (overview)

### Frontend (Netlify / Vercel / GitHub Pages)
1. Create a GitHub repository and push this project (only the `frontend` folder is required for frontend hosting).
2. For Netlify/Vercel: connect the repo, set the build command `npm run build` and the publish directory to `frontend/build` (or follow Vercel defaults).
3. Make sure the frontend calls an accessible backend API (not `localhost`) — either:
   - Deploy `db.json` as a lightweight JSON server on a hosting service (Render / Railway / Fly / Heroku-like), or
   - Replace API calls with a hosted mock (e.g., Firebase / Supabase / hosted REST).

### Backend (JSON Server) deployment (suggested)
- Deploy the `backend/db.json` to a service like Render or Railway and start with:
  ```
  npx json-server --watch db.json --port $PORT
  ```
  Set the service port to the provided `$PORT` by the platform.

---

## Folder structure
```
online-sports-shop/
├─ backend/
│  └─ db.json
├─ frontend/
│  ├─ public/
│  │  └─ index.html
│  └─ src/
│     ├─ components/
│     ├─ context/
│     └─ index.js, App.js ...
└─ README.md
```

---

## Notes
- This is a learning/sample project. For production apps you'd use a real backend, authentication, database, and secure payment integrations.
- If you need me to customize styles, add authentication, or convert this to a full MERN stack with a real backend, tell me which features you want and I will update the code.