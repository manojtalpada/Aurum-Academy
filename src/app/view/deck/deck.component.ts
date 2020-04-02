import { Component, OnInit } from '@angular/core';
import { AunumService } from 'src/app/services/aunumServices';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
 import { MarkdownService } from 'ngx-markdown';
import { EditorInstance, EditorOption } from 'src/lib/angular-markdown-editor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  htmlContent = '';
  bsEditorInstance: EditorInstance;
  name = 'Angular 6'; 
  templateForm: FormGroup;
  editorOptions: EditorOption;
  form: FormGroup;
  markdownText: string;
  showEditor = true;
  public Editor = ClassicEditor


  public deckList;
  deck : any = {};
  dataFilter;
  public cards: any=[];
  public filterQuery = "";
  public addcards = false;
  userid = sessionStorage.getItem('userid');
  constructor(private fb: FormBuilder,private fb1 :FormBuilder,private aunumservices: AunumService,private _route: ActivatedRoute, private markdownService: MarkdownService) {
    this.getAllDeck();
    this.buildForm(this.markdownText);

    this.form = fb1.group({
      // name: ['John'],
      // surname: ['Doe'],
      description: []
    });

   }

  ngOnInit() {
    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      onShow: (e) => this.bsEditorInstance = e,
      parser: (val) => this.parse(val)
    };
  }
// config: AngularEditorConfig = {
//     editable: true,
//     spellcheck: true,
//     height: '15rem',
//     minHeight: '5rem',
//     placeholder: 'Enter text here...',
//     translate: 'no',
//     defaultParagraphSeparator: 'p',
//     defaultFontName: 'Arial',
//     toolbarHiddenButtons: [
//       ['bold']
//       ],
//     customClasses: [
//       {
//         name: "quote",
//         class: "quote",
//       },
//       {
//         name: 'redText',
//         class: 'redText'
//       },
//       {
//         name: "titleText",
//         class: "titleText",
//         tag: "h1",
//       },
//     ],
    
//   };

public config = {
  // fontFamily requires a plugin to be built into the editor
  
  fontFamily: {
    options: [
      'default',
      'Arial, Helvetica, sans-serif',
      'Courier New, Courier, monospace',
      'Georgia, serif',
      'Lucida Sans Unicode, Lucida Grande, sans-serif',
      'Tahoma, Geneva, sans-serif',
      'Times New Roman, Times, serif',
      'Trebuchet MS, Helvetica, sans-serif',
      'Verdana, Geneva, sans-serif'
    ]
  },
  // fontSize requires a plugin to be built into the editor
  fontSize: {
    options: [
      9,
      11,
      12,
      13,
      'default',
      17,
      19,
      21
    ]
  },
  // table options not necessary if we keep default config
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  // toolbar options not necessary if we keep default config
  toolbar: [
    'undo',
    'redo',
    '|',
    'heading',
    '|',
    'bold',
    'italic',
    'blockQuote',
    'link', 
    
    '|',
     'bulletedList',
    'numberedList',
    '|',
    'insertTable',
    'mediaEmbed',
    'MathType',
    'ChemType'
    
    
  ],
};
  buildForm(markdownText) {
    this.templateForm = this.fb.group({
      body: [markdownText],
      isPreview: [true]
    });
  }
  parse(inputValue: string) {
    const markedOutput = this.markdownService.compile(inputValue.trim());
    this.highlight();

    return markedOutput;
  }
  
  highlight() {
    setTimeout(() => {
      this.markdownService.highlight();
    });
  }

  hidePreview() {
    if (this.bsEditorInstance && this.bsEditorInstance.hidePreview) {
      this.bsEditorInstance.hidePreview();
    }
  }

  showFullScreen(isFullScreen: boolean) {
    if (this.bsEditorInstance && this.bsEditorInstance.setFullscreen) {
      this.bsEditorInstance.showPreview();
      this.bsEditorInstance.setFullscreen(isFullScreen);
    }
  }
  onFormChanges(): void {
    this.templateForm.valueChanges.subscribe(formData => {
      if (formData) {
        this.markdownText = formData.body;
      }
    });
  }

  onSubmit() {
    console.log('Form submit:', this.form.value);
  }

  reset() {
    this.form.reset();
  }

  get description() {
    return this.form.get('description');
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
  // createFilterGroup() {
  //   return this.fb.group({
  //     filterType: [],
  //     apiType: []
  //   });
  // }
  addCardslist(data) {
    this.cards.push({
      data
      
    });   
    
  }

  removeCard(todo,i: number) {
    // i = 1;
    //i.todo_id
    //  console.log(i)
    this.cards.splice(i, 1);
    // console.log(this.todos);
  }
}
