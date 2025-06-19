import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenUserService } from '../../services/token-user.service';
import { IResponseUserLogin } from '../../services/user.service';

interface IDataLoginUser {
  email: string,
  password: string
}





@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {

  loading: boolean = false;

  dataLogingUser: IDataLoginUser = {
    email: "",
    password: ""
  }

  @Input() closeModal: () => void = () => { } // The @Input() property

  constructor(private userService: UserService, private tokenUserService: TokenUserService) { }

  handleInputChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;
    this.dataLogingUser[name as "password" | "email"] = value
  }

 

 handleSumbitLogin(event: SubmitEvent) {
    event.preventDefault();
    this.loading = true;

    this.userService
      .postLogin(this.dataLogingUser.email, this.dataLogingUser.password)
      .subscribe({
        next: (response: IResponseUserLogin) => {
          if (response.data) {
            this.tokenUserService.saveToken(response.data.token);
            //this.tokenUserService.saveUserEmail(response.data.user.email);

            
            localStorage.setItem('logueado', 'true');
            localStorage.setItem('email', response.data.user.email);

            // Avisamos al servicio que hay un usuario logueado
            this.userService['logueadoSubject'].next(true);
            this.userService['usuarioEmailSubject'].next(response.data.user.email);
          }
        },
        error: (error) => {
          this.loading = false;
          window.alert(error.error.message);
          console.error(error);
        },
        complete: () => {
          this.loading = false;
          window.alert('Ingreso exitoso');
          setTimeout(() => {
            this.closeModal();
          }, 500);
        }
      });



}

}
