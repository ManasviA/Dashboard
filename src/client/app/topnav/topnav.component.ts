import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/data/user.service';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'top-nav',
  templateUrl: 'topnav.component.html'
})
export class TopNavComponent implements OnInit {

  private userName:string;
  constructor(public userService: UserService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.userName=this.userService.getCurrentUser().user_detail.name;
  }

}
