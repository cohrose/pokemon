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
      return txt.charAt(0).toUpperCase() + txt.slice(1);
    });
  }
}

@Pipe({ name: 'formatdash' })
export class FormatDashPipe implements PipeTransform {
  transform(text: string): string {
    let ending = text.slice(1);
    ending = ending.replace(/\-[a-z]/g, (match) => match.toUpperCase());
    return text.charAt(0).toUpperCase() + ending;
  }
}

@Pipe({ name: 'replacedash' })
export class ReplaceDashPipe implements PipeTransform {
  transform(text: string): string {
    let ending = text.slice(1);
    ending = ending.replace(/\-[a-z]/g, (match) => match.toUpperCase());
    ending = ending.replace(/\-/g, ' ');
    return text.charAt(0).toUpperCase() + ending;
  }
}

@Pipe({ name: 'formatversion' })
export class FormatVersion implements PipeTransform {
  transform(txt: string): string {
    if (txt == 'firered') {
      return 'Fire Red';
    } else if (txt == 'leafgreen') {
      return 'Leaf Green';
    } else if (txt == 'soulsilver') {
      return 'Soul Silver';
    } else if (txt == 'heartgold') {
      return 'Heart Gold';
    }
    let ending = txt.slice(1);
    ending = ending.replace(/\-/g, ' ');
    return txt.charAt(0).toUpperCase() + ending;
  }
}
