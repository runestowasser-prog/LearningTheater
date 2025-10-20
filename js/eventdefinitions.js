// 🛠️ Funktionsdefinitioner til conditions
const ConditionFunctions = {
 
 "GetVolume": {
    label: "Get Volume of media",
	category:"Media",
    args: [
      { type: "actor", label: "media Actor" },
      { type: "raw", label: "time", defaultValue:"0" }

    ],
    build: (args) => `GetVolume(${args[0]},${args[1]})`
  },

 "GetDuration": {
    label: "Get duration of media",
	category:"Media",

    args: [
      { type: "actor", label: "Actor" },
    ],
    build: (args) => `GetDuration(${args[0]})`
  },

 "GetCurrentTime": {
    label: "Get current time of media",
	category:"Media",

    args: [
      { type: "actor", label: "Actor" },
    ],
    build: (args) => `GetCurrentTime(${args[0]})`
  },

 


 "ActorPosition": {
    label: "Get Actor position",
	category:"Actor",

    args: [ 
	{ type: "actor", label: "Actor ", defaultValue: "Actors[0]" },
	{ type: "xory", label: "", defaultValue: "X"},
	{ type: "compare", label: "", defaultValue: "=="},
       	{ type: "number", label: "", defaultValue: "0"},
	
    ],
    build: (args) => `${args[0]}.${args[1]} ${args[2]} ${args[3]}`
  },


  "GetProperty": {
    label: "Get a property from an actor",
	category:"Actor",

    args: [
      { type: "actor", label: "Actor",defaultValue:"Actors[0]" },
      { type: "raw", label: "Property", defaultValue:"X" }
    ],
    build: (args) => `${args[0]}.${args[1]}`
  },

"Collision": {
  label: "Collision between two actors (with optional side filtering and motion offset)",
  category: "Actor",
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
    label: "Scene",
	category:"Scenes",

    args: [
      { type: "scene", label: "Scene" },
    ],
    build: (args) => `GetScene()==${args[0]}`,
	summary: (args) => `Current Scene is ${args[0]}`
  },

    "GatherEnsemble": {
  label: "Gather ensemble by",
	category:"Ensemble",

  args: [
	{ type: "raw", label: "Ensemble name" },
    { type: "string", label: "Property name" },
    { type: "raw", label: "Property value" }
  ],
  build: (args) => `${args[0]} = Actors.filter(a => a["${args[1]}"] == "${args[2]}")`
  },


  "filterEnsemble": {
  label: "Filter ensemble",
	category:"Ensemble",

  args: [
    { type: "raw", label: "Ensemble name" },
    { type: "string", label: "Property name" },
    { type: "compare", label: "",defaultValue:"=="},
    { type: "raw", label: "Property value" }
  ],
  build: (args) => `${args[0]} = ${args[0]}.filter(a => a["${args[1]}"] ${args[2]} "${args[3]}")`
  },



 "ActorEnsembleCollision": {
  label: "Actor collides with any in Ensemble",
  category: "Ensemble",
  args: [
    { type: "actor", label: "Actor" },
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
      return `Ensemble = Ensemble.filter(a => Collision(${actor}, a, ${modX}, ${modY}))`;
    }

    const checks = [];
    if (top === true || top === "true") checks.push(`Collision(${actor}, a, ${modX}, ${modY}).side === "top"`);
    if (bottom === true || bottom === "true") checks.push(`Collision(${actor}, a, ${modX}, ${modY}).side === "bottom"`);
    if (left === true || left === "true") checks.push(`Collision(${actor}, a, ${modX}, ${modY}).side === "left"`);
    if (right === true || right === "true") checks.push(`Collision(${actor}, a, ${modX}, ${modY}).side === "right"`);

    return `Ensemble = Ensemble.filter(a => Collision(${actor}, a, ${modX}, ${modY}) && (${checks.join(" || ")}))`;
  }
},


"EnsemblesCollide": {
  label: "Ensemble collides with any in 2nd Ensemble",
  category: "Ensemble",
  args: [
    { type: "raw", label: "Ensemble" },
    { type: "raw", label: "2nd Ensemble" },
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

    return `${ensemble} = ${ensemble}.filter(a => ${ensemble2}.some(b => Collision(a,b,${modX},${modY}) && (${checks.join(" || ")})))`;
  }
},





  "EnsembleNotEmpty":{
  label: "Ensemble is NOT empty",
  args:[
  { type: "raw", label: "Ensemble" },
  ],
	category:"Ensemble",

  build: (args) => `${args[0]}.length>0`
  },
  
    "EnsembleEmpty":{
  label: "Ensemble is empty",
  args:[
  { type: "raw", label: "Ensemble" },
  ],
	category:"Ensemble",

  build: (args) => `${args[0]}.length==0`
  },
  
  
 

  "GetSCORMStatus": {
    label: "Get SCORM lesson status",
    category: "SCORM",
    args: [],
    build: (args) => `GetStatus()`
  },

  "CheckSCORMStatus": {
    label: "Check SCORM status equals",
    category: "SCORM",
    args: [
      { type: "text", label: "Status (completed, incomplete, passed, failed)" }
    ],
    build: (args) => `GetStatus() == "${args[0]}"`
  },

  "GetSCORMLocation": {
    label: "Get SCORM lesson location",
    category: "SCORM",
    args: [],
    build: (args) => `GetLocation()`
  },

  "CheckSCORMScoreAtLeast": {
    label: "Check SCORM score is at least",
    category: "SCORM",
    args: [
      { type: "number", label: "Minimum score" }
    ],
    build: (args) => `GetScore().raw >= ${args[0]}`
  },

  // === OBJECTIVE CONDITIONS ===

  "GetSCORMObjectiveStatus": {
    label: "Get SCORM objective status",
    category: "SCORM",
    args: [
      { type: "text", label: "Objective ID" }
    ],
    build: (args) => `SCORMObjectiveManager.getStatus("${args[0]}")`
  },

  "CheckSCORMObjectiveStatus": {
    label: "Check SCORM objective status equals",
    category: "SCORM",
    args: [
      { type: "text", label: "Objective ID" },
      { type: "text", label: "Status (completed, passed, failed, etc.)" }
    ],
    build: (args) => `SCORMObjectiveManager.getStatus("${args[0]}") == "${args[1]}"`
  },

  "CheckSCORMObjectiveExists": {
    label: "Check if SCORM objective exists",
    category: "SCORM",
    args: [
      { type: "text", label: "Objective ID" }
    ],
    build: (args) => `SCORMObjectiveManager.exists("${args[0]}")`
  },

  "CheckSCORMObjectiveScoreAtLeast": {
    label: "Check SCORM objective score is at least",
    category: "SCORM",
    args: [
      { type: "text", label: "Objective ID" },
      { type: "number", label: "Minimum score" }
    ],
    build: (args) => `SCORMObjectiveManager.getScore("${args[0]}") >= ${args[1]}`
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
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

    args: [],
    build: () => `NextScene()`
  },
    "PreviousScene": {
    label: "Go to previous scene",
	category:"Scene",

    args: [],
    build: () => `PrevScene()`
  },
  "GotoScene": {
    label: "Go to scene",
	category:"Scene",

    args: [
    { type: "scene", label: "Scene",  defaultValue:"Scenes[0]" },
   ],
    build: (args) => `GotoScene(${args[0]})`
  },
    "Fade Out": {
    label: "Fade out actor",
	category:"Actor",

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
      { type: "string", label: "Property", defaultValue:"0"}
    ],
    build: (args) => `${args[0]}.${args[1]}=-${args[0]}.${args[1]}`
  },
  "SetEnsembleProperty": {
  label: "Set property on Ensemble",
	category:"Ensemble",

  args: [
	{ type: "raw", label: "Ensemble name"},
    { type: "string", label: "Target property", defaultValue:"X" },
    { type: "adjust", label: "Adjustment", defaultValue:"=" },
    { type: "raw", label: "New value" }
  ],
  build: (args) => `${args[0]}.forEach(a => a["${args[1]}"] ${args[2]} ${args[3]})`
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
      { type: "raw", label: "Property", defaultValue:"X" },
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



  "SetSCORMStatus": {
    label: "Set SCORM lesson status",
    category: "SCORM",
    args: [
      { type: "text", label: "Status (completed, incomplete, passed, failed)" }
    ],
    build: (args) => `SetStatus("${args[0]}")`
  },

  "SetSCORMLocation": {
    label: "Set SCORM lesson location",
    category: "SCORM",
    args: [
      { type: "text", label: "Location (scene/page name)" }
    ],
    build: (args) => `SetLocation("${args[0]}")`
  },

  "SetSCORMScore": {
    label: "Set SCORM score",
    category: "SCORM",
    args: [
      { type: "number", label: "Score" },
      { type: "number", label: "Min (optional)" },
      { type: "number", label: "Max (optional)" }
    ],
    build: (args) => `SetScore(${args[0]}, ${args[1] || 0}, ${args[2] || 100})`
  },

  "SaveSCORM": {
    label: "Save SCORM data",
    category: "SCORM",
    args: [],
    build: () => `pipwerks.SCORM.save()`
  },

  "CompleteSCORMCourse": {
    label: "Complete SCORM course",
    category: "SCORM",
    args: [],
    build: () => `CompleteCourse()`
  },

  "ExitSCORMCourse": {
    label: "Exit SCORM course",
    category: "SCORM",
    args: [],
    build: () => `ExitCourse()`
  },

  // === OBJECTIVE ACTIONS ===

  "SetSCORMObjectiveStatus": {
    label: "Set SCORM objective status",
    category: "SCORM",
    args: [
      { type: "text", label: "Objective ID" },
      { type: "text", label: "Status (completed, passed, failed, etc.)" }
    ],
    build: (args) => `SCORMObjectiveManager.setStatus("${args[0]}", "${args[1]}")`
  },

  "SetSCORMObjectiveScore": {
    label: "Set SCORM objective score",
    category: "SCORM",
    args: [
      { type: "text", label: "Objective ID" },
      { type: "number", label: "Score" }
    ],
    build: (args) => `SCORMObjectiveManager.setScore("${args[0]}", ${args[1]})`
  }



  
  
  



};