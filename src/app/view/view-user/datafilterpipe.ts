import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class ViewUserFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>row.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }
    return array;
  }
  // transform(categories: any, searchText: any): any {
  //   if(searchText == null) return categories;
  
  //   return categories.filter(function(category){
  //     var name_search=category.name.toLowerCase().indexOf(searchText.toLowerCase()) > 
  //       -1;
  //     var email_search=category.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  //      var last_name=category.last_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  //      var roles = category.roles[0].name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  //     return name_search || email_search || last_name || roles;
  //   })
  
  // }
}
