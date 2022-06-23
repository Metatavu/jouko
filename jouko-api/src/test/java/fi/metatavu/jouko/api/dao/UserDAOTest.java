package fi.metatavu.jouko.api.dao;

import org.junit.Before;
import org.mockito.Mockito;

import fi.metatavu.jouko.api.model.UserEntity;

public class UserDAOTest {
    UserDAO userDAO;
    UserEntity userEntity;

    @Before
    public void setUp() {
        userDAO = Mockito.mock(UserDAO.class);
        userEntity = Mockito.mock(UserEntity.class);

        Mockito.when(userEntity.getId()).thenReturn(Mockito.anyLong());
        Mockito.when(userEntity.getKeycloakId()).thenReturn(Mockito.anyString());
        Mockito.when(userEntity.getName()).thenReturn(Mockito.anyString());
    }
}
