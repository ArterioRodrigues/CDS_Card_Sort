let lists = document.getElementsByClassName("list")

let d0 = document.getElementById("d0")
let d1 = document.getElementById("d1")
let d2 = document.getElementById("d2")
let d3 = document.getElementById("d3")
let d4 = document.getElementById("d4")

boxs = [d0, d1, d2, d3, d4]


var start = function() { 
    for(list of lists){
        list.addEventListener("dragstart", function(e){
            let selected = e.target;
            
            d0.addEventListener("dragover", function(e){
                e.preventDefault();
            })

            d0.addEventListener("drop", function(e){
                d0.appendChild(selected);
                selected = null;
            })

            d1.addEventListener("dragover", function(e){
                e.preventDefault();
            })

            d1.addEventListener("drop", function(e){
                d1.appendChild(selected);
                selected = null;
            })

            d2.addEventListener("dragover", function(e){
                e.preventDefault();
            })

            d2.addEventListener("drop", function(e){
                d2.appendChild(selected);
                selected = null;
            })

            d3.addEventListener("dragover", function(e){
                e.preventDefault();
            })

            d3.addEventListener("drop", function(e){
                d3.appendChild(selected);
                selected = null;
            })

            d4.addEventListener("dragover", function(e){
                e.preventDefault();
            })

            d4.addEventListener("drop", function(e){
                d4.appendChild(selected);
                selected = null;
            })
        })
    }
}

start()
///////////////////////////////////////////////////////////
var question_num = 5

var question = 
    `<div class = "list" draggable= "true"> 
            <img src="./assets/drag_icon.png" draggable="false">List Item 1
        </div>

        <div class = "list" draggable= "true"> 
            <img src="./assets/drag_icon.png" draggable="false">List Item 2
        </div>

        <div class = "list" draggable= "true"> 
            <img src="./assets/drag_icon.png" draggable="false">List Item 3
        </div>

        <div class = "list" draggable= "true"> 
            <img src="./assets/drag_icon.png" draggable="false">List Item 4
        </div>

        <div class = "list" draggable= "true"> 
            <img src="./assets/drag_icon.png" draggable="false">List Item 5
        </div>
    
        `


// Select the node that will be observed for mutations
const targetNode = document.getElementById("hand");
const counter = document.getElementById("counter")

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
      if (targetNode.children.length == 1){
        if(question_num == 20){
             alert('Finished')
        }
        else {
            targetNode.innerHTML += question;

            counter.innerHTML += String(question_num);

            question_num += 5
            start()
        }
      }
    } 
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

