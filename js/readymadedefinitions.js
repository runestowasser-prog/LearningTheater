const ReadyMades = [];

ReadyMades.push({
    id: "NextButton",
    name: "Next button",

    args: [
      {
        type: "string",
        label: "Text",
        defaultValue: "Next"
      },
      {
        type: "dropdown",
        label: "Position",
        options: ["Top", "Center", "Bottom"],
        defaultValue: "Bottom"
      }
    ],

    create: CreateNextButton
  }
)

function CreateNextButton(id, readyMadeArgs) {

  BuildCode.setValue(BuildCode.getValue()+
  `Actor('${id}','div');
  ActorProps(thisActor, {
  Parent: "stage",
  Width: 200,
  Height: 200,
  X: 0,
  Y: 0,
  Z: 0,
  Angle: 0,
  RotateX: 0,
  RotateY: 0,
  RotateZ: 0,
  ShowOrigin: false,
  Draggable: false,
  Color: "#4f74c9",
  Text: "${readyMadeArgs[0]}",
  FontSize: 16,
  Opacity: 100,
  TranslateX: 0,
  TranslateY: 0,
  TranslateZ: 0,
  Scale: 1,
  SkewX: 0,
  SkewY: 0,
  Overflow: "visible",
  Shape: "RightArrow",
  Controls: false,\n});`
  )
   GeneratedTriggers.push({
    event: "MouseUp",
    target: id,
    key: "",
    conditions: [],
    actions: [
      {
        fn: "MoveActor",
        args: [''+id, 'X', '500', 'power1.out', '1', '0'],
        code: `Move.to(${id},{X:500,ease:"power1.out",duration:1,delay:0})`
      }
    ],
    comment: "Ready Made Next Button moving"
  });

  showPreview();
  ReadyMadeEditor.Opacity=0;
  

}


ReadyMades.push({
    id: "NavigationButtons",
    name: "Navigation buttons",

    args: [
     
      {
        type: "dropdown",
        label: "Horisontal Position",
        options: ["Left", "Center", "Right"],
        defaultValue: "Right"
      },
      {
        type: "dropdown",
        label: "Vertical Position",
        options: ["Top", "Bottom"],
        defaultValue: "Bottom"
      },
      {
        type: "color",
        label: "Color",
      }
    ],

    create: CreateNavigationButtons
  }
)


function CreateNavigationButtons(id, readyMadeArgs) {

var Xposition=0;
var Yposition=StageHeightInput.value-80;

if(readyMadeArgs[1]=="Top"){
  Yposition=0;
}


if(readyMadeArgs[0]=="Center"){
  Xposition=(StageWidthInput.value/2)-100;
}
if(readyMadeArgs[0]=="Right"){
  Xposition=StageWidthInput.value-200;
}

  BuildCode.setValue(BuildCode.getValue()+
  `
  Actor('${id}','div');
  ActorProps(thisActor, {
    Parent: "stage",
    Width: 200,
    Height: 80,
    X: ${Xposition},
    Y: ${Yposition},
    });
    
  Actor('${id}BackButton','div');
    ActorProps(thisActor, {
    Parent: "${id}",
    Width: 50,
    Height: 50,
    X: 10,
    Y: 10,
    Angle: -90,
    Style: 'cursor:pointer;',
    Color: "${readyMadeArgs[2]}",
    Shape: "Triangle",
  });
  
  Actor('${id}ForwardButton','div');
  ActorProps(thisActor, {
    Parent: "${id}",
    Width: 50,
    Height: 50,
    X: 140,
    Y: 10,
    Angle: 90,
    Style: 'cursor:pointer;',
    Color: "${readyMadeArgs[2]}",
    Shape: "Triangle",
  });  
  `
  )
   GeneratedTriggers.push({
    "event": "SceneStart",
    "comment": "Show Back- and Forward Buttons",
    "conditions": [],
    "actions": [
      {
        "fn": "SetProperty",
        "args": [
          id+"BackButton",
          "Opacity",
          "=",
          "100"
        ],
        "code": id+"BackButton.Opacity = 100"
      },
      {
        "fn": "SetProperty",
        "args": [
          id+"ForwardButton",
          "Opacity",
          "=",
          "100"
        ],
        "code": id+"ForwardButton.Opacity = 100"
      }
    ]
  },
  {
    "event": "Update",
    "comment": "Hide Forward Button in the last scene",
    "conditions": [
      {
        "fn": "",
        "args": [],
        "code": "CurrentScene==Scenes.length-1"
      }
    ],
    "actions": [
      {
        "fn": "SetProperty",
        "args": [
          id+"ForwardButton",
          "Opacity",
          "=",
          "0"
        ],
        "code": id+"ForwardButton.Opacity = 0"
      }
    ],
    "fireMode": "onceWhileTrue"
  },
  {
    "event": "Update",
    "comment": "Hide Back Button in the first scene",
    "conditions": [
      {
        "fn": "",
        "args": [],
        "code": "CurrentScene==0"
      }
    ],
    "actions": [
      {
        "fn": "SetProperty",
        "args": [
          id+"BackButton",
          "Opacity",
          "=",
          "0"
        ],
        "code": id+"BackButton.Opacity = 0"
      }
    ],
    "fireMode": "onceWhileTrue"
  },
  {
    "event": "MouseUp",
    "target": id+"ForwardButton",
    "comment": "When pushing Forward Button",
    "conditions": [],
    "actions": [
      {
        "fn": "NextScene",
        "args": [
          "0",
          "Fade",
          "Left"
        ],
        "code": "NextScene(\"Fade\",0,\"Left\")"
      }
    ],
    "key": "ArrowRight"
  },
  {
    "event": "MouseUp",
    "target": id+"BackButton",
    "comment": "When pushing BackButton",
    "conditions": [],
    "actions": [
      {
        "fn": "PreviousScene",
        "args": [
          "0",
          "Fade",
          "Left"
        ],
        "code": "PrevScene(\"Fade\",0,\"Left\")"
      }
    ],
    "key": "ArrowLeft"
  });

  showPreview();
  ReadyMadeEditor.Opacity=0;
  

}