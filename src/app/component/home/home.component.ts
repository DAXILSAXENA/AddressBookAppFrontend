import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Addressbook } from 'src/app/model/addressbook';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public addressBookDetails: Addressbook[] = [];

  constructor(private httpService: HttpService, private router: Router, private dataService: DataService, private snackBar: MatSnackBar) { }

  /**
   * On initialization getAddressBookDetails() is hit and all addressbook details are populated from the database to the HOME page.
   */
  ngOnInit(): void {
    this.httpService.getAddressBookDetails().subscribe(response => {
      this.addressBookDetails = response.data;
      console.log(this.addressBookDetails);
    });
  }

  /**
   * this method delete addressbook details for a given id from database and update HomePage.
   */
  remove(id: number) {
    this.httpService.deleteAddressBookDetails(id).subscribe(data => {
      console.log(data);
      this.ngOnInit();
      this.snackBar.open("Form Deleted Successfully", "Deleted", { duration: 3000 });

    });
  }

  /**
   * this method call the DataService.
   */
  update(addressbook: Addressbook): void {
    this.dataService.changeAddressbook(addressbook);
    this.router.navigateByUrl('/add/' + addressbook.id);
  }

}
