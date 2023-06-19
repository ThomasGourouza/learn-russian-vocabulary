import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {

  transform(time: number): string {
    return `${(time/1000).toString()}s`;
  }
}
