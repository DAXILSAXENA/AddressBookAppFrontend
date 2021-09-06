import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Addressbook } from 'src/app/model/addressbook';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public addressbook: Addressbook = new Addressbook;
  public addressbookFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dataService: DataService) {

    /**
     * Added validations to the addressbook form data.
     */
    this.addressbookFormGroup = this.fb.group({
      fullName: new FormControl('', [Validators.pattern("^[A-Z]{1}[a-zA-Z\\s]{2,}$"), Validators.required]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl('', [Validators.pattern("[0-9]{6}"), Validators.required]),
      phoneNumber: new FormControl('', [Validators.pattern("[0-9]{10}"), Validators.required]),
    })
  }

  /**
   * Method to set the addressbook object value of a particular addressbook id in the addressbook FormBuilder.
   * This method is called when the update() is hit in the HOME page.
   */
  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.dataService.currentAddressbook.subscribe(addressbook => {
        if (Object.keys(addressbook).length !== 0) {
          console.log(addressbook);
          this.addressbookFormGroup.get('fullName')?.setValue(addressbook.fullName);
          this.addressbookFormGroup.get('phoneNumber')?.setValue(addressbook.phoneNumber);
          this.addressbookFormGroup.get('address')?.setValue(addressbook.address);
          this.addressbookFormGroup.get('city')?.setValue(addressbook.city);
          this.addressbookFormGroup.get('state')?.setValue(addressbook.state);
          this.addressbookFormGroup.get('zipCode')?.setValue(addressbook.zipCode);
        }
      });
    }
  }

  /**
   * submit method to call http services for update and adding of new addressbook data.
   */
  submit(): void {

    console.log(this.addressbookFormGroup);

    this.addressbook = this.addressbookFormGroup.value;

    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.httpService.updateAddressBookDetails(this.addressbook, this.activatedRoute.snapshot.params['id']).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/home');
        this.snackBar.open("Form Updated Successfully", "Updated", { duration: 3000 });
      });

    }
    else {
      this.httpService.addAddressBookDetails(this.addressbook).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/home');
        this.snackBar.open("Form Submitted Successfully", "Submitted", { duration: 3000 });
      });

    }

  }

  /**
   * Method to validate and display error while inputting form details.
   */
  public checkError = (controlName: string, errorName: string) => {
    return this.addressbookFormGroup.controls[controlName].hasError(errorName);
  }

}
