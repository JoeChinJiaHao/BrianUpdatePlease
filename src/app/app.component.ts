import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './Todo';
import { v4 as uuidv4 } from 'uuid';
import { jsonStringObj } from './jsonStringObj';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IdkComponent } from './idk/idk.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  popup:boolean=false;
  title = 'ws1';
  taskFormControl=new FormControl('',[Validators.required,Validators.maxLength(50)]);
  priorityFormControl=new FormControl('',[Validators.required]);
  dueDateFormControl=new FormControl('',[Validators.required]);
  tomorrow:Date=new Date();
  todosValue:Todo[]=[];
  todoMap:Map<String,Todo>=new Map<String,Todo>();
  form:FormGroup=new FormGroup({});
  priorities:String[]=["low","medium","high"];
  editNow:Boolean=false;
  temp:String="";
  openDialog(){
    //call the dialog from idk component
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.data={
      //for passing of data from app component into dialogue component
      description:"can inject data here"
    }
    //this.dialog.open(IdkComponent,dialogConfig);
    const dialogRef = this.dialog.open(IdkComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data=>{
        //handle the data here

        this.todoMap.set(data.taskID,data);
        localStorage.setItem(data.taskID,JSON.stringify(data));
      }
    );

  }

  constructor(private fb:FormBuilder,private dialog:MatDialog){
    this.tomorrow.setDate(this.tomorrow.getDate()+1);
    this.form=this.fb.group({
      task:this.taskFormControl,
      priority:this.priorityFormControl,
      dueDate:this.dueDateFormControl
    })

  }
  addTodo(){
    console.log("add todo");
    let taskId:string=uuidv4();
    let singleTodo = new Todo(
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      taskId
    )
    this.todosValue.push(singleTodo);
    this.todoMap.set(taskId,singleTodo);
    this.taskFormControl.reset();
    this.priorityFormControl.reset();
    this.dueDateFormControl.reset();
    localStorage.setItem(taskId,JSON.stringify(singleTodo));
  }
  removeTodo(id:String){
    localStorage.removeItem(id.toString());
    this.todoMap.delete(id);
  }

  todoBuilder(Item:string,id:String){
    //build todo from json
    let obj:jsonStringObj =JSON.parse(Item);
    //const myDate=new Date(obj.dueDate.toString());
    let todoObj:Todo= new Todo(
      obj.task,
      obj.priority,
      //new Date(obj.dueDate.toString()),
      new Date(obj.dueDate.toString()),
      obj.taskID
    )
    return todoObj
  }
  ngOnInit(){
    //read items from local storage
    for(let i=0;i<localStorage.length;i++){
        this.todoMap.set(localStorage.key(i)!, this.todoBuilder(localStorage.getItem(localStorage.key(i)!)!,localStorage.key(i)!) );
    }
  }
  editTaskNow(id:String){
    this.editNow=true;
  }
}
