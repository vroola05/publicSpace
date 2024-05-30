FROM postgis/postgis:16-3.4
USER postgres

COPY ./sql/* /docker-entrypoint-initdb.d/

CMD ["postgres"]
