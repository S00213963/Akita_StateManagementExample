
import { PeopleService } from '../../services/people.service';
import { People } from '../../model/people.model';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PeopleStore } from '../../store/store/people.store';

@Component({
  selector: 'app-create-person',
  templateUrl: 'create-person.component.html'
})
export class CreatePersonComponent  {

  constructor(private store: PeopleStore, private peopleService: PeopleService, private router: Router) { }

  createPersonSub: Subscription;

  onSubmit(submittedForm: { value: { lastname: any; firstname: any; phone: any; }; invalid: any; }) {
    if (submittedForm.invalid) {
      return;
    }
    const people: People = {id: uuid.v4(), lastName: submittedForm.value.lastname,firstName: submittedForm.value.firstname, phone: submittedForm.value.phone};
    this.createPersonSub = this.peopleService.createPerson(people).subscribe(result => {
      this.router.navigateByUrl('/people');
    });
  }
}
