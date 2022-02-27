import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ExcelService {

  private _uploadedWords$ = new Subject<Array<any>>();

  get uploadedWords$(): Observable<Array<any>> {
    return this._uploadedWords$.asObservable();
  }

  public excelToJSON(file: File): void {
    const reader = new FileReader();
    reader.onload = ((e) => {
      if (e.target == null) {
        return;
      }
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach((sheetName) =>
        this._uploadedWords$.next(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]))
      );
    });
    reader.readAsBinaryString(file);
  }

}
