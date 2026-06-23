package de.tobias.server_management.rest;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;

import de.tobias.server_management.WildflyServer;
import de.tobias.server_management.service.WildflyService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class WildflyController {

    private WildflyService wildflyService;

    public WildflyController(WildflyService wildflyService) {
        this.wildflyService = wildflyService;
    }

    @GetMapping
    public List<WildflyServer> serverList() {
        return wildflyService.getServerList();
    }

    @GetMapping("/server/{index}")
    public ResponseEntity<String> getServer(@PathVariable Integer index) {
        try {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body(wildflyService.getServerStatus(index));
        } catch (ResourceAccessException e) {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body("{\"outcome\": \"failed\", \"result\": \"down\"}");
        }
    }

    @GetMapping("/server/{index}/shutdown")
    public ResponseEntity<String> shutdownServer(@PathVariable Integer index) {
        try {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body(wildflyService.shutdownServer(index));
        } catch (ResourceAccessException e) {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body("{\"outcome\": \"failed\"}");
        }
    }

    @GetMapping("/server/{index}/start")
    public ResponseEntity<String> startServer(@PathVariable Integer index) {
        try {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body(wildflyService.startServer(index));
        } catch (ResourceAccessException e) {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body("{\"outcome\": \"failed\"}");
        }
    }

    @GetMapping("/server/{index}/deployments")
    public ResponseEntity<String> deployments(@PathVariable Integer index) {
        try {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body(wildflyService.getDeployments(index));
        } catch (ResourceAccessException e) {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body("{\"outcome\": \"failed\"}");
        }
    }

    @GetMapping("/server/{index}/datasources")
    public ResponseEntity<String> datasources(@PathVariable Integer index) {
        try {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body(wildflyService.getDatasources(index));
        } catch (ResourceAccessException e) {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body("{\"outcome\": \"failed\"}");
        }
    }

    @GetMapping("/server/{index}/jndi-bindings")
    public ResponseEntity<String> jndiBindings(@PathVariable Integer index) {
        try {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body(wildflyService.getJndiBindings(index));
        } catch (ResourceAccessException e) {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                    .body("{\"outcome\": \"failed\"}");
        }
    }
}