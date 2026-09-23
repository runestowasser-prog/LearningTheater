const ReadyMades = [];



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
        defaultValue: "black"
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



ReadyMades.push({
    id: "SeekBar",
    name: "Seekbar",

    args: [
     
  
      {
        type: "color",
        label: "Progress Color",
        defaultValue: "black"
      },
       {
        type: "color",
        label: "Background Color",
        defaultValue: "gray"
      },
    ],

    create: CreateSeekBar
  }
)

function CreateSeekBar(id, readyMadeArgs) {

  var Yposition=StageHeightInput.value-60;
  var WidthAdjusted=StageWidthInput.value-500;

  BuildCode.setValue(BuildCode.getValue()+
  `
  Actor('${id}','div');
  ActorProps(thisActor, {
  Parent: "stage",
  Width: ${WidthAdjusted},
  Height: 30,
  X: 200,
  Y: ${Yposition},
  CustomProps: [
    { name: "seeking", value: "false", type:"boolean" },
  ],
  seeking: false,
  });

  Actor('${id}Seekbar','div');
  ActorProps(thisActor, {
  Parent: "${id}",
  Width: ${WidthAdjusted},
  Height: 30,
  Style: "border-radius:10em",
  Color: "${readyMadeArgs[1]}",
  Shape: "Square",
  CustomProps: [
    { name: "progress", value: "0", type:"number" },
  ],
  progress: 0,
  });

  Actor('${id}SeekbarIndicator','div');
  ActorProps(thisActor, {
  Parent: "${id}Seekbar",
  Width: 0,
  Height: 30,
  Style: "border-radius:10em",
  Color: "${readyMadeArgs[0]}",
  });

  Actor('${id}SeekbarInteraction','div');
  ActorProps(thisActor, {
  Parent: "${id}",
  Width: ${WidthAdjusted},
  Height: 30,
  Style: "cursor:pointer",
  Shape: "Square",
  CustomProps: [
    { name: "seeking", value: "false", type:"boolean" },
  ],
  seeking: false,
  });`
  );

   GeneratedTriggers.push(
    {
    "event": "Update",
    "comment": "Update the Seekbar",
    "conditions": [],
    "actions": [
      {
        "fn": "SetProperty",
        "args": [
          id+"SeekbarIndicator",
          "Width",
          "=",
          "(GetScene().Timeline.time() / GetScene().Timeline.duration()) * "+id+"Seekbar.Width"
        ],
        "code": +id+"SeekbarIndicator.Width = (GetScene().Timeline.time() / GetScene().Timeline.duration()) * "+id+"Seekbar.Width"
      }
    ],
    "fireMode": "whiletrue"
  },
  {
    "event": "MouseDown",
    "target": id+"SeekbarInteraction",
    "comment": "Push the Seekbar",
    "conditions": [],
    "actions": [
      {
        "fn": "SetProperty",
        "args": [
          id+"SeekbarInteraction",
          "seeking",
          "=",
          "true"
        ],
        "code": id+"SeekbarInteraction.seeking = true"
      }
    ],
    "key": ""
  },
  {
    "event": "MouseUp",
    "target": id+"SeekbarInteraction",
    "comment": "Release the Seekbar",
    "conditions": [],
    "actions": [
      {
        "fn": "SetProperty",
        "args": [
          id+"SeekbarInteraction",
          "seeking",
          "=",
          "false"
        ],
        "code": id+"SeekbarInteraction.seeking = false"
      }
    ],
    "key": ""
  },
  {
    "event": "Update",
    "comment": "Update the seekbar on interaction",
    "conditions": [
      {
        "fn": "GetProperty",
        "args": [
          id+"SeekbarInteraction",
          "seeking",
          "==",
          "true"
        ],
        "code": id+"SeekbarInteraction.seeking==true"
      }
    ],
    "actions": [
      {
        "fn": "SetProperty",
        "args": [
          id+"Seekbar",
          "progress",
          "=",
          "(MouseX - "+id+".X) / "+id+"Seekbar.Width"
        ],
        "code": id+"Seekbar.progress = (MouseX - "+id+".X) / "+id+"Seekbar.Width"
      },
      {
        "fn": "",
        "args": [],
        "code": "GetScene().Timeline.time("+id+"Seekbar.progress * GetScene().Timeline.duration())"
      }
    ],
    "fireMode": "whiletrue"
    }
  );

  showPreview();
  ReadyMadeEditor.Opacity=0;
  

}


ReadyMades.push({
    id: "playPause",
    name: "Play/Pause Button",

    args: [
     
  
      {
        type: "color",
        label: "Color",
        defaultValue:"black"
      },
    ],

    create: CreatePlayPause
  }
)

function CreatePlayPause(id, readyMadeArgs) {

  var Yposition=StageHeightInput.value-90;

  BuildCode.setValue(BuildCode.getValue()+
  `
  Actor('${id}','div');
  ActorProps(thisActor, {
  Parent: "stage",
  Width: 90,
  Height: 100,
  X: 20,
  Y: ${Yposition},
});

Actor('${id}PlayBtn','div');
ActorProps(thisActor, {
  Parent: "${id}",
  Width: 50,
  Height: 50,
  X: 20,
  Y: 20,
  Color: "${readyMadeArgs[0]}",
  Shape: "Play",
});

Actor('${id}PauseBtn','div');
ActorProps(thisActor, {
  Parent: "${id}",
  Width: 50,
  Height: 50,
  X: 20,
  Y: 20,
  Color: "${readyMadeArgs[0]}",
  Shape: "Pause",
});

Actor('${id}PlayPauseSwitch','div');
ActorProps(thisActor, {
  Parent: "${id}",
  Width: 90,
  Height: 100,
  Style: "cursor:pointer",
});
`
  );
  
   GeneratedTriggers.push(
    {
    "event": "MouseUp",
    "target": id+"PlayPauseSwitch",
    "comment": "Switch Play/Pause Button",
    "conditions": [],
    "actions": [
      {
        "fn": "ToggleProperty",
        "args": [
          id+"PlayBtn",
          "Opacity",
          "100",
          "0"
        ],
        "code": "if ("+id+"PlayBtn.Opacity == 100) {   "+id+"PlayBtn.Opacity = 0;  } else {    "+id+"PlayBtn.Opacity = 100;      }    "
      },
      {
        "fn": "ToggleProperty",
        "args": [
          id+"PauseBtn",
          "Opacity",
          "0",
          "100"
        ],
        "code": "if ("+id+"PauseBtn.Opacity == 0) {   "+id+"PauseBtn.Opacity = 100;  } else {    "+id+"PauseBtn.Opacity = 0;      }    "
      }
    ],
    "key": "Space"
  },
  {
    "event": "Update",
    "comment": "show Play when timeline ends",
    "conditions": [
      {
        "fn": "",
        "args": [],
        "code": "GetScene().Timeline.time() >= GetScene().Timeline.duration()"
      }
    ],
    "actions": [
      {
        "fn": "ToggleProperty",
        "args": [
          id+"PlayBtn",
          "Opacity",
          "100",
          "0"
        ],
        "code": "if ("+id+"PlayBtn.Opacity == 100) {   "+id+"PlayBtn.Opacity = 0;  } else {    "+id+"PlayBtn.Opacity = 100;      }    "
      },
      {
        "fn": "ToggleProperty",
        "args": [
          id+"PauseBtn",
          "Opacity",
          "0",
          "100"
        ],
        "code": "if ("+id+"PauseBtn.Opacity == 0) {   "+id+"PauseBtn.Opacity = 100;  } else {    "+id+"PauseBtn.Opacity = 0;      }    "
      }
    ],
    "fireMode": "onceWhileTrue"
  },
  {
    "event": "Update",
    "comment": "",
    "conditions": [
      {
        "fn": "GetProperty",
        "args": [
          id+"PlayBtn",
          "Opacity",
          "==",
          "100"
        ],
        "code": id+"PlayBtn.Opacity==100"
      }
    ],
    "actions": [
      {
        "fn": "",
        "args": [],
        "code": "GetScene().Timeline.pause()"
      }
    ],
    "fireMode": "whiletrue"
  },
  {
    "event": "Update",
    "comment": "",
    "conditions": [
      {
        "fn": "GetProperty",
        "args": [
          id+"PlayBtn",
          "Opacity",
          "==",
          "0"
        ],
        "code": id+"PlayBtn.Opacity==0"
      }
    ],
    "actions": [
      {
        "fn": "",
        "args": [],
        "code": "GetScene().Timeline.play()"
      }
    ],
    "fireMode": "whiletrue"
  },
  {
    "event": "SceneStart",
    "comment": "Play on Scene Start",
    "conditions": [],
    "actions": [
      {
        "fn": "SetProperty",
        "args": [
          id+"PlayBtn",
          "Opacity",
          "=",
          "0"
        ],
        "code": id+"PlayBtn.Opacity = 0"
      },
      {
        "fn": "SetProperty",
        "args": [
          id+"PauseBtn",
          "Opacity",
          "=",
          "100"
        ],
        "code": id+"PauseBtn.Opacity = 100"
      }
    ]
  }
  );

  showPreview();
  ReadyMadeEditor.Opacity=0;
  

}

