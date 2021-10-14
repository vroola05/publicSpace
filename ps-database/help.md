
# Check if postgres is running
sudo systemctl is-active postgresql
sudo systemctl is-enabled postgresql
sudo systemctl status postgresql

# Check of instance is accepting connections
sudo pg_isready
