import { LocationService } from 'src/app/shared/services/location.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-legal-information',
  templateUrl: './legal-information.component.html',
  styleUrls: ['./legal-information.component.scss'],
})
export class LegalInformationComponent implements OnInit {
  public docs: object[] = [];
  public moscowDocs: object[] = [
    {
      name: 'Реквизиты',
      file: 'assets/files/kartochka-rekvizitov-tskb-alfa-bank-s-31-03-21.pdf',
    },
    {
      name: 'Договор оферты',
      file: 'assets/files/Приложение_№1_к_приказу_ПУБЛИЧНАЯ_ОФЕРТА_июль.pdf',
    },
    {
      name: 'Приказ № 253-ОД от 09.06.2021',
      file: 'assets/files/Приказ № 253-ОД от 09.06.2021.pdf',
    },
    {
      name: 'Согласие пациента на обработку персональных данных',
      file: 'assets/files/Согласие_пациента_на_обработку_персональных_данных_шаблон.docx',
    },
    {
      name: 'Лицензия на медицинскую деятельность',
      file: 'assets/files/1.Лицензия на медицинскую деятельность ЧУЗ ЦКБ РЖД-Медицина от 27.07.2020г. (новейшая).pdf',
    },
  ];

  public novosibDocs: object[] = [
    {
      name: 'Реквизиты',
      file: 'assets/files/2021 реквизиты ЧУЗ КБ Новосибирск.pdf',
    },
    {
      name: 'Договор оферты',
      file: 'assets/files/Договор оферты.pdf',
    },
    {
      name: 'Приказ № 618 от 23.08.2021',
      file: 'assets/files/Приказ № 618 от 23.08.2021_договор оферты.pdf',
    },
    {
      name: 'Согласие пациента на обработку персональных данных',
      file: 'assets/files/Согласие пациента на обработку персональных данных.pdf',
    },
    {
      name: 'Лицензия на медицинскую деятельность',
      file: 'assets/files/Лицензия_Новосибирск.pdf',
    },
    {
      name: 'Политика обработки персональных данных',
      file: 'assets/files/401SCANDOC30062017.pdf',
    },
  ];

  constructor(private location: LocationService) {}

  ngOnInit() {
    this.location.currentLocation$.subscribe((location) => {
      if (location.id === environment.defaultLocation.id) {
        this.docs = [...this.moscowDocs];
      } else {
        this.docs = [...this.novosibDocs];
      }
    });
  }
}
