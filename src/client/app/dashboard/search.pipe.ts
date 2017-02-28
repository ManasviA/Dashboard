import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
  transform(value: any, search: string): number {
    if(!search || search==="") {
        return value;
    }
    return value.filter((val:any)=>JSON.stringify(val).toLowerCase().indexOf(search.toLowerCase())>-1);
  }
}