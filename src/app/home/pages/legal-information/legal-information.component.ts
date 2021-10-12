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
      file: 'assets/files/1.docx',
    },
    {
      name: 'Приказ № 414/ОД от 04.10.2021',
      file: 'assets/files/414- 04.10.2021.pdf',
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
      file: 'assets/files/Приложение №1 к приказу ПУБЛИЧНАЯ ОФЕРТА_исправ.docx',
    },
    {
      name: 'Приказ №778 от 05.10.2021',
      file: 'assets/files/Приказ № 778 от 05.10.2021.pdf',
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
