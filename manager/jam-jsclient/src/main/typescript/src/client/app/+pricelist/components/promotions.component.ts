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
import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {NgIf} from '@angular/common';
import {HTTP_PROVIDERS}    from '@angular/http';
import {PromotionVO} from './../../shared/model/index';
import {PaginationComponent} from './../../shared/pagination/index';
import {Config} from './../../shared/config/env.config';

@Component({
  selector: 'yc-promotions',
  moduleId: module.id,
  templateUrl: 'promotions.component.html',
  directives: [NgIf, PaginationComponent],
})

export class PromotionsComponent implements OnInit, OnDestroy {

  _promotions:Array<PromotionVO> = [];

  filteredPromotions:Array<PromotionVO>;

  @Input() selectedPromotion:PromotionVO;

  @Output() dataSelected: EventEmitter<PromotionVO> = new EventEmitter<PromotionVO>();

  //paging
  maxSize:number = Config.UI_TABLE_PAGE_NUMS;
  itemsPerPage:number = Config.UI_TABLE_PAGE_SIZE;
  totalItems:number = 0;
  currentPage:number = 1;
  // Must use separate variables (not currentPage) for table since that causes
  // cyclic even update and then exception https://github.com/angular/angular/issues/6005
  pageStart:number = 0;
  pageEnd:number = this.itemsPerPage;

  constructor() {
    console.debug('PromotionsComponent constructed');
  }

  ngOnInit() {
    console.debug('PromotionsComponent ngOnInit');
  }

  @Input()
  set promotions(promotions:Array<PromotionVO>) {
    this._promotions = promotions;
    this.filterPromotions();
  }

  private filterPromotions() {

    this.filteredPromotions = this._promotions;
    console.debug('PromotionsComponent filterPromotions', this.filteredPromotions);

    if (this.filteredPromotions === null) {
      this.filteredPromotions = [];
    }

    let _total = this.filteredPromotions.length;
    this.totalItems = _total;
    if (_total > 0) {
      this.resetLastPageEnd();
    }
  }

  ngOnDestroy() {
    console.debug('PromotionsComponent ngOnDestroy');
    this.selectedPromotion = null;
    this.dataSelected.emit(null);
  }

  resetLastPageEnd() {
    let _pageEnd = this.pageStart + this.itemsPerPage;
    if (_pageEnd > this.totalItems) {
      this.pageEnd = this.totalItems;
    } else {
      this.pageEnd = _pageEnd;
    }
  }

  onPageChanged(event:any) {
    this.pageStart = (event.page - 1) * this.itemsPerPage;
    let _pageEnd = this.pageStart + this.itemsPerPage;
    if (_pageEnd > this.totalItems) {
      this.pageEnd = this.totalItems;
    } else {
      this.pageEnd = _pageEnd;
    }
  }

  protected onSelectRow(row:PromotionVO) {
    console.debug('PromotionsComponent onSelectRow handler', row);
    if (row == this.selectedPromotion) {
      this.selectedPromotion = null;
    } else {
      this.selectedPromotion = row;
    }
    this.dataSelected.emit(this.selectedPromotion);
  }

  protected isAvailableFromNow(row:PromotionVO) {
    return row.enabledFrom === null || (row.enabledFrom < new Date());
  }

  protected isAvailableToNow(row:PromotionVO) {
    return row.enabledTo === null || (row.enabledTo > new Date());
  }


}
