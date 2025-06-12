Instructions to Run


**Option A: Use Deployed Google Cloud Run Link**


Deployed Link(Google Cloud Run):

https://pantrypal-e4psc7htla-uc.a.run.app/

Login Information:

Email: pantryuser@example.com 

Password: secret123



**Option B: Run Locally**

1) git clone https://github.com/Prof-Rosario-UCLA/team46.git

2) cd pantrypal

3) npm install

4) Create .env file in root directory

    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   
    REDIS_URL=redis://localhost:6379
   
    JWT_SECRET=your_jwt_secret
   
    JWT_EXPIRES="7d"
   
    OPENAI_API_KEY=your_openai_api_key

6) Migrate and Seed Database

    npx prisma migrate deploy
    npx prisma db seed

7) np run dev


**Option C: Deploy to Google Cloud Yourself**

First do Option B(1-3)

1) Setup Github Actions(deploy.yml in /.github/workflows)
2) Configure github secrets
    DATABASE_URL=postgresql://pantryuser:test@localhost:5432/pantrypal?host=/cloudsql/team-46-pantrypal:us-central1:pantrypal-prod-db&schema=public
   
    REDIS_URL=redis://10.233.161.6:6379
   
    JWT_SECRET=your_jwt_secret
   
    JWT_EXPIRES="7d"
   
    OPENAI_API_KEY=your_openai_api_key
   
4) Add all files, commit and push to main
5) Go to github actions window/ should deploy CI/CD
6) Use Link



   

