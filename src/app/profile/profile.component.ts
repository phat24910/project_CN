import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string | null = null;
  userEmail: string | null = null;

  ngOnInit(): void {
    this.userName = localStorage.getItem('username')
    this.userEmail = localStorage.getItem('email');
  }
}
