import { Component, OnInit } from "@angular/core";
import { AunumService } from "src/app/services/aunumServices";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { MarkdownService } from "ngx-markdown";
import { EditorInstance, EditorOption } from "src/lib/angular-markdown-editor";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FolderComponent } from '../folder/folder.component';

@Component({
  selector: "app-deck",
  templateUrl: "./deck.component.html",
  styleUrls: ["./deck.component.css"]
})


export class DeckComponent implements OnInit {
  htmlContent: any;
  bsEditorInstance: EditorInstance;
  name = "Angular 6";
  templateForm: FormGroup;
  public ShowModel;
  editorOptions: EditorOption;
  form: FormGroup;
  no: any = [];
  editorobject: any = [];
  editordata: any;
  markdownText: string;
  showEditor = true;
  public Editor = ClassicEditor
  public descriptiondata : any ;
  card: any = {};
  public editorModel;
  public deckList;
  public cardList;
  public deckbycardList;
  deck: any = {};
  public ap: boolean = false;
  public markdownTextdata: any = {};
  public ckeditorText :any ={}; 
  public markdwn: boolean = false;
  public wysiwg: boolean = false;
  public ckeditor: boolean = false;
  dataFilter;
  item: any = {};
  public values: any = {};
  public mycontent: any = [];
  public filterQuery = "";
  public addcards = false;
  editorList = [
    { id: 1, name: "WYSIWYG" },
    { id: 2, name: "Markdown" },
    { id: 3, name: "CK" }
  ];
  userid = sessionStorage.getItem("userid");
  side1: "";
  side2: "";
  // userForm = new FormGroup({
  //   rows: new FormArray([
  //     new FormControl('Mahesh'),
  //     new FormControl('Krishna'),
  //     new FormControl()
  //   ])
  // });
  addForm: FormGroup;
  rows = FormArray;
  constructor(
    private fb: FormBuilder, private fb1: FormBuilder, private aunumservices: AunumService, private _route: ActivatedRoute, private markdownService: MarkdownService
  ) {
    this.getAllDeck();
    this.getAllCard();
    this.buildForm(this.markdownText);
    // alert(this.markdownText);
    this.form = fb1.group({
      // name: ['John'],
      // surname: ['Doe'],
      description: []
    });

    this.addForm = this.fb.group({
      rows: this.fb.array([]),
    })



    this.initGroup();
  }

  ngOnInit() {
    this.editorOptions = {
      autofocus: false,
      iconlibrary: "fa",
      savable: false,
      onShow: e => (this.bsEditorInstance = e),
      parser: val => this.parse(val)
    };

  }
  onDeleteRow(rowIndex) {
    let rows = this.addForm.get('rows') as FormArray;
    rows.removeAt(rowIndex)
  }

  initGroup() {
    let rows = this.addForm.get('rows') as FormArray;
    rows.push(this.fb.group({
      side1: [null],
      side2: [null],

    }))
    console.log(rows);
  }





  changeEditor(data) {
    console.log(data);
    if (data == 1) {
      this.wysiwg = true;
      this.markdwn = false;
      this.ckeditor = false
    }
    if (data == 2) {
      this.markdwn = true;
      this.wysiwg = false;
      this.ckeditor = false;
    }
    if (data == 3) {
      this.ckeditor = true;
      this.markdwn = false;
      this.wysiwg = false;
    }
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
        "default",
        "Arial, Helvetica, sans-serif",
        "Courier New, Courier, monospace",
        "Georgia, serif",
        "Lucida Sans Unicode, Lucida Grande, sans-serif",
        "Tahoma, Geneva, sans-serif",
        "Times New Roman, Times, serif",
        "Trebuchet MS, Helvetica, sans-serif",
        "Verdana, Geneva, sans-serif"
      ]
    },
    // fontSize requires a plugin to be built into the editor
    fontSize: {
      options: [9, 11, 12, 13, "default", 17, 19, 21]
    },
    // table options not necessary if we keep default config
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
    },
    // toolbar options not necessary if we keep default config
    toolbar: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "blockQuote",
      "link",

      "|",
      "bulletedList",
      "numberedList",
      "|",
      "insertTable",
      "mediaEmbed",
      "MathType",
      "ChemType"
    ]
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
    alert(markedOutput);
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
        alert(this.markdownText);
      }
    });
  }

  onSubmit() {
    console.log("Form submit:", this.form.value);
  }

  reset() {
    this.form.reset();
  }

  get description() {
    return this.form.get("description");
  }

  openDeckModel(data) {
    this.deck = data;
    // console.log(this.deck);
  }
  getAllDeck() {
    var dataget = {
      my_id: JSON.parse(this.userid),
      action: "getlist"
    };
    this.aunumservices.getAllDeck(dataget).subscribe(
      response => {
        this.deckList = response.data;
        //  console.log("Deck",this.deckList)
      },
      error => {
        console.log(error);
      }
    );
  }

  AddDeck() {
    var dataget = {
      my_id: JSON.parse(this.userid),
      action: "insert",
      name: this.deck.name,
      description: this.deck.description
    };
    this.aunumservices.insertDeck(dataget).subscribe(
      data => {
        var custdetails = data;
        this.getAllDeck();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateDeck() {
    var dataget = {
      decks_id: JSON.parse(this.deck.id),
      my_id: JSON.parse(this.userid),
      action: "update",
      name: this.deck.name,
      description: this.deck.description
    };

    this.aunumservices.UpdateDeck(dataget).subscribe(
      response => {
        this.getAllDeck();
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteDeck() {
    var dataget = {
      decks_id: this.deck.id,
      my_id: JSON.parse(this.userid),
      action: "delete"
    };
    // console.log(dataget);
    this.aunumservices.DeleteDeck(dataget).subscribe(
      response => {
        this.getAllDeck();
      },
      err => {
        console.log(err);
      }
    );
  }

  addcard() {
    this.addcards = true;
  }




  // ADD Cards Details

  AddCard() {
    // console.log("ddddd",this.addForm.value.rows)
    var data = this.addForm.value.rows;
    var dataget = {
      my_id: JSON.parse(this.userid),
      action: "insert",
      parent_type: "deck",
      // side1:this.card.side1,
      // side2:this.card.side2,
      cards: data,
      parent_id: this.deck.id,
      release_date: "",
      attachments_ids: ""
    };
    //  console.log(this.cards);
    this.aunumservices.insertCard(dataget).subscribe(
      data => {
        var custdetails = data;
        console.log(custdetails);
        // this.clearInputMethod1();
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllCard() {
    var dataget = {
      my_id: JSON.parse(this.userid),
      action: "getlist"
    };
    this.aunumservices.getAllCard(dataget).subscribe(
      response => {
        this.cardList = response.data;
        console.log("Deck", this.cardList);
      },
      error => {
        console.log(error);
      }
    );
  }

  cardDetails(data) {
    var dataget = {
      deck_id: data.id,
      my_id: JSON.parse(this.userid),
      action: "getbyid"
    };
    console.log(dataget);
    this.aunumservices.getAllCardById(dataget).subscribe(
      response => {
        this.deckbycardList = response.data;
        // console.log("Deck", this.deckbycardList);
      },
      error => {
        console.log(error);
      }
    );
  }

  addanswer() {
    this.ap = !this.ap;
  }

  datavalues(values, i) {
    var data = values;
    this.editordata = data;
    console.log("A", data)
    var p = [];

    for (var j = 0; j < data.length; j++) [
      p.push(data[j])
    ]
    console.log("datavalues", p);
    this.editorobject = p;
    if (p[i].side1) {
      p.forEach((item) => {
        // console.log("item",item)    
        this.markdownText = item.side1;
         this.htmlContent = item.side1;
         this.ckeditorText = item.side1;

      });
    }
    if (p[i].side2) {
      p.forEach((item) => {
        // console.log("item",item)    
        this.markdownText = item.side2;
        this.htmlContent = item.side2;
        this.ckeditorText = item.side1;

      });
    }

    this.no = i;
     alert(this.markdownText)
  }
  WYSIWYEditor(id,data){
    console.log("item",id)   
    var ws1 = this.htmlContent;
    var ws2 = this.htmlContent;


    console.log("item",data)    

    var z = this.form.value.description;
    var p = this.form.value.description;

    if (data[id].side1 == null || data[id].side2 != null) {
      this.editordata[id].side2 = ws2;
    }
    else if (data[id].side2 == null || data[id].side1 != null) {
      this.editordata[id].side1 = ws1;
    }

  
    var datavalues = {};
    datavalues['rows'] = this.editordata;

    this.addForm.patchValue(datavalues);
  }
  sendEditorsdata(data, returndata) {
  console.log("item",returndata)    

    var z = this.markdownText;
    var p = this.markdownText;


    if (returndata[data].side1 == null || returndata[data].side2 != null) {
      this.editordata[data].side2 = p;
    }
    else if (returndata[data].side2 == null || returndata[data].side1 != null) {
      this.editordata[data].side1 = z;
    }

    var datavalues = {};
    datavalues['rows'] = this.editordata;

    this.addForm.patchValue(datavalues);
  }


  sendCKEditorsdata(data,id){

    console.log("item",data)    

    var z = this.form.value.description;
    var p = this.form.value.description;

    if (data[id].side1 == null || data[id].side2 != null) {
      this.editordata[id].side2 = p;
    }
    else if (data[id].side2 == null || data[id].side1 != null) {
      this.editordata[id].side1 = z;
    }

  
    var datavalues = {};
    datavalues['rows'] = this.editordata;

    this.addForm.patchValue(datavalues);
  }
  // sendMarkData(data) {
  //   var backdata = this.markdownText;
  //   console.log(backdata);
  //   alert(backdata);
  //   this.values = backdata;

  //   var data

  //   this.addForm.controls = { "side1": this.values };

  //   //  this.addForm.controls['side1'].setValue(data,backdata);
  //   //  this.addForm.value.rows.setControl({
  //   //   side1: backdata, 
  //   //   // formControlName2: myValue2
  //   // });
  //   // let i = 0;
  //   // this.addForm.value.controls.forEach(element => {
  //   //   // i++;
  //   //   element.setValue({side1: backdata})
  //   // });
  //   //  this.side1=this.values;
  //   //  this.side1.setValue(this.values);
  //   //  console.log(this.side1); 

  //   // this.addForm.controls.rows.setValue ( { side1 : backdata } )

  //   //  this.addForm.value.setValue({
  //   //   side1: backdata
  //   // });


  // }
  removeCardDetails(data) {
    // console.log(data);
    var dataget = {
      cards_id: data.id,
      my_id: JSON.parse(this.userid),
      action: "delete"
    };
    console.log(dataget);
    this.aunumservices.removeCardDetails(dataget)
      .subscribe(
        response => {
          this.getAllCard();
        },
        err => {
          console.log(err);
        });
  }

  // onReady() {
  //   alert(this.markdown);
  // }

  openCardModel(data) {
    console.log("card", data);
    this.card = data;
  }
  UpdateCard() {
    var data = this.addForm.value.rows;
    console.log("update", data)
    var dataget = {
      my_id: JSON.parse(this.userid),
      action: "update",
      parent_type: "deck",
      cards_id: this.card.id,
      side1: data[0].side1,
      side2: data[0].side2,
      // cards: data,
      parent_id: this.deck.id,
      release_date: "",
      attachments_ids: ""

    };
    console.log(dataget);
    this.aunumservices.UpdateCard(dataget).subscribe(
      data => {
        var custdetails = data;
        console.log(custdetails);
        // this.clearInputMethod1();
        this.getAllCard()
          ;
      },
      error => {
        console.log(error);
      }
    );
  }
  patchValue1(dataa) {
    console.log('patchValue1')
    var data = {
      rows: [
        {
          side1: dataa.side1,
          side2: dataa.side2,
        }
      ]
    }
    this.addForm.patchValue(data);
  }
  clearInputMethod1() {
    this.addForm.reset(this.side1);
    this.addForm.reset(this.side2);
  }
}