import { Component } from '@angular/core';
import { DialogsService } from '../../services/dialogs.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dialogs-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialogs-portal.component.html',
  styleUrl: './dialogs-portal.component.scss'
})
export class DialogsPortalComponent {
  public readonly dialogs = toSignal(this.dialogService.dialogs, {initialValue: []})

  constructor(private dialogService: DialogsService) {}
}
