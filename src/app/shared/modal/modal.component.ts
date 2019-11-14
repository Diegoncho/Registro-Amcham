import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() mensaje_boton: string;
  @Input() es_advertencia = false;
  @Input() es_exito = false;
  @Input() es_informativo = false;
  @Output() btnClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  btnClicked() {
    this.btnClick.emit();
  }
}
