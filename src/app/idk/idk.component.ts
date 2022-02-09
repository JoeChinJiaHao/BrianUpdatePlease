import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../Todo';
@Component({
  selector: 'app-idk',
  templateUrl: './idk.component.html',
  styleUrls: ['./idk.component.css']
})
export class IdkComponent implements OnInit {
  description:string="";
  taskFormControl=new FormControl('',[Validators.required,Validators.maxLength(50)]);
  priorityFormControl=new FormControl('',[Validators.required]);
  dueDateFormControl=new FormControl('',[Validators.required]);
  tomorrow:Date=new Date();
  priorities:String[]=["low","medium","high"];

  constructor(private fb:FormBuilder,private dialogref:MatDialogRef<IdkComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {
    this.description=data.description; //can be used to pass data if i can solve the injection issue
  }

  form:FormGroup=new FormGroup({});
  ngOnInit(): void {
    this.form=this.fb.group({
      task:this.taskFormControl,
      priority:this.priorityFormControl,
      dueDate:this.dueDateFormControl

    })
  }
  close(){
    this.dialogref.close();
  }
  save(){
    //use save data protocol here from original app
    let taskId:string= uuidv4();
    let singleTodo=new Todo(
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      taskId
    )
    this.dialogref.close(singleTodo);

  }

}
