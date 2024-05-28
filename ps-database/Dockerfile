FROM postgis/postgis:16-3.4
USER postgres

ADD ./init.sql /docker-entrypoint-initdb.d/

CMD ["postgres"]
