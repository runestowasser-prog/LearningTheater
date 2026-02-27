// 🛠️ Funktionsdefinitioner til conditions
const ConditionFunctions = {
 
 
 
 
 
 "GetVolume": {
    label: "Volume is",
	category:"Media",
    args: [
      { type: "actor", label: "media Actor" },
	  { type: "compare", label: "", defaultValue: "=="},
      { type: "raw", label: "Volume", defaultValue:"0" }

    ],
    build: (args) => `GetVolume(${args[0]}}${args[1]}${args[2]})`
  },

 "GetDuration": {
    label: "Duration is",
	category:"Media",

    args: [
      { type: "actor", label: "Actor" },
	  { type: "compare", label: "", defaultValue: "=="},
      { type: "raw", label: "Volume", defaultValue:"0" }
    ],
    build: (args) => `GetDuration(${args[0]})${args[1]}${args[2]}`
  },

 "GetCurrentTime": {
    label: "Current time is",
	category:"Media",

    args: [
      { type: "actor", label: "Actor" },
	  { type: "compare", label: "", defaultValue: "=="},
      { type: "raw", label: "Volume", defaultValue:"0" }
    ],
    build: (args) => `GetCurrentTime(${args[0]})${args[1]}${args[2]}`
  },

 

/*
 "ActorPosition": {
    label: "Actor position is",
	category:"Actor",

    args: [ 
	{ type: "actor", label: "Actor ", defaultValue: "Actors[0]" },
	{ type: "property", label: "", include:["X","Y"], defaultValue: "X"},
	{ type: "compare", label: "", defaultValue: "=="},
    { type: "raw", label: "", defaultValue: "0"},
	
    ],
    build: (args) => `${args[0]}.${args[1]} ${args[2]} ${args[3]}`
  },
*/

  "GetProperty": {
    label: "Actor property is",
	category:"Actor",

    args: [
      { type: "actor", label: "Actor",defaultValue:"Actors[0]" },
      { type: "property", label: "Property", exclude:["BackgroundImage","Click", "Controls","DropFunction","MouseDown","MouseUp","OverFlow","ShowOrigin"], defaultValue:"X" },
	  { type: "compare", label: "", defaultValue: "=="},
	  { type: "raw", label: "", defaultValue: "0"},
    ],
    build: (args) => `${args[0]}.${args[1]}${args[2]}${args[3]}`
  },

"Collision": {
  label: "Collision between two actors",
  category: ["Actor","Gamification"],
  args: [
    { type: "actor", label: "Actor 1" },
    { type: "actor", label: "Actor 2" },
    { type: "boolean", label: "Top", defaultValue: "true" },
    { type: "boolean", label: "Bottom", defaultValue: "true" },
    { type: "boolean", label: "Left", defaultValue: "true" },
    { type: "boolean", label: "Right", defaultValue: "true" },
    { type: "raw", label: "X modifier", defaultValue: "0" },
    { type: "raw", label: "Y modifier", defaultValue: "0" }
  ],
  build: (args) => {
    const [a, b, top, bottom, left, right, modX, modY] = args;

    // Hvis alle sider er valgt ? klassisk collision
    const allSidesSelected = [top, bottom, left, right].every(v => v === true || v === "true");
    if (allSidesSelected) {
      return `Collision(${a}, ${b}, ${modX}, ${modY})`;
    }

    // Filtr�r p� valgte sider
    const checks = [];
    if (top === true || top === "true") checks.push(`Collision(${a}, ${b}, ${modX}, ${modY}).side === "top"`);
    if (bottom === true || bottom === "true") checks.push(`Collision(${a}, ${b}, ${modX}, ${modY}).side === "bottom"`);
    if (left === true || left === "true") checks.push(`Collision(${a}, ${b}, ${modX}, ${modY}).side === "left"`);
    if (right === true || right === "true") checks.push(`Collision(${a}, ${b}, ${modX}, ${modY}).side === "right"`);

    return `Collision(${a}, ${b}, ${modX}, ${modY}) && (${checks.join(" || ")})`;
  }
},









  "GetScene": {
    label: "Scene is",
	category:"Scene",

    args: [
      { type: "scene", label: "Scene" },
    ],
    build: (args) => `GetScene()==${args[0]}`,
	summary: (args) => `Current Scene is ${args[0]}`
  },

    "GatherEnsemble": {
  label: "Gather ensemble by",
  category: "Ensemble",
  args: [
    { type: "raw", label: "Ensemble name" },
    { type: "property", label: "Property", exclude: ["BackgroundImage","Click","Controls","DropFunction","MouseDown","MouseUp","OverFlow","ShowOrigin"], defaultValue: "X" },
    { type: "raw", label: "Property value" }
  ],
  build: (args) => `GatherEnsemble(${JSON.stringify(args[0])}, ${JSON.stringify(args[1])}, ${JSON.stringify(args[2])})`
},

"FilterEnsemble": {
  label: "Trim ensemble",
  category: "Ensemble",
  args: [
    { type: "ensemble", label: "Ensemble" },
    { type: "property", label: "Property", defaultValue: "X" },
    { type: "compare", label: "", defaultValue: "==" },
    { type: "raw", label: "Value" }
  ],
  build: (args) =>
    `${args[0]} = ${args[0]}.filter(a => a["${args[1]}"] ${args[2]} ${args[3]})`
},






/*
 "ActorEnsembleCollision": {
  label: "Actor collides with any in Ensemble",
  category: "Ensemble",
  args: [
    { type: "actor", label: "Actor" },
	{ type: "ensemble", label: "Ensemble" },
    { type: "boolean", label: "Top", defaultValue: "true" },
    { type: "boolean", label: "Bottom", defaultValue: "true" },
    { type: "boolean", label: "Left", defaultValue: "true" },
    { type: "boolean", label: "Right", defaultValue: "true" },
    { type: "raw", label: "X modifier (optional)", defaultValue: "0" },
    { type: "raw", label: "Y modifier (optional)", defaultValue: "0" }
  ],
  build: (args) => {
    const [actor, top, bottom, left, right, modX, modY] = args;

    const allSidesSelected = [top, bottom, left, right].every(v => v === true || v === "true");
    if (allSidesSelected) {
      return `${ensemble} = ${ensemble}.filter(a => Collision(${actor}, a, ${modX}, ${modY}))`;
    }

    const checks = [];
    if (top === true || top === "true") checks.push(`Collision(${actor}, a, ${modX}, ${modY}).side === "top"`);
    if (bottom === true || bottom === "true") checks.push(`Collision(${actor}, a, ${modX}, ${modY}).side === "bottom"`);
    if (left === true || left === "true") checks.push(`Collision(${actor}, a, ${modX}, ${modY}).side === "left"`);
    if (right === true || right === "true") checks.push(`Collision(${actor}, a, ${modX}, ${modY}).side === "right"`);

    return `${ensemble} = ${ensemble}.filter(a => Collision(${actor}, a, ${modX}, ${modY}) && (${checks.join(" || ")}))`;
  }
},
*/

"EnsemblesCollide": {
  label: "Ensembles collide",
  category: "Ensemble",
  args: [
    { type: "ensemble", label: "Ensemble" },
    { type: "ensemble", label: "2nd Ensemble" },
    { type: "boolean", label: "Top", defaultValue: "true" },
    { type: "boolean", label: "Bottom", defaultValue: "true" },
    { type: "boolean", label: "Left", defaultValue: "true" },
    { type: "boolean", label: "Right", defaultValue: "true" },
    { type: "raw", label: "X modifier (optional)", defaultValue: "0" },
    { type: "raw", label: "Y modifier (optional)", defaultValue: "0" }
  ],
  build: (args) => {
    const [ensemble, ensemble2, top, bottom, left, right, modX, modY] = args;

    const allSidesSelected = [top, bottom, left, right].every(v => v === true || v === "true");
    if (allSidesSelected) {
      return `${ensemble} = ${ensemble}.filter(a => ${ensemble2}.some(b => Collision(a, b, ${modX}, ${modY})))`;
    }

    const checks = [];
    if (top === true || top === "true") checks.push(`Collision(a,b,${modX},${modY}).side === "top"`);
    if (bottom === true || bottom === "true") checks.push(`Collision(a,b,${modX},${modY}).side === "bottom"`);
    if (left === true || left === "true") checks.push(`Collision(a,b,${modX},${modY}).side === "left"`);
    if (right === true || right === "true") checks.push(`Collision(a,b,${modX},${modY}).side === "right"`);

    return `${ensemble} = ${ensemble}.filter(a => ${ensemble2}.some(b => Collision(a,b,${modX},${modY}) && (${checks.join(" || ")})) && ${ensemble}.length>0)`
  }
},





  "EnsembleNotEmpty":{
  label: "Ensemble is NOT empty",
  args:[
  { type: "ensemble", label: "Ensemble" },
  ],
	category:"Ensemble",

  build: (args) => `${args[0]}.length>0`
  },
  
    "EnsembleEmpty":{
  label: "Ensemble IS empty",
  args:[
  { type: "ensemble", label: "Ensemble" },
  ],
	category:"Ensemble",

  build: (args) => `${args[0]}.length==0`
  },
  
  
 

   "SCORM Score is at least": {
  label: "SCORM score is at least",
  category: "SCORM",
  args: [
    { type: "number", label: "Minimum score" }
  ],
  build: (args) => `parseFloat(GetScore()) >= ${args[0]}`
},

   "SCORM Location is":{
  label: "SCORM location is",
  category: "SCORM",
  args: [
    { type: "text", label: "Location name" }
  ],
  build: (args) => `GetLocation() === "${args[0]}"`
},

   "SCORM Status is":{
  label: "SCORM status is",
  category: "SCORM",
  args: [
    { type: "dropdown", label: "Status", options: ["passed", "completed", "failed", "incomplete", "browsed", "not attempted"], defaultValue: "completed" }
  ],
  build: (args) => `GetStatus() === "${args[0]}"`
},


   "Get SCORM Objective Status": {
  label: "Get SCORM objective status",
  category: "SCORM",
  args: [
    { type: "number", label: "Objective index" }
  ],
  build: (args) => `GetObjectiveStatus(${args[0]})`
},

   "Read SCORM Comment": {
  label: "Get SCORM comments",
  category: "SCORM",
  args: [],
  build: () => `ReadComment()`
},

  
  
  

  "TimelineStateIs": {
    label: "Timeline state is",
    category: "Timeline",
    args: [
      { type: "scene", label: "Scene", defaultValue: "Scene1" },
      {
        type: "dropdown",
        label: "State",
        options: ["playing", "paused", "completed"],
        defaultValue: "playing"
      }
    ],
    build: (args) => {
      const scene = args[0];
      const state = args[1];
      if (state === "playing") return `!${scene}.Timeline.paused()`;
      if (state === "paused") return `${scene}.Timeline.paused()`;
      if (state === "completed") return `${scene}.Timeline.progress() >= 1`;
      return "false";
    }
  },

  "TimelineTimeCompare": {
    label: "Timeline time is",
    category: "Timeline",
    args: [
      { type: "scene", label: "Scene", defaultValue: "Scene1" },
      { type: "compare", label: "Compare", defaultValue: ">" },
      { type: "raw", label: "Time (sec)", defaultValue: "1" }
    ],
    build: (args) => `${args[0]}.Timeline.time() ${args[1]} ${args[2]}`
  },


  
  
  
  
  
  
};


// 🛠️ Funktionsdefinitioner til actions
const ActionFunctions = {


  "SetText": {
    label: "Set text",
	category:"Actor",

    args: [
      { type: "actor", label: "Actor", defaultValue:"Actors[0]" },
      { type: "string", label: "New text" },
    ],
    build: (args) => `SetText(${args[0]},"${args[1]}")`
  },
  
   "ReplaceText": {
    label: "Replace text",
	category:"Actor",

    args: [
      { type: "actor", label: "Actor", defaultValue:"Actors[0]" },
      { type: "string", label: "find" },
	  { type: "raw", label: "and replace with" },
    ],
    build: (args) => `ReplaceText(${args[0]},"${args[1]}","${args[2]}")`
  },

  "Play": {
    label: "Play media",
	category:"Media",
    args: [
      { type: "actor", label: "media Actor", defaultValue:"Actors[0]" }
    ],
    build: (args) => `Play(${args[0]})`
  },
  "Pause": {
    label: "Pause media",
	category:"Media",
    args: [
      { type: "actor", label: "media Actor", defaultValue:"Actors[0]" }
    ],
    build: (args) => `Pause(${args[0]})`
  },
  "Stop": {
    label: "Stop media",
	category:"Media",
    args: [
      { type: "actor", label: "media Actor", defaultValue:"Actors[0]" }
    ],
    build: (args) => `Stop(${args[0]})`
  },
  "SetCurrentTime": {
    label: "Set time of media",
	category:"Media",
    args: [
      { type: "actor", label: "media Actor", defaultValue:"Actors[0]" },
      { type: "raw", label: "time", defaultValue:"0" }

    ],
    build: (args) => `SetCurrentTime(${args[0]},${args[1]})`
  },
  "SetVolume": {
    label: "Set Volume of media",
	category:"Media",
    args: [
      { type: "actor", label: "media Actor", defaultValue:"Actors[0]" },
      { type: "raw", label: "time", defaultValue:"0" }

    ],
    build: (args) => `SetVolume(${args[0]},${args[1]})`
  },
  



  "NextScene": {
    label: "Go to next scene",
	category:"Scene",

     args: [
	{ type: "raw", label: "Duration", defaultValue:"0" },	
	{ type: "dropdown", label: "Transition", options: ["Slide", "Fade",], defaultValue: "Fade" },
	{ type: "dropdown", label: "Direction", options: ["Up", "Down","Left","Right"], defaultValue: "Left" }
		
	],
    build: (args) => `NextScene("${args[1]}",${args[0]},"${args[2]}")`
  },
    "PreviousScene": {
    label: "Go to previous scene",
	category:"Scene",

    args: [
	{ type: "raw", label: "Duration", defaultValue:"0" },	
	{ type: "dropdown", label: "Transition", options: ["Slide", "Fade",], defaultValue: "Fade" },
	{ type: "dropdown", label: "Direction", options: ["Up", "Down","Left","Right"], defaultValue: "Left" }
		
	],
    build: (args) => `PrevScene("${args[1]}",${args[0]},"${args[2]}")`
  },
  "GotoScene": {
    label: "Go to scene",
	category:"Scene",
	args: [
	{ type: "raw", label: "Duration", defaultValue:"0" },	
	{ type: "dropdown", label: "Transition", options: ["Slide", "Fade",], defaultValue: "Fade" },
	{ type: "dropdown", label: "Direction", options: ["Up", "Down","Left","Right"], defaultValue: "Left" },
    { type: "scene", label: "Scene",  defaultValue:"Scenes[0]" },
   ],
    build: (args) => `GotoScene("${args[1]}",${args[0]},"${args[2]}",${args[3]})`
  },
    "Fade Out": {
    label: "Fade out actor",
	category:["Actor","Animation"],

    args: [
      { type: "actor", label: "Actor", defaultValue:"Actors[0]" },
      { type: "number", label: "Fade time", defaultValue:"1"}
    ],
    build: (args) => `Move.to(${args[0]},{Opacity:0,duration:${args[1]}})`
  },
    "FollowMouseX": {
    label: "Follow mouse X",
	category:"Actor",

    args: [
      { type: "actor", label: "Actor", defaultValue:"Actors[0]" },
	{ type: "raw", label: "modifier",defaultValue:"0"},
      { type: "raw", label: "Slopiness",defaultValue:"0"}
    ],
    build: (args) => `Move.to(${args[0]},{X:MouseX+${args[1]},duration:${args[2]}})`
  },
  "MoveActor": {
    label: "Move actor",
	category:"Actor",

    args: [
      { type: "actor", label: "Actor", defaultValue:"Actors[0]" },
      { type: "animationproperties", label: "Property", defaultValue: "X" },
      { type: "raw", label: "", defaultValue: "0"},
	{ type: "easing", label: "easing", defaultValue: "power1.out"},
      { type: "raw", label: "duration", defaultValue: "1"},
      { type: "raw", label: "delay", defaultValue: "0"},

    ],
    build: (args) => `Move.to(${args[0]},{${args[1]}:${args[2]},ease:"${args[3]}",duration:${args[4]},delay:${args[5]}})`
  },

   "FollowMouseY": {
    label: "Follow mouse Y",
	category:"Actor",

    args: [
      { type: "actor", label: "Actor", defaultValue:"Actors[0]" },
      { type: "raw", label: "modifier", defaultValue:"0"},
      { type: "number", label: "Slopiness", defaultValue:"0"}
    ],
    build: (args) => `Move.to(${args[0]},{Y:MouseY+${args[1]},duration:${args[2]}})`
  },
  "Reverse property": {
    label: "Reverse value",
	category:"Calculation",

    args: [
      { type: "actor", label: "Actor", defaultValue:"Actors[0]" },
      { type: "property", label: "Property", exclude:["BackgroundImage","Click", "Controls","DropFunction","MouseDown","MouseUp","OverFlow","ShowOrigin"], defaultValue:"X" },
    ],
    build: (args) => `${args[0]}.${args[1]}=-${args[0]}.${args[1]}`
  },
  "SetEnsembleProperty": {
  label: "Set property on Ensemble",
	category:"Ensemble",

  args: [
	{ type: "ensemble", label: "Ensemble name"},
    { type: "property", label: "Property", exclude:["BackgroundImage","Click", "Controls","DropFunction","MouseDown","MouseUp","OverFlow","ShowOrigin"], defaultValue:"X" },
    { type: "adjust", label: "Adjustment", defaultValue:"=" },
    { type: "raw", label: "New value" }
  ],
  build: (args) => `${args[0]}.forEach(a => a["${args[1]}"] ${args[2]} ${args[3]})`
  },

  "ShuffleEnsembleProperty": {
  label: "Shuffle property on Ensemble",
  category: "Ensemble",
  args: [
    { type: "ensemble", label: "Ensemble name" },
    { type: "property", label: "Property", exclude:["BackgroundImage","Click", "Controls","DropFunction","MouseDown","MouseUp","OverFlow","ShowOrigin"], defaultValue:"X" },
  ],
  build: (args) => `ShuffleEnsembleProperty(${args[0]}, "${args[1]}")`
  },



  "SetSource": {
   label: "Set a new source on actor",
	category:"Actor",

  args: [
       { type: "actor", label: "Actor", defaultValue:"Actors[0]" },
      { type: "string", label: "New source"}

  ],
  build: (args) => `SetSource(${args[0]},"${args[1]}")`
  },

  "SetProperty": {
    label: "Set a property on an actor",
	category:"Actor",

    args: [
      { type: "actor", label: "Actor", defaultValue:"Actors[0]" },
      { type: "property", label: "Property", exclude:["BackgroundImage","Click", "Controls","DropFunction","MouseDown","MouseUp","OverFlow","ShowOrigin"], defaultValue:"X" },
      { type: "adjust", label: "Adjustment", defaultValue:"=" },
      { type: "raw", label: "Value", defaultValue:"0" }
    ],
    build: (args) => `${args[0]}.${args[1]} ${args[2]} ${args[3]}`
  },
  "SnapToActor": {
    label: "Snap an actor to another",
	category:"Actor",

    args: [
      { type: "actor", label: "Actor 1",defaultValue:"Actors[0]" },
      { type: "actor", label: "Actor 2",defaultValue:"Actors[1]" },
      
      { type: "raw", label: "Modifier X", defaultValue: "0" },
      { type: "raw", label: "Modifier Y", defaultValue: "0" },
      { type: "raw", label: "Speed", defaultValue: "1" },


    ],
    build: (args) => `Move.to(${args[0]},{X:${args[1]}.X+${args[2]}, Y:${args[1]}.Y+${args[3]}, duration:${args[4]}})`
  },
  
  "ToggleProperty": {
	label: "Toggle Property",
	category: "Actor",
  
	args: [
		{ label: "Actor", type: "actor" },
		{ label: "Property", type: "property",},
		{ label: "Value A", type: "raw" },
		{ label: "Value B", type: "raw" },
	],
	
  build: (args) => 
	`if (${args[0]}.${args[1]} == ${args[2]}) {   ${args[0]}.${args[1]} = ${args[3]};  } else {    ${args[0]}.${args[1]} = ${args[2]};      }    `
	
  },

  "ChangeColor": {
    label: "Change the color of an actor",
	category:"Actor",

    args: [
      { type: "actor", label: " Actor: ",defaultValue:"Actors[0]" },
      { type: "color", label: " Color: ", defaultValue: "#ffffff" },
      { type: "number", label: " Fadetime: ", defaultValue: "1" },
      


    ],
    build: (args) => `Move.to("#${args[0]}",{"background-color":"${args[1]}", duration:${args[2]}})`
  },

  "ChangeBlur": {
    label: "Change the blur of an actor",
	category:"Actor",

    args: [
      { type: "actor", label: " Actor: ",defaultValue:"Actors[0]" },
      { type: "number", label: " amount: ", defaultValue: "1" },
      { type: "number", label: " Fadetime: ", defaultValue: "1" },
      


    ],
    build: (args) => `Move.to("#${args[0]}",{"filter:":"blur(${args[1]}em"), duration:${args[2]}})`
  },

    "FireActor": {
    label: "Fire an Actor",
	category:"Actor",

    args: [
      { type: "actor", label: " Actor: ",defaultValue:"Actors[0]" },
      


    ],
    build: (args) => `DeleteActor("${args[0]}")`
  },

   "DuplicateActor": {
    label: "Duplicate an Actor",
	category:"Actor",

    args: [
      { type: "actor", label: " Actor: ",defaultValue:"Actors[0]" },
      { type: "number", label: " times: ",defaultValue:"1" },
      


    ],
    build: (args) => `DuplicateActor("${args[0]}",${args[1]})`
  },



   "Initialize SCORM": {
  label: "Initialize SCORM connection",
  category: "SCORM",
  args: [],
  build: () => `SCORM_init()`
},

   "Save SCORM Data": {
  label: "Save SCORM data",
  category: "SCORM",
  args: [],
  build: () => `SCORM_save()`
},

   "Exit SCORM": {
  label: "Exit SCORM session",
  category: "SCORM",
  args: [],
  build: () => `SCORM_exit()`
},

   "Set SCORM Status": {
  label: "Set SCORM status",
  category: "SCORM",
  args: [
    { type: "dropdown", label: "Status", options: ["passed", "completed", "failed", "incomplete", "browsed", "not attempted"] }
  ],
  build: (args) => `SetStatus("${args[0]}")`
},

"AnimateSVG": {
  label: "Animate SVG element",
  category: "SVG",

  args: [
    {
      type: "raw",
      label: "SVG selector",
      defaultValue: "#myGroup" // CSS selector eller ID
    },
	 {
      type: "dropdown",
      label: "Direction",
      options: ["to", "from", "set"],
      defaultValue: "to"
    },
	
    {
      type: "dropdown",
      label: "SVG property",
      options: [
        "x", "y",
        "cx", "cy",
        "r", "rx", "ry",
        "width", "height",
        "opacity",
        "fill", "stroke", "strokeWidth",
        "scale", "rotate",
        "translateX", "translateY",
        "skewX", "skewY"
      ],
      defaultValue: "x"
    },
    {
      type: "raw",
      label: "Value",
      defaultValue: "100"
    },
    {
      type: "easing",
      label: "Easing",
      defaultValue: "power1.out"
    },
    {
      type: "raw",
      label: "Duration",
      defaultValue: "1"
    },
    {
      type: "raw",
      label: "Delay",
      defaultValue: "0"
    }
  ],

  build: (args) =>
    `Move.${args[1]}("${args[0]}", { ${args[2]}: "${args[3]}", ease: "${args[4]}", duration: ${args[5]}, delay: ${args[6]} })`
},


"MultiDrawSVG": {
  label: "Draw SVG paths",
  category: "SVG",

  args: [
    { 
	  type: "actor", 
	  label: " Actor: ",
	  defaultValue:"Actors[0]" 
	  },
    {
      type: "dropdown",
      label: "Mode",
      options: ["all-together", "stagger", "sequence"],
      defaultValue: "sequence"
    },
    {
      type: "raw",
      label: "Duration (per path)",
      defaultValue: "1"
    },
    {
      type: "raw",
      label: "Delay",
      defaultValue: "0"
    }
  ],

  build: (args) => {
    const selector = args[0];
    const mode = args[1];
    const duration = args[2];
    const delay = args[3];

    return `
{
  const container = document.querySelector("#${selector}");
  if (!container) return;

  const paths = container.querySelectorAll("path");

  paths.forEach((p, i) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;

    let d = ${delay};

    if ("${mode}" === "stagger") {
      d += i * ( ${duration} / 4 );
    }

    if ("${mode}" === "sequence") {
      d += i * ${duration};
    }

    Move.to(p, {
      strokeDashoffset: 0,
      duration: ${duration},
      delay: d,
      ease: "none"
    });
  });
}
`;
  }
},

"MultiFillFadeSVG": {
  label: "Fade in SVG fills",
  category: "SVG",

  args: [
    {
      type: "actor",
      label: "SVG container",
      defaultValue: "Actors[0]"
    },
    {
      type: "dropdown",
      label: "Mode",
      options: ["all-together", "stagger", "sequence"],
      defaultValue: "all-together"
    },
    {
      type: "raw",
      label: "Duration (per element)",
      defaultValue: "1"
    },
    {
      type: "raw",
      label: "Delay",
      defaultValue: "0"
    }
  ],

  build: (args) => {
    const actor = args[0];
    const mode = args[1];
    const duration = args[2];
    const delay = args[3];

    return `
{
  const container = document.querySelector("#${actor}");
  if (!container) return;

  const elements = Array.from(container.querySelectorAll("*"));

  elements.forEach((el, i) => {
    // computed fill (may be 'none' or a color)
    const cs = getComputedStyle(el);
    const fill = cs.fill;

    // skip elements without a fill
    if (!fill || fill === "none") return;

    // determine original fill-opacity (computed style)
    // parseFloat to convert "0.5" -> 0.5, fallback to 1
    const origFillOpacity = parseFloat(cs.fillOpacity) || 1;

    // store any inline value so we could restore if needed (optional)
    const prevInline = el.style.fillOpacity;

    // set starting state: hide fill only (don't touch stroke)
    el.style.fillOpacity = 0;

    // calculate delay per mode
    let d = ${delay};

    if ("${mode}" === "stagger") {
      d += i * (${duration} / 4);
    } else if ("${mode}" === "sequence") {
      d += i * ${duration};
    }

    // Animate only fillOpacity -> preserves stroke visibility
    Move.to(el, {
      fillOpacity: origFillOpacity,
      duration: ${duration},
      delay: d,
      ease: "power1.out"
    });
  });
}
`;
  }
},

"EraseSVGLine": {
  label: "Erase SVG lines",
  category: "SVG",

  args: [
    { type: "actor", label: "SVG container", defaultValue: "Actors[0]" },
    { type: "dropdown", label: "Mode", options: ["all-together","stagger","sequence"], defaultValue: "sequence" },
    { type: "raw", label: "Duration (per path)", defaultValue: "1" },
    { type: "raw", label: "Delay", defaultValue: "0" }
  ],

  build: (args) => {
    return `
{
  const container = document.querySelector("#${args[0]}");
  if (!container) return;

  const paths = container.querySelectorAll("path");

  paths.forEach((p, i) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = 0;

    let d = ${args[3]};
    if ("${args[1]}" === "stagger") d += i * (${args[2]} / 4);
    if ("${args[1]}" === "sequence") d += i * ${args[2]};

    Move.to(p, {
      strokeDashoffset: len,
      duration: ${args[2]},
      delay: d,
      ease: "none"
    });
  });
}
`;
  }
},

"FadeOutSVGFill": {
  label: "Fade out SVG fills",
  category: "SVG",

  args: [
    { type: "actor", label: "SVG container", defaultValue: "Actors[0]" },
    { type: "dropdown", label: "Mode", options: ["all-together","stagger","sequence"], defaultValue: "all-together" },
    { type: "raw", label: "Duration (per element)", defaultValue: "1" },
    { type: "raw", label: "Delay", defaultValue: "0" }
  ],

  build: (args) => {
    return `
{
  const container = document.querySelector("#${args[0]}");
  if (!container) return;

  const elements = container.querySelectorAll("*");

  elements.forEach((el, i) => {
    const cs = getComputedStyle(el);
    const fill = cs.fill;
    if (!fill || fill === "none") return;

    const origFillOpacity = parseFloat(cs.fillOpacity) || 1;
    el.style.fillOpacity = origFillOpacity;

    let d = ${args[3]};
    if ("${args[1]}" === "stagger") d += i * (${args[2]} / 4);
    if ("${args[1]}" === "sequence") d += i * ${args[2]};

    Move.to(el, {
      fillOpacity: 0,
      duration: ${args[2]},
      delay: d,
      ease: "power1.in"
    });
  });
}
`;
  }
},






    "Set SCORM Location": {
  label: "Set SCORM location",
  category: "SCORM",
  args: [
    { type: "text", label: "Location string" }
  ],
  build: (args) => `SetLocation("${args[0]}")`
},

   "Set SCORM Score": {
  label: "Set SCORM score",
  category: "SCORM",
  args: [
    { type: "number", label: "Score" },
    { type: "number", label: "Min", default: 0 },
    { type: "number", label: "Max", default: 100 }
  ],
  build: (args) => `SetScore(${args[0]}, ${args[1]}, ${args[2]})`
},

   "Set SCORM Objective ID":{
  label: "Set SCORM objective ID",
  category: "SCORM",
  args: [
    { type: "number", label: "Index" },
    { type: "text", label: "Objective ID" }
  ],
  build: (args) => `SetObjective(${args[0]}, "${args[1]}")`
},

   "Set SCORM Objective Status": {
  label: "Set SCORM objective status",
  category: "SCORM",
  args: [
    { type: "number", label: "Index" },
    { type: "dropdown", label: "Status", options: ["passed", "completed", "failed", "incomplete", "browsed", "not attempted"] }
  ],
  build: (args) => `SetObjectiveStatus(${args[0]}, "${args[1]}")`
},

   "Complete SCORM Course": {
  label: "Mark SCORM course as complete",
  category: "SCORM",
  args: [],
  build: () => `CompleteCourse()`
},

   "Write SCORM Comment": {
  label: "Write SCORM comment",
  category: "SCORM",
  args: [
    { type: "text", label: "Comment text" }
  ],
  build: (args) => `WriteComment("${args[0]}")`
},




  // PLAY
  "PlayTimeline": {
    label: "Play timeline",
    category: "Timeline",
    args: [
      { type: "scene", label: "Scene", defaultValue: "Scene1" },
      { type: "raw", label: "From time (optional)", defaultValue: "" }
    ],
    build: (args) => {
      if (args[1] && args[1].trim() !== "")
        return `${args[0]}.Timeline.play(${args[1]})`;
      else
        return `${args[0]}.Timeline.play()`;
    }
  },

  // PAUSE
  "PauseTimeline": {
    label: "Pause timeline",
    category: "Timeline",
    args: [
      { type: "scene", label: "Scene", defaultValue: "Scene1" }
    ],
    build: (args) => `${args[0]}.Timeline.pause()`
  },

  // TOGGLE
  "ToggleTimeline": {
    label: "Toggle play/pause",
    category: "Timeline",
    args: [
      { type: "scene", label: "Scene", defaultValue: "Scene1" }
    ],
    build: (args) =>
      `(${args[0]}.Timeline.paused() ? ${args[0]}.Timeline.play() : ${args[0]}.Timeline.pause())`
  },

  // SET TIME
  "SetTimelineTime": {
    label: "Set timeline time",
    category: "Timeline",
    args: [
      { type: "scene", label: "Scene", defaultValue: "Scene1" },
      { type: "raw", label: "Time (sec)", defaultValue: "0" }
    ],
    build: (args) => `${args[0]}.Timeline.time(${args[1]})`
  },

  // PLAY RANGE
  "PlayTimelinePart": {
    label: "Play timeline part",
    category: "Timeline",
    args: [
      { type: "scene", label: "Scene", defaultValue: "Scene1" },
      { type: "raw", label: "Start", defaultValue: "0" },
      { type: "raw", label: "End", defaultValue: "2" }
    ],
    build: (args) =>
      `${args[0]}.Timeline.pause(${args[1]}); ${args[0]}.Timeline.tweenTo(${args[2]})`
  },

  // RESTART
  "RestartTimeline": {
    label: "Restart timeline",
    category: "Timeline",
    args: [
      { type: "scene", label: "Scene", defaultValue: "Scene1" }
    ],
    build: (args) => `${args[0]}.Timeline.restart()`
  },

  // REVERSE
  "ReverseTimeline": {
    label: "Reverse timeline",
    category: "Timeline",
    args: [
      { type: "scene", label: "Scene", defaultValue: "Scene1" }
    ],
    build: (args) => `${args[0]}.Timeline.reverse()`
  },





};











