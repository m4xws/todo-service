package application.health;

import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Liveness;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;

@Liveness
@ApplicationScoped
public class LivenessHealthCheck implements HealthCheck {
    private static final Logger LOG = LoggerFactory.getLogger(LivenessHealthCheck.class);

    @Override
    public HealthCheckResponse call() {
        LOG.debug("Livecheck called");

        return HealthCheckResponse
                .named(LivenessHealthCheck.class.getSimpleName())
                .withData("live", true)
                .up()
                .build();
    }
}