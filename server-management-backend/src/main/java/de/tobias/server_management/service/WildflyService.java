package de.tobias.server_management.service;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import de.tobias.server_management.ServerProperties;
import de.tobias.server_management.WildflyServer;

@Service
public class WildflyService {
    private static final Logger LOG = LoggerFactory.getLogger(WildflyServer.class);

    private ServerProperties serverProperties;

    public WildflyService(ServerProperties serverProperties) {
        this.serverProperties = serverProperties;
    }

    public List<WildflyServer> getServerList() {
        return serverProperties.getServerList();
    }

    public String getServerStatus(Integer index) {
        WildflyServer server = serverProperties.getServerList().get(index);

        return server.getRestClient().post().uri("/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("""
                            {
                                "operation": "read-attribute",
                                "name": "server-state"
                            }
                            """)
                    .retrieve().body(String.class);
    }

    public String shutdownServer(Integer index) {
        WildflyServer server = serverProperties.getServerList().get(index);

        return server.getRestClient().post().uri("/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("""
                            {
                                "operation": "shutdown",
                                "address": []
                            }
                            """)
                    .retrieve().body(String.class);
    }

    public String startServer(Integer index) {
        WildflyServer server = serverProperties.getServerList().get(index);

        ProcessBuilder processBuilder = new ProcessBuilder(server.getStartCommand());
        processBuilder.redirectOutput(ProcessBuilder.Redirect.DISCARD);
        processBuilder.redirectError(ProcessBuilder.Redirect.DISCARD);

        try {
            processBuilder.start();
            return "{\"outcome\": \"success\"}";
        } catch (IOException e) {
            LOG.warn(e.getMessage());
            return "{\"outcome\": \"failed\"}";
        }
    }

    public String getDeployments(Integer index) {
        WildflyServer server = serverProperties.getServerList().get(index);

        return server.getRestClient().post().uri("/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("""
                            {
                                "operation": "read-children-resources",
                                "child-type": "deployment",
                                "address": []
                            }
                            """)
                    .retrieve().body(String.class);
    }

    public String getDatasources(Integer index) {
        WildflyServer server = serverProperties.getServerList().get(index);

        return server.getRestClient().post().uri("/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("""
                            {
                                "operation": "read-children-resources",
                                "child-type": "data-source",
                                "address": [
                                    {
                                        "subsystem": "datasources"
                                    }
                                ]
                            }
                            """)
                    .retrieve().body(String.class);
    }

    public String getJndiBindings(Integer index) {
        WildflyServer server = serverProperties.getServerList().get(index);

        return server.getRestClient().post().uri("/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("""
                            {
                                "operation": "read-children-resources",
                                "child-type": "binding",
                                "address": [
                                    {
                                        "subsystem": "naming"
                                    }
                                ]
                            }
                            """)
                    .retrieve().body(String.class);
    }
}
