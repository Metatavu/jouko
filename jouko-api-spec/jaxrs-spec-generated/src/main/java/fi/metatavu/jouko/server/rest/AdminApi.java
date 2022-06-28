package fi.metatavu.jouko.server.rest;

import fi.metatavu.jouko.server.rest.model.ControllerDevice;
import fi.metatavu.jouko.server.rest.model.Device;
import fi.metatavu.jouko.server.rest.model.InternalServerError;
import fi.metatavu.jouko.server.rest.model.InterruptionGroup;
import fi.metatavu.jouko.server.rest.model.Unauthorized;
import fi.metatavu.jouko.server.rest.model.User;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

import io.swagger.annotations.*;

import java.util.Map;
import java.util.List;
import javax.validation.constraints.*;
import javax.validation.Valid;
import java.lang.Exception;

@Path("/admin")

@Api(description = "the admin API")
@Consumes({ "application/json;charset=utf-8" })
@Produces({ "application/json;charset=utf-8" })
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJAXRSSpecServerCodegen", date = "2018-12-16T17:46:01.546+02:00")


public interface AdminApi  {

    @POST
    @Path("/controllerDevices")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Create controller device", notes = "", response = ControllerDevice.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "ControllerDevices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = ControllerDevice.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response createControllerDevice(@Valid ControllerDevice body) throws Exception;

    @POST
    @Path("/devices")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Create device", notes = "", response = Device.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Devices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = Device.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response createDevice(@Valid Device body) throws Exception;

    @POST
    @Path("/interruptiongroups/")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Create interruption group", notes = "", response = InterruptionGroup.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Interruption Groups",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = InterruptionGroup.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response createInterruptionGroup(@Valid InterruptionGroup body) throws Exception;

    @POST
    @Path("/users")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Create user", notes = "", response = User.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Users",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = User.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response createUser(@Valid User body,@QueryParam("token")   @ApiParam("Keycloak token")  String token) throws Exception;

    @DELETE
    @Path("/controllerDevices/{controllerDeviceId}")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Delete controller", notes = "Deletes an controller", response = Void.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "ControllerDevices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 204, message = "Success", response = Void.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response deleteControllerDevice(@PathParam("controllerDeviceId") @ApiParam("The id of the controller") Long controllerDeviceId) throws Exception;

    @DELETE
    @Path("/interruptiongroups/{groupId}")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Delete interruption", notes = "Deletes an interruption", response = Void.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Interruption Groups",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 204, message = "Success", response = Void.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response deleteInterruption(@PathParam("groupId") @ApiParam("The id of the interruption being deleted") Long groupId) throws Exception;

    @GET
    @Path("/controllerDevices")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "List all controller devices", notes = "", response = ControllerDevice.class, responseContainer = "List", authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "ControllerDevices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = ControllerDevice.class, responseContainer = "List"),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response listAllControllerDevices(@QueryParam("firstResult") @NotNull   @ApiParam("The offset of the first result")  Integer firstResult,@QueryParam("maxResults") @NotNull   @ApiParam("The maximum number of results")  Integer maxResults) throws Exception;

    @GET
    @Path("/devices")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "List all devices", notes = "", response = Device.class, responseContainer = "List", authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Devices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = Device.class, responseContainer = "List"),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response listAllDevices(@QueryParam("firstResult") @NotNull   @ApiParam("The offset of the first result")  Integer firstResult,@QueryParam("maxResults") @NotNull   @ApiParam("The maximum number of results")  Integer maxResults) throws Exception;

    @GET
    @Path("/users")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "List all users", notes = "", response = User.class, responseContainer = "List", authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Users",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = User.class, responseContainer = "List"),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response listAllUsers(@QueryParam("firstResult") @NotNull   @ApiParam("The offset of the first result")  Integer firstResult,@QueryParam("maxResults") @NotNull   @ApiParam("The maximum number of results")  Integer maxResults) throws Exception;

    @GET
    @Path("/interruptiongroups/")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "List interruption groups", notes = "", response = InterruptionGroup.class, responseContainer = "List", authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Interruption Groups",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = InterruptionGroup.class, responseContainer = "List"),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response listInterruptionGroups(@QueryParam("firstResult") @NotNull   @ApiParam("The offset of the first result")  Integer firstResult,@QueryParam("maxResults") @NotNull   @ApiParam("The maximum number of results")  Integer maxResults) throws Exception;

    @GET
    @Path("/controllerDevices/{controllerDeviceId}")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Retreive controller device", notes = "", response = ControllerDevice.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "ControllerDevices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = ControllerDevice.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response retrieveControllerDevice(@PathParam("controllerDeviceId") @ApiParam("The id of the controller device") Long controllerDeviceId) throws Exception;

    @GET
    @Path("/devices/{deviceId}")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Retreive device", notes = "", response = Device.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Devices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = Device.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response retrieveDevice(@PathParam("deviceId") @ApiParam("The id of the device") Long deviceId) throws Exception;

    @GET
    @Path("/interruptiongroups/{groupId}")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Retreive interruption group", notes = "", response = InterruptionGroup.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Interruptions",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = InterruptionGroup.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response retrieveInterruptionGroup(@PathParam("groupId") @ApiParam("The id of the interruption group") Long groupId) throws Exception;

    @GET
    @Path("/users/{userId}")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Retreive user", notes = "", response = User.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Users",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = User.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response retrieveUser(@PathParam("userId") @ApiParam("The id of the user") Long userId) throws Exception;

    @PUT
    @Path("/controllerDevices/{controllerDeviceId}")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Update controller device", notes = "", response = ControllerDevice.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "ControllerDevices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = ControllerDevice.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response updateControllerDevice(@PathParam("controllerDeviceId") @ApiParam("The id of the controller device") Long controllerDeviceId,@Valid ControllerDevice newControllerDevice) throws Exception;

    @PUT
    @Path("/devices/{deviceId}")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Update device", notes = "", response = Device.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Devices",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = Device.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response updateDevice(@PathParam("deviceId") @ApiParam("The id of the device") Long deviceId,@Valid Device newDevice) throws Exception;

    @PUT
    @Path("/interruptiongroups/{groupId}")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Update interruption group", notes = "", response = InterruptionGroup.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Interruptions",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = InterruptionGroup.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response updateInterruptionGroup(@PathParam("groupId") @ApiParam("The id of the interruption group") Long groupId,@Valid InterruptionGroup body) throws Exception;

    @PUT
    @Path("/users/{userId}")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Update user", notes = "", response = User.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Users" })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = User.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response updateUser(@PathParam("userId") @ApiParam("The id of the user") Long userId,@Valid User body) throws Exception;
}
