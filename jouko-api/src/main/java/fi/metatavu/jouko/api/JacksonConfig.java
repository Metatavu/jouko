package fi.metatavu.jouko.api;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Provider  
@Produces(MediaType.APPLICATION_JSON)  
public class JacksonConfig implements ContextResolver<ObjectMapper>  
{  
   private ObjectMapper objectMapper;  
  
  
   public JacksonConfig() throws Exception  
   {  
      objectMapper = new ObjectMapper();  
      objectMapper.findAndRegisterModules();
   }  
  
  
   public ObjectMapper getContext(Class<?> objectType)  
   {  
      return objectMapper;  
   }  
}  