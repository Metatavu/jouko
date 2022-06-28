package fi.metatavu.jouko.server.rest;

import fi.metatavu.jouko.server.rest.model.Device;
import fi.metatavu.jouko.server.rest.model.DevicePowerConsumption;
import fi.metatavu.jouko.server.rest.model.InternalServerError;
import fi.metatavu.jouko.server.rest.model.Interruption;
import fi.metatavu.jouko.server.rest.model.InterruptionCancellation;
import java.time.OffsetDateTime;
import fi.metatavu.jouko.server.rest.model.PowerMeasurement;
import fi.metatavu.jouko.server.rest.model.Unauthorized;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

import io.swagger.annotations.*;

import java.util.Map;
import java.util.List;
import javax.validation.constraints.*;
import javax.validation.Valid;
import java.lang.Exception;

@Path("/users")

@Api(description = "the users API")
@Consumes({ "application/json;charset=utf-8" })
@Produces({ "application/json;charset=utf-8" })
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJAXRSSpecServerCodegen", date = "2018-12-16T17:46:01.546+02:00")


public interface UsersApi  {

    @GET
    @Path("/{userId}/devices/{deviceId}/powerConsumption")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Get the power consumption of the given device in a time period", notes = "", response = DevicePowerConsumption.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Devices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = DevicePowerConsumption.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response getPowerConsumption(@PathParam("userId") @ApiParam("The user that owns the device") Long userId,@PathParam("deviceId") @ApiParam("The device whose power consumption we measure") Long deviceId,@QueryParam("fromTime") @NotNull   @ApiParam("The start of the time period that we measure the consumption in, inclusive")  OffsetDateTime fromTime,@QueryParam("toTime") @NotNull   @ApiParam("The end of the time period that we measure the consumption in, exclusive")  OffsetDateTime toTime) throws Exception;

    @GET
    @Path("/{userId}/powerMeasurements")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "List all measurements", notes = "", response = PowerMeasurement.class, responseContainer = "List", authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Devices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = PowerMeasurement.class, responseContainer = "List"),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response listAllMeasurements(@PathParam("userId") @ApiParam("The id of the user") Long userId,@QueryParam("fromTime") @NotNull   @ApiParam("List measurements that start after this point of time, inclusive")  OffsetDateTime fromTime,@QueryParam("toTime") @NotNull   @ApiParam("List measurements that end before this point of time, exclusive")  OffsetDateTime toTime) throws Exception;

    @GET
    @Path("/{userId}/devices")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "List devices", notes = "", response = Device.class, responseContainer = "List", authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Devices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = Device.class, responseContainer = "List"),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response listDevices(@PathParam("userId") @ApiParam("The user who owns the interruption") Long userId,@QueryParam("firstResult") @NotNull   @ApiParam("The offset of the first result")  Integer firstResult,@QueryParam("maxResults") @NotNull   @ApiParam("The maximum number of results")  Integer maxResults) throws Exception;

    @GET
    @Path("/{userId}/interruptions")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "List interruptions", notes = "", response = Interruption.class, responseContainer = "List", authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Interruptions",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = Interruption.class, responseContainer = "List"),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response listInterruptions(@PathParam("userId") @ApiParam("The user whose interruptions we list") Long userId,@QueryParam("fromTime") @NotNull   @ApiParam("List interruptions that start after this point of time, inclusive")  OffsetDateTime fromTime,@QueryParam("toTime") @NotNull   @ApiParam("List interruptions that end before this point of time, exclusive")  OffsetDateTime toTime,@QueryParam("deviceId")   @ApiParam("The device id whose interruptions we list, list all if omitted")  Long deviceId) throws Exception;

    @GET
    @Path("/{userId}/devices/{deviceId}/powerMeasurements")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "List all measurements by device", notes = "", response = PowerMeasurement.class, responseContainer = "List", authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Devices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = PowerMeasurement.class, responseContainer = "List"),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response listMeasurementsByDevice(@PathParam("userId") @ApiParam("The id of the user") Long userId,@PathParam("deviceId") @ApiParam("The id of the device") Long deviceId,@QueryParam("fromTime") @NotNull   @ApiParam("List measurements that start after this point of time, inclusive")  OffsetDateTime fromTime,@QueryParam("toTime") @NotNull   @ApiParam("List measurements that end before this point of time, exclusive")  OffsetDateTime toTime) throws Exception;

    @PUT
    @Path("/{userId}/interruptions/{interruptionId}/cancelled")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Set interruption's cancellation status", notes = "", response = InterruptionCancellation.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Interruptions" })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = InterruptionCancellation.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response setInterruptionCancelled(@PathParam("userId") @ApiParam("The user who owns the interruption") Long userId,@PathParam("interruptionId") @ApiParam("The id of the interruption to set cancellation status of") Long interruptionId,@Valid InterruptionCancellation body) throws Exception;
}
