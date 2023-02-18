import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'format' })
export class FormatPipe implements PipeTransform {
  transform(name: string): string {
    let newName;
    if (name.includes('-f')) {
      newName = name.replace('-f', ' (F)');
    } else if (name == 'mr-mime') {
      newName = 'Mr-Mime';
    } else if (name.includes('-m')) {
      newName = name.replace('-m', ' (M)');
    } else {
      newName = name;
    }
    return newName.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
  }
}

@Pipe({ name: 'formatdash' })
export class FormatDashPipe implements PipeTransform {
  transform(text: string): string {
    let ending = text.substr(1);
    ending = ending.replace(/\-[a-z]/g, (match) => match.toUpperCase());
    return text.charAt(0).toUpperCase() + ending;
  }
}

@Pipe({ name: 'replacedash' })
export class ReplaceDashPipe implements PipeTransform {
  transform(text: string): string {
    let ending = text.substr(1);
    ending = ending.replace(/\-[a-z]/g, (match) => match.toUpperCase());
    ending = ending.replace(/\-/g, ' ');
    return text.charAt(0).toUpperCase() + ending;
  }
}
