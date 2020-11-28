import {AfterViewInit, Component, ViewChild, OnInit, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CocktailService } from 'src/app/_services/cocktail.service';
import {MatDialog} from '@angular/material/dialog';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';

export interface DialogData {
  url: string;
}

export interface CocktailData {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

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

  constructor(private cocktailService: CocktailService, public dialog: MatDialog) { }

  openDialog(url: string): void {
    const dialogRef = this.dialog.open(ImagePreviewComponent, {
      width: '480px',
      data: {url}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit(): void { 
    this.filterByAlcoholic('Alcoholic');
  }

  ngAfterViewInit() {

  }

  fetchCocktails(type: string) {
      switch (type) {
        case "Alcoholic":
            this.filterByAlcoholic('Alcoholic');
            break;
        case "Non_Alcoholic":
            this.filterByAlcoholic('Non_Alcoholic');
            break;
        case "Ordinary_Drink":
            this.filterByCategory('Ordinary_Drink');
            break;
        case "Cocktail":
            this.filterByCategory('Cocktail');
            break;
        case "Cocktail_glass":
            this.filterByGlass('Cocktail_glass');
            break;
        case "Champagne_flute":
            this.filterByGlass('Champagne_flute');
            break;
        default:
            this.filterByAlcoholic('Alcoholic');
            break;
    }

  }

  setTable(drinks: CocktailData[]) {
    this.dataSource2 = new MatTableDataSource(drinks);
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }

  filterByAlcoholic(type: string) {
    
    this.showSpinner = true;
    this.cocktailService.filterByAlcoholic(type).subscribe(
      data => {
        this.showSpinner = false;
        if(!!data.drinks) {
          let drinks: CocktailData[] = data.drinks;
          this.setTable(drinks);
        }
      },
      error => {
        this.showSpinner = false;
        console.log(error)
      }
    )
  }

  filterByCategory(type: string) {
    
    this.showSpinner = true;
    this.cocktailService.filterByCategory(type).subscribe(
      data => {
        this.showSpinner = false;
        if(!!data.drinks) {
          let drinks: CocktailData[] = data.drinks;
          this.setTable(drinks);        }
      },
      error => {
        this.showSpinner = false;
        console.log(error)
      }
    )
  }

  filterByGlass(type: string) {
    
    this.showSpinner = true;
    this.cocktailService.filterByGlass(type).subscribe(
      data => {
        this.showSpinner = false;
        if(!!data.drinks) {
          let drinks: CocktailData[] = data.drinks;
          this.setTable(drinks);
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

