import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlFromFile',
  standalone: true
})
export class URLFromFilePipe implements PipeTransform {
  transform(file: File): string  | null {
    return file ? URL.createObjectURL(file) : null;
  }
}
