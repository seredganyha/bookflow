import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Book } from '../../core/workers/book-worker/book.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Context, DialogContext } from '../../core/services/dialogs.service';

export interface BookAddForm {
  title: string,
  author: string,
  description: string,
  img: Blob,
  file: Blob,
}

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BookAddComponent {
  
  private readonly dialogContext = inject<Context<void, Book>>(DialogContext)
  
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      title: ['', Validators.required],
      author: [''],
      description: [''],
      img: [null, Validators.required],
      file: [null, Validators.required]
    })
  }
  close() {
    this.dialogContext.isOpen.set(false)
  };

  public done() {
    this.close()
    this.dialogContext.done.set(this.form.value)
  }
}
