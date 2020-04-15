import { QuestApiService } from './../../assets/services/QuestApi/quest-api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'aj-quest-trigger',
  templateUrl: './quest-trigger.component.html',
  styleUrls: ['./quest-trigger.component.scss']
})
export class QuestTriggerComponent implements OnInit {
  @Input() triggerobj: any = [];
  @Input() badgeImg:string ="";
  @Input() QuestObj:any;
  @Output() triggerChange = new EventEmitter();
 

  public showCodeblock = false;
  public excode:string="";
  public cmdTriggerUppdrag:string ="";
  public cmdTriggerSvar:string="";


  constructor(private questService:QuestApiService) { }

  ngOnInit() {
  }

  GenerateCode(qobj){
    this.showCodeblock= false;
    console.log("val1= " + qobj.QuestTriggerId +" trig= " + qobj.QuestID);
    this.excode = '<a data-hbtempl="inputtmpl" data-questid="' + qobj.QuestID +'" ';
    this.excode += ' data-triggerid="' + qobj.QuestTriggerId +'" href="#" id="bb_aj_doQuest"><img src="'+ this.badgeImg +'" '
    this.excode += 'style="width:150px;" title="'+ qobj.TNamn +'" /></a> '
    this.excode += '<script src="/DesktopModules/bb_aj_Quests/public/js/aj_quest.1.0.0.js" type="text/javascript"></script>'
    this.showCodeblock= true;
    return false;
  }

  addNewTrigger(){  
    let obj:any = this.questService.questobj();    
    obj.AwardGroupId= this.QuestObj.AwardGroupId;

    // obj.QuestSubQuestList[0].QuestTriggerId = "ny";
    // obj.QuestSubQuestList[0].QuestID = this.QuestObj.QuestID;
    // obj.QuestSubQuestList[0].TNamn = this.cmdTriggerUppdrag;
    // obj.QuestSubQuestList[0].TValue = this.cmdTriggerSvar;
    let tmptrigger = {
      "QuestTriggerId": "0",
      "QuestID": this.QuestObj.QuestID,
      "TNamn": this.cmdTriggerUppdrag,
      "TValue": this.cmdTriggerSvar
    }
    obj.QuestSubQuestList.push(tmptrigger); 
    //this.triggerobj.push(tmptrigger);
    let that = this;

    if(obj.AwardGroupId >0){
      
      this.questService.postAddQuestTrigger(obj).subscribe(Response=>{
        this.QuestObj = Response;
        this.triggerChange.emit();
       
      } );
    }else{
      console.log(this.triggerobj.length );
      this.triggerobj.push(obj.QuestSubQuestList[0]); 
      console.log(obj.QuestSubQuestList.length );
    }
     this.rensatriggerform();
  
    return false;
  }

  DeleteTrigger(deltriggerObj){  
    if(confirm(unescape('%E4')+"r du s"+unescape('%E4')+"ker p"+ unescape('%E5')+" att du vill ta bort deluppdraget: "+deltriggerObj.TNamn)) {
        
      let index = this.triggerobj.indexOf(deltriggerObj);
      this.triggerobj.splice(index,1 );

      let obj:any = this.questService.questobj();    // create new objectstructure
      obj.AwardGroupId = this.QuestObj.AwardGroupId;

      obj.QuestSubQuestList.push(deltriggerObj);
      console.log("avid: "+ obj.AwardGroupId);
      console.log("trigid: "+ obj.QuestSubQuestList[0].QuestTriggerId)
    
      this.questService.postDelQuestTrigger(obj).subscribe(Response=>{
        this.QuestObj = Response;
        this.triggerChange.emit();      
      });
    }
     return false;
  }

  rensatriggerform(){
    this.cmdTriggerUppdrag="";
    this.cmdTriggerSvar="";
  }

  CopyCode(){
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      
      selBox.style.opacity = '0';
      
      selBox.innerText = this.excode;
      
      document.body.appendChild(selBox);
      
      selBox.focus();
      
      selBox.select();
      
      document.execCommand('copy');
      document.body.removeChild(selBox);
      return false;
  }


}
