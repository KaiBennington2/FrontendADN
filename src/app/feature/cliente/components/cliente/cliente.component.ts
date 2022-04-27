import { Component, OnInit } from '@angular/core';
import { faContao } from '@fortawesome/free-brands-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public faHome = faContao;
  public faBell = faBell;

  constructor() { }

  ngOnInit(): void {
  }

}
