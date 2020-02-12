import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { AppRoutingModule } from './app-routing.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { AngularFontAwesomeModule } from 'angular-font-awesome'
import { AngularEditorModule } from '@kolkov/angular-editor'
import { DataTablesModule } from 'angular-datatables'

import { AppComponent } from './app.component'
import { ViewComponent } from './view/view.component'
import { EditorComponent } from './view/editor/editor.component'
import { RehearsalComponent } from './view/rehearsal/rehearsal.component'
import { PerformanceComponent } from './view/performance/performance.component'
import { EditBoxComponent } from './panel/edit-box/edit-box.component'
import { SettingsComponent } from './view/settings/settings.component'
import { LineListComponent } from './panel/line-list/line-list.component'

import { DatatableService } from './datatable.service'
import { ScriptService } from './script.service'

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    EditorComponent,
    RehearsalComponent,
    PerformanceComponent,
    EditBoxComponent,
    SettingsComponent,
    LineListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    NgbModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    AngularEditorModule,
    DataTablesModule
  ],
  providers: [DatatableService, ScriptService],
  bootstrap: [AppComponent]
})
export class AppModule {}
