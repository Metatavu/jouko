package fi.metatavu.jouko.server.rest;

import fi.metatavu.jouko.server.rest.model.InternalServerError;
import java.util.UUID;
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

@Path("/keycloakUsers")

@Api(description = "the keycloakUsers API")
@Consumes({ "application/json;charset=utf-8" })
@Produces({ "application/json;charset=utf-8" })
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJAXRSSpecServerCodegen", date = "2018-12-16T17:46:01.546+02:00")


public interface KeycloakUsersApi  {

    @GET
    @Path("/{keycloakId}")
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "Get an user by keycloak id", notes = "", response = User.class, authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Users",  })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = User.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response getUserByKeycloakId(@PathParam("keycloakId") @ApiParam("The keycloak id of the user to look up") UUID keycloakId) throws Exception;

    @GET
    
    @Consumes({ "application/json;charset&#x3D;utf-8" })
    @Produces({ "application/json;charset&#x3D;utf-8" })
    @ApiOperation(value = "List users", notes = "", response = User.class, responseContainer = "List", authorizations = {
        @Authorization(value = "bearer")
    }, tags={ "Users" })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Success", response = User.class, responseContainer = "List"),
        @ApiResponse(code = 401, message = "Unauthorized", response = Unauthorized.class),
        @ApiResponse(code = 500, message = "Internal server error", response = InternalServerError.class) })
    public Response listKeycloakUsers(@QueryParam("token")   @ApiParam("Keycloak token")  String token) throws Exception;
}
