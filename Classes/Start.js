class Start {
  constructor() {
    //  this.titleImg = createImg("Imgs/Plane_titlePage.png")
     this.playButton = createButton("play");
     this.title = createImg("Imgs/Flight.png")
  } 
  
  ObjectStyle(){
   this.title.class("gameTitle");
   this.playButton.class("customButton");
  }

  Position(){
   this.title.position(windowWidth/2 - 600, 50);
   this.playButton.position(windowWidth/2 - 100, 400);
  }

  changeStateToPlay(){
    this.playButton.mouseClicked(()=>{
      game_state = "planeCrash";
      this.playButton.hide();
      this.title.hide();
    })

  }
  
  display(){
    this.ObjectStyle();
    this.Position();
    this.changeStateToPlay();    
  }


} 