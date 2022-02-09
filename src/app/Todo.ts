export class Todo{
  constructor(
    public task:String,
    public priority:String,
    public dueDate:Date,
    public taskID:String,
    public status?:boolean
  ){


  }
}
