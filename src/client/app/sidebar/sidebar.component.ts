import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/data/user.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'side-bar',
  templateUrl: 'sidebar.component.html'
})
export class SideBarComponent implements OnInit {

  private userName:string;
  private userType:string;
  constructor(private userService: UserService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
      this.userName=this.userService.getCurrentUser().user_detail.name;
      this.userType=this.userService.getCurrentUser().user_detail.role;
  }

}
