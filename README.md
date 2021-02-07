# Cash Register Service

Author: https://github.com/sryvcr/


## Run Project

Via terminal:
1. Clone the repository  
   `$ git clone https://github.com/sryvcr/cash-register-svc`
2. Enter into project root directory  
   `$ cd cash-register-svc/`  
   and run docker-compose  
   `$ docker-compose up -d`
1. Get execution permission to following file  
   `chmod +x ./docs/database/dumps/restore_db_to_container.sh`
1. Enter into db dumps directory  
   `cd ./docs/database/dumps/`
1. Execute file *restore_db_to_container* to restore initial sql dump into *cash-register-db* container  
   `./restore_db_to_container.sh`
