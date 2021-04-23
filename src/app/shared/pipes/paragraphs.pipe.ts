import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paragraphs',
})
export class ParagraphsPipe implements PipeTransform {
  transform(text: string) {
    if (text) {
      return (
        '<p>' +
        text
          .replace(new RegExp('(\n){2,}', 'g'), '</p><p>')
          .replace(new RegExp('(\n){1}', 'g'), '<br>')
          .replace(new RegExp('(<br>){2,}', 'g'), '<br>') +
        '</p>'
      );
    }
    return '';
  }
}
