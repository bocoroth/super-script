import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'

import { AngularEditorModule } from '@kolkov/angular-editor'
import { AngularFontAwesomeModule } from 'angular-font-awesome'
import { AppRoutingModule } from './app-routing.module'
import { BrowserModule } from '@angular/platform-browser'
import { DataTablesModule } from 'angular-datatables'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { TooltipModule } from 'ngx-bootstrap/tooltip'

import { EditBoxComponent } from './panel/edit-box/edit-box.component'
import { EditorComponent } from './view/editor/editor.component'
import { LineListComponent } from './panel/line-list/line-list.component'
import { PerformanceComponent } from './view/performance/performance.component'
import { RehearsalComponent } from './view/rehearsal/rehearsal.component'
import { SettingsComponent } from './view/settings/settings.component'
import { ToolbarComponent } from './view/toolbar/toolbar.component'
import { ViewComponent } from './view/view.component'

import { DatatableService } from './datatable.service'
import { FileService } from './file.service'
import { FontService } from './font.service'
import { IpcService } from './ipc.service'
import { LineBrokerService } from './line-broker.service'
import { ScriptService } from './script.service'
import { SettingsService } from './settings.service'

@NgModule({
  declarations: [
    AppComponent,
    EditBoxComponent,
    EditorComponent,
    LineListComponent,
    PerformanceComponent,
    RehearsalComponent,
    SettingsComponent,
    ToolbarComponent,
    ViewComponent
  ],
  imports: [
    AngularEditorModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    BrowserModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    KeyboardShortcutsModule.forRoot(),
    NgbModule,
    TooltipModule.forRoot()
  ],
  providers: [
    DatatableService,
    FileService,
    FontService,
    IpcService,
    LineBrokerService,
    ScriptService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
