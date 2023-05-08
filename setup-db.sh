#!/bin/bash

# Wait for the MySQL server to start
until mysqladmin ping -h db -u root -pmysecretpassword >/dev/null 2>&1; do
    echo "Waiting for MySQL server to start..."
    sleep 1
done

# Create a new database
mysql -h db -u root -pmysecretpassword -e "CREATE DATABASE demo_interview;"

echo "Database setup completed."