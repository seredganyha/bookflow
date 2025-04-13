import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { FileSelectComponent } from '../shared/file-select/file-select.component';
import { BookService } from './book.service';
import { BookAddComponent } from './book-add/book-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookCardComponent } from './book-card/book-card.component';
import { BookRoutingModule } from './book-routing.module';
import { CardComponent } from '../shared/ui/card/card.component';
import { URLFromFilePipe } from '../shared/pipes/url-from-file/url-from-file.pipe';
import { ButtonComponent } from '../shared/ui/button/button.component';

@NgModule({
  declarations: [
    BookComponent,
    BookAddComponent,
    BookCardComponent
  ],
  imports: [
    CommonModule,
    FileSelectComponent,
    ReactiveFormsModule,
    BookRoutingModule,
    CardComponent,
    URLFromFilePipe,
    ButtonComponent
  ],
  exports: [],
  providers: [
    BookService
  ]
})
export class BookModule {}
