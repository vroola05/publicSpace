import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  public transform(value: string, args: string[]): string {
    const validatedValue = value === undefined ? '' : value == null ? '' : value;

    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args[1] : '...';
    return validatedValue.length > limit ? validatedValue.substring(0, limit) + trail : validatedValue;
   }
}
