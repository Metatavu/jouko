package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.UserEntity;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

// Need to be able to delete a user or otherwise other tests will fail
// public class UserDAOTest {
//     UserDAO userDAO;
//     UserEntity userEntity;

//     @Before
//     public void setUp() {
//         userDAO = Mockito.mock(UserDAO.class);
//     }

//     /**
//      * Create a new user
//     */
//     @Test
//     public void testCreateUser() {
//         UserEntity user = new UserEntity(
//                 1L,
//                 "keycloakId",
//                 "name"
//         );

//         /**
//          * Check that user exists
//          */
//         Mockito.when(userDAO.findById(1L)).thenReturn(user);
//         Assert.assertEquals(user, userDAO.findById(1L));
//         System.out.println("User created");
//     }
// }