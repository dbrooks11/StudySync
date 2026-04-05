# StudySync
A web-based platform that helps university students find and organize study groups for their courses. Students can register, show their courses, post study sessions, and join sessions created by other students.

## Tech Stack
 
- **Backend** — Flask (Python 3.12) + psycopg2 (raw SQL)
- **Frontend** — React (Node 20)
- **Database** — PostgreSQL 16
- **Containerization** — Docker + Docker Compose

## Prerequisites
 
You need **Git** and **Docker Desktop** installed before anything else.
 
### Install Git
 
- **Windows / macOS**: https://git-scm.com/downloads
- **Linux**: `sudo apt install git`
 
### Install Docker Desktop
 
Docker Desktop includes both Docker and Docker Compose.
 
- **Windows / macOS**: https://www.docker.com/products/docker-desktop
- **Linux**: https://docs.docker.com/engine/install/

## Getting Started
1. Clone the repo from github
  - Click the bright green button that says "Code" on the repo page
  - Click 'SSH'. You can also use HTTPS but SSH is usually more secure since it ask for a password before doing certain actions (you can choose which link based on your personal preference)
  - Copy the link
  - In your IDE (such as VS code), go to the project root folder (or make one)
  - open the terminal in your IDE while in the root folder and type "git clone copiedlinkgoeshere"
  - type in your password (if it ask for one) and it should clone the repo

2. Set up environment variables
 
Make a new file called `.env` in the root dir, copy all the variables from `.env.example` into it, and change the `SECRET_KEY` variable (leave the .env.example file):
 
For example:

```
POSTGRES_USER=studysync
POSTGRES_PASSWORD=studysync123
POSTGRES_DB=studysync_db
 
FLASK_ENV=development
SECRET_KEY=pick_any_long_random_string_here (or use a secret key generator)
```
 
> Note: **Never commit your `.env` file.** It's already in `.gitignore` so this should not be an issue.

3. Start virtual environment for python

There are 2 ways this can be done:

> If using an IDE such as VS code, open the command Pallete (should be ctrl+shift+p) or open the bar up top that allows you to search. Type ">" and search (or select) "Python: Create Environment". Select "venv" and select the python version 3.12 (you will need to install python 3.12 from the internet first)

> Another way is to open your terminal and type:

  ```bash
  python3 -m venv venv
  ```
  
  Activate it:
  
  - **macOS / Linux**: `source venv/bin/activate`
  - **Windows (CMD)**: `venv\Scripts\activate.bat`
  - **Windows (PowerShell)**: `venv\Scripts\Activate.ps1`
  
  Install dependencies:
  
  ```bash
  cd backend
  pip install -r requirements.txt
  ```

4. Running the App with Docker
From the **root of the project** (where `docker-compose.yml` is), open your terminal and type:
 
```bash
docker compose up --build
```
 
This will:
1. Pull the PostgreSQL 16 image
2. Build the Flask backend image
3. Build the React frontend image
4. Start all three containers and link them together
 
First run takes a few minutes while Docker downloads and builds everything. You only need to do this once unless you install new modules into the backend or frontend, change the env file, or edit any docker files otherwise your changes wont be reflected while using docker.

Whenever you want to start the project up (without rebuilding the docker containers) just run:

```bash
docker compose up
```
 
Once everything is running, open your browser:
 
| Service | URL |
| Frontend (React) | http://localhost:5173 |
| Backend API (Flask) | http://localhost:5000 |
| PostgreSQL | localhost:5432 |
 
You can also open the **Docker Desktop App**, go to containers (make sure the containers are running), and click the urls from the running services. 

### Stop the app
When youre done with your work for the day, shut down the containers (frees up the resources)

```bash
docker compose down
```
 
To also delete the database volume (wipe all data if need be):
 
```bash
docker compose down -v
```

Since this is all local, docker uses actual space on your computer to run these services. Each setup is individual so none of the data in your databases is shared so feel free to play around with your database as you please. 


## Common Issues
 
**Port already in use**
If you see an error like `port 5432 is already allocated`, you have PostgreSQL running locally on your machine. Either stop it or change the port in `docker-compose.yml`:
```yaml
ports:
  - "5432:5432"   # use 5432 on your machine instead
```
 
**Docker Desktop not running**
If `docker compose up` throws a connection error, make sure Docker Desktop is open and fully started (not still loading).
 
**Changes not reflecting**
The backend and frontend volumes are mounted live, so code changes should reflect immediately. If they don't, restart the containers:

```bash
docker compose restart
```

You can also restart individual services incase they fail. For example, the frontend and backend automatically refresh for you when making code changes. If the frontend stops refreshing for some reason, you can do:

```bash
docker compose restart frontend
```

You can do the same for other services (the names of the services are in the `docker-compose.yml` file)

There can be some instances where the issue lies directly in the port used. For example, the frontend runs on port 5173. When the browser hot reloads, sometimes the port can become "zombified". Use `npx kill port` command (make sure youre in directory where the port applies, if possible. You may or may not also need to install this package) then restart the docker container for that service.

```bash
npx kill port 5173
```
 
**Rebuilding after dependency changes**
If you add packages to `requirements.txt` or `package.json`, you need to rebuild:
```bash
docker compose up --build
```
 
---
 
## Database Access
 
To open a PostgreSQL shell inside the running container:
 
```bash
docker compose exec db psql -U studysync -d studysync_db
```
 
Useful psql commands:
- `\dt` — list all tables
- `\d table_name` — describe a table
- `\q` — quit

You can also use an app like **DBeaver** to edit and see data inside your local database a lot easier. 
---
 
## Contributing
 
### Full workflow
 
**1. Before starting any work, pull the latest changes from main:**
```bash
git pull origin main
```
 
**2. Create and switch to a new feature branch:**
`git checkout` switches to a branch. The `-b` flag creates a branch. So this command creates a branch with the name given and switches to it. 

```bash
git checkout -b your-feature-branch-name
```
 
**3. Make your file changes, then stage all modified files before commiting:**
```bash
git add .
```
 
**4. Commit your staged changes with a clear message:**
The "-m" flag allows you to add an inline message to your command. You also just do `git commit` and VS code will automatically open a new commit file for you to write your message to (just click the check mark near the top right of the file to commit your message/changes).

```bash
git commit -m "add: short description of what you did"
```
 
**5. Push your feature branch and changes to GitHub:**
```bash
git push origin your-feature-branch-name
```
> This saves your work to the remote repo. Do this before touching main.
 
**6. Switch back to main:**
```bash
git checkout main
```
> If you're using VS Code, you can also switch branches by clicking the branch name in the **bottom-left corner** of the window and selecting the branch you want.
 
**7. Pull main again in case someone else pushed changes while you were working:**
```bash
git pull origin main
```
 
**8. Merge your feature branch into main:**
```bash
git merge your-feature-branch--name
```
 
**9. Push the updated main to GitHub (This updates the main branch in the repo):**
```bash
git push origin main
```

10. **Swap back to your feature branch and continue working**
Use the command below or swap using VS Code shortcut.

```bash
git checkout feature-branch-name
```

Note: to see all of your branches you can use `git branch`.

### Tips
- Never work directly on main — always create a feature branch first
- Always re-pull main (step 7) before merging — skipping this is the most common cause of conflicts
- Keep branches focused on one feature or fix at a time
- If you run into a merge conflict, VS Code highlights the conflicts inline and lets you choose which changes to keep
--- 