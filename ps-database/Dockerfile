FROM postgres:14

RUN apt-get update \
    && apt-get install wget -y \
    && apt-get install postgresql-14-postgis-3 -y \
    && apt-get install postgis -y

# RUN ./create.sh

# COPY ./sql /publicspace/sql
# COPY ./create.sh /publicspace/sql/create.sh
# ENTRYPOINT /publicspace/sql/create.sh