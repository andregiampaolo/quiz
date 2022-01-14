# pull python image
FROM python:3.9-alpine

# set work directory
WORKDIR /usr/src/app

# copy dependencies file
COPY ./requirements.txt .

# install dependencies
RUN pip install --upgrade pip
RUN apk add --no-cache postgresql-libs && \
  apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
  python3 -m pip install -r requirements.txt --no-cache-dir && \
  apk --purge del .build-deps

# copy project
COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && python /usr/src/app/quiz/manage.py migrate && python /usr/src/app/quiz/manage.py runserver 0:8000