# Jouko-Api

The documentation for the api can be found [here](https://metatavu.github.io/jouko-api-spec/)

## Installation

You need java to install jouko-api. If you dont have java installation on your machine you can install it by running

    apt-get update && apt-get upgrade
    apt-get install default-jdk

### MySQL

You can check if you already have MySQL installed on your system by opening your terminal and running a command `mysql --version`. If you get the version you already have it installed. Otherwise follow the next steps.

Open your terminal and run commands

`sudo apt-get update`
`sudo apt-get install mysql-server`

Launch your mysql server by running `systemctl start mysql` or `service mysql start`

Start the mysql shell by running `/usr/bin/mysql -u root -p`. If you have not set password just hit enter when password is prompted (or use password `root`)

On the mysql shell run command `CREATE DATABASE jouko_api;` to create the database.


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
- Create new realm called `jouko-realm`
- Create new client called `jouko-api` with following settings:
  - Client Protocol: openid-connect
  - Access Type: bearer-only
- Click installation tab
- Select Keycloak OIDC JSON format
- Download the configuration and save it into somewhere where you find it later

### Configure wildfly 

First add mysql connector to your wildfly by following [this tutorial](https://synaptiklabs.com/posts/adding-the-mysql-jdbc-driver-into-wildfly/)

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

Find the drivers section and add the following driver

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

### Jouko-api-spec

Clone [this repository](https://github.com/Metatavu/jouko-api-spec) to your computer. And use `cd` command to inside of the jouko-api-spec folder. Then run

    wget https://oss.sonatype.org/content/repositories/snapshots/io/swagger/swagger-codegen-cli/3.0.0-SNAPSHOT/swagger-codegen-cli-3.0.0-20180710.190537-87.jar
    mv swagger-codegen-cli-3.0.0-20180710.190537-87.jar swagger-codegen-cli.jar
    grunt jaxrs-gen
    cd jaxrs-spec-generated
    mvn install

Check the version from jaxrs-spec-generated/pom.xml and use that version inside of jouko-api/pom.xml at 

    <jouko-api-spec.version>VERSION_NUMBER_HERE</jouko-api-spec.version>

### Protobuf

Use `cd` command to where you want to download protobuf. Install protobuf by running commands:

    wget https://github.com/protocolbuffers/protobuf/releases/download/v3.0.0/protobuf-java-3.0.0.zip
    unzip protobuf-java-3.0.0.zip
    cd protobuf-java-3.0.0.zip
    ./configure
    make
    make check
    sudo make install

To make sure protobuf installed correctly run:

    protoc --version

IF you get error message

    protoc: error while loading shared libraries: libprotoc.so.10: cannot open shared object file: No such file or directory

run 
    sudo ldconfig

### Jouko-api

Use `cd` command to where you want to install the project and then run 

    git clone https://github.com/Metatavu/jouko.git
    cd jouko/jouko-api
    mvn package
    cp target/*.war YOUR_WILDFLY_DIR/standalone/deployments/

Replace the YOUR_WILDFLY_DIR with the actual directory of your wildfly.

### Run api

Start the api by running 

    YOUR_WILDFLY_DIR/bin/standalone.xml
