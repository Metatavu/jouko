package fi.metatavu.jouko.api.logger;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Dependent
public class LoggerProducer {

	@Produces
	public Logger produceLog(InjectionPoint injectionPoint) {
	  return LoggerFactory.getLogger(injectionPoint.getMember().getDeclaringClass().getName());
	}
	
}