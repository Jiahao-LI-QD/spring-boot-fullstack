# spring-boot-fullstack
<hr>

[Preview](http://springbootreactfullstack-env.eba-qdcyddxq.ca-central-1.elasticbeanstalk.com/)

## BackEnd ##

Student
<hr>

## FrontEnd ##

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

## Deployment ##
1. Manually Deployment: push docker to docker hub with plugin jib
```
    mvnw clean install -P build-frontend -P jib-push-to-dockerhub -Dapp.image.tag=x
```

### Environment variables ###
1. spring.profiles.active=dev