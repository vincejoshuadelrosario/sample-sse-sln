import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { ConversionsService } from 'src/app/core/services/business/ConversionsService';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public base64$!: Observable<string>;
  public cancel$!: Subject<boolean>;
  public output: string = '';

  public isLoading: boolean = true;
  public isProcessing: boolean = false;
  public isComplete: boolean = false;

  public inputForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private conversionsService: ConversionsService) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      inputValue: ['', [Validators.required]]
    });

    this.isLoading = false;
  }

  public onFormSubmit(): void {
    if (this.inputForm.valid) {
      this.output = '';
      this.isProcessing = true;
      this.isComplete = false;
      this.cancel$ = new Subject<boolean>();
      this.base64$ = this.conversionsService
                            .toBase64Stream(this.inputForm.value.inputValue)
                            .pipe(
                              takeUntil(this.cancel$),
                              tap((x) => {
                                this.output += x;
                              }),
                              finalize(() => {
                                this.isProcessing = false;
                                this.isComplete = true;
                              }));
    }
  }

  public onCancel(): void {
    this.output = '';
    this.isProcessing = false;
    this.isComplete = true;
    this.inputForm.reset();
    this.cancel$.next(true);
  }
}
