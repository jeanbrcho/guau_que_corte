import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderBrandComponent,
  HeaderComponent,
  HeaderDividerComponent,
  HeaderNavComponent,
  HeaderTextComponent,
  NavItemComponent,
  NavLinkDirective
} from '@coreui/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
