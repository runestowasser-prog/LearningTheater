const ReadyMades = [];



ReadyMades.push({
    id: "NavigationButtons",
    name: "Navigation buttons",

    args: [
     
      {
        type: "text",
        label: "ID: ",
        defaultValue: "Navigation"
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


function CreateNavigationButtons(readyMadeArgs) {

var Xposition=StageWidthInput.value-200;;
var Yposition=StageHeightInput.value-80;


  BuildCode.setValue(BuildCode.getValue()+
  `
  Actor('${readyMadeArgs[0]}','div');
  ActorProps(thisActor, {
    Parent: "stage",
    Width: 200,
    Height: 80,
    X: ${Xposition},
    Y: ${Yposition},
    });
    
  Actor('${readyMadeArgs[0]}BackButton','div');
    ActorProps(thisActor, {
    Parent: "${readyMadeArgs[0]}",
    Width: 50,
    Height: 50,
    X: 10,
    Y: 10,
    Angle: -90,
    Style: 'cursor:pointer;',
    Color: "${readyMadeArgs[1]}",
    Shape: "Triangle",
  });
  
  Actor('${readyMadeArgs[0]}ForwardButton','div');
  ActorProps(thisActor, {
    Parent: "${readyMadeArgs[0]}",
    Width: 50,
    Height: 50,
    X: 140,
    Y: 10,
    Angle: 90,
    Style: 'cursor:pointer;',
    Color: "${readyMadeArgs[1]}",
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
          readyMadeArgs[0]+"BackButton",
          "Opacity",
          "=",
          "100"
        ],
        "code": readyMadeArgs[0]+"BackButton.Opacity = 100"
      },
      {
        "fn": "SetProperty",
        "args": [
          readyMadeArgs[0]+"ForwardButton",
          "Opacity",
          "=",
          "100"
        ],
        "code": readyMadeArgs[0]+"ForwardButton.Opacity = 100"
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
          readyMadeArgs[0]+"ForwardButton",
          "Opacity",
          "=",
          "0"
        ],
        "code": readyMadeArgs[0]+"ForwardButton.Opacity = 0"
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
          readyMadeArgs[0]+"BackButton",
          "Opacity",
          "=",
          "0"
        ],
        "code": readyMadeArgs[0]+"BackButton.Opacity = 0"
      }
    ],
    "fireMode": "onceWhileTrue"
  },
  {
    "event": "MouseUp",
    "target": readyMadeArgs[0]+"ForwardButton",
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
    "target": readyMadeArgs[0]+"BackButton",
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
        type: "text",
        label: "ID:",
        defaultValue: "SeekBar"
      },
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

function CreateSeekBar(readyMadeArgs) {

  var Yposition=StageHeightInput.value-60;
  var WidthAdjusted=StageWidthInput.value-500;

  BuildCode.setValue(BuildCode.getValue()+
  `
  Actor('${readyMadeArgs[0]}','div');
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

  Actor('${readyMadeArgs[0]}Bar','div');
  ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: ${WidthAdjusted},
  Height: 30,
  Style: "border-radius:10em",
  Color: "${readyMadeArgs[2]}",
  Shape: "Square",
  CustomProps: [
    { name: "progress", value: "0", type:"number" },
  ],
  progress: 0,
  });

  Actor('${readyMadeArgs[0]}Indicator','div');
  ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}Bar",
  Width: 0,
  Height: 30,
  Style: "border-radius:10em",
  Color: "${readyMadeArgs[1]}",
  });

  Actor('${readyMadeArgs[0]}Interaction','div');
  ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
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
          readyMadeArgs[0]+"Indicator",
          "Width",
          "=",
          "(GetScene().Timeline.time() / GetScene().Timeline.duration()) * "+readyMadeArgs[0]+"Bar.Width"
        ],
        "code": +readyMadeArgs[0]+"Indicator.Width = (GetScene().Timeline.time() / GetScene().Timeline.duration()) * "+readyMadeArgs[0]+"Bar.Width"
      }
    ],
    "fireMode": "whiletrue"
  },
  {
    "event": "MouseDown",
    "target": readyMadeArgs[0]+"Interaction",
    "comment": "Push the Seekbar",
    "conditions": [],
    "actions": [
      {
        "fn": "SetProperty",
        "args": [
          readyMadeArgs[0]+"Interaction",
          "seeking",
          "=",
          "true"
        ],
        "code": readyMadeArgs[0]+"Interaction.seeking = true"
      }
    ],
    "key": ""
  },
  {
    "event": "MouseUp",
    "target": readyMadeArgs[0]+"Interaction",
    "comment": "Release the Seekbar",
    "conditions": [],
    "actions": [
      {
        "fn": "SetProperty",
        "args": [
          readyMadeArgs[0]+"Interaction",
          "seeking",
          "=",
          "false"
        ],
        "code": readyMadeArgs[0]+"Interaction.seeking = false"
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
          readyMadeArgs[0]+"Interaction",
          "seeking",
          "==",
          "true"
        ],
        "code": readyMadeArgs[0]+"Interaction.seeking==true"
      }
    ],
    "actions": [
      {
        "fn": "SetProperty",
        "args": [
          readyMadeArgs[0]+"Bar",
          "progress",
          "=",
          "(MouseX - "+readyMadeArgs[0]+".X) / "+readyMadeArgs[0]+"Bar.Width"
        ],
        "code": readyMadeArgs[0]+"Bar.progress = (MouseX - "+readyMadeArgs[0]+".X) / "+readyMadeArgs[0]+"Bar.Width"
      },
      {
        "fn": "",
        "args": [],
        "code": "GetScene().Timeline.time("+readyMadeArgs[0]+"Bar.progress * GetScene().Timeline.duration())"
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
        type: "text",
        label: "ID: ",
        defaultValue:"PlayPause"
      },
      {
        type: "color",
        label: "Color",
        defaultValue:"black"
      },
    ],

    create: CreatePlayPause
  }
)

function CreatePlayPause(readyMadeArgs) {

  var Yposition=StageHeightInput.value-90;

  BuildCode.setValue(BuildCode.getValue()+
  `
  Actor('${readyMadeArgs[0]}','div');
  ActorProps(thisActor, {
  Parent: "stage",
  Width: 90,
  Height: 100,
  X: 20,
  Y: ${Yposition},
});

Actor('${readyMadeArgs[0]}PlayBtn','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: 50,
  Height: 50,
  X: 20,
  Y: 20,
  Color: "${readyMadeArgs[1]}",
  Shape: "Play",
});

Actor('${readyMadeArgs[0]}PauseBtn','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: 50,
  Height: 50,
  X: 20,
  Y: 20,
  Color: "${readyMadeArgs[1]}",
  Shape: "Pause",
});

Actor('${readyMadeArgs[0]}Switch','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: 90,
  Height: 100,
  Style: "cursor:pointer",
});
`
  );
  
   GeneratedTriggers.push(
    {
    "event": "MouseUp",
    "target": readyMadeArgs[0]+"Switch",
    "comment": "Switch Play/Pause Button",
    "conditions": [],
    "actions": [
      {
        "fn": "ToggleProperty",
        "args": [
          readyMadeArgs[0]+"PlayBtn",
          "Opacity",
          "100",
          "0"
        ],
        "code": "if ("+readyMadeArgs[0]+"PlayBtn.Opacity == 100) {   "+readyMadeArgs[0]+"PlayBtn.Opacity = 0;  } else {    "+readyMadeArgs[0]+"PlayBtn.Opacity = 100;      }    "
      },
      {
        "fn": "ToggleProperty",
        "args": [
          readyMadeArgs[0]+"PauseBtn",
          "Opacity",
          "0",
          "100"
        ],
        "code": "if ("+readyMadeArgs[0]+"PauseBtn.Opacity == 0) {   "+readyMadeArgs[0]+"PauseBtn.Opacity = 100;  } else {    "+readyMadeArgs[0]+"PauseBtn.Opacity = 0;      }    "
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
          readyMadeArgs[0]+"PlayBtn",
          "Opacity",
          "100",
          "0"
        ],
        "code": "if ("+readyMadeArgs[0]+"PlayBtn.Opacity == 100) {   "+readyMadeArgs[0]+"PlayBtn.Opacity = 0;  } else {    "+readyMadeArgs[0]+"PlayBtn.Opacity = 100;      }    "
      },
      {
        "fn": "ToggleProperty",
        "args": [
          readyMadeArgs[0]+"PauseBtn",
          "Opacity",
          "0",
          "100"
        ],
        "code": "if ("+readyMadeArgs[0]+"PauseBtn.Opacity == 0) {   "+readyMadeArgs[0]+"PauseBtn.Opacity = 100;  } else {    "+readyMadeArgs[0]+"PauseBtn.Opacity = 0;      }    "
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
          readyMadeArgs[0]+"PlayBtn",
          "Opacity",
          "==",
          "100"
        ],
        "code": readyMadeArgs[0]+"PlayBtn.Opacity==100"
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
          readyMadeArgs[0]+"PlayBtn",
          "Opacity",
          "==",
          "0"
        ],
        "code": readyMadeArgs[0]+"PlayBtn.Opacity==0"
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
          readyMadeArgs[0]+"PlayBtn",
          "Opacity",
          "=",
          "0"
        ],
        "code": readyMadeArgs[0]+"PlayBtn.Opacity = 0"
      },
      {
        "fn": "SetProperty",
        "args": [
          readyMadeArgs[0]+"PauseBtn",
          "Opacity",
          "=",
          "100"
        ],
        "code": readyMadeArgs[0]+"PauseBtn.Opacity = 100"
      }
    ]
  }
  );

  showPreview();
  ReadyMadeEditor.Opacity=0;
  

}

ReadyMades.push({
    id: "menu",
    name: "Menu",

    args: [
     
      {
        type: "test",
        label: "ID: ",
        defaultValue:"Menu"
      },
      {
        type: "color",
        label: "Background color",
        defaultValue:"black"
      },
      {
        type: "color",
        label: "Text color",
        defaultValue:"white"
      },
      {
        type: "number",
        label: "Item height",
        defaultValue:"110"
      },
      {
        type: "number",
        label: "Menu width",
        defaultValue:"400"
      },
    ],

    create: CreateMenu
  }
)

function CreateMenu(readyMadeArgs) {

var ScenesBackwards=AllScenes.reverse();

  BuildCode.setValue(BuildCode.getValue()+
  `
  Actor('${readyMadeArgs[0]}','div');
ActorProps(thisActor, {
  Parent: "stage",
  Width: 80,
  Height: 70,
  Style: \`border-bottom-right-radius:2em;
border-bottom-left-radius:2em;\`,
  Color: "${readyMadeArgs[1]}",
});

Actor('${readyMadeArgs[0]}Arrow','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: 40,
  Height: 40,
  X: 20,
  Y: 10,
  Angle: 180,
  Color: "${readyMadeArgs[2]}",
  Shape: "Triangle",
});

Actor('${readyMadeArgs[0]}Btn','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: 80,
  Height: 70,
  Style: "cursor:pointer",
});

`);

for (let i = 0; i < ScenesBackwards.length; i++) {
  BuildCode.setValue(BuildCode.getValue()+
  `
  Actor("${ScenesBackwards[i].ID}MenuBtn","div");
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: ${readyMadeArgs[4]},
  Height: ${readyMadeArgs[3]}+2,
  X: 0,
  Y: -(${readyMadeArgs[3]})*(${i}+1)-2,
  Style: \`padding-left:1em;
cursor:pointer\`,
  Color: "${readyMadeArgs[1]}",
  Text: \`<p><span style="color: ${readyMadeArgs[2]};">${ScenesBackwards[i].ID}</span></p>\`,
  FontSize: 33,
  });
  `);
}

  
   GeneratedTriggers.push(
   {
    "event": "MouseUp",
    "target": readyMadeArgs[0]+"Btn",
    "comment": "Show Menu",
    "conditions": [
      {
        "fn": "GetProperty",
        "args": [
          readyMadeArgs[0],
          "Y",
          "<=",
          "0"
        ],
        "code": readyMadeArgs[0]+".Y<=0"
      }
    ],
    "actions": [
      {
        "fn": "MoveActor",
        "args": [
          readyMadeArgs[0],
          "Y",
          ""+ScenesBackwards.length*readyMadeArgs[3],
          "power1.out",
          "0.5",
          "0"
        ],
        "code": "Move.to("+readyMadeArgs[0]+",{Y:349,ease:\"power1.out\",duration:0.5,delay:0})"
      },
      {
        "fn": "MoveActor",
        "args": [
          readyMadeArgs[0]+"Arrow",
          "Angle",
          "0",
          "power1.out",
          "0.5",
          "0"
        ],
        "code": "Move.to("+readyMadeArgs[0]+"Arrow,{Angle:0,ease:\"power1.out\",duration:0.5,delay:0})"
      }
    ],
    "key": "KeyM"
  },
  {
    "event": "MouseUp",
    "target": readyMadeArgs[0]+"Btn",
    "comment": "Hide Menu",
    "conditions": [
      {
        "fn": "GetProperty",
        "args": [
          readyMadeArgs[0],
          "Y",
          ">",
          "0"
        ],
        "code": readyMadeArgs[0]+".Y>0"
      }
    ],
    "actions": [
      {
        "fn": "MoveActor",
        "args": [
          readyMadeArgs[0],
          "Y",
          "0",
          "power1.out",
          "0.5",
          "0"
        ],
        "code": "Move.to("+readyMadeArgs[0]+",{Y:0,ease:\"power1.out\",duration:0.5,delay:0})"
      },
      {
        "fn": "MoveActor",
        "args": [
          readyMadeArgs[0]+"Arrow",
          "Angle",
          "180",
          "power1.out",
          "0.5",
          "0"
        ],
        "code": "Move.to("+readyMadeArgs[0]+"Arrow,{Angle:180,ease:\"power1.out\",duration:0.5,delay:0})"
      }
    ],
    "key": "KeyM"
  },
  
  );
for (let i = 0; i < ScenesBackwards.length; i++) {
  GeneratedTriggers.push({ 
      event: "MouseUp", 
      target: ScenesBackwards[i].ID+"MenuBtn", 
	  key: "",
      comment: "menu to"+ScenesBackwards[i].ID, 
      conditions: [], 
      "actions": [
      {
        "fn": "MoveActor",
        "args": [
          readyMadeArgs[0],
          "Y",
          "0",
          "power1.out",
          "0.5",
          "0"
        ],
        "code": "Move.to("+readyMadeArgs[0]+",{Y:0,ease:\"power1.out\",duration:0.5,delay:0})"
      },
      {
        "fn": "MoveActor",
        "args": [
          readyMadeArgs[0]+"Arrow",
          "Angle",
          "180",
          "power1.out",
          "0.5",
          "0"
        ],
        "code": "Move.to("+readyMadeArgs[0]+"Arrow,{Angle:180,ease:\"power1.out\",duration:0.5,delay:0})"
      },
      {
        "fn": "GotoScene",
        "args": [
          "0.3",
          "Fade",
          "Left",
          ScenesBackwards[i].ID
        ],
        "code": "GotoScene(\"Fade\",0.3,\"Left\","+ScenesBackwards[i].ID+")"
      },
    ],
    
    });


}

  showPreview();
  ReadyMadeEditor.Opacity=0;
  

}

