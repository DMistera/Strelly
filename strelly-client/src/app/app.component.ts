import { LoadingService } from '@app/services/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadingObservable = this.loadingService.loadingObservable;
  constructor(private loadingService: LoadingService) {}
 }
