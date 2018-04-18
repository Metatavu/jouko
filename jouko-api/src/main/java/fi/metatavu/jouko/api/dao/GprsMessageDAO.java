package fi.metatavu.jouko.api.dao;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;

import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity;

@Dependent
public class GprsMessageDAO extends AbstractDAO<GprsMessageEntity> {
  public GprsMessageEntity create(ControllerEntity controller, String content) {
    GprsMessageEntity result = new GprsMessageEntity( null, content, controller);
    getEntityManager().persist(result);
    return result;
  } 
  
  public void clear() {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaDelete<GprsMessageEntity> delete = criteriaBuilder.createCriteriaDelete(GprsMessageEntity.class);
    delete.from(GprsMessageEntity.class);
    
    em.createQuery(delete).executeUpdate();
  }
}
