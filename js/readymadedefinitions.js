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
    TransformOriginX:25,
    TransformOriginY:25,
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
    TransformOriginX:25,
    TransformOriginY:25,
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
  Style: "cursor:pointer",
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
  Style: "",
  Color: "${readyMadeArgs[1]}",
  ClickThrough:true,
  });
  `
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
    "event": "Update",
    "comment": "Update the seekbar on interaction",
    "conditions": [
      {
        "fn": "GetProperty",
        "args": [
          readyMadeArgs[0]+"Bar",
          "MouseIsDown",
          "==",
          "true"
        ],
        "code": readyMadeArgs[0]+"Bar.MouseIsDown==true"
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
        "fn": "Move",
        "args": [
          readyMadeArgs[0],
          "Y",
		  "=",
          ""+ScenesBackwards.length*readyMadeArgs[3],
          "power1.out",
          "0.5",
          "0"
        ],
        "code": "Move.to("+readyMadeArgs[0]+",{Y:"+ScenesBackwards.length*readyMadeArgs[3]+",ease:\"power1.out\",duration:0.5,delay:0})"
      },
      {
        "fn": "",
        "args": [
          "{\"type\":\"actor\",\"value\":\""+readyMadeArgs[0]+"Arrow"+"\"}",
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
        "fn": "Move",
        "args": [
          "{\"type\":\"actor\",\"value\":\""+readyMadeArgs[0]+"\"}",
          "Y",
		  "=",
          "0",
          "power1.out",
          "0.5",
          "0"
        ],
        "code": "Move.to("+readyMadeArgs[0]+",{Y:0,ease:\"power1.out\",duration:0.5,delay:0})"
      },
      {
        "fn": "Move",
        "args": [
          readyMadeArgs[0]+"Arrow",
          "Angle",
		  "=",
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
        "fn": "Move",
        "args": [
          "{\"type\":\"actor\",\"value\":\""+readyMadeArgs[0]+"\"}",
          "Y",
		  "=",
          "0",
          "power1.out",
          "0.5",
          "0"
        ],
        "code": "Move.to("+readyMadeArgs[0]+",{Y:0,ease:\"power1.out\",duration:0.5,delay:0})"
      },
      {
        "fn": "Move",
        "args": [
          "{\"type\":\"actor\",\"value\":\""+readyMadeArgs[0]+"Arrow"+"\"}",
          "Angle",
		  "=",
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

ReadyMades.push({
    id: "Cube",
    name: "Cube",

    args: [
     
      {
        type: "text",
        label: "ID: ",
        defaultValue: "Cube"
      },
      {
        type: "color",
        label: "Color",
        defaultValue: "gray"
      },
       {
        type: "number",
        label: "Size",
        defaultValue: "1000"
      }
    ],

    create: CreateCube
  }
)


function CreateCube(readyMadeArgs) {



  BuildCode.setValue(BuildCode.getValue()+
  `
  Actor('${readyMadeArgs[0]}','div');
ActorProps(thisActor, {
  Parent: "Scene1",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  X: 384,
  Y: 80,
  Z: 0,
  TransformOriginX: ${readyMadeArgs[2]}/2,
  TransformOriginY: ${readyMadeArgs[2]}/2,
  RotateX:-25,
  RotateY:50,
  
  Scale: 1,
});

Actor('${readyMadeArgs[0]}side1','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  
  TransformOriginX: ${readyMadeArgs[2]}/2,
  TransformOriginY: ${readyMadeArgs[2]}/2,
  Color: "${readyMadeArgs[1]}",
  Style: "backface-visibility:hidden;",
  Text: "<h1>Side 1</h1>",
  Opacity: 100,
  TranslateZ: ${readyMadeArgs[2]}/2,
});

Actor('${readyMadeArgs[0]}side1Shadow','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}side1",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  TransformOriginX: 0,
  TransformOriginY: 0,
  Color: "#000000",
  Opacity: 10,
});

Actor('${readyMadeArgs[0]}side2','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  X: ${readyMadeArgs[2]}/2,
 
  RotateY: 90,
  TransformOriginX: ${readyMadeArgs[2]}/2,
  TransformOriginY: ${readyMadeArgs[2]}/2,
 
  Style: "backface-visibility:hidden;",
  Color: "${readyMadeArgs[1]}",
  Text: "<h1>Side 2</h1>",
});

Actor('${readyMadeArgs[0]}side2Shadow','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}side2",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  TransformOriginX: 0,
  TransformOriginY: 0,
  Color: "#000000",
 
  Opacity: 20,
});

Actor('${readyMadeArgs[0]}side3','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  Angle: 180,
  RotateX: 180,
  TransformOriginX: ${readyMadeArgs[2]}/2,
  TransformOriginY: ${readyMadeArgs[2]}/2,
  Style: "backface-visibility:hidden;",
  Color: "${readyMadeArgs[1]}",
  Text: "<h1>Side 3</h1>",
  TranslateZ: -(${readyMadeArgs[2]}/2),
});

Actor('${readyMadeArgs[0]}side3Shadow','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}side3",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  TransformOriginX: 0,
  TransformOriginY: 0,
  Color: "#000000",
  Opacity: 10,
});

Actor('${readyMadeArgs[0]}side4','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  X: -(${readyMadeArgs[2]}/2),
  RotateY: -90,
  TransformOriginX: ${readyMadeArgs[2]}/2,
  TransformOriginY: ${readyMadeArgs[2]}/2,
  Style: "backface-visibility:hidden;",
  Color: "${readyMadeArgs[1]}",
  Text: "<h1>Side 4</h1>",
});

Actor('${readyMadeArgs[0]}side4Shadow','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}side4",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  TransformOriginX: 0,
  TransformOriginY: 0,
  Color: "#000000",
  Opacity: 20,
});

Actor('${readyMadeArgs[0]}side5','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  Y: ${readyMadeArgs[2]}/2,
  RotateX: -90,
  TransformOriginX: ${readyMadeArgs[2]}/2,
  TransformOriginY: ${readyMadeArgs[2]}/2,
  Style: "backface-visibility:hidden;",
  Color: "${readyMadeArgs[1]}",
  Text: "<h1>side 5</h1>",
});

Actor('${readyMadeArgs[0]}side5Shadow','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}side5",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  TransformOriginX: 0,
  TransformOriginY: 0,
  Color: "#000000",
  Opacity: 30,
});

Actor('${readyMadeArgs[0]}side6','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  Y: -(${readyMadeArgs[2]}/2),
  RotateX: 90,
  TransformOriginX: ${readyMadeArgs[2]}/2,
  TransformOriginY: ${readyMadeArgs[2]}/2,
  Style: "backface-visibility:hidden;",
 Color: "${readyMadeArgs[1]}",
  Text: "<h1>Side 6</h1>",
});

Actor('${readyMadeArgs[0]}side6Shadow','div');
ActorProps(thisActor, {
  Parent: "${readyMadeArgs[0]}side6",
  Width: ${readyMadeArgs[2]},
  Height: ${readyMadeArgs[2]},
  TransformOriginX: 0,
  TransformOriginY: 0,
  Color: "#000000",
  Opacity: 30,
});
  ` 
  )
   

  showPreview();
  ReadyMadeEditor.Opacity=0;
}























const AnimationTypes=[];


AnimationTypes.push({
    id: "Text",
    name: "Text Animation",
	timeline: {
		time: 11,
		duration: 10,
		color: "#b88b8b",
		actorid: 1
	},

    args: [
        { type: "scene", label: "Scene" },
        { type: "actor", label: "Actor:" },
        { type: "dropdown", label: "Direction", options: ["to", "from", "set"], defaultValue: "from" },
        { type: "dropdown", label: "Split by", options: ["lines", "words", "chars"], defaultValue: "chars" },
        { type: "number", label: "X", defaultValue: "null" },
        { type: "number", label: "Y", defaultValue: "null" },
		{ type: "number", label: "Scale", defaultValue: "null" },
		{ type: "number", label: "Angle", defaultValue: "null" },
        { type: "number", label: "Speed", defaultValue: "1" },
        { type: "easing", label: "easing", defaultValue: "power1.out" },
        { type: "number", label: "duration", defaultValue: "1" },
        { type: "number", label: "time", defaultValue: "0" }
    ],

    create: (args) => {

        let scene = args[0];
        let target = args[1];
        let direction = args[2];
        let splitBy = args[3];
        let x = args[4];
        let y = args[5];
		let scale = args[6];
		let angle = args[7];
        let speed = args[8];
        let easing = args[9];
        let duration = args[10];
        let time = args[11];

        // Build properties dynamically
        let properties = [];

        if (x !== "null" && x !=="") properties.push(`x: ${x}*StageScale`);
        if (y !== "null" && y !=="") properties.push(`y: ${y}*StageScale`);
		if (scale !== "null" && scale !=="") properties.push(`scale: ${scale}`);
		if (angle !== "null" && angle !=="") properties.push(`rotate: "${angle}deg"`);

        properties.push(`duration: ${speed}`);
        properties.push(`ease: "${easing}"`);
        properties.push(`autoAlpha: 0`);
        properties.push(`stagger: { amount: ${duration}}`);

        let code = `
            let split = SplitText.create("#${target}", {
                type: "${splitBy}"
            });

            ${scene}.Timeline.add(
                gsap.timeline().${direction}(split.${splitBy}, {
                    ${properties.join(",\n                    ")}
                }),
                ${time}
            );
        `;

        return {
            event: "Update",
            comment: "Text Animation",
            conditions: [],
            actions: [
                {
                    fn: "",
                    args: [],
                    code: code
                }
            ],
            fireMode: "once",
            animation: {
                type: "Text",
                args: [...args]
            }
        };
    }
});


AnimationTypes.push({
    id: "Filter",
    name: "Filter Animation",
	timeline: {
		time: 13,
		duration: 12,
		color: "#b0aad4",
    actorid: 1
	},

    args: [
        { type: "scene", label: "Scene" },
        { type: "actor", label: "Actor:" },
        { type: "dropdown", label: "Direction", options: ["to", "from", "set"], defaultValue: "to" },

        { type: "range", label: "Blur", defaultValue: "null", min:0, max:100, step:0.1 },
        { type: "range",label: "Brightness",min: 0,max: 2,step: 0.05,defaultValue: "null"},
        { type: "number", label: "Contrast", defaultValue: "null" },
        {type: "range",label: "Grayscale",min: 0,max: 1,step: 0.01,defaultValue: "null"},
        { type: "number", label: "Saturate", defaultValue: "null" },
        { type: "number", label: "Sepia", defaultValue: "null" },
        {type: "range",label: "Hue Rotate",min: 0,max: 360,step: 1,defaultValue: "null"},
        { type: "number", label: "Invert", defaultValue: "null" },
        

        { type: "easing", label: "Easing", defaultValue: "power1.out" },
        { type: "number", label: "Duration", defaultValue: "1" },
        { type: "number", label: "Time", defaultValue: "0" }
    ],

    create: (args) => {

        let scene = args[0];
        let target = args[1];
        let direction = args[2];

        let blur = args[3];
        let brightness = args[4];
        let contrast = args[5];
        let grayscale = args[6];
        let saturate = args[7];
        let sepia = args[8];
        let hueRotate = args[9];
        let invert = args[10];

        let easing = args[11];
        let duration = args[12];
        let time = args[13];

        // Build filter string dynamically
        let filters = [];

        if (blur !== "null" && blur !=="") filters.push(`blur(${blur}px)`);
        if (brightness !== "null" && brightness !=="") filters.push(`brightness(${brightness})`);
        if (contrast !== "null" && contrast !== "") filters.push(`contrast(${contrast})`);
        if (grayscale !== "null"&& grayscale !== "") filters.push(`grayscale(${grayscale})`);
        if (saturate !== "null" && saturate !== "") filters.push(`saturate(${saturate})`);
        if (sepia !== "null" &&  sepia !== "") filters.push(`sepia(${sepia})`);
        if (hueRotate !== "null" && hueRotate !== "") filters.push(`hue-rotate(${hueRotate}deg)`);
        if (invert !== "null" && invert !== "") filters.push(`invert(${invert})`);

        let properties = [];

        if (filters.length > 0) {
            properties.push(`filter: "${filters.join(" ")}"`);
        }

        properties.push(`duration: ${duration}`);
        properties.push(`ease: "${easing}"`);

        let code = `
            ${scene}.Timeline.add(
                gsap.timeline().${direction}("#${target}", {
                    ${properties.join(",\n                    ")}
                }),
                ${time}
            );
        `;

        return {
            event: "Update",
            comment: "Filter Animation",
            conditions: [],
            actions: [
                {
                    fn: "",
                    args: [],
                    code: code
                }
            ],
            fireMode: "once",
            animation: {
                type: "Filter",
                args: [...args]
            }
        };
    }
});


AnimationTypes.push({
    id: "Property",
    name: "Property Animation",
	timeline: {
		time: 3,
		duration: 4,
		color: "#b0aad4",
    actorid: 1
	},

    args: [
        { type: "scene", label: "Scene" },
        { type: "actor", label: "Actor:" },
        { type: "dropdown", label: "Direction", options: ["to", "from", "set"], defaultValue: "to" },
        { type: "number", label: "Start Time", defaultValue:0},
         { type: "number", label: "duration", defaultValue:1},
        { type: "easing", label: "Easing", defaultValue: "power1.out" },
        { type: "number", label: "Repeat", defaultValue:0},
        { type: "boolean", label: "Yoyo", defaultValue:false},
        { type: "number", label:"Repeat Delay", defaultValue:0},

        { type: "number", label: "Origin X"},
        { type: "number",label: "Origin Y"},
        { type: "number", label: "Width", defaultValue: "null" },
        { type: "number", label: "Height", defaultValue: "null" },
        { type: "number", label: "X", defaultValue: "null" },
        { type: "number", label: "Y", defaultValue: "null" },
        { type: "number", label: "Scale", defaultValue: "null" },
        { type: "range", label: "Opacity", defaultValue: "null", min:0, max:100 },
        { type: "range", label: "Angle", defaultValue: "null", min:-360,max:360 },
        { type: "number", label:"Skew X", defaultValue: "null"},
        { type: "number", label:"Skew Y", defaultValue: "null"},
        { type: "number", label:"Skew X", defaultValue: "null"},
        { type: "range", label: "Rotate X", defaultValue: "null", min:-360,max:360 },
        { type: "range", label: "Rotate Y", defaultValue: "null", min:-360,max:360 },
        { type: "range", label: "Rotate Z", defaultValue: "null", min:-360,max:360 },
        { type: "number", label:"Translate Z", defaultValue: "null"},



        
        
    ],

    create: (args) => {

        let scene = args[0];
        let target = args[1];
        let direction = args[2];
        let starttime = args[3];
        let duration = args[4];
        let easing = args[5];
        let repeat = args[6];
        let yoyo = args[7];
        let repeatdelay=args[8];

        let originx = args[9];
        let originy = args[10];
        let width = args[11];
        let height = args[12];
        let x = args[13];
        let y = args[14];
        let scale = args[15];
        let opacity = args[16];
        let angle = args[17];
        let skewx = args[18];
        let skewy = args[19];
        let rotatex = args[20];
        let rotatey = args[21];
        let rotatez = args[22];
        let translatez = args[23];
        let innerRepeat=0;

        // Build filter string dynamically
        let filters = [];

        if (originx !== "null" && originx !=="") filters.push(`TransformOriginX:${originx}, `);
        if (originy !== "null" && originy !=="") filters.push(`TransformOriginY:${originy}, `);
        if (width !== "null" && width !=="") filters.push(`Width:${width}, `);
        if (height !== "null" && height !=="") filters.push(`Height:${height}, `);
        if (x !== "null" && x !=="") filters.push(`X:${x}, `);
        if (y !== "null" && y !=="") filters.push(`Y:${y}, `);
        if (scale !== "null" && scale !=="") filters.push(`Scale:${scale}, `);
        if (opacity !== "null" && opacity !=="") filters.push(`Opacity:${opacity}, `);
        if (angle !== "null" && angle !=="") filters.push(`Angle:${angle}, `);
        if (skewx !== "null" && skewx !=="") filters.push(`SkewX:${skewx}, `);
        if (skewy !== "null" && skewy !=="") filters.push(`SkewY:${skewy}, `);
        if (rotatex !== "null" && rotatex !=="") filters.push(`RotateX:${rotatex}, `);
        if (rotatey !== "null" && rotatey !=="") filters.push(`RotateY:${rotatey}, `);
        if (rotatez !== "null" && rotatez !=="") filters.push(`RotateZ:${rotatez}, `);
        if (translatez !== "null" && translatez !=="") filters.push(`TranslateZ:${translatez}, `);


        let properties = [];

        if (filters.length > 0) {
            properties.push(`${filters.join(" ")}`);
        }

        ;
        properties.push(`ease: "${easing}",`);
        //properties.push(`repeat: ${repeat},`);
        properties.push(`yoyo: ${yoyo},`);
        properties.push(`duration: ${duration},`)
        if(yoyo===true){innerRepeat=1}


        let code = `
            ${scene}.Timeline.add(gsap.timeline({repeat:${repeat}, repeatDelay:${repeatdelay}}).${direction}(${target}, {${properties.join(" ")} repeat:${innerRepeat}}),${starttime})`;
//"         \nScene1.Timeline.add(gsap.timeline({ repeat:1,        repeatDelay:1,})            .to(fdg,     {id: 1,ease:\"linear\",repeat:1, yoyo:true, duration:1, data:\"to\"}),0)"
        return {
            event: "SceneStart",
            comment: "Property Animation",
            conditions: [],
            actions: [
                {
                    fn: "",
                    args: [],
                    code: code
                }
            ],
            fireMode: "once",
            animation: {
                type: "Filter",
                args: [...args]
            }
        };
    }
});


AnimationTypes.push({
    id: "Media",
    name: "Media Animation",

    timeline: {
        time: 5,
        duration: 4,
        color: "#b0aad4",
        actorid: 1
    },

    args: [
        { type: "scene", label: "Scene" },
        { type: "actor", label: "Media Actor", actorTypes: ["audio", "video"] },
        { type: "number", label: "Time Offset", defaultValue: 0 },
        { type: "number", label: "Tolerance", defaultValue: 0.1 },
        { type: "number", label: "Duration", defaultValue: 10 },
        { type: "number", label: "Time", defaultValue: "0" }
    ],

    create: (args) => {

        let scene = args[0];
        let actor = args[1];
        let offset = args[2];
        let tolerance = args[3];
        let duration = args[4];
        let time = args[5];

        let code = `
            const mediaActor = ${actor};
			const scene = ${scene};
			const tolerance = ${tolerance};
            const mediaDuration = ${duration};
            const mediaStart = ${time};
            const mediaOffset = ${offset};

            const mediaEnd = mediaStart + mediaDuration;

            if (${scene}.Timeline.time() >= mediaStart &&
                ${scene}.Timeline.time() <= mediaEnd) {

                SyncMediaToTimeline(
					mediaActor,
					scene,
					tolerance,
					scene.Timeline.time() - mediaStart + mediaOffset
				);

            } else {
                const media = elementId(mediaActor.ID);
                if (media && !media.paused) media.pause();
            }
        `;

        return {
            event: "Update",
            comment: "Media Animation",
            conditions: [],
            actions: [{
                fn: "",
                args: [],
                code: code
            }],
            fireMode: "whileTrue",
            animation: {
                type: "Media",
                args: [...args]
            }
        };
    }
});