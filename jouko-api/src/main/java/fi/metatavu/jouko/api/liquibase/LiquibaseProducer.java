package fi.metatavu.jouko.api.liquibase;

import java.sql.SQLException;

import javax.annotation.Resource;
import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;
import javax.sql.DataSource;

import liquibase.integration.cdi.CDILiquibaseConfig;
import liquibase.integration.cdi.annotations.LiquibaseType;
import liquibase.resource.ClassLoaderResourceAccessor;
import liquibase.resource.ResourceAccessor;

@Dependent
public class LiquibaseProducer {
  
  @Resource (lookup = "java:jboss/datasources/jouko-api")
  private DataSource dataSource;
  
  @Produces
  @LiquibaseType
  public CDILiquibaseConfig createConfig() {
    CDILiquibaseConfig config = new CDILiquibaseConfig();
    config.setChangeLog("fi/metatavu/jouko/api/changelog.xml");
    return config;
  }
  
  @Produces
  @LiquibaseType
  public DataSource createDataSource() throws SQLException {
    return dataSource;
  }
  
  @Produces
  @LiquibaseType
  public ResourceAccessor create() {
    return new ClassLoaderResourceAccessor(getClass().getClassLoader());
  }

}
