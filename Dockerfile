FROM jboss/wildfly:19.0.0.Final

ARG WAR_FILE=todo-service-1.0-SNAPSHOT.war

COPY target/$WAR_FILE $JBOSS_HOME/standalone/deployments/$WAR_FILE