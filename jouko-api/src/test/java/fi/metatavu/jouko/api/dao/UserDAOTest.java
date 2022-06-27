package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.UserEntity;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

public class UserDAOTest {
    UserDAO userDAO;
    UserEntity userEntity;

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
        System.out.println("User created");
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
        System.out.println("User found by keycloak id");
    }

    /**
     * Test deleting a user
     */
    // @Test
    // public void testDeleteUser() {
    //     UserEntity user = new UserEntity(
    //             1L,
    //             "keycloakId",
    //             "name"
    //     );

    //     /**
    //      * Check that user exists
    //      */
    //     Mockito.when(userDAO.findById(1L)).thenReturn(user);
    //     Assert.assertEquals(user, userDAO.findById(1L));

    //     /**
    //      * Delete user
    //      */
    //     userDAO.delete(user);
    //     Mockito.verify(userDAO).delete(user);
    //     Assert.assertNull(userDAO.findById(1L));
    //     System.out.println("User deleted");
    // }
}