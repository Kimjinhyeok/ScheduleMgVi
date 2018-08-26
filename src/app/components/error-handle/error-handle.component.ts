import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-handle',
  templateUrl: './error-handle.component.html',
  styleUrls: ['./error-handle.component.css']
})
export class ErrorHandleComponent implements OnInit {

  private errorName : string;
  private errorExplain : string;
  
  constructor(router : ActivatedRoute) {
    this.errorName = router.snapshot.paramMap.get('errorName');
    this.errorExplain = router.snapshot.paramMap.get('errorExplain');
  }

  ngOnInit() {
  }

}
