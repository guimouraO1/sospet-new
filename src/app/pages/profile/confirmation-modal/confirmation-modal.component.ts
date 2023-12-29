import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  constructor( 
    public dialogRef: MatDialogRef<ConfirmationModalComponent, boolean>){
    
  }
  
  confirm(): void {
    
    this.dialogRef.close(true);
  }

  cancel(): void {

    this.dialogRef.close(false);
  }

}
