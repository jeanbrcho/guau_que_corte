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
  servicioSeleccionado: any = null;
  noHayHorarios: boolean = false;
  nombreUsuario: string = '';

  constructor(
    private router: Router,
    private shiftService: ShiftService,
    private tokenUserService: TokenUserService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
    this.cargarNombreUsuario();
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
          { id: '0379cd7c-b489-4a40-a8df-4df42d8cb3a9', name: 'baño' },
          { id: 'bba9b31b-6771-43be-b019-3a4e5bc9600e', name: 'corte de pelo' }
        ];
      }
    });
  }

  cargarHorarios(fecha: string): void {
    this.servicesService.getHorarios(fecha).subscribe({
      next: (response) => {
        const horariosData = response.data || response;
        
        if (horariosData && horariosData.length > 0) {
          this.horarios = horariosData;
          this.noHayHorarios = false;
        } else {
          this.horarios = [];
          this.noHayHorarios = true;
        }
      },
      error: (err) => {
        console.error('Error al cargar horarios:', err);
        this.horarios = [];
        this.noHayHorarios = true;
      }
    });
  }

  onFechaChange(): void {
    if (this.nuevoTurno.date) {
      // Resetear estado antes de cargar nuevos horarios
      this.horarios = [];
      this.noHayHorarios = false;
      this.nuevoTurno.time = '';
      
      this.cargarHorarios(this.nuevoTurno.date);
    } else {
      // Si no hay fecha, limpiar todo
      this.horarios = [];
      this.noHayHorarios = false;
      this.nuevoTurno.time = '';
    }
  }

  onServicioChange(): void {
    if (this.nuevoTurno.serviceId) {
      this.servicioSeleccionado = this.servicios.find(servicio => servicio.id === this.nuevoTurno.serviceId);
    } else {
      this.servicioSeleccionado = null;
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
      <img id="qrImg" src="${qrCodeBase64}" alt="QR Code del Turno" />
      <p>Presenta este código QR en tu cita</p>
      <button id="downloadBtn">Descargar</button>
      <button onclick="window.close()">Cerrar</button>
      <script>
        document.getElementById('downloadBtn').onclick = function() {
        const img = document.getElementById('qrImg');
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'turno-qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        };
      </script>
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

  cargarNombreUsuario(): void {
    const userName = this.tokenUserService.getUserName();
    const userEmail = this.tokenUserService.getUserEmail();
    
    if (userName) {
      this.nombreUsuario = userName;
    } else if (userEmail) {
      // Si no hay nombre, usar la parte antes del @ del email
      this.nombreUsuario = userEmail.split('@')[0];
    } else {
      this.nombreUsuario = 'Usuario';
    }
  }
}
