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
      <span class="mi mi-settings"></span> Settings&nbsp;&nbsp;
      <span id="settings-close" class="close">×</span>
    </button>
  </li>

  <li class="nav-item" role="presentation">
    <button class="nav-link" id="editor-tab" data-bs-toggle="tab"
    data-bs-target="#editor" type="button" role="tab" aria-controls="editor"
    aria-selected="false">
      <span class="mi mi-edit-note"></span> Editor&nbsp;&nbsp;
      <span id="editor-close" class="close">×</span>
    </button>
  </li>

  <li class="nav-item" role="presentation">
    <button class="nav-link" id="rehearsal-tab" data-bs-toggle="tab"
    data-bs-target="#rehearsal" type="button" role="tab"
    aria-controls="rehearsal" aria-selected="false">
      <span class="mi mi-menu-book"></span> Rehearsal&nbsp;&nbsp;
      <span id="rehearsal-close" class="close">×</span>
    </button>
  </li>

  <li class="nav-item" role="presentation">
    <button class="nav-link" id="performance-tab" data-bs-toggle="tab"
    data-bs-target="#performance" type="button" role="tab"
    aria-controls="performance" aria-selected="false">
      <span class="mi mi-theater-comedy"></span> Performance&nbsp;&nbsp;
      <span id="performance-close" class="close">×</span>
    </button>
  </li>

</ul>



<div class="tab-content" id="appTabsContent">

  <div class="tab-pane fade show active" id="settings" role="tabpanel"
  aria-labelledby="settings-tab">
  </div>

  <div class="tab-pane fade" id="editor" role="tabpanel"
  aria-labelledby="editor-tab">
  </div>

  <div class="tab-pane fade" id="rehearsal" role="tabpanel"
  aria-labelledby="rehearsal-tab">
  </div>

  <div class="tab-pane fade" id="performance" role="tabpanel"
  aria-labelledby="performance-tab">
  </div>

</div>`
}

export const appTemplate = app.template
