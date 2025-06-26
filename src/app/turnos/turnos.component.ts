import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShiftService } from '../services/shift.service';
import { TokenUserService } from '../services/token-user.service';
import { ServicesService } from '../services/services.service';

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

  servicios: any[] = [];
  horarios: any[] = [];

  constructor(
    private router: Router,
    private shiftService: ShiftService,
    private tokenUserService: TokenUserService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
    // No cargar horarios hasta que se seleccione una fecha
  }

  cargarServicios(): void {
    this.servicesService.getServices().subscribe({
      next: (response) => {
        this.servicios = response.data || response;
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
        // Mantener servicios por defecto en caso de error
        this.servicios = [
          { id: '4ae56d1d-cdd0-43f4-863b-2a1cc4f970e7', name: 'corte de uñas' },
          { id: '396fe7aa-4348-42c2-afc5-b8a7bf5f9736', name: 'baño simple' },
          { id: 'bba9b31b-6771-43be-b019-3a4e5bc9600e', name: 'baño completo' }
        ];
      }
    });
  }

  cargarHorarios(fecha: string): void {
    this.servicesService.getHorarios(fecha).subscribe({
      next: (response) => {
        this.horarios = response.data || response;
      },
      error: (err) => {
        console.error('Error al cargar horarios:', err);
        // Mantener horarios por defecto en caso de error
        this.horarios = [
          { value: '09:00', label: '09:00' },
          { value: '10:00', label: '10:00' },
          { value: '11:00', label: '11:00' },
          { value: '14:00', label: '14:00' },
          { value: '15:00', label: '15:00' },
          { value: '16:00', label: '16:00' }
        ];
      }
    });
  }

  onFechaChange(): void {
    if (this.nuevoTurno.date) {
      this.cargarHorarios(this.nuevoTurno.date);
      // Limpiar la hora seleccionada cuando cambie la fecha
      this.nuevoTurno.time = '';
    }
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
          if (res && res.qrCode) {
            // Mostrar el QR code en una nueva ventana
            this.mostrarQRCode(res.qrCode);
          }
          // Navegar de vuelta al inicio después de crear el turno
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

  mostrarQRCode(qrCodeBase64: string): void {
    // Crear un HTML para mostrar la imagen del QR
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>QR Code - Turno Confirmado</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
          }
          h1 {
            color: #333;
            margin-bottom: 20px;
          }
          img {
            max-width: 300px;
            max-height: 300px;
            border: 2px solid #ddd;
            border-radius: 8px;
            background: white;
            padding: 10px;
          }
          p {
            color: #666;
            text-align: center;
            margin-top: 15px;
          }
          button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <h1>¡Turno Confirmado!</h1>
        <img src="${qrCodeBase64}" alt="QR Code del Turno" />
        <p>Presenta este código QR en tu cita</p>
        <button onclick="window.print()">Imprimir</button>
        <button onclick="window.close()">Cerrar</button>
      </body>
      </html>
    `;

    // Abrir nueva ventana con el contenido HTML
    const newWindow = window.open('', '_blank', 'width=500,height=600,scrollbars=yes,resizable=yes');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  }
}
