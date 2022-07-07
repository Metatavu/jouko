## Docker instructions

## Install Docker & Docker Compose:
```
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```
Run the following command to start the docker daemon:
```
sudo service docker start
```
Run the following command to start the docker-compose:
```
sudo service docker-compose start
```
Add the following hosts to your /etc/hosts file
```
127.0.0.1       api.jouko.local
127.0.0.1       mysql.jouko.local
127.0.0.1       ui.jouko.local
127.0.0.1       admin.jouko.local
127.0.0.1       keycloak.jouko.local
```
Run the following command to start the docker containers:
```
docker-compose up -d
```

## Setup keycloak
### Setup realm
- Go to http://keycloak.jouko.local:9080/auth/ to login to the keycloak server. (Admin credentials are in the docker-compose.yml file)
- Navigate to Clients tab and click Create
- Create new realm called `jouko-realm`
- Create new client with Client ID `jouko-api` with following settings:
  - Root URL: http://admin.jouko.local:8001 (If want to use admin panel, otherwise change to http://ui.jouko.local:8000)
  - Client Protocol: openid-connect
  - Hit Save
- Change Access Type to public and hit Reset Password

### Setup user account
- Go to http://keycloak.jouko.local:9080/auth/ to login to the keycloak server. (Admin credentials are in the docker-compose.yml file)
- Select jouko-realm 
- Go to Users
- Click `Add user`
- Fill information and check `Email verified`
- Hit save
- Write down somewhere the id of your Keycloak user. You are going to need it later.
- Open credentials tab
- Fill in new password
- Uncheck temporary and hit save


## Setup MySQL
### MySQL entries
- Use a program like "MySQL workbench" to access the container's MySQL server (The host name is mysql.jouko.local and credentials are in the docker-compose.yml file)
- Run command `insert into Setting values (1, "keycloakUrl", "http://keycloak.jouko.local:9080/auth");`
- Run command `insert into Setting values (2, "keycloakRealm", "jouko-realm");`
- Run command `insert into Setting values (3, "deviceCommunicator.asId", "1");`
- Run command `insert into Setting values (4, "deviceCommunicator.endpoint", "LORA");`
- Run command `insert into User values (1, "KEYCLOAK_USER_ID", "KEYCLOAK_USER_NAME");`

Now you can login to http://admin.jouko.local and http://ui.jouko.local. If it does not work then re-check Keycloak setup and the MySQL entries.

As a note as well that admin and user run on different ports, so if wanted to use both at the same time then you would require two Keycloak clients.
