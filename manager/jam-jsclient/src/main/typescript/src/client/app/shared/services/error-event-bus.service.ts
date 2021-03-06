/*
 * Copyright 2009 - 2016 Denys Pavlov, Igor Azarnyi
 *
 *    Licensed under the Apache License, Version 2.0 (the 'License');
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an 'AS IS' BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
import {Injectable} from '@angular/core';
import {BehaviorSubject}    from 'rxjs/BehaviorSubject';
import {Observable}    from 'rxjs/Observable';

@Injectable()
export class ErrorEventBus {

  private static _errorEventBus:ErrorEventBus;

  public static init(errorEventBus:ErrorEventBus) {
    ErrorEventBus._errorEventBus = errorEventBus;
  }

  public static getErrorEventBus() : ErrorEventBus {
    return ErrorEventBus._errorEventBus;
  }

  errorUpdated$ : Observable<any>;

  private _errorSource : BehaviorSubject<any>;

  constructor() {
    console.debug('ErrorEventBus constructed');
    this._errorSource = new BehaviorSubject<any>('init');
    this.errorUpdated$ = this._errorSource.asObservable();
  }

  public emit(value: any): void {
    this._errorSource.next(value);
    console.debug('emit error event', value);
  }

  public current():any {
    return this._errorSource.getValue();
  }

}
