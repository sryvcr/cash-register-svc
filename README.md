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
3. Get execution permission to following file  
   `chmod +x ./docs/database/dumps/restore_db_to_container.sh`
4. Enter into db dumps directory  
   `cd ./docs/database/dumps/`
5. Execute file *restore_db_to_container* to restore initial sql dump into *cash-register-db* container  
   `./restore_db_to_container.sh`  
   *API runs on port 6500*


## API docs:

- In directory *./docs/postman* you will be find the postman collection to use and to consume the API
- When you run the project, you will be enter into `http://localhost:6500/oas-docs/` to show Swagger API documentation
