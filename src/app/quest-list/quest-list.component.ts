import { QuestApiService } from './../../assets/services/QuestApi/quest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quest-list',
  templateUrl: './quest-list.component.html',
  styleUrls: ['./quest-list.component.scss']
})
export class QuestListComponent implements OnInit {
  QuestListObj:any={};

  constructor(private questService:QuestApiService) { }

  ngOnInit() {
    this.getquestList();
  }

  getquestList(){ 
    this.questService.getQuestList("getlist").subscribe(Response=>  this.QuestListObj = Response );   
  }

  deleteQuest(AwardGroupId){
    if(confirm(unescape('%E4')+"r du s"+unescape('%E4')+"ker p"+ unescape('%E5')+" att du vill ta bort uppdraget? Id= "+AwardGroupId)) {
      let obj = this.questService.questobj();
      obj.AwardGroupId= AwardGroupId;
      this.questService.postDelQuest(obj).subscribe(Response => this.getquestList());
      this.getquestList();
    }
    return false;
  }
}
