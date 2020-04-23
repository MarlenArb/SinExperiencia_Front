import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experienceFilter'
})
export class ExperienceFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg == null || arg.length<3) return value;
      const resultPosts = [];
    for (const post of value){
      if(post.experience.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
