package de.tobias.server_management;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.tobias.server_management.rest.RestClientFactory;

public class WildflyServer {
    private static final Logger LOG = LoggerFactory.getLogger(WildflyServer.class);

    private String username;
    private String password;
    private URI apiUrl;
    private String startCommand;
    private String tag;

    @JsonIgnore
    private RestClient restClient;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public URI getApiUrl() {
        return apiUrl;
    }
    
    public void setApiUrl(URI apiUrl) {
        this.apiUrl = apiUrl;
    }

    public String[] getStartCommand() {
        return startCommand.split(" ");
    }

    public void setStartCommand(String pathToScript) {
        this.startCommand = pathToScript;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public RestClient getRestClient() {
        if (this.restClient == null) {
            LOG.info("erstelle neuen Rest Client für Server {}", apiUrl);
            this.restClient = RestClientFactory.restClientWithAuthentication(apiUrl, username, password);
        }

        return this.restClient;
    }

}