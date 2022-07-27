import { editBoxTemplate } from './EditBox.template';

// import tinymce from 'tinymce/tinymce';
// import 'tinymce/themes/silver/theme';
// import 'tinymce/icons/default/icons';
// import 'tinymce/models/dom/model';

export class EditBox {
    constructor() {}

    public load(selector: string) {
      document.querySelector<HTMLDivElement>(selector)!.innerHTML = editBoxTemplate

      // tinymce.init({
      //   selector: 'textarea#tinymce'
      // })
    }
}
