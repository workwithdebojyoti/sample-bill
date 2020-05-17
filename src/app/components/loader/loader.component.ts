import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  isLoading: boolean;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.loaderStatus.subscribe((val: boolean) => {
      this.isLoading = val;
  });
  }

}
