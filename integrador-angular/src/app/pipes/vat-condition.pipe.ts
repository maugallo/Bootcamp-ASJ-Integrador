import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatCondition'
})
export class VatConditionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (typeof(value) === 'string'){
      return value.replaceAll('_',' ').toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    } else {
      return value;
    }
  }

}
