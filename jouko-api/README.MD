# Jouko-Api

The documentation for the api can be found [here](https://metatavu.github.io/jouko-api-spec/)

## Platform

These instructions are made with Ubuntu 22.04 LTS. Some steps may be different on other platforms.

## Installation

You need java (OpenJDK 11) to install jouko-api. If you don't have java installation on your machine you can install it by running

    sudo apt-get update && sudo apt-get upgrade
    sudo apt-get install default-jdk

### MySQL

You can check if you already have MySQL installed on your system by opening your terminal and running a command `mysql --version`. If you get the version you already have it installed. Otherwise follow the next steps.

Open your terminal and run commands

`sudo apt-get update`
`sudo apt-get install mysql-server`

Launch your mysql server by running `systemctl start mysql` or `service mysql start`

Start the mysql shell by running `/usr/bin/mysql -u root -p`. If you have not set password just hit enter when password is prompted (or use password `root`)

On the mysql shell run command `CREATE DATABASE jouko_api;` to create the database.

Run `exit` to exit mysql.


### Wildfly

To Install wildfly first use `cd` command to where you want to install that and then run 

    wget "http://download.jboss.org/wildfly/11.0.0.Final/wildfly-11.0.0.Final.zip"
    unzip wildfly-11.0.0.Final.zip
    rm wildfly-11.0.0.Final.zip

### Keycloak

To Install keycloak first use `cd` command to where you want to install that and then run 

    wget https://downloads.jboss.org/keycloak/3.4.3.Final/keycloak-3.4.3.Final.zip
    unzip keycloak-3.4.3.Final.zip
    rm keycloak-3.4.3.Final.zip

Start keycloak by running inside the keycloak directory

    cd bin
    sh standalone.sh -Djboss.socket.binding.port-offset=1000

#### Create realm

- Navigate into *http://localhost:9080/auth*. 
- Create admin user
- Login with newly created user
- Navigate to Clients tab and click Create
- Create new realm called `jouko-realm`
- Create new client with Client ID `jouko-api` with following settings:
  - Client Protocol: openid-connect
  - Hit Save
- Change Access Type to bearer-only and hit Reset Password

### Create user

- Navigate into *http://localhost:9080/auth*. 
- Select jouko-realm 
- Go to Users
- Click `Add user`
- Fill information and check `Email verified`
- Hit save
- Write down somewhere the id of your Keycloak user. You are going to need it later.
- Open credentials tab
- Fill in new password
- Uncheck temporary and hit save

### Configure wildfly 

First add mysql connector to your wildfly by running:

    cd PATH_TO_WILDFLY/modules/system/layers/base/com
    mkdir mysql
    cd mysql
    mkdir main
    cd main
    wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-8.0.29.zip
    unzip mysql-connector-java-8.0.29.zip
    cd mysql-connector-java-8.0.29/
    mv mysql-connector-java-8.0.29.jar ../mysql-connector-java-8.0.29.jar
    cd ..
    rm -rf mysql-connector-java-8.0.29
    rm -rf mysql-connector-java-8.0.29.zip
    touch module.xml
    nano module.xml

Add the following xml to the module.xml

    <module xmlns="urn:jboss:module:1.5" name="com.mysql">
        <resources>
            <resource-root path="mysql-connector-java-8.0.29.jar" />
        </resources>
        <dependencies>
            <module name="javax.api"/>
            <module name="javax.transaction.api"/>
        </dependencies>
    </module>

Open YOUR_WILDFLY_DIR/standalone/configuration/standalone.xml with text editor. Find the datasources section and add the following datasource:

    <datasource jndi-name="java:/jboss/datasources/jouko-api" pool-name="jouko-api" enabled="true" use-java-context="true">
        <connection-url>jdbc:mysql://127.0.0.1/jouko_api</connection-url>
        <driver>mysql</driver>
        <security>
            <user-name>root</user-name>
            <password>YOUR_MYSQL_PASSWORD</password>
        </security>
    </datasource>

Replace the YOUR_MYSQL_PASSWORD with your actual mysql password.

Find the drivers section (right after datasources) and add the following driver

    <driver name="mysql" module="com.mysql">
        <xa-datasource-class>com.mysql.jdbc.jdbc2.optional.MysqlXADataSource</xa-datasource-class>
    </driver>


Find `<server name="default-server">` from inside of subsystem section and add the following host

    <host name="jouko-api" alias="dev.jouko.fi" default-web-module="jouko-api.war"/>


Open your terminal and run `sudo nano /etc/hosts` or use another way to open the file. Add the following line and save

    127.0.0.1       dev.jouko.fi


### Maven

Install maven by running

    sudo apt install maven

### Protobuf

Use `cd` command to where you want to download protobuf. Install protobuf by running commands:

    wget https://github.com/protocolbuffers/protobuf/releases/download/v21.1/protobuf-java-3.21.1.zip
    unzip protobuf-java-3.21.1.zip
    cd protobuf-java-3.21.1.zip
    ./configure
    make
    make check
    sudo make install

To make sure protobuf installed correctly run:

    protoc --version

IF you get the following error message (If not then skip next steps) 

    protoc: error while loading shared libraries: libprotoc.so.10: cannot open shared object file: No such file or directory

Then run:
    sudo ldconfig


### Git

Install git by running 

    sudo apt install git

### Jouko-api

Use `cd` command to where you want to install the project and then run 

    git clone https://github.com/Metatavu/jouko.git
    cd jouko/jouko-api
    sh build.sh
    cp target/*.war YOUR_WILDFLY_DIR/standalone/deployments/jouko-api.war

Replace the YOUR_WILDFLY_DIR with the actual directory of your wildfly.

### Run api

Start the api by running 

    sh YOUR_WILDFLY_DIR/bin/standalone.sh

### MySQL entries needed for the API
Start the mysql shell by running `/usr/bin/mysql -u root -p`.

- On the mysql shell run command `USE jouko_api;` to use the database.
- Run command `insert into Setting values (1, "keycloakUrl", "http://localhost:9080/auth");`
- Run command `insert into Setting values (2, "keycloakRealm", "jouko-realm");`
- Run command `insert into User values (1, "KEYCLOAK_USER_ID", "KEYCLOAK_USER_NAME");`

Replace KEYCLOAK_USER_ID with the id of your Keycloak user and KEYCLOAK_USER_NAME with the username of your Keycloak user.

Run `exit` to exit mysql.

### Connect UIs to api

At your jouko-ui and jouko-admin-ui you need to edit file `src/config.ts`. Change the url's to match your API's IP/domain.

Note that uploadUrl will be same as apiUrl but there you have to remove the `/v1` part from url.
