import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShiftService } from '../services/shift.service';
import { TokenUserService } from '../services/token-user.service';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent implements OnInit {

  nuevoTurno = {
    date: '',
    time: '',
    petName: '',
    phone: '',
    serviceId: ''
  };

  servicios = [
    { id: '4ae56d1d-cdd0-43f4-863b-2a1cc4f970e7', name: 'corte de uñas' },
    { id: '396fe7aa-4348-42c2-afc5-b8a7bf5f9736', name: 'baño simple' },
    { id: 'bba9b31b-6771-43be-b019-3a4e5bc9600e', name: 'baño completo' }
  ];

  constructor(
    private router: Router,
    private shiftService: ShiftService,
    private tokenUserService: TokenUserService  
  ) {}

  ngOnInit(): void {
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }

  confirmarTurno(): void {
    const { date, time, petName, phone, serviceId } = this.nuevoTurno;
    const userId = this.tokenUserService.getUserId() || '';

    if (date && time && petName && serviceId && userId) {
      const turnoData = { date, time, petName, phone, serviceId, userId };

      this.shiftService.createShift(turnoData).subscribe({
        next: (res) => {
          alert('Turno creado correctamente');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al crear turno:', err);
          alert('Error al crear el turno. Verificá los datos o tu sesión.');
        }
      });
    } else {
      alert('Por favor, completá todos los campos obligatorios y asegurate de estar logueado');
    }
  }
}
