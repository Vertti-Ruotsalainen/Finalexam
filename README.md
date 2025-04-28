# Personal Profile App

**Description**  
A simple personal profile web application built with React for the frontend and Node.js/Express for the backend. It displays hardcoded student information and allows adding, editing, and deleting courses stored in a JSON file.

---

## Prerequisites

- Node.js (v14 or later)
- npm
- (Optional) pm2 for production process management

---

## Local Development

1. **Clone the repo**
   ```bash
   git clone https://github.com/Vertti-Ruotsalainen/Finalexam.git personal-profile-app
   cd personal-profile-app
   ```

2. **Install dependencies & start backend**
   ```bash
   cd backend
   npm install
   npm start           # runs on http://localhost:5000
   ```

3. **Install dependencies & start frontend**
   ```bash
   cd ../frontend
   npm install
   npm start           # runs on http://localhost:3000 (proxies API to port 5000)
   ```

Open your browser at [http://localhost:3000](http://localhost:3000) to use the app.

---

## Production Deployment on Debian VM

1. **Update & install build tools**
   ```bash
   sudo apt update
   sudo apt install -y curl git build-essential
   ```

2. **Install Node.js (LTS)**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt install -y nodejs npm
   ```

3. **Clone & update code**
   ```bash
   cd ~
   git clone https://github.com/Vertti-Ruotsalainen/Finalexam.git personal-profile-app
   cd personal-profile-app
   # or if already cloned:
   # git pull origin main
   ```

4. **Backend**
   ```bash
   cd backend
   npm install
   npm install -g pm2       # optional
   pm2 start server.js --name personal-backend
   ```

5. **Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run build           # outputs to frontend/build/
   npm install -g serve    # or use nginx
   serve -s build -l 3000  # serve static site on port 3000
   pm2 start "serve -s build -l 3000" --name personal-frontend
   ```

6. **Enable on reboot**
   ```bash
   pm2 save
   pm2 startup systemd
   ```

Your API is available at `http://<VM-IP>:5000`, and the React app at `http://<VM-IP>:3000`.

---

## Testing

- **API test**:
  ```bash
  curl http://localhost:5000/courses
  ```
- **Add a course**:
  ```bash
  curl -X POST http://localhost:5000/courses \
    -H "Content-Type: application/json" \
    -d '{"name":"Sample","grade":"A"}'
  ```
- **UI test**: open the frontend URL, add/edit/delete courses via the form.  
- **Data persistence**: verify `backend/courses.json` contains changes.

---


## SCREENSHOTS
![localhoost](https://github.com/user-attachments/assets/35ab189e-9d2b-43da-b9f7-2468151c78c3)

![virtuaaalikone](https://github.com/user-attachments/assets/8a89632b-6adc-474a-8246-eaff3a443801)





