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