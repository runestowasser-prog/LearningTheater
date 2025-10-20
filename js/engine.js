
if (typeof Triggers === "undefined") {
  Triggers = [];
}
Triggers = [];
if (typeof Ensemble === "undefined") {
  Ensemble = [];
}
Ensemble = [];
if (typeof Ensemble2 === "undefined") {
  Ensemble2 = [];
}
Ensemble2 = [];



var StageWidth=640,StageHeight=360;
var Scene;
Elements = new Array();
var Scaling="Fit";


if(Scaling=="Fit"){
	StageScale=Math.min(window.innerWidth/StageWidth, window.innerHeight/StageHeight);
}

if(Scaling=="Width"){
	StageScale=window.innerWidth/StageWidth;
}

if(Scaling=="Height"){
	StageScale=window.innerHeight/StageHeight;
}

if(Scaling=="None"){
	StageScale=1;
}

var Overflow="hidden";
var SCORMTracking=false;
var FollowSL=false;
var AllActorsLoaded=0;
var SceneProps=Object.assign;
var ActorProps=Object.assign;

var MouseX;
var MouseY;
var MousePressure;



//SCORM functions
function SCORM_init() {
	this.scorm = pipwerks.SCORM;
	this.scorm.version = "1.2";
	pipwerks.SCORM.init();
	console.log("SCORM initialized:", this.scorm.connection.isActive);
}

// === PROGRESS / LOCATION ===

function SetLocation(location) {
	pipwerks.SCORM.set("cmi.core.lesson_location", String(location));
}

function GetLocation() {
	return pipwerks.SCORM.get("cmi.core.lesson_location") || "";
}

// === SCORE ===

function SetScore(raw, min = 0, max = 100) {
	pipwerks.SCORM.set("cmi.core.score.raw", String(raw));
	pipwerks.SCORM.set("cmi.core.score.min", String(min));
	pipwerks.SCORM.set("cmi.core.score.max", String(max));
}

function GetScore() {
	return {
		raw: Number(pipwerks.SCORM.get("cmi.core.score.raw") || 0),
		min: Number(pipwerks.SCORM.get("cmi.core.score.min") || 0),
		max: Number(pipwerks.SCORM.get("cmi.core.score.max") || 100)
	};
}

// === STATUS ===

function SetStatus(status) {
	// allowed: "not attempted", "incomplete", "completed", "passed", "failed"
	pipwerks.SCORM.set("cmi.core.lesson_status", status);
}

function GetStatus() {
	return pipwerks.SCORM.get("cmi.core.lesson_status");
}

// === STUDENT INFO ===

function GetStudentName() {
	return pipwerks.SCORM.get("cmi.core.student_name");
}

function GetStudentID() {
	return pipwerks.SCORM.get("cmi.core.student_id");
}

// === COMMENTS ===

function SetComment(text) {
	pipwerks.SCORM.set("cmi.comments", text);
}

function GetComment() {
	return pipwerks.SCORM.get("cmi.comments");
}

// === OBJECTIVES ===

// === SCORM Objective Manager ===
// Sikrer lookup, auto-oprettelse og status/score-håndtering baseret på id
if(SCORMTracking==true){
const SCORMObjectiveManager = {
  map: {},

  // Finder eller opretter index for et objective-id
  getIndex(id) {
    // Tjek om vi allerede kender id'et
    if (this.map[id] !== undefined) return this.map[id];

    // Ellers prøv at finde det i SCORM
    let i = 0;
    while (true) {
      const existingId = pipwerks.SCORM.get(`cmi.objectives.${i}.id`);
      if (!existingId) break;
      if (existingId === id) {
        this.map[id] = i;
        return i;
      }
      i++;
    }

    // Ikke fundet → opret nyt objective i næste ledige index
    const newIndex = i;
    pipwerks.SCORM.set(`cmi.objectives.${newIndex}.id`, id);
    this.map[id] = newIndex;
    return newIndex;
  },

  // === STATUS ===
  setStatus(id, status) {
    const i = this.getIndex(id);
    pipwerks.SCORM.set(`cmi.objectives.${i}.status`, status);
  },

  getStatus(id) {
    const i = this.getIndex(id);
    return pipwerks.SCORM.get(`cmi.objectives.${i}.status`);
  },

  // === SCORE ===
  setScore(id, score) {
    const i = this.getIndex(id);
    pipwerks.SCORM.set(`cmi.objectives.${i}.score.raw`, score);
  },

  getScore(id) {
    const i = this.getIndex(id);
    return Number(pipwerks.SCORM.get(`cmi.objectives.${i}.score.raw`) || 0);
  },

  // === EXISTENCE CHECK ===
  exists(id) {
    let i = 0;
    while (true) {
      const existingId = pipwerks.SCORM.get(`cmi.objectives.${i}.id`);
      if (!existingId) return false;
      if (existingId === id) return true;
      i++;
    }
  }
};
}
// === COURSE CONTROL ===

function CompleteCourse() {
	pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
	pipwerks.SCORM.save();
}

function ExitCourse() {
	pipwerks.SCORM.save();
	pipwerks.SCORM.quit();
	console.log("SCORM session closed.");
}

//mouse/pointer Functions
function MousePosition(event){
PointerPosition(event);
}

function TouchPosition(event){
PointerPosition(event);
}

function TouchStart(event){
PointerStart(event)
}

function PointerPosition(event){
    var x = event.pageX;
    var y = event.pageY;
    MousePressure = event.pressure || 0.5; // fallback hvis pressure ikke er tilgængelig

    MouseX = (x / StageScale) - ((window.innerWidth - (StageWidth * StageScale)) / 2) / StageScale;
    MouseY = y / StageScale;
}

function PointerStart(event){
    var x = event.pageX;
    var y = event.pageY;
    MousePressure = event.pressure || 0.5;

    MouseX = (x / StageScale) - ((window.innerWidth - (StageWidth * StageScale)) / 2) / StageScale;
    MouseY = y / StageScale;
}


function elementId(Id) {
   return document.getElementById(Id);
}


function OnResize(){
	var Div1=document.getElementById("stage");
	if(Scaling=="Fit"){
	StageScale=Math.min(window.innerWidth/StageWidth, window.innerHeight/StageHeight);
	Div1.style.width=StageWidth*StageScale+"px";
	Div1.style.height=StageHeight*StageScale+"px";
	}

	if(Scaling=="Width"){
	StageScale=(window.innerWidth)/StageWidth;
	Div1.style.width=StageWidth*StageScale+"px";
	Div1.style.height=StageHeight*StageScale+"px";
	}
	
	if(Scaling=="Height"){
	StageScale=(window.innerHeight)/StageHeight;
	Div1.style.width=StageWidth*StageScale+"px";
	Div1.style.height=StageHeight*StageScale+"px";
	}

	if(Scaling=="None"){
	StageScale=1;
	Div1.style.width=StageWidth*StageScale+"px";
	Div1.style.height=StageHeight*StageScale+"px";
	}
	//var StageScale=Math.min(window.innerWidth/StageWidth, window.innerHeight/StageHeight);

//	Div1.style.width=StageWidth*StageScale+"px";
//	Div1.style.height=StageHeight*StageScale+"px";
	Resize();
}

function NewElement(ID,Type,Opacity,X,Y,Width,Height,Angle,SkewX,SkewY,Text,Fontsize,Source,Click,Shape,Color, Parent,Draggable,DropFunction, Z, Overflow,RotateX,RotateY,RotateZ, TranslateX, TranslateY, TranslateZ, MouseDown, MouseUp, BackgroundImage, Style){
	var S = new Object();
    S.X = X;
    S.Y = Y;
    S.Width = 200;
    S.Height = Height;
    S.Angle = Angle;
    S.Opacity = 100;
    S.SkewX = SkewX;
    S.SkewY = SkewY;
    S.Text = Text;
	S.FontSize = 16;
    S.Type = Type;
    S.ID = ID;
	S.Source = Source;
	S.Click = Click;
	S.Shape = Shape;
	S.Color = Color;
	S.Parent = Parent;
	S.Draggable = Draggable;
	S.DropFunction = DropFunction;
	S.dragging = false;
	S.Z = Z;
	S.Overflow = Overflow;
	S.Controls=false;
	S.RotateX=RotateX;
	S.RotateY=RotateY;
	S.RotateZ=RotateZ;
	S.TranslateX=TranslateX;
	S.TranslateY=TranslateY;
	S.TranslateZ=TranslateZ;
	S.MouseDown=MouseDown;
	S.MouseUp=MouseUp;
	S.BackgroundImage=BackgroundImage;
	S.Timeline=gsap.timeline({paused:true});
	S.TextColor=undefined;
	S.Style=Style;
	S.Loaded=false;
	S.Class=undefined;
	S.Scale=1;
	S.ShowOrigin=false;
    return S;
}

var Scenes=new Array();
var SceneNumber=0;
var CurrentScene=0;
var thisScene="stage"

function Scene(id,Type,Opacity,X,Y,Width,Height,Angle,SkewX,SkewY,Text,Fontsize,Source,Click,Shape,Color, Parent,Draggable,DropFunction, Z, Overflow, RotateX, RotateY, RotateZ,TranslateX,TranslateY,TranslateZ,MouseDown,MouseUp, BackgroundImage,TextColor,Style,Scale){
	
	var hash = id;
	var name = window[hash];
	//var name = eval("Scene"+n);
	//console.log(""+window[hash]);
	window[hash] = NewElement(id,"DIV",100,0,0,StageWidth,StageHeight,0,0,0,null,null,null,null,null,null, "stage",false,0, 0, "visible",0,0,0,0,0,0,null,null,null,null,null,1);
	Scenes.push(window[hash]);
	//console.log(Scenes.length);
	thisScene=id;
}

function NextScene(){
	var ThisScene=Scenes[CurrentScene];
	var Next=Scenes.indexOf(ThisScene)+1;
	gsap.to(ThisScene, {duration: 0.1, Opacity: 0});
	gsap.to(Scenes[Next], {duration: 0.1, Opacity: 100});
	CurrentScene++;
	SceneStart();
	SceneStartTrigger()
	GetScene().Timeline.restart()
}

function PrevScene(){
	var ThisScene=Scenes[CurrentScene];
	var Next=Scenes.indexOf(ThisScene)-1;
	gsap.to(ThisScene, {duration: 0.1, Opacity: 0});
	//ThisScene.Opacity=0;
	gsap.to(Scenes[Next], {duration: 0.1, Opacity: 100});
	//Scenes[Next].Opacity=100;
	CurrentScene--;
	SceneStart();
	SceneStartTrigger()
	GetScene().Timeline.restart()
}

function GotoScene(n){
	var ThisScene=Scenes[CurrentScene];
	var hash=n;
	var Next=n;
	gsap.to(ThisScene, {duration: 0.1, Opacity: 0});
	gsap.to(Next, {duration: 0.1, Opacity: 100});
	CurrentScene=Scenes.indexOf(Next);
	SceneStart();
	SceneStartTrigger()
	GetScene().Timeline.restart()
}

function GetScene(){
	return Scenes[CurrentScene];
}

var thisActor=undefined;

function Actor(e,Type,Opacity,X,Y,Width,Height,Angle,SkewX,SkewY,Text,Fontsize,Source,Click,Shape,Color, Parent,Draggable,DropFunction, Z, Overflow,RotateX, RotateY, RotateZ, TranslateX,TranslateY,TranslateZ,MouseDown,MouseUp,BackgroundImage,TextColor,Style,Loaded, Class,Scale,TransformOriginX,TransformOriginY,ShowOrigin){
	var hash = e;
	var name = window[hash];
	//alert(thisScene);
	window[hash] = NewElement(e,Type,100,0,0,200,200,0,0,0,null,16,null,null,null,null, thisScene,false,0, 0, "visible",0,0,0,0,0,0,null,null,null,null,null,false,null,1,null,null,false);
	Elements.push(window[hash]);
	thisActor=window[hash]
	
}



function TextBoxSet(e,txt,Parent){
e.Text=txt;
var x=elementId(e.ID);
x.innerHTML = e.Text;

}function SetText(e,txt){
e.Text=txt;
var x=elementId(e.ID);
x.innerHTML = e.Text;

}


function Play(video){
	elementId(video.ID).play();
}

function Pause(video){
	elementId(video.ID).pause();
}

function Stop(video){
	media=elementId(video.ID);
	media.pause();
	media.currentTime = 0;
}
function GetDuration(video){
	return elementId(video.ID).duration;
}
function GetCurrentTime(video){
	return elementId(video.ID).currentTime;
}
function SetCurrentTime(video, number){
	elementId(video.ID).currentTime=number;
}

function SetVolume(video, number){
	elementId(video.ID).volume=number;
}

function GetVolume(video){
	return elementId(video.ID).volume;
}

function SetSource(e,newSrc){
	e.Source=newSrc;
	elementId(e.ID).setAttribute("src", newSrc);
	if(e.Type=="div"){
		elementId(e.ID).style.backgroundImage="url("+newSrc+")";
				elementId(e.ID).style.backgroundRepeat="no-repeat";
				elementId(e.ID).style.backgroundSize="100% 100%";

	}
}
			
function UpdateElement(e){
	//var StageScale=Math.min(window.innerWidth/StageWidth, window.innerHeight/StageHeight);
	var x=document.getElementById(e.ID);
//	if(x.style.display!="none"){
//	if(e.Opacity>0){
		x.style.left=e.X*StageScale+"px";
		x.style.top=e.Y*StageScale+"px";
		x.style.width=e.Width*StageScale+"px";
		x.style.height=e.Height*StageScale+"px";
		x.style.zIndex=e.Z+"";
		x.style.transform=" rotate("+e.Angle+"deg) skewX("+e.SkewX+"deg) skewY("+e.SkewY+"deg) translateX("+e.TranslateX*StageScale+"px) translateY("+e.TranslateY*StageScale+"px) translateZ("+e.TranslateZ*StageScale+"px) rotateX("+e.RotateX+"deg) rotateY("+e.RotateY+"deg) rotateZ("+e.RotateZ+"deg) scale3d("+e.Scale+","+e.Scale+","+e.Scale+")";
		x.style.opacity=e.Opacity/100+"";
		x.style.fontSize=e.FontSize*StageScale+"px";
	

		if(x.style.opacity<=0){
			x.style.display="none";
		}
		if(x.style.opacity>0){
			x.style.display="block";
		}
		if(e.dragging==true){
			//e.X=MouseX-(e.Width/2);
			//e.Y=MouseY-(e.Height/2);
			e.X=MouseX-e.initX;
			e.Y=MouseY-e.initY;
		}
	
	
}

function GenerateScene(id){
	var Div1=document.getElementById("stage");
	var x = document.createElement(id.Type);
		x.setAttribute("id", id.ID);
  Div1.appendChild(x);
  x.style.position="absolute";
  x.style.overflow=id.Overflow+"";
	x.style.width=id.Width*StageScale+"px";
	x.style.height=id.Height*StageScale+"px";
//  x.style.width=id.Width+"px";
//  x.style.height=id.Height+"px";
	x.style.opacity=id.Opacity+"%";
	x.style.transformStyle="preserve-3d";
	if(id.BackgroundImage!=undefined){
		x.style.backgroundImage="url("+id.BackgroundImage+")";
		x.style.backgroundRepeat="no-repeat";
		x.style.backgroundSize="100% 100%";
		}
  id.Opacity=0;
  UpdateElement(id);
  
}

function GenerateElement(id){
	var Div1=document.getElementById(id.Parent);
	if(id.Parent=="undefined" || id.Parent==undefined){
		//alert(""+thisScene)
		Div1=document.getElementById("stage");
	
//		if(Scenes.length>=1){
//		Div1=elementId(""+Scenes[Scenes.length-1].ID);
//		}			
	}
	
	var x = document.createElement(id.Type);
		x.setAttribute("id", id.ID);
		if(id.Style!=undefined){
			x.style=id.Style;
		}
		if(id.Class!=undefined){
			x.className=id.Class;	
		}
		
		if(id.Shape!=undefined){
			if(id.Shape=="Square"){
			x.style.clipPath="polygon(0% 0%, 100% 0, 100% 100%, 0 100%)";
			}
			if(id.Shape=="Triangle"){
			x.style.clipPath="polygon(50% 0%, 0% 100%, 100% 100%)";
			}
			if(id.Shape=="Circle"){
			x.style.clipPath="ellipse(50% 50% at 50% 50%)";
			}
			if(id.Shape=="Star"){
			x.style.clipPath="polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
			}
			if(id.Shape=="LeftArrow"){
			x.style.clipPath="polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)";
			}
			if(id.Shape=="RightArrow"){
			x.style.clipPath="polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)";
			}
			if(id.Shape=="Heart"){
			x.style.clipPath="polygon(10% 30%, 10.536636352539062% 25.37851333618164%, 12.130660057067871% 21.00779151916504%, 14.6943941116333% 17.125385284423828%, 18.082590103149414% 13.9368314743042%, 22.114120483398438% 11.614754676818848%, 26.57450294494629% 10.292223930358887%, 31.22017478942871% 10.03661060333252%, 35.80022048950195% 10.854037284851074%, 40.064884185791016% 12.713350296020508%, 43.78409957885742% 15.508646965026855%, 46.761112213134766% 19.08409881591797%, 48.832298278808594% 23.250038146972656%, 49.878517150878906% 27.783220291137695%, 50.14686965942383% 27.56409454345703%, 51.24330520629883% 23.042804718017578%, 53.3604621887207% 18.900035858154297%, 56.376529693603516% 15.357457160949707%, 60.12626647949219% 12.603241920471191%, 64.41127014160156% 10.791312217712402%, 69.0000991821289% 10.024585723876953%, 73.64266204833984% 10.330988883972168%, 78.08805084228516% 11.702988624572754%, 82.09369659423828% 14.06943416595459%, 85.44672393798828% 17.294912338256836%, 87.96752166748047% 21.205303192138672%, 89.512939453125% 25.593433380126953%, 89.99944305419922% 30.220565795898438%, 89.73600006103516% 34.874088287353516%, 89.0020523071289% 39.477027893066406%, 87.82596588134766% 43.98754119873047%, 86.24864196777344% 48.3741455078125%, 84.31636047363281% 52.616676330566406%, 82.075927734375% 56.705116271972656%, 79.57064056396484% 60.6370849609375%, 76.83939361572266% 64.41580200195312%, 73.91531372070312% 68.0474624633789%, 70.82656860351562% 71.54032897949219%, 67.59661102294922% 74.90313720703125%, 64.24507904052734% 78.14488220214844%, 60.788272857666016% 81.27421569824219%, 57.23981475830078% 84.2992172241211%, 53.61110305786133% 87.22755432128906%, 49.91183090209961% 89.93374633789062%, 46.21561050415039% 87.09107971191406%, 42.59040451049805% 84.15840148925781%, 39.04600524902344% 81.12860107421875%, 35.593875885009766% 77.99415588378906%, 32.2476692199707% 74.74691009521484%, 29.02399444580078% 71.37808227539062%, 25.942462921142578% 67.87886810302734%, 23.02679443359375% 64.24042510986328%, 20.305418014526367% 60.454627990722656%, 17.811796188354492% 56.5152587890625%, 15.584830284118652% 52.41944885253906%, 13.66825008392334% 48.169803619384766%, 12.10892105102539% 43.776771545410156%, 10.952982902526855% 39.26110076904297%, 10.240771293640137% 34.65473556518555%, 10% 30%)";
			}
			if(id.Shape=="Lightning"){
			x.style.clipPath="polygon(41% 0%, 72% 0%, 55% 34%, 75% 34%, 27% 100%, 44% 49%, 25% 49%)";
			}
			if(id.Shape=="Home"){
			x.style.clipPath="polygon(50.75% 0%, 66.18% 18.24%, 66.49% 8.61%, 80% 9.04%, 79.3% 30.82%, 100% 51%, 86.32% 51%, 86.32% 100%, 59% 100%, 59% 74.28%, 41% 74.28%, 41% 100%, 13.68% 100%, 13.68% 51%, 0% 51%)";
			}
			if(id.Shape=="Play"){
			x.style.clipPath="polygon(0% 0%, 100% 50%, 0% 100%)";
			}
			if(id.Shape=="Pause"){
			x.style.clipPath="polygon(0% 0%, 40% 0%, 40.25% 100%, 60% 100%, 60% 0%, 100% 0%, 100% 100%, 60% 100%, 0% 100%)";
			}
			if(id.Shape=="Diamond"){
			x.style.clipPath="polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
			}
			if(id.Shape=="Keyhole"){
			x.style.clipPath="polygon(50% 0%, 60% 2%, 70% 10%, 75% 20%, 76% 30%, 71% 42%, 64% 48%, 73% 100%, 27% 100%, 36% 48%, 29% 42%, 24% 30%, 25% 20%, 30% 10%, 40% 2%)";
			}
			if(id.Shape=="SpeechBubble"){
			x.style.clipPath="polygon(5% 0%, 95% 0%, 98.5% 1.75%, 100% 5%, 100% 80%, 98.25% 83.5%, 95% 85%, 85% 85%, 85% 100%, 70% 85%, 5% 85%, 1.5% 83%, 0% 80%, 0% 5%, 1.5% 1.75%)";
			}
		}
		
		x.style.overflow=id.Overflow+"";
		x.style.boxSizing="border-box";
		if(id.Click!=undefined){
		x.setAttribute("onclick", id.Click);
		}
		
		x.setAttribute("data-actor-id", id.ID);


/*		if(id.MouseDown==null){
		id.MouseDown="//MouseDown"
		}
		if (id.MouseDown != undefined) {
		  const fn = typeof id.MouseDown === "string"
    ? new Function(id.MouseDown)
    : id.MouseDown;

  x.addEventListener("mousedown", () => {
    // Kør MouseDown-funktion
    fn();

    // Kør triggers
    Triggers.forEach(trigger => {
      if (
        trigger.event === "MouseDown" &&
        trigger.target === id.ID &&
        (
          !trigger.conditions || 
          new Function("return (" + trigger.conditions + ")")()
        )
      ) {
        new Function(trigger.actions)();
      }
    });
  });
}

			
	

		if(id.MouseUp==null){
		id.MouseUp="//MouseUp"
		}

		if (id.MouseUp != undefined) {
  const fn = typeof id.MouseUp === "string"
    ? new Function(id.MouseUp)
    : id.MouseUp;

  x.addEventListener("mouseup", () => {
    // Kør MouseUp-funktion
    fn();

    // Kør triggers
    Triggers.forEach(trigger => {
      if (
        trigger.event === "MouseUp" &&
        trigger.target === id.ID &&
        (
          !trigger.conditions || 
          new Function("return (" + trigger.conditions + ")")()
        )
      ) {
        new Function(trigger.actions)();
      }
    });
  });
}
*/

		
		if(id.Source!=undefined){
		x.setAttribute("src", id.Source);
		x.onload=function(){id.Loaded=true};
			if(id.Type=="div"){
				x.style.backgroundImage="url("+id.Source+")";
				x.style.backgroundRepeat="no-repeat";
				x.style.backgroundSize="100% 100%";
			}
		}
		if(id.TransformOriginX!=undefined){
		x.style.transformOrigin=""+id.TransformOriginX+"% "+id.TransformOriginY+"% ";
		}
		if(id.ShowOrigin==true){
		var OriginMarker=`position: absolute; top: `+id.TransformOriginY+`%; left: `+id.TransformOriginX+`%; width: 5px; height: 5px; content: ''; background-color: #f0f; border-radius: 50%; transform: translate(-50%, -50%);`
					;
		var CreateOrigin=document.createElement("div");
		CreateOrigin.style=OriginMarker;
		x.appendChild(CreateOrigin);
		}
		
		x.setAttribute("draggable",false);
		if(id.Color!=undefined){
		x.style.backgroundColor=id.Color+"";
		}
		if(id.TextColor!=undefined){
		x.style.color=id.TextColor+"";
		}
		if(id.BackgroundImage!=undefined){
		x.style.backgroundImage="url("+id.BackgroundImage+")";
		x.style.backgroundRepeat="no-repeat";
		x.style.backgroundSize="100% 100%";
		}
		if(id.Z!=undefined){
		x.style.zIndex=id.Z+"";
		}
		
		if(id.Controls==true){
		x.setAttribute("controls", "controls");
		}
		if(id.Text!=undefined){
			var t = document.createTextNode(id.Text);
			t.innerHTML += id.Text;
			x.appendChild(t);
			x.innerHTML = id.Text;
		}
			
		if(id.Draggable==true){
			x.setAttribute("onmousedown","mouseDown("+id.ID+");  "+id.MouseDown+";");
			x.setAttribute("ontouchstart","touchStart("+id.ID+");"+id.MouseDown+";");
			x.setAttribute("onmouseup","mouseUp("+id.ID+"); "+id.MouseUp+";"+id.DropFunction);
			x.setAttribute("ontouchend","mouseUp("+id.ID+"); "+id.DropFunction);
			//x.style.cursor="pointer";
		}
  Div1.appendChild(x);
  x.style.position="absolute";
  x.style.transformStyle="preserve-3d";
 
  
  UpdateElement(id);
}

function mouseDown(e){
	if(e.Draggable==true){
		e.dragging=true;
		e.initX=MouseX-e.X;
		e.initY=MouseY-e.Y;
//		e.X=MouseX-(e.Width/2);
//		e.Y=MouseY-(e.Height/2);
	}
}
function touchStart(e){
	if(e.Draggable==true){
		e.dragging=true;
		e.initX=e.Width/2;
		e.initY=e.Height/2;
//		e.X=MouseX-(e.Width/2);
//		e.Y=MouseY-(e.Height/2);
	}
}

function mouseUp(e){
	e.dragging=false;

}


/*function Collision(e1,e2){
	var rect1 = {x: e1.X, y: e1.Y, width: e1.Width, height: e1.Height}
	var rect2 = {x: e2.X, y: e2.Y, width: e2.Width, height: e2.Height}

	if (rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.y + rect1.height > rect2.y) {
			return true;
	}
}*/

function Collision(e1, e2, modifierX, modifierY) {
  // Justér bredde/højde ud fra skalering
  const rect1 = { 
    x: e1.X + modifierX, 
    y: e1.Y + modifierY, 
    width: e1.Width * (e1.Scale || 1), 
    height: e1.Height * (e1.Scale || 1) 
  };
  const rect2 = { 
    x: e2.X, 
    y: e2.Y, 
    width: e2.Width * (e2.Scale || 1), 
    height: e2.Height * (e2.Scale || 1) 
  };

  // Simpel overlap-test
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    // Beregn kollisionsside
    const dx = (rect1.x + rect1.width / 2) - (rect2.x + rect2.width / 2);
    const dy = (rect1.y + rect1.height / 2) - (rect2.y + rect2.height / 2);
    const width = (rect1.width + rect2.width) / 2;
    const height = (rect1.height + rect2.height) / 2;
    const crossWidth = width * dy;
    const crossHeight = height * dx;

    let side = null;
    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
      if (crossWidth > crossHeight) {
        side = (crossWidth > -crossHeight) ? "bottom" : "left";
      } else {
        side = (crossWidth > -crossHeight) ? "right" : "top";
      }
    }

    return {
      valueOf: () => true, // gør if (Collision(...)) muligt
      side
    };
  }

  return false;
}





//intro.Opacity=100;
function StartLoop(){
	if(SCORMTracking==true){
		SCORM_init();
	}
	gsap.ticker.add(Loop);
//requestAnimationFrame(repeatOften);
}
//Start();
//var DeltaRatio=gsap.ticker.deltaRatio();

function FollowSLPlayer(){
	if(FollowSL==true){
		if(parent.document.getElementsByClassName('progress-bar-fill')[0]!=undefined){
			var progress=parseFloat(parent.document.getElementsByClassName('progress-bar-fill')[0].style.width);
			var TotalTime=GetScene().Timeline.duration();
			GetScene().Timeline.time((progress/100)*TotalTime);
		}
	}
}

function Loop(){

	Update(DeltaRatio=gsap.ticker.deltaRatio(),
	FrameRatio=gsap.ticker.deltaRatio(),
	FollowSLPlayer(),
	Triggers.forEach(trigger => {
    	if (trigger.when === "Update" && trigger.conditions()) {
      		trigger.actions();
    		}
  	}), runTriggers("Update"),
	
	);
	document.getElementById("stage").style.perspective=""+(document.getElementById("stage").style.width)+"";
	for(var i=0;i<Scenes.length;i++){
		UpdateElement(Scenes[i]);
		
	}

	for(var i=0;i<Elements.length;i++){
		UpdateElement(Elements[i]);
		
	}
	Triggers.forEach(trigger => {
    	if (trigger.when === "Update" && trigger.conditions()) {
      		trigger.actions();
    		}
  	});	

}

function repeatOften(event) {
	Update(
		runTriggers("Update")

	);

	for(var i=0;i<Scenes.length;i++){
		UpdateElement(Scenes[i]);
		
	}

	for(var i=0;i<Elements.length;i++){
		UpdateElement(Elements[i]);
		
	}
	Triggers.forEach(trigger => {
    	if (trigger.event === "Update" && trigger.conditions()) {
      		trigger.actions();
    		}
  	});	
	
	requestAnimationFrame(repeatOften);
}

function init(){
	
	Build();
		document.getElementById("stage").style.overflow=Overflow+"";
//	elementId("stage").style.overflowX="clip";
//	var SceneNumber=0;
	for(var i=0;i<Scenes.length;i++){
	GenerateScene(Scenes[i]);
	}
	for(var i=0;i<Elements.length;i++){
	GenerateElement(Elements[i]);
	
	}
	attachTriggerListener("stage", "MouseDown");
	attachTriggerListener("stage", "MouseUp");

	if (Scenes[0]!=undefined){
		Scenes[0].Opacity=100;
		//elementId(""+Scenes[0].ID).style.display="block";
		Scenes[0].Timeline.restart();
		}
		StartLoop();
		SceneStart();
		SceneStartTrigger();
		
	   
}



var duplicateCount=0;
function DuplicateActor(baseID, count) {
  const original = Elements.find(el => el.ID === baseID);
  if (!original) {
    console.warn(`Element med ID "${baseID}" blev ikke fundet.`);
    return;
  }

  for (let i = 1; i <= count; i++) {
    duplicateActorRecursive(original, null);
  }
}

// Hjælpefunktion: dupliker actor + børn
function duplicateActorRecursive(actor, newParentID) {
  const clone = {};

  // Kopiér værdier fra originalen
  for (const key in actor) {
    const value = actor[key];
    if (typeof value !== "function" && key !== "CustomProps") {
      clone[key] = Array.isArray(value)
        ? [...value]
        : (value && typeof value === "object")
        ? { ...value }
        : value;
    }
  }

  // Unikt ID
  duplicateCount++;
  clone.ID = `${actor.ID}${duplicateCount}`;

  // Hvis vi duplikerer et barn, skal det pege på den nye forælder
  if (newParentID) clone.Parent = newParentID;

  // Tilføj til Elements
  Elements.push(clone);
  GenerateElement(clone);

  // Find børn af originalen
  const children = Elements.filter(el => el.Parent === actor.ID);

  // Dupliker børnene rekursivt, med deres nye parent = denne klones ID
  for (const child of children) {
    duplicateActorRecursive(child, clone.ID);
  }

  return clone;
}



function DeleteActor(a){
	Elements.splice(Elements.findIndex(v => v.ID === a.ID),1)
	elementId(a).remove();
}





function SceneStartTrigger() {
  Triggers.forEach(trigger => {
    if (trigger.event === "SceneStart") {
      let conditionMet = true;
      const conditions = trigger.conditions || ["true"];

      for (let cond of conditions) {
        if (!cond) continue;
 	 const code = typeof cond === "string" ? cond : cond.code;
        try {
          if (!new Function("return (" + cond.code + ")")()) {
            conditionMet = false;
            break;
          }
        } catch (err) {
          console.warn(`Fejl i trigger condition:`, err);
          conditionMet = false;
          break;
        }
      }

      if (conditionMet) {
        const actions = trigger.actions || [];
        actions.forEach(act => {
          const code = typeof act === "string" ? act : act.code;
          if (!code) return;
          try {
            new Function(code)();
          } catch (err) {
            console.warn(`Fejl i trigger action:`, err);
          }
        });
      }
    }
  });
}

function runTriggers(eventName) {
  if (!Array.isArray(Triggers)) return;

  for (const trigger of Triggers) {
    if (trigger.event !== eventName) continue;

    let conditionMet = true;
    const conditions = trigger.conditions || ["true"];

   for (let cond of conditions) {
      if (!cond) continue;
 	 const code = typeof cond === "string" ? cond : cond.code;
      try {
        if (!new Function("return (" + code + ")")()) {
          conditionMet = false;
          break;
        }
      } catch (err) {
        console.warn("Trigger fejl:", err); 
        conditionMet = false;
        break;
      }
    }
    if (conditionMet) {
      const actions = trigger.actions || [];
      actions.forEach(act => {
        const code = typeof act === "string" ? act : act.code;
        if (!code) return;
        try {
          new Function(code)();
        } catch (err) {
          console.warn("Trigger fejl i action:", err);
        }
      });
    }
  }
}

function MouseListener(){
  const container = document.getElementById("stage");
  container.addEventListener("mouseup", (e) => {
    const targetEl = e.target.closest("[data-actor-id]");
    if (!targetEl) return;

    const actorId = targetEl.getAttribute("data-actor-id");
    const actorObj = window[actorId];

    if (actorObj && actorObj.MouseUp) {
      const fn = new Function(actorObj.MouseUp);
      try {
        fn();
      } catch (err) {
        console.warn(`Fejl i MouseUp for ${actorId}:`, err);
      }
    }

    Triggers.forEach(trigger => {
      if (trigger.event === "MouseUp" && trigger.target === actorId) {
        let conditionMet = true;
        const conditions = trigger.conditions || ["true"];

        for (let cond of conditions) {
          if (!cond) continue;
          try {
            if (!new Function("return (" + cond + ")")()) {
              conditionMet = false;
              break;
            }
          } catch (err) {
            console.warn(`Fejl i trigger condition:`, err);
            conditionMet = false;
            break;
          }
        }

        if (conditionMet) {
          const actions = trigger.actions || [];
          actions.forEach(act => {
            const code = typeof act === "string" ? act : act.code;
            if (!code) return;
            try {
              new Function(code)();
            } catch (err) {
              console.warn(`Fejl i trigger action:`, err);
            }
          });
        }
      }
    });
  });
}

function attachTriggerListener(containerId, eventType) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.addEventListener(eventType.toLowerCase(), (e) => {
    const targetEl = e.target.closest("[data-actor-id]");
    if (!targetEl) return;

    const actorId = targetEl.getAttribute("data-actor-id");
    const actorObj = window[actorId];

    // Kør evt. Actorens egen MouseDown / MouseUp som string
    if (actorObj && actorObj[eventType]) {
      try {
        new Function(actorObj[eventType])();
      } catch (err) {
        console.warn(`Fejl i ${eventType} for ${actorId}:`, err);
      }
    }

    // Kør Triggers
    Triggers.forEach(trigger => {const eventHasTarget = actorId != null;
	if (trigger.event === eventType && (!eventHasTarget || trigger.target === actorId)) {
	console.log("Trigger matched:", trigger);

        // ⭐ NY DEL: Evaluering af flere conditions
        let conditionMet = true;
        const conditions = trigger.conditions || ["true"]; // hvis ingen conditions, altid true

        for (let cond of conditions) {
  		if (!cond) continue;
 			 const code = typeof cond === "string" ? cond : cond.code;
 		 try {
   		 if (!new Function("return (" + code + ")")()) {
     		 conditionMet = false;
     		 break;
   		 }
	  } catch (err) {
  	  console.warn(`Fejl i trigger condition:`, err);
   	 conditionMet = false;
  	  break;
  	}
    

        }

        if (conditionMet) {
          // ⭐ NY DEL: Udfør flere actions
          const actions = trigger.actions || [];
actions.forEach(act => {
  if (!act || !act.code) return;
  try {
    new Function(act.code)();
  } catch (err) {
    console.warn(`Fejl i trigger action:`, err);
  }
});
        }
      }
    });
  });
}

var Actors=Elements;
