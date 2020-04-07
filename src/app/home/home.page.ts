import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public coronaData: any;
  public coronaAllData: any;
  public coronaCountriesData: any = [];
  public filterData: any = [];

  constructor(private data: DataService, public http: HttpClient) {}

  ngOnInit() {
    this.getData();
    this.getAllData();
    this.getCountriesData();
  }

  getData() {
    this.http.get('https://corona.lmao.ninja/countries/bd').subscribe( data => {
      this.coronaData = data;
      console.log(this.coronaData);
    });
  }

  getAllData() {
    this.http.get('https://corona.lmao.ninja/all').subscribe( data => {
      this.coronaAllData = data;
    });
  }

  getCountriesData() {
    this.http.get('https://corona.lmao.ninja/countries').subscribe( data => {
      this.coronaCountriesData = data;
      this.filterData = this.coronaCountriesData;
    });
  }

  onSearchTerm(ev: CustomEvent) {
    this.filterData = this.coronaCountriesData;
    const val = ev.detail.value;

    if (!val) {
      return;
    }

    if ( val.trim() !== '' ) {
      this.filterData = this.filterData.filter(term => {
        return term.country.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  /*
  detailPage() {
    this.router.navigateByUrl('/corona-virus');
  }*/

}
