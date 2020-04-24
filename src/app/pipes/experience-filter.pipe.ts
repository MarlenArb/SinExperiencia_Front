import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experienceFilter'
})
export class ExperienceFilterPipe implements PipeTransform {

  transform(value: any, toYear: number, forYear: number): any {
    if (toYear === null || forYear == null) return value;
      const resultPosts = [];
    for (const post of value){
      if(post.experience > forYear || post.experience < toYear){
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
