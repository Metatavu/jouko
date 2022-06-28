package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.UserEntity;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;

import java.util.Arrays;

public class UserDAOTest {
    private UserDAO userDAO;
    private UserEntity userEntity;
    private Logger logger;

    @Before
    public void setUp() {
        userDAO = Mockito.mock(UserDAO.class);
    }

    /**
     * Create a new user
    */
    @Test
    public void testCreateUser() {
        UserEntity user = new UserEntity(
                1L,
                "keycloakId",
                "name"
        );

        /**
         * Check that user exists
         */
        Mockito.when(userDAO.findById(1L)).thenReturn(user);
        Assert.assertEquals(user, userDAO.findById(1L));
        logger.info("User created");
    }

    /**
     * Find a user by keyckoak id
     */
    @Test
    public void testFindUserByKeycloakId() {
        UserEntity user = new UserEntity(
                1L,
                "keycloakId",
                "name"
        );

        /**
         * Check that user exists
         */
        Mockito.when(userDAO.findByKeycloakId("keycloakId")).thenReturn(user);
        Assert.assertEquals(user, userDAO.findByKeycloakId("keycloakId"));
        logger.info("User found");
    }

    /**
     * If user does not exist then return null
     */
    @Test
    public void testFindUserByKeycloakIdNotFound() {
        UserEntity user = userDAO.findByKeycloakId("keycloakId123");
        Assert.assertNull(user);
        logger.info("User not found by keycloak id");
    }

    /**
     * List all users
     */
    @Test
    public void testListUsers() {
        UserEntity user = new UserEntity(
                1L,
                "keycloakId",
                "name"
        );
        Mockito.when(userDAO.listAll()).thenReturn(Arrays.asList(user));
        Assert.assertEquals(Arrays.asList(user), userDAO.listAll());
        logger.info("Users found");
    }

    /**
     * Test deleting keycloak user and make sure it doesn't exist
     */
    @Test
    public void testDeleteUser() {
        UserEntity user = new UserEntity(
                1L,
                "keycloakId",
                "name"
        );
        userDAO.delete(user);
        Assert.assertNull(userDAO.findByKeycloakId("keycloakId"));
        logger.info("User deleted");
    }
}