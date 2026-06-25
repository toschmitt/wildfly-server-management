import { Component, inject, Input, ChangeDetectorRef, input, WritableSignal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle'
import { DataSource, DatasourceResponse, DeploymentResponse, NamingBindingResponse, ServerStatus, WildflyService, XaDataSource } from '../../service/wildfly.service';
import { interval, Observable } from 'rxjs';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-wildfly',
  imports: [MatCardModule, MatSlideToggleModule, MatExpansionModule, KeyValuePipe, JsonPipe],
  templateUrl: './wildfly.html',
  styleUrl: './wildfly.scss',
})
export class Wildfly {
  private wildflyService : WildflyService = inject(WildflyService);
  private cdr : ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() index!: number;
  @Input() apiUrl!: string;

  serverStatus = input.required<WritableSignal<Record<number, ServerStatus>>>();

  datasources!: Record<string, DataSource>;
  xaDataSources!: Record<string, XaDataSource>;
  deploymentResponse!: DeploymentResponse;
  namingBindingResponse!: NamingBindingResponse;

  ngOnInit() {
    interval(1000).subscribe(() => this.updateServerStatus());

    this.updateData();

    interval(15000).subscribe(() => this.updateData());
  }

  private updateData() {
    this.wildflyService.datasources(this.index).subscribe((d) => {
      this.datasources = d.result['data-source'];
      this.xaDataSources = d.result['xa-data-source'];
      this.cdr.detectChanges();
    });

    this.wildflyService.deployments(this.index).subscribe((d) => {
      this.deploymentResponse = d;
      this.cdr.detectChanges();
    });

    this.wildflyService.jndiBindings(this.index).subscribe((d) => {
      this.namingBindingResponse = d;
      this.cdr.detectChanges();
    });
  }

  private updateServerStatus() {
    this.wildflyService.serverStatus(this.index).subscribe(st => {
      this.serverStatus().update(current => ({
        ...current,
        [this.index]: st
      }));
      this.cdr.detectChanges();
    });
  }

  toggleChanged(e : MatSlideToggleChange) {
    if (e.checked) {
      this.wildflyService.startServer(this.index).subscribe();
    } else {
      this.wildflyService.stopServer(this.index).subscribe();
    }
  }

}
