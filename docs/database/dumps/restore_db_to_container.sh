docker cp ./cash_register_initial.sql cash-register-db:/tmp/initial.sql
docker exec -it cash-register-db psql -U postgres -d cash_register_db -f /tmp/initial.sql
echo "---------------"
echo "Congrats! SQL dump has been restored!"