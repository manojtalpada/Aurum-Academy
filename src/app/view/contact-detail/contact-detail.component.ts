import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

   
  contact: any;
  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
	
 	this.contactService.getContact(params.get('user_name')).subscribe(c =>{
		console.log(c);
    this.contact = c;
    alert(c)
    })   
    });
 	
  }
}
