import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { AppRoutingModule } from './app-routing.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http'
import { AngularFontAwesomeModule } from 'angular-font-awesome'
import { AngularEditorModule } from '@kolkov/angular-editor'

import { AppComponent } from './app.component'
import { ViewComponent } from './view/view.component'
import { EditorComponent } from './view/editor/editor.component'
import { RehearsalComponent } from './view/rehearsal/rehearsal.component'
import { PerformanceComponent } from './view/performance/performance.component'
import { EditBoxComponent } from './panel/edit-box/edit-box.component'
import { SettingsComponent } from './view/settings/settings.component'

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    EditorComponent,
    RehearsalComponent,
    PerformanceComponent,
    EditBoxComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    NgbModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
