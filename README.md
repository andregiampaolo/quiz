# quiz
The goal of this project is create an app that will simulate a quiz.
# Setup project
`docker-compose up -d --build`
## Seed data
It's important add some data into project otherwise when user access the application
no quiz will be show. To add some example data into database run:
`docker exec -it backend python quiz/manage.py loaddata /usr/src/app/quiz/seed.json`

1. User admin
Login: admin
Pass: admin

2. Uswe joe
login: joe
pass: q1w2e3r4T%

## To access the project
1. access: `locahost:3000`
## To add more data
1. access: `localhost:8000/admin`
2. username: `admin` pass: `admin`

# To run some tests
1. `docker exec -it backend python aquiz.manage.py tests quizzes`