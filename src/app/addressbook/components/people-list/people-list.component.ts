
import { PeopleService } from '../../services/people.service';

import { tap, switchMap, filter } from 'rxjs/operators';
import { People } from '../../model/people.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { PeopleQuery } from '../../store/store/people.query';
import { PeopleState } from '../../store/store/people.store';

@Component({
  selector: 'app-people-list',
  templateUrl: 'people-list.component.html'
})
export class PeopleListComponent implements OnInit, OnDestroy {

  personToBeUpdated: People | any;
  isUpdateActivated = false;
  listPeopleSub : Subscription;
  deletePersonSub: Subscription;
  updatePersonSub: Subscription; 
  pstate: PeopleState

  people$: Observable<People[]> = this.peopleQuery.selectAll();


 addressBook:People[];

 constructor(private PeopleService: PeopleService,private peopleQuery: PeopleQuery) {
}


  ngOnInit() {
    //this.getPeople();
    this.listPeopleSub = this.peopleQuery.selectArePeopleLoaded$.pipe(
      filter(arePeopleLoaded => !arePeopleLoaded),
      switchMap(arePeopleLoaded =>{
        if(!arePeopleLoaded)
        {
          return this.PeopleService.getAllPeople();
        }else return '';
      })
    ).subscribe(result => {});
  }
  ngOnDestroy(): void {
    if(this.listPeopleSub)
    {
      this.listPeopleSub.unsubscribe();
    }
    if(this.listPeopleSub)
    {
      this.deletePersonSub.unsubscribe();
    }
    if(this.listPeopleSub)
    {
      this.updatePersonSub.unsubscribe();
    }
  }

  // getPeople() {
  //   this.PeopleService.getAllPeople().subscribe(
  //     people => {
  //       this.addressBook=people;
  //       console.log("load people over network, sad face..");
  //     }
  //   )
  // }

  deletePerson(personId: string) {
    this.deletePersonSub = this.PeopleService.deletePerson(personId).subscribe(result => {
      console.log(result);
    });

  }

  showUpdateForm(person: People) {
    this.isUpdateActivated = true;
    this.personToBeUpdated = {...person};
  }


  updatePerson(updateForm: { value: People; }) {
    this.updatePersonSub = this.PeopleService.updatePerson(
      this.personToBeUpdated.id, updateForm.value).subscribe(result => console.log(result)

    );
    this.isUpdateActivated = false;
    this.personToBeUpdated = null;
  }


}

