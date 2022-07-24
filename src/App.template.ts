// Angular syntax highlighting if your IDE supports it.
//
// Packages
// Atom: language-angular-inline
// VSCode: angular2-inline

const app = {
template: `
<ul class="nav nav-tabs" id="appTabs" role="tablist">

  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="settings-tab" data-bs-toggle="tab"
    data-bs-target="#settings" type="button" role="tab" aria-controls="settings"
    aria-selected="true">
      <span class="mi mi-settings"></span> Settings
    </button>
  </li>

  <li class="nav-item" role="presentation">
    <button class="nav-link" id="editor-tab" data-bs-toggle="tab"
    data-bs-target="#editor" type="button" role="tab" aria-controls="editor"
    aria-selected="false">
      <span class="mi mi-edit-note"></span> Editor
    </button>
  </li>

  <li class="nav-item" role="presentation">
    <button class="nav-link" id="rehearsal-tab" data-bs-toggle="tab"
    data-bs-target="#rehearsal" type="button" role="tab"
    aria-controls="rehearsal" aria-selected="false">
      <span class="mi mi-menu-book"></span> Rehearsal
    </button>
  </li>

  <li class="nav-item" role="presentation">
    <button class="nav-link" id="performance-tab" data-bs-toggle="tab"
    data-bs-target="#performance" type="button" role="tab"
    aria-controls="performance" aria-selected="false">
      <span class="mi mi-theater-comedy"></span> Performance
    </button>
  </li>

</ul>



<div class="tab-content" id="appTabsContent">

  <div class="tab-pane fade show active" id="settings" role="tabpanel"
  aria-labelledby="settings-tab">
    <h1>Settings</h1>
  </div>

  <div class="tab-pane fade" id="editor" role="tabpanel"
  aria-labelledby="editor-tab">
    <h1>Editor</h1>
  </div>

  <div class="tab-pane fade" id="rehearsal" role="tabpanel"
  aria-labelledby="rehearsal-tab">
    <h1>Rehearsal</h1>
  </div>

  <div class="tab-pane fade" id="performance" role="tabpanel"
  aria-labelledby="performance-tab">
    <h1>Performance</h1>
  </div>

</div>`
}

export const appTemplate = app.template
