package application.health;

import application.todo.TodoResource;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Readiness;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;

@Readiness
@ApplicationScoped
public class ReadinessHealthCheck implements HealthCheck {

    private static final Logger LOG = LoggerFactory.getLogger(ReadinessHealthCheck.class);

    @Resource(name = "ExampleDS")
    DataSource datasource;

    @Override
    public HealthCheckResponse call() {
        LOG.debug("Healthcheck called");

        return HealthCheckResponse
                .named(ReadinessHealthCheck.class.getSimpleName())
                .withData("ready", isHealthy())
                .up()
                .build();
    }

    public boolean isHealthy() {
        try {
            return datasource.getConnection().isValid(10);
        } catch (Exception e) {
            return false;
        }
    }
}
