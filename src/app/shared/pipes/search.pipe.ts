import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string, key: any = 'name'): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      console.log('item[key]:', item[key]);
      return item[key].toString().toLowerCase().includes(searchText);
    });
  }
}
