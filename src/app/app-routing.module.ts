import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { EditorComponent } from './view/editor/editor.component'
import { RehearsalComponent } from './view/rehearsal/rehearsal.component'
import { PerformanceComponent } from './view/performance/performance.component'

const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'rehearsal',
    component: RehearsalComponent
  },
  {
    path: 'performance',
    component: PerformanceComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
