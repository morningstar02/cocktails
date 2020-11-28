import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, ViewChild, OnInit, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CocktailService } from 'src/app/_services/cocktail.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
      width: '650px',
      data: {url}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void { 
    this.getCocktails();
  }

  ngAfterViewInit() {

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

