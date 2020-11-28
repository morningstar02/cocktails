import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CocktailService } from 'src/app/_services/cocktail.service';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export interface CocktailData {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];


@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss']
})

export class CocktailsComponent implements OnInit, AfterViewInit  {
  showSpinner = false;
  displayedColumns: string[] = ['strDrink', 'strDrinkThumb'];
  dataSource2: MatTableDataSource<CocktailData>;
  
  cocktails: CocktailData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cocktailService: CocktailService) {

  }
  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getCocktails();
  }

  getCocktails() {
    
    this.showSpinner = true;
    this.cocktailService.filterByAlcoholic('Alcoholic').subscribe(
      data => {
        this.showSpinner = false;
        if(!!data.drinks) {
          let drinks: CocktailData[] = data.drinks;
          console.log(drinks);
          this.dataSource2 = new MatTableDataSource(drinks);
          this.dataSource2.paginator = this.paginator;
          this.dataSource2.sort = this.sort;
        }


      },
      error => {
        this.showSpinner = false;
        console.log(error)
      }
    )
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}