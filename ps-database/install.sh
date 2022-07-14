
pg_admin_user=postgres
pg_admin_password=postgresPassword

if ! command -v psql &> /dev/null
then
    ####################
    # Install postgres
    ####################
    # Create the file repository configuration:
    sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

    # Import the repository signing key:
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

    # Update the package lists:
    sudo apt-get update

    # Install the latest version of PostgreSQL.
    # If you want a specific version, use 'postgresql-12' or similar instead of 'postgresql':
    sudo apt-get -y install postgresql

    # Installation of postgis
    sudo apt install postgis postgresql-14-postgis-3

    ####################
    # Install pgadmin
    ####################

    # Install the public key for the repository (if not done previously):
    sudo curl https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo apt-key add

    # Create the repository configuration file:
    sudo sh -c 'echo "deb https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'

    # Install for desktop mode only:
    sudo apt install pgadmin4-web

fi

####################
# The next scripts can be used to configure 
# a user and enable postgres to run
####################

# Check if postgres is active
# systemctl status postgresql

###
# Configure remote access
###

# Allow password login
# sudo sed -i '/^host/s/ident/md5/' /etc/postgresql/14/main/pg_hba.conf

# Change identification method from peer to trust as below
# sudo sed -i '/^local/s/peer/trust/' /etc/postgresql/14/main/pg_hba.conf

# To allow remote access edit the following script:
# sudo vim /etc/postgresql/14/main/pg_hba.conf
# -----------------------------
# # IPv4 local connections:
# host    all             all             127.0.0.1/32            scram-sha-256
# host    all             all             0.0.0.0/0                md5

# # IPv6 local connections:
# host    all             all             ::1/128                 scram-sha-256
# host    all             all             0.0.0.0/0                md5
# -----------------------------

# sudo vim /etc/postgresql/14/main/postgresql.conf
# -----------------------------
# #------------------------------------------------------------------------------
# # CONNECTIONS AND AUTHENTICATION
# #-----------------------------------------------------------------------------
# listen_addresses='*'
# -----------------------------

# sudo systemctl restart postgresql
# sudo systemctl enable postgresql

# sudo -u postgres psql
# ALTER ROLE postgres WITH PASSWORD 'postgresPassword';