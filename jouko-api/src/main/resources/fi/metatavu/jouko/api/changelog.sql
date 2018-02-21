--changeset ilmoeuro:1
CREATE TABLE User (
  "id" INTEGER IDENTITY PRIMARY KEY,
  "keycloakId" UUID NOT NULL,
  "name" VARCHAR(4096) NOT NULL
)

CREATE TABLE Interruption (
  "id" INTEGER IDENTITY PRIMARY KEY,
  "startTime" TIMESTAMP WITH TIME ZONE NOT NULL,
  "endTime" TIMESTAMP WITH TIME ZONE NOT NULL,
  "cancelled" BOOLEAN,
  "cancellationTime" TIMESTAMP WITH TIME ZONE NOT NULL
  "deviceId" INTEGER NOT NULL,
  CONSTRAINT
    fk_Interruption_deviceId
  FOREIGN KEY
    "deviceId"
  REFERENCES
    Device (id)
);

CREATE TABLE Device (
  "id" INTEGER IDENTITY PRIMARY KEY,
  "name" VARCHAR(4096) NOT NULL,
  "userId" INTEGER NOT NULL,
  CONSTRAINT
    fk_Device_userId
  FOREIGN KEY
    "userId"
  REFERENCES
    User (id)
);

CREATE TABLE DevicePowerMeasurement (
  "id" INTEGER IDENTITY PRIMARY KEY,
  "measurementType" VARCHAR(255) NOT NULL,
  "measurementValue" DOUBLE NOT NULL,
  "startTime" TIMESTAMP WITH TIME ZONE NOT NULL,
  "endTime" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deviceId" INTEGER NOT NULL,
  CONSTRAINT
    fk_Interruption_deviceId
  FOREIGN KEY
    "deviceId"
  REFERENCES
    Device (id)
);