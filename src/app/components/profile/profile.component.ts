import { Component, Input } from '@angular/core';
import { ISearchHistory, IUser } from 'src/app/services/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  @Input() user: IUser | null = null;

  goToProfile() {
    window.open(this.user?.githubProfile, '_blank');
  }
}
