const openModulbtn = document.querySelectorAll("[data-modul-target]");
const closeModulbtn = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

var editing = false;
var editedIndex = 0;

openModulbtn.forEach((button) => {
  button.addEventListener("click", () => {
    const modul = document.querySelector(button.dataset.modulTarget);
    openModul(modul);
    document.getElementById("error").innerHTML = "";
  });
});

closeModulbtn.forEach((button) => {
  // const modul = button.closest('.modul')
  button.addEventListener("click", () => {
    // OR
    const modul = document.querySelector(".modul");
    closeModul(modul);
    document.querySelector(".count").innerHTML = "";
  });
});

function openModul(modul) {
  if (modul == null) return;
  modul.classList.add("active");
  overlay.classList.add("active");
}

function closeModul(modul) {
  if (modul == null) return;
  modul.classList.remove("active");
  overlay.classList.remove("active");
}

function abtNote() {
  var abtnot = document.querySelector(".abt-note");
  abtnot.style.left = "3%";
  abtnot.style.top = "41%";
}
function abtN() {
  var abtnot = document.querySelector(".abt-note");
  abtnot.style.top = "2%";
  abtnot.style.left = "60%";
}

const add = document.getElementById("save-btn");
const addtitle = document.getElementById("note-title");
const addtxt = document.getElementById("note-text");

add.addEventListener("click", (e) => {
  // dateSet
  e.preventDefault();
  document.querySelector(".close-button").style.visibility = "visible";
  if (addtitle.value == "") {
    document.getElementById("error").innerHTML = "Title field cannot be empty";
  } 
  else if (addtxt.value == "") { 
    document.getElementById("error").innerHTML = "Note field cannot be empty";
  }
   else {
    modul.classList.remove("active");
    overlay.classList.remove("active");
    // document.querySelector(".marq").innerHTML = "Start New Note";
    document.querySelector(".count").innerHTML = "";
    let myObj = {
     
      Top: {
       
        Title: addtitle.value,
        Dat: new Date().toLocaleString(),
        dSet: "ss",
      },
      text: addtxt.value,
    };
    return noteConstructor(myObj);
  }
});

const deli = document.querySelector(".delit");

function noteConstructor(note) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  if (editing) {
    editing = false;
    notesObj[editedIndex] = note;
  } else {
      notesObj.push(note);
  }
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addtitle.value = "";
  addtxt.value = "";

  return showNotes(); //reload notes
}

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let word = "";

  notesObj.forEach((iteem, index) => {
    
   
   
      word += `<div class="note">
        <div><strong>Last Updated: ${iteem.Top.Dat}</strong></div>
        <div class = "note-top"><i class = "fa fa-heart"></i></div>
        <h3 class="title">${iteem.Top.Title}</h3>
        <div class="txt">${iteem.text}</div>
        <div class="butt">
            <button class="edi" id = "${index}"  onclick = "editNote(this.id)"><small><i class = "fa fa-edit"></i></small> Edit</button>
            <button class = "del" id = "${index}"  onclick = "delNote(this.id)"><small><i class = "fa fa-trash"></i></small> Delete</button>
        </div>  
            </div>`;
          
    deli.innerHTML = `
        <h4>Do you really want delete <i> this? </i></h4>
        <div>
        <button onClick = "canc()"><i class = "fa fa-times"></i> Cancel</button>
        <button  class="delee" id = "${index}" onclick = "delNote(this.id)"><i class = "fa fa-trash"></i> Delete</button>  
        </div>
        `;
    // console.log(`${index}. ${iteem.title.mainTitle}`)
  });

  let notErm = document.querySelector("#Mynote");

  if (notesObj.length != 0) {
    notErm.innerHTML = word;
    document.querySelector(".plus").style.visibility = "visible";
    document.getElementById("Mynote").style.display = "block";
    document.querySelector(".Note-bg").style.display = "none";
    abtN();
  } else {
    document.querySelector(".plus").style.visibility = "hidden";
    document.getElementById("Mynote").style.display = "none";
    document.querySelector(".Note-bg").style.display = "block";
    abtNote();
  }
}

//Deleting Note
function delNote(index) {
  deli.classList.add("active");
  overlay.classList.add("active");

  document.querySelector(".delee").addEventListener("click", () => {
    deli.classList.remove("active");
    overlay.classList.remove("active");

    let notes = localStorage.getItem("notes");

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    console.log(index);
  });
}

// Editing Note
function editNote(index) {
  console.log(index);
  editing = true;
  editedIndex = index;
  let notes = localStorage.getItem("notes");
  if (addtitle !== "" || addtxt !== "") {
    addtxt == "";
    addtitle == "";
  }

  if (addtitle == "" || addtxt == "") {
    document.getElementById("error").innerHTML = "All fields are not filled";
  }

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let note = notesObj[index];
  console.log(notesObj, note);
  addtitle.value = note.Top.Title;
  addtxt.value = note.text;

  console.log("The index is " + index);
  document.querySelector(".close-button").style.visibility = "hidden";
  document.getElementById("error").innerHTML = "";
  overlay.classList.add("active");
  modul.classList.add("active");

}
// this 
//  var jet = "Keyword"; 

//   this.jet = "Array";
//   console.log(jet);

function reload() {
  if (showNotes()) {
    window.addEventListener("load", () => {
      notErm.innerHTML = word;
    });
    // else{notErm.innerHTML.remove()}
  }
}

function canc() {
  deli.classList.remove("active");
  overlay.classList.remove("active");

  showNotes();
}

function clik() {
  document.getElementById("menu").style.width = "100%";
  document.getElementById("menu").style.height = "50px";
}

function back() {
  document.getElementById("menu").style.width = "0px";
  document.getElementById("menu").style.height = "0px";
  document.querySelector(".chev").classList.remove("active");
  // document.querySelector('.dropdown').classList.remove('active');
  var sho = document.getElementById("dialog");
  sho.style.top = "0";
  sho.style.opacity = "0";
}

function abtAp() {
  document.querySelector(".dropdown").classList.add("active");
  document.querySelector(".chev").classList.add("active");
}

function getMyDail() {}
// function showModal() {
//   Swal.fire({
//     title: "About App",
//     text: `MyNoteApp was built to improve transparency in the blossoming note taking space. 
//     With the unprecedented pace of innovation and cross-pollination happening in the note taking space.
//     Organize your thoughts visually and quickly add notes with one click. Easily find them again in seconds. `,
//     showCancelButton: true,
//     showConfirmButton: false,
//     allowOutsideClick: true,
//     cancelButtonText: 'Close'
//   });
// }
var getDail = new (function () {
  this.show = function (msg, callback) {
    var sho = document.getElementById("dialog");
    sho.style.top = "35%";
    sho.style.opacity = "1";
    sho.style.display = "block";
    this.callback = callback;
    modul.classList.remove("active");
  overlay.classList.remove("active");
  };

  this.okay = function () {
    this.callback();
    this.close();
  };
  this.close = function () {
    var sho = document.getElementById("dialog");
    sho.style.top = "0";
    sho.style.opacity = "0";
  };
})();

function che() {
  document.querySelector(".chev").classList.remove("active");
  document.querySelector(".dropdown").classList.remove("active");
}

addtxt.addEventListener("input", count);
var txtLenght = document.querySelector(".count");
function count() {
  txtLenght.innerHTML = addtxt.value.length;
}
reload();
