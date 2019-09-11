import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/players.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerModalComponent } from '../player-modal/player-modal.component';
import { Player } from '../player';
import { random, cloneDeep } from 'lodash';
import {
  faMars,
  faVenus,
  faTrash,
  faPen
} from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {
  tableData: any = null;
  constructor(
    private papaParse: Papa,
    public playersService: PlayersService,
    private modalService: NgbModal    
  ) {

  }

  loadFile(files: FileList): void {
    const file: File = files.item(0);
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = e => {
      const csv = reader.result;
      const parsed = this.papaParse.parse(csv, {
        skipEmptyLines: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          this.tableData = results.data;
          // console.log(this.test);
          console.log('Parsed: k', results.data);
        }
      });
    }
  }

  parse(): void {
    let results = this.tableData;
    for (let i = 0; i < results.length; i++) {
      //https://stackblitz.com/edit/angular-download-upload-csv
      const player = new Player();
      player.name = results[i].name;
      player.level = results[i].level;
      player.gender = results[i].gender;
      player.totalPlayed = 0;
      player.totalSessions = 0;
      player.totalWon = 0;
      this.playersService.addPlayer(player);
    }
    // console.log(this.test);
    console.log('Parsed: k', results.data);
  }

  deleteAll(): void {
    if (window.confirm('Delete ALL Players????')){
      let playerLength = this.playersService.players.getValue().length;
      for (let i = 0; i < playerLength; i++) {
        this.playersService.deletePlayer(this.playersService.players[0]);
      }
      console.log('Delete All Players');
    }
  }

  ExportCSV() {
    //https://alberthaff.dk/projects/ngx-papaparse/docs/v3/parsing-csv/using-serviceworkers
    var a = document.createElement("a");
    var options = { header: true };
    let data = this.playersService.players.getValue();
    let csv = this.papaParse.unparse(data,options);
    //console.log('Unparsed: ', this.papaParse.unparse(data,options));
    if (window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(encodeURI(csv))], {
        type: "text/csv;charset=utf-8;"
      });
      navigator.msSaveBlob(blob, 'PlayersExport.csv');
    } else {

      a.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(csv);
      a.target = '_blank';
      a.download = 'PlayersExport.csv';
      document.body.appendChild(a);
      a.click();
    }
  }
    testData() {
      for (let i = 1; i < 26; i++) {
        const player = new Player();
        player.name = `Player ${this.playersService.players.getValue().length +
          1}`;
        player.level = random(1, 5, false);
        player.gender = random(1, 2, false);
        player.totalPlayed = 0;
        player.totalSessions = 0;
        player.totalWon = 0;
        this.playersService.addPlayer(player);
      }
    }
  }
