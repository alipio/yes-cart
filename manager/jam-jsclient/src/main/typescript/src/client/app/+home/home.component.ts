import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { DashboardWidgetVO } from '../shared/model/index';
import { ReportsService } from '../shared/services/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'yc-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HomeComponent implements OnInit {

  widgets:any = {};

  constructor(private _dashboardService:ReportsService) {
    console.debug('HomeComponent constructed');
  }

  ngOnInit() {
    console.debug('HomeComponent ngOnInit');

    var _sub:any = this._dashboardService.getDashboard().subscribe((widgets:DashboardWidgetVO[]) => {

      console.debug('HomeComponent getDashboard', widgets);

      this.widgets = {};
      widgets.forEach(widget => {
        this.widgets[widget.widgetId] = widget;
      });

      console.debug('HomeComponent widgets', this.widgets);

      _sub.unsubscribe();

    });

  }


}
