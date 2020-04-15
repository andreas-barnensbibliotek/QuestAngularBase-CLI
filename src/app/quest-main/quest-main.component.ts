import { QuestApiService } from './../../assets/services/QuestApi/quest-api.service';
import { Component, OnInit } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'aj-quest-main',
  templateUrl: './quest-main.component.html',
  styleUrls: ['./quest-main.component.scss']
})
export class QuestMainComponent implements OnInit {
  QuestObj:any= [];
  QuestTriggerObj:any = [];
  Savetext:string;

  constructor(private questService:QuestApiService, private route:ActivatedRoute,private router: Router) {     
    this.QuestObj =this.questService.questobj(); 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(prams =>{      
      this.QuestObj.AwardGroupId =  prams.get('id');
      
      });
      this.getquestbyid(); 
  
  }

  getquestbyid(){
    let id:any;
    if(this.QuestObj.AwardGroupId>0){
      this.questService.getQuest(this.QuestObj.AwardGroupId).subscribe(Response=> this.QuestObj = Response);
    }else{
      console.log(this.QuestObj);
      this.QuestObj =this.questService.questobj(); 
    }
  }
  reloaddata(){
    this.getquestbyid(); 
  }


  SparaQuestEvent(){    
    this.SparaQuest().then();    
    this.Savetext="Uppdraget sparat";
    setTimeout( () => {
      this.Savetext=""
    }, 5000);  
   
  }

  SparaQuestCloseEvent(){
    
    this.SparaQuest().then(()=> this.router.navigateByUrl('/'));
    return false;
  }
 
  SparaQuest():Promise<any>{
    return new Promise(resolve =>{
      if(this.QuestObj.AwardGroupId>0){
        this.questService.postEditQuest(this.QuestObj).subscribe(Response=> {
          this.QuestObj = Response
          console.log("edit aid: " + this.QuestObj.AwardGroupId)
          resolve();
        });
      }else{
        this.questService.postAddQuest(this.QuestObj).subscribe(Response=> {
          this.QuestObj = Response
          console.log("nytt aid: " + this.QuestObj.AwardGroupId)
          resolve();
        });
      }  
    })
  }

  deleteQuest(){
    if(this.QuestObj.AwardGroupId>0){
      if(confirm(unescape('%E4')+"r du s"+unescape('%E4')+"ker p"+ unescape('%E5')+" att du vill ta bort uppdraget "+this.QuestObj.Uppdragsnamn +"?")){
        let obj = this.questService.questobj();
        obj.AwardGroupId= this.QuestObj.AwardGroupId;
        this.questService.postDelQuest(obj).subscribe(Response =>  this.router.navigateByUrl('/'));
      }
    } 
    return false;
  }

  CloseQuest(){
    this.router.navigateByUrl('/');
  }
  // fixar att checkboxen skickar true eller false, apit vill ha 1 eller 0
  public fixactiveToInt(value:boolean){   
    this.QuestObj.Active = value? 1:0;
    return false;
  }
}
