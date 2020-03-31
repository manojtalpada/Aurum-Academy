import { Component, OnInit } from '@angular/core';
import { AunumService } from 'src/app/services/aunumServices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  public deckList;
  deck : any = {};
  public cards: any=[];
  public addcards = false;
  userid = sessionStorage.getItem('userid');
  constructor(private aunumservices: AunumService,private _route: ActivatedRoute) {
    this.getAllDeck();
   }

  ngOnInit() {
  }


  openDeckModel(data){
    this.deck = data;
    // console.log(this.deck);
  }
  getAllDeck() {
    var dataget = {
    my_id: JSON.parse(this.userid),
     action:"getlist"

   }
   this.aunumservices.getAllDeck(dataget)
     .subscribe(
       response => {
         this.deckList = response.data;
        //  console.log("Deck",this.deckList)

 },
 error => {
      console.log(error);
         }
         )
   }

   AddDeck() {
    var dataget = {
      my_id: JSON.parse(this.userid),
     action:"insert",
     name : this.deck.name,
     description : this.deck.description   

   }
    this.aunumservices.insertDeck(dataget)
      .subscribe(
        data => { 
          var custdetails = data; 
         this.getAllDeck();
         
        },
        error => {
          console.log(error);
        });
  }

  updateDeck(){
    var dataget = {
      decks_id: JSON.parse(this.deck.id),
     my_id: JSON.parse(this.userid),
     action:"update",
     name : this.deck.name,
     description : this.deck.description  

    }
  
    this.aunumservices.UpdateDeck(dataget)
    .subscribe(
      response => {
     this.getAllDeck();
      
      },
      err => {
        console.log(err);
      }
    )
  }

  deleteDeck(){
    var dataget = {
      decks_id: this.deck.id,
     my_id: JSON.parse(this.userid),
     action:"delete",     

    }
    // console.log(dataget);
    this.aunumservices.DeleteDeck(dataget)
    .subscribe(
      response => {
     this.getAllDeck();
      
      },
      err => {
        console.log(err);
      }
    )
  }

  addcard(){
    this.addcards = true;
  }

  addCardslist() {
    this.cards.push({
      
      // admin_id:parseInt(localStorage.getItem("userid")),
      message: "", 
    });
    
    console.log(this.cards)
  }

  removeTodo(todo,i: number) {
    // i = 1;
    //i.todo_id
     console.log(i)
    this.cards.splice(i, 1);
    // console.log(this.todos);
  }
}
