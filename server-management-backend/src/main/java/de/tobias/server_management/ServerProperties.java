package de.tobias.server_management;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "servers")
public class ServerProperties {
    private List<WildflyServer> serverList;

    public List<WildflyServer> getServerList() {
        return serverList;
    }
    public void setServerList(List<WildflyServer> serverList) {
        this.serverList = serverList;
    }
}
