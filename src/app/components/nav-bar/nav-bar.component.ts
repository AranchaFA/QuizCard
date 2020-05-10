import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userID: string;
  private show: boolean

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.userID = this._activatedRoute.snapshot.paramMap.get('userID');
    this.show = false;
  }

  ngOnInit(): void {
  }

  changeShow() {
    this.show = !this.show;
  }

  navigate(option: string): void {
    switch (option) {
      case 'start':
        if (this.userID != null) this._router.navigate(['/' + this.userID, 'start']);
        break;
      case 'play':
        if (this.userID != null) this._router.navigate(['/' + this.userID, 'play']);
        break;
      case 'mydecks':
        if (this.userID != null) this._router.navigate(['/' + this.userID, 'myDecks']);
        break;
      case 'repository':
        if (this.userID != null) this._router.navigate(['/' + this.userID, 'repository']);
        break;
      case 'statistics':
        if (this.userID != null) this._router.navigate(['/' + this.userID, 'statistics']);
        break;
      case 'index':
        if (this.userID != null) this._router.navigate(['/' + this.userID, 'index']);
        break;

      default:
        break;
    }
  }
}
