# spring-boot-fullstack
<hr>

[Preview](http://springbootreactfullstack-env.eba-qdcyddxq.ca-central-1.elasticbeanstalk.com/)

## BackEnd ##

**Spring Boot 3** \
Get / Post / Delete Student

<hr>

## FrontEnd ##

**React**

**Components:** _Antd_ \
**UI view:** \
![image](https://user-images.githubusercontent.com/46433714/233814451-a9c10b49-f975-4ae6-9c08-51d9da8a1054.png)

**Add student** \
![image](https://user-images.githubusercontent.com/46433714/233814479-bd1b8d2a-2091-4216-aef0-61001d6fee34.png)

<hr>

## Database ##
Creating a Docker network is the preferred way to access PostgreSQL from other containers on the same host. 
This avoids binding the Postgres server’s port and potentially exposing the service to your host’s wider network
1. create a network for docker deploying postgres
```
   docker create network db
```
2. postgresql local machine deployment
```
    #pwd on current path
   docker run --name db -p 5432:5432 --network=db -v "$PWD:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=password -d postgres:alpine
    #absolute path in windows
   docker run --name db -p 5432:5432 --network=db -v "{absolute path}:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=password -d postgres:alpine
```
3. connect to db 
```
   docker run -it --rm --network db postgres:alpine psql -h db -U postgres
```
Mockaroo generates fake data for dev-test.
<hr>

## Manual Deployment ##
1. Manually Deployment: push docker to docker hub with plugin jib
```
    mvnw clean install -P build-frontend -P jib-push-to-dockerhub -Dapp.image.tag=x
```

### Environment variables ###
1. spring.profiles.active=dev

### CI ###
**Tools** : GitHub Actions.\
**Pull Request** \
--> checkout code \
--> setup environment \
--> maven clean package

### CD ###
**Tools**: GitHub Actions, slack, AWS elastic beanstalk\
**Merge to main** \
--> Slack Message: CICD ongoing \
--> Setup environment \
--> Generate Build number: date-time \
--> docker login \
--> maven clean package and build image \
--> Slack Message: pushed new version : ${Build number} \
--> update docker-compose.yml \
--> Slack Message: AWS deployment start \
--> AWS elastic beanstalk Deployment \
--> Slack Message: Deployment Done with online link \
<hr>

## TEST ##

### Unit Testing ###
**Tool** : Assertj & Mock \
**Target Class**:   \
_StudentRepository_ \
_StudentService_

### Integration Testing ###
**Tool** : failsafe \
**Target Class**: \
_StudentController_ 
