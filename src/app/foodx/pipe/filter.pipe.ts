import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allfoods: any[],searchterm:string,propertyname:string):any[] {
    const result:any=[]
    if(!allfoods || searchterm == '' || propertyname ==''){
      return allfoods
    }
    allfoods.forEach((item:any)=>{
      if(item[propertyname].trim().toLowerCase().includes(searchterm.trim().toLowerCase())){
        result.push(item)
      }
    })


    return result
  }

}
