import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experienceFilter'
})
export class ExperienceFilterPipe implements PipeTransform {

  transform(value: any, toYear: string, forYear: string): any {
    /*if (toYear === null || forYear == null || toYear == 0 || forYear == 0){
      console.log("hola");
      return value;
    } */
      
    const resultPosts = [];
      
    for (const post of value){
      console.log("dentro del for");
      if(post.experience > forYear || post.experience < toYear){
        resultPosts.push(post);
      };
    };
    console.log("desde:" + forYear);
    console.log("hasta:" + toYear);
    return resultPosts;
  }

}
