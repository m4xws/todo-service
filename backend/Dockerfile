FROM jboss/wildfly:19.0.0.Final

ARG WAR_FILE=backend-1.5-SNAPSHOT.war

COPY config/standalone-full.xml $JBOSS_HOME/standalone/configuration/standalone.xml
COPY target/$WAR_FILE $JBOSS_HOME/standalone/deployments/$WAR_FILE