# 🎭 Learning Theater

**Learning Theater** is a property-based JavaScript engine and authoring environment for building interactive learning scenes.  
It combines a live **GUI editor**, a **trigger-based event system**, **timeline animation via GSAP**, and optional **SCORM 1.2 integration**, giving authors full control over both logic and presentation.

---

## ✨ Overview

Learning Theater is designed for creators who want the flexibility of custom scripting — without sacrificing usability.  
Scenes are built using **Actors**, which are JavaScript objects automatically mirrored to the DOM.  
A visual editor lets you modify properties, manage triggers, and preview interactions in real-time.

The system is modular: you can extend it with new **Conditions**, **Actions**, and **Property types** as needed.  
Learning Theater aims to provide a middle ground between commercial authoring tools like *Articulate Storyline* or *Adobe Captivate* and fully custom-coded e-learning experiences.

---

## 🧩 Core Concepts

### **Actors**
Actors are scene elements with properties that automatically sync with the DOM.  
For example, changing `Actor.X` immediately updates its position on screen.

Each Actor supports:
- Live property editing
- Boolean toggles (`Draggable`, `ShowOrigin`, etc.)
- Parent/child relationships
- Dynamic updates through scripting or GUI

---

### **Triggers**
A flexible event system where each trigger is defined by:
- **Event** (what happens)
- **Conditions** (when it happens)
- **Actions** (what to do)

Conditions and actions are defined as modular objects with argument definitions and a `build()` function that generates executable code.

```js
Conditions["SCORM Status is"] = {
  label: "SCORM status is",
  category: "SCORM",
  args: [
    { type: "dropdown", label: "Status", options: ["passed", "completed", "failed"] }
  ],
  build: (args) => `GetStatus() === "${args[0]}"`
};
```

### **Editor**

The visual editor provides:

Live property editing and staged updates (applyStagedEdit)

Dropdowns, toggles, and number inputs for each property type

Trigger creation with categorized condition/action lists

An optional code editor for global scripts like General, Build, SceneStart, etc.

---

### **Timeline Animation (GSAP)**
Learning Theater includes a timeline-based animation editor powered by **GSAP**.  
You can animate any Actor property visually, chain keyframes, and play or preview animations directly in the scene editor.

Animations can also be **exported for use inside Articulate Storyline**.  
When embedded in a Storyline web object, the animation automatically syncs to Storyline’s **playhead (seekbar)** — meaning you can control HTML motion directly from Storyline’s timeline.

This makes Learning Theater a powerful **HTML animation companion** for existing e-learning workflows, bridging the gap between timeline-driven authoring tools and fully custom JavaScript projects.

---

### **SCORM 1.2 Integration**

Optional SCORM integration (via pipwerks.SCORM) provides:

Reading and writing of LMS data

Manual control of variables and objectives

Safe getters and setters to prevent runtime errors

Custom handling of cmi.comments and lesson_status

Unlike traditional tools, Learning Theater gives you full control over what data is saved and when.


### **🚀 Example Workflow**

Create Actors in the editor or via code inside Build()

Define Triggers to handle interactivity

Add animations via the GSAP timeline editor

Connect to an LMS via SCORM (optional)

Export your project as a standalone SCORM package or HTML module

### **💡 Design Philosophy**

“Full control, minimal friction.”

Learning Theater doesn’t hide the logic behind wizards — it exposes it.
Everything the editor generates can be read, modified, and exported as clean, human-readable JavaScript.

You decide:

When and how to save SCORM data

How properties are updated

What logic defines your interactivity

## 🎬 Using Learning Theater with Articulate Storyline

One of Learning Theater’s most unique features is its ability to **sync animations directly with Articulate Storyline’s playhead**.  
This allows you to build HTML-based motion and interactivity that perfectly follows Storyline’s seekbar — ideal for creating rich, timeline-driven animations that remain fully integrated in a traditional e-learning workflow.

### 🧭 How to set it up

1. **Enable Playhead Sync**
   - In Learning Theater, open **Settings** and check the option  
     **“Follow Storyline playhead”**.

2. **Export the HTML animation**
   - Click **Save HTML** and save your project as `index.html`  
     in the same folder as your Learning Theater project.

3. **Add it to Storyline**
   - In Articulate Storyline, insert a **Web Object** and point it to  
     the folder containing your `index.html`.

4. **Match the timeline length**
   - Make sure Storyline’s **slide timeline** has the **same duration** as your animation.

5. **Keep it visible**
   - Ensure the **Web Object** stays visible for the entire slide duration.

Once configured, Learning Theater will automatically track Storyline’s playhead position and sync all animations accordingly — providing seamless integration between **Storyline’s timeline** and your **custom HTML animation**.

---

✅ *Tip:* You can combine this setup with the GSAP timeline editor and the Trigger system to create interactive, synchronized experiences that go far beyond what Storyline’s built-in motion paths can achieve.

