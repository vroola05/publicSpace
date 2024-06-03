FROM postgis/postgis:16-3.4-alpine
USER postgres

COPY ./sql/* /docker-entrypoint-initdb.d/

CMD ["postgres"]
