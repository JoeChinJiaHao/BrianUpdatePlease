package com.example;

import java.util.ArrayList;
import java.util.List;

public class TryCatch {
    //use try catch to catch exception
    //sample to try out handling all errors, use throawable
    //handling error = throw an exception or return a null or return default
    //generally taxing to write code for exception, ideally can return a default value
    //sample soln
    //public item getitem(int i, item default);
    //public item getitem(int i){
        //automatically force a default value if not found is not input gives an option to designate a default value
        //return this.getitem(i,not_found);
    //}
    //NOT_FOUND = new item();
    //item i =ss.getitem(idx,notfound);
    //check if something went wrong - want to prevent checked error
    //if i=notfound...
    /*
    //check for maybe object
    //sample code 
    //public optional<item> getitem(int i)
    //if i out of range 
    //return optinal.empty()
    //else return getitem;
    //optional when used in a method can provide chains e.g. can throw exception and default 
    //***************************** */
    //but better to understand optional first


    */
    public static void main(String[] args) {
        List<String> sampleList = new ArrayList<String>(); 
        Integer i = 5; //input designed to be > bounds
        Integer j =-1;
        sampleList.add("Haha");
        sampleList.add("llll");
        sampleList.add("llll2");
        sampleList.add("llll3");
        //can throw an exception or return a null object
        //here try to get value >4
        try{
            System.out.println(sampleList.get(i));
        }catch(Exception e){
            //how to handle error
            //System.out.println(e);
            System.out.println("Illegal exception found please enter < 4");
            
        }finally{   

        }


    }
    
    



}
