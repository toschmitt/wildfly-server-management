package de.tobias.server_management.rest;

import java.net.URI;

import org.apache.hc.client5.http.auth.AuthScope;
import org.apache.hc.client5.http.auth.UsernamePasswordCredentials;
import org.apache.hc.client5.http.classic.HttpClient;
import org.apache.hc.client5.http.impl.auth.BasicCredentialsProvider;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

public class RestClientFactory {
    public static RestClient restClientWithAuthentication(URI apiUrl, String username, String password) {
        BasicCredentialsProvider credentialsProvider = new BasicCredentialsProvider();

        credentialsProvider.setCredentials(new AuthScope(apiUrl.getHost(), apiUrl.getPort()),
                new UsernamePasswordCredentials(username, password.toCharArray()));

        HttpClient httpClient = HttpClients.custom().setDefaultCredentialsProvider(credentialsProvider).build();

        return RestClient.builder().requestFactory(new HttpComponentsClientHttpRequestFactory(httpClient))
                .baseUrl(apiUrl).defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE).build();
    }
}