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
      file: 'assets/files/moscow/Приложение №1 к приказу ПУБЛИЧНАЯ ОФЕРТА ЧУЗ ЦКБ РЖД-Медицина.pdf',
    },
    {
      name: 'Приказ № 414/ОД от 04.10.2021',
      file: 'assets/files/moscow/Приказ № 414ОД от 04.10.2021.pdf',
    },
    {
      name: 'Согласие пациента на обработку персональных данных',
      file: 'assets/files/moscow/Согласие_пациента_на_обработку_персональных_данных_шаблон.docx',
    },
    {
      name: 'Лицензия на медицинскую деятельность',
      file: 'assets/files/1.Лицензия на медицинскую деятельность ЧУЗ ЦКБ РЖД-Медицина от 27.07.2020г. (новейшая).pdf',
    },
  ];

  public novosibDocs: object[] = [
    {
      name: 'Реквизиты',
      file: 'assets/files/novosibirsk/2021 реквизиты ЧУЗ КБ Новосибирск.pdf',
    },
    {
      name: 'Договор оферты',
      file: 'assets/files/novosibirsk/Договор оферты.docx',
    },
    {
      name: 'Приказ №778 от 05.10.2021',
      file: 'assets/files/novosibirsk/Приказ № 778 от 05.10.2021.pdf',
    },
    {
      name: 'Согласие пациента на обработку персональных данных',
      file: 'assets/files/novosibirsk/Согласие пациента на обработку персональных данных.pdf',
    },
    {
      name: 'Лицензия на медицинскую деятельность',
      file: 'assets/files/novosibirsk/Лицензия_Новосибирск.pdf',
    },
    {
      name: 'Политика обработки персональных данных',
      file: 'assets/files/novosibirsk/Политика обработки персональных данных.pdf',
    },
  ];

  public kaliningradDocs: object[] = [
    {
      name: 'Приказ об утверждении оферты',
      file: 'assets/files/kaliningrad/Приказ Об утверждении публичной оферты Калининград (ред. 22.10.2021).docx',
    },
    {
      name: 'Договор оферты',
      file: 'assets/files/kaliningrad/КГД Оферта.docx',
    },
    {
      name: 'Политика обработки персональных данных',
      file: 'assets/files/kaliningrad/pd_politika.pdf',
    },
    {
      name: 'Лицензия на медицинскую деятельность',
      file: 'assets/files/kaliningrad/1781195_lic_md_2020.pdf',
    },
  ];

  constructor(private location: LocationService) {}

  ngOnInit() {
    this.location.currentLocation$.subscribe((location) => {
      switch (location.id) {
        case environment.isProdMode ? 1122 : 1101:
          this.docs = [...this.moscowDocs];
          break;

        case environment.isProdMode ? 1123 : 1102:
          this.docs = [...this.novosibDocs];
          break;

        case environment.isProdMode ? 1143 : 1111:
          this.docs = [...this.kaliningradDocs];
          break;

        default:
          break;
      }
    });
  }
}
