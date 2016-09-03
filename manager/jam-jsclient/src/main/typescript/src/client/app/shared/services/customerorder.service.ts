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
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Config} from '../config/env.config';
import {CustomerOrderVO, CustomerOrderInfoVO, CustomerOrderTransitionResultVO} from '../model/index';
import {ErrorEventBus} from './error-event-bus.service';
import {Util} from './util';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';

/**
 * Shop service has all methods to work with shop.
 */
@Injectable()
export class CustomerOrderService {

  private _serviceBaseUrl = Config.API + 'service/customerorder';  // URL to web api

  /**
   * Construct service, which has methods to work with information related to shop(s).
   * @param http http client.
   */
  constructor (private http: Http) {
    console.debug('CustomerOrderService constructed');
  }

  /**
   * Get list of all orders, which are accessible to manage or view,
   * @returns {Promise<IteratorResult<T>>|Promise<T>|Q.Promise<IteratorResult<T>>}
   */
  getFilteredOrders(lang:string, filter:string, max:number) {

    let body = filter;
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._serviceBaseUrl + '/filtered/' + max + '/' + lang, body, options)
        .map(res => <CustomerOrderInfoVO[]> res.json())
        .catch(this.handleError);
  }


  /**
   * Get order, which are accessible to manage or view,
   * @returns {Promise<IteratorResult<T>>|Promise<T>|Q.Promise<IteratorResult<T>>}
   */
  getOrderById(lang:string, orderId:number) {
    return this.http.get(this._serviceBaseUrl + '/order/' + orderId + '/' + lang)
      .map(res => <CustomerOrderVO> res.json())
      .catch(this.handleError);
  }


  /**
   * Transition order to next state.
   * @param order order
   * @param action action key from order next transitions
   * @param manualMsg message provided by manual PG actions
   * @returns {Observable<R>}
   */
  transitionOrder(order:CustomerOrderInfoVO, action:string, manualMsg:string) {

    let body = JSON.stringify(manualMsg);
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._serviceBaseUrl + '/transition/' + action + '/' + order.ordernum + '/', body, options)
        .map(res => <CustomerOrderTransitionResultVO> res.json())
        .catch(this.handleError);
  }


  private handleError (error:any) {

    console.error('CustomerOrderService Server error: ', error);
    ErrorEventBus.getErrorEventBus().emit(error);
    let message = Util.determineErrorMessage(error);
    return Observable.throw(message.message || 'Server error');
  }

}