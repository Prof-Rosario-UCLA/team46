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
2) Setup REDIS and CloudSQL on Google Cloud
3) Configure github secrets
   DATABASE_URL=postgresql://<DB_USER>:<DB_PASSWORD>@<HOST>:<PORT>/<DB_NAME>?host=/cloudsql/<GCP_INSTANCE_CONNECTION_NAME>&schema=public              
       
    REDIS_URL=redis://<REDIS_HOST>:<REDIS_PORT>
   
    JWT_SECRET=your_jwt_secret
   
    JWT_EXPIRES="7d"
   
    OPENAI_API_KEY=your_openai_api_key
   
5) Add all files, commit and push to main
6) Go to github actions window/ should deploy CI/CD
7) Use Link



   

