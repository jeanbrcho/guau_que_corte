import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenUserService } from '../../services/token-user.service';

interface IDataRegisterUser {
  name: string;
  lastName: string;
  dni: number;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Input() closeModal!: () => void;
  loading: boolean = false;

  dataRegisterUser: IDataRegisterUser = {
    name: '',
    lastName: '',
    dni: 0,
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private tokenUserService: TokenUserService
  ) {}

  handleInputChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    if (name === 'dni') {
      this.dataRegisterUser.dni = parseInt(value);
    } else {
      this.dataRegisterUser[name as keyof Omit<IDataRegisterUser, 'dni'>] = value;
    }
  }

  handleSubmitRegister(event: SubmitEvent) {
    event.preventDefault();
    this.loading = true;

    const { name, lastName, dni, email, password } = this.dataRegisterUser;

    this.userService.postRegister(name, lastName, dni, email, password).subscribe({
      next: (response) => {
        if (response.data) {
          const token = response.data.token;
          const user = response.data.user;

          if (token) {
            this.tokenUserService.saveToken(token);
            console.log("Token guardado:", token);
          } else {
            console.warn("No se recibió token");
          }

          if (user) {
            this.tokenUserService.saveUserEmail(user);
          } else {
            console.warn("No se recibió usuario");
          }

          window.alert('¡Registro exitoso!');

          // Opcional: cerrar el modal automáticamente después de registrar
          if (this.closeModal) this.closeModal();
        }
      },
      error: (error) => {
        this.loading = false;
        window.alert(error.error?.message || 'Error en el registro');
        console.error("Error al registrar:", error);
      },
      complete: () => {
        this.loading = false;
        console.log("Registro completo");
      }
    });
  }
}
