# quiz
The goal of this project is create an app that will simulate a quiz.
# Setup project
`docker-compose up -d --build`
## Seed data
To add some example data into database run:
`docker exec -it backend python quiz/manage.py loaddata /usr/src/app/quiz/seed.json`

1. User admin
Login: admin
Pass: admin

2. Uswe joe
login: joe
pass: q1w2e3r4T%
