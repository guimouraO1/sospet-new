import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports:  [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }

}
