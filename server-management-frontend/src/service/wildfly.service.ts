import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { Observable } from "rxjs";

@Service()
export class WildflyService {
    private httpClient : HttpClient = inject(HttpClient);

    serverList(): Observable<WildflyServer[]> {
       return this.httpClient.get<WildflyServer[]>("http://localhost:26900/api");
    }

    serverStatus(index: number): Observable<ServerStatus> {
        return this.httpClient.get<ServerStatus>("http://localhost:26900/api/server/" + index);
    }
    
    startServer(index: number): Observable<ServerStatus> {
        return this.httpClient.get<ServerStatus>("http://localhost:26900/api/server/" + index + "/start");
    }

    stopServer(index: number): Observable<ServerStatus> {
        return this.httpClient.get<ServerStatus>("http://localhost:26900/api/server/" + index + "/shutdown");
    }

    datasources(index: number): Observable<DatasourceResponse> {
        return this.httpClient.get<DatasourceResponse>("http://localhost:26900/api/server/" + index + "/datasources");
    }

    deployments(index: number): Observable<DeploymentResponse> {
        return this.httpClient.get<DeploymentResponse>("http://localhost:26900/api/server/" + index + "/deployments");
    }

    jndiBindings(index: number): Observable<NamingBindingResponse> {
        return this.httpClient.get<NamingBindingResponse>("http://localhost:26900/api/server/" + index + "/jndi-bindings");
    }
}

export interface WildflyServer {
    apiUrl: string;
    tag: string;
}

export interface ServerStatus {
    outcome: string;
    result: string;
}

export interface ExpressionValue {
  EXPRESSION_VALUE: string;
}

export interface Datasource {
  "allocation-retry": number | null;
  "allocation-retry-wait-millis": number | null;
  "allow-multiple-users": boolean;
  "authentication-context": string | null;
  "background-validation": boolean | null;
  "background-validation-millis": number | null;
  "blocking-timeout-wait-millis": number | null;

  "capacity-decrementer-class": string | null;
  "capacity-decrementer-properties": unknown | null;
  "capacity-incrementer-class": string | null;
  "capacity-incrementer-properties": unknown | null;

  "check-valid-connection-sql": string | null;
  "connectable": boolean;

  "connection-listener-class": string | null;
  "connection-listener-property": unknown | null;

  "connection-url": ExpressionValue;

  "credential-reference": unknown | null;
  "datasource-class": string | null;
  "driver-class": string | null;
  "driver-name": string;

  "elytron-enabled": boolean;
  "enabled": boolean;
  "enlistment-trace": boolean;

  "exception-sorter-class-name": string | null;
  "exception-sorter-module": string | null;
  "exception-sorter-properties": unknown | null;

  "flush-strategy": string | null;

  "idle-timeout-minutes": number | null;
  "initial-pool-size": number | null;

  "jndi-name": string;
  "jta": boolean;

  "max-pool-size": number | null;
  "mcp": string;
  "min-pool-size": number | null;

  "new-connection-sql": string | null;
  "password": string;

  "pool-fair": boolean | null;
  "pool-prefill": boolean | null;
  "pool-use-strict-min": boolean | null;

  "prepared-statements-cache-size": number | null;
  "query-timeout": number | null;

  "reauth-plugin-class-name": string | null;
  "reauth-plugin-properties": unknown | null;

  "security-domain": string | null;

  "set-tx-query-timeout": boolean;
  "share-prepared-statements": boolean;
  "spy": boolean;

  "stale-connection-checker-class-name": string | null;
  "stale-connection-checker-module": string | null;
  "stale-connection-checker-properties": unknown | null;

  "statistics-enabled": ExpressionValue;
  "track-statements": string;
  "tracking": boolean;

  "transaction-isolation": string | null;
  "url-delimiter": string | null;
  "url-selector-strategy-class-name": string | null;

  "use-ccm": boolean;
  "use-fast-fail": boolean;
  "use-java-context": boolean;
  "use-try-lock": number | null;

  "user-name": string;

  "valid-connection-checker-class-name": string | null;
  "valid-connection-checker-module": string | null;
  "valid-connection-checker-properties": unknown | null;

  "validate-on-match": boolean | null;

  "connection-properties": unknown | null;
  "statistics": unknown | null;
}

export interface DatasourceResult {
  [datasourceName: string]: Datasource;
}

export interface DatasourceResponse {
  outcome: "success" | "failed";
  result: DatasourceResult;
}

export interface BytesValue {
  BYTES_VALUE: string;
}

export interface DeploymentContent {
  hash: BytesValue;
}

export interface Deployment {
  content: DeploymentContent[];
  enabled: boolean;
  name: string;
  owner: string | null;
  persistent: boolean;
  "runtime-name": string;
  subdeployment: unknown | null;
  subsystem: unknown | null;
}

export interface DeploymentResult {
  [deploymentName: string]: Deployment;
}

export interface DeploymentResponse {
  outcome: string;
  result: DeploymentResult;
}

export interface NamingBinding {
  "binding-type": string;
  cache: string | null;
  class: string | null;
  environment: string | null;
  lookup: string | null;
  module: string | null;
  type: string;
  value: string;
}

export interface NamingBindingResponse {
  outcome: string;
  result: Record<string, NamingBinding>;
}