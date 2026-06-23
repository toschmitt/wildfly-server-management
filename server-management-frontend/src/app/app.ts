import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Component, inject, signal, ChangeDetectorRef } from '@angular/core';
import { ServerStatus, WildflyServer, WildflyService } from '../service/wildfly.service';
import { Wildfly } from './wildfly/wildfly';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-root',
  imports: [MatTabsModule, Wildfly, MatChipsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private wildflyService: WildflyService = inject(WildflyService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private cdr : ChangeDetectorRef = inject(ChangeDetectorRef);
  serverList: WildflyServer[] = [];
  serverStatus = signal<Record<number, ServerStatus>>({});

  ngOnInit() {
    this.wildflyService.serverList().subscribe(sl => {
      this.serverList = sl;
      this.cdr.detectChanges();
    });
  }

  getColorClass(index: number): string {
    if (this.serverStatus()[index]?.result === "running") {
      return "running"
    } else {
      return "down";
    }
  }

}
