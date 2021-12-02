import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public user: User;
  public isLoggedIn: boolean;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
  }

  public goToIndex(): void {
    this.router.navigate(['/index']);
  }

  public crearEscuela(): void {
    this.router.navigate(['/save']);
  }

  public editarEscuela(): void {
    this.router.navigate(['/edit']);
  }

  public verEstadisticas(): void {
    this.router.navigate(['/statistics']);
  }

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    window.location.reload();

  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Ocurrió un error. Inténtalo de nuevo.');
    }
  }
}
