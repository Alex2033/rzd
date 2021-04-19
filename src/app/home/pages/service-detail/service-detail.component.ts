import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { TabInterface } from '../../types/tab.interface';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent implements OnInit {
  @ViewChild('owlElement') owlElement: CarouselComponent;

  public activeTab: TabInterface = {} as TabInterface;
  public activeLabel: string;

  public customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    margin: 20,
    touchDrag: true,
    pullDrag: false,
    autoWidth: true,
    items: 3,
    dots: false,
    navSpeed: 700,
    nav: false,
  };

  public tabs: TabInterface[] = [
    {
      id: '1',
      label: 'Описание',
      labelWidth: 79,
      text:
        'Коронавирусная инфекция COVID-19 (от англ. CoronaVirus Disease 2019) представляет собой острую респираторную инфекцию, вызываемую коронавирусом SARS-CoV-2. Особую опасность коронавирусы представляют для людей с ослабленной иммунной системой, в частности для новорождённых, детей и пожилых, людей с гипертонией, диабетом и хроническими заболеваниями дыхательной системы. Инфекция, вызываемая SARS-CoV-2, может протекать как в форме лёгкой острой респираторной инфекции, так и в тяжёлой форме, осложнённой вирусной пневмонией, которая может привести к развитию дыхательной недостаточноcти. Источником инфекции является больной человек, в том числе находящийся в инкубационном периоде. Инкубационный период - от 2 до 14 дней.',
    },
    {
      id: '2',
      label: 'Подготовка',
      labelWidth: 91,
      text:
        'Минимум за 1 час до взятия мазков не употреблять пищу, не пить, не чистить зубы, не полоскать рот/горло, не жевать жевательную резинку, не курить. За 3-4 часа до взятия мазков не закапывать капли/спреи и не промывать нос.',
    },
    {
      id: '3',
      label: 'Метод диагностики',
      labelWidth: 153,
      text:
        'Полимеразная цепная реакция (ПЦР) с обратной транскрипцией в режиме реального времени. Принцип метода основан на обнаружении в материале специфичных фрагментов генетического материала вируса (РНК). Диагноз подтверждается при положительном результате лабораторного исследования на наличие РНК SARS-CoV-2.',
    },
  ];

  constructor() {
    this.activeTab = this.tabs[0];
    this.activeLabel = this.tabs[0].id;
  }

  ngOnInit(): void {}

  selectTab(tab: TabInterface): void {
    this.owlElement.to(tab.id);
    this.activeLabel = tab.id;
    this.activeTab = tab;
  }
}
