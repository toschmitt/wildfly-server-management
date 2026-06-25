import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { Observable } from "rxjs";

@Service()
export class WildflyService {
  private httpClient: HttpClient = inject(HttpClient);

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

export interface DatasourceResponse {
  outcome: string;
  result: DatasourcesResult;
}

export interface DatasourcesResult {
  "data-source": Record<string, DataSource>;
  "xa-data-source": Record<string, XaDataSource>;
  "jdbc-driver": Record<string, JdbcDriver>;
}

export interface JdbcDriver {
  "deployment-name": string | null;
  "driver-class-name": string | null;
  "driver-datasource-class-name": string | null;
  "driver-major-version": number | null;
  "driver-minor-version": number | null;
  "driver-module-name": string | null;
  "driver-name": string;
  "driver-xa-datasource-class-name": string | null;
  "jdbc-compliant": boolean | null;
  "module-slot": string | null;
  "profile": string | null;
}

export interface DataSource {
  "jndi-name": string;
  "driver-name": string;
  "user-name": string | null;
  "password": string | null;

  "connection-url": string | null;

  "enabled": boolean;
  "jta": boolean;

  "min-pool-size": number | null;
  "max-pool-size": number | null;
  "initial-pool-size": number | null;

  "statistics-enabled": boolean;

  [key: string]: unknown;
}

export interface XaDataSource {
  "jndi-name": string;
  "driver-name": string;
  "user-name": string | null;
  "password": string | null;

  "enabled": boolean;

  "interleaving": boolean;
  "no-recovery": boolean;
  "wrap-xa-resource": boolean;

  "xa-datasource-class": string | null;
  "xa-resource-timeout": number | null;

  "xa-datasource-properties": Record<string, XaProperty>;

  [key: string]: unknown;
}

export interface XaProperty {
  value: string | number | boolean | ExpressionValue;
}

export interface ExpressionValue {
  EXPRESSION_VALUE: string;
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