import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ViewComponent } from './view/view.component'
import { EditorComponent } from './view/editor/editor.component'
import { RehearsalComponent } from './view/rehearsal/rehearsal.component'
import { PerformanceComponent } from './view/performance/performance.component'

@NgModule({
  declarations: [AppComponent, ViewComponent, EditorComponent, RehearsalComponent, PerformanceComponent],
  imports: [BrowserModule, AppRoutingModule, TooltipModule.forRoot(), NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
