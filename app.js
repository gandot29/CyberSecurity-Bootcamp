/* ===================================
   Cybersecurity Bootcamp Portal v1.0
=================================== */

// ---------- Default Values ----------
if (!localStorage.getItem("xp")) {
    localStorage.setItem("xp", 100);
}

if (!localStorage.getItem("level")) {
    localStorage.setItem("level", 1);
}

if (!localStorage.getItem("progress")) {
    localStorage.setItem("progress", 4);
}

if (!localStorage.getItem("streak")) {
    localStorage.setItem("streak", 1);
}

// ---------- Load Dashboard ----------
document.addEventListener("DOMContentLoaded", function () {

    updateCards();

    drawChart();

});

// ---------- Update Cards ----------
function updateCards() {

    const cards = document.querySelectorAll(".card h2");

    if(cards.length < 4) return;

    cards[0].innerText =
        localStorage.getItem("progress") + "%";

    cards[1].innerText =
        localStorage.getItem("xp") + " XP";

    cards[2].innerText =
        "Level " + localStorage.getItem("level");

    cards[3].innerText =
        localStorage.getItem("streak") + " Day 🔥";

}

// ---------- Progress Chart ----------
function drawChart(){

    const canvas=document.getElementById("progressChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:'doughnut',

        data:{

            labels:["Completed","Remaining"],

            datasets:[{

                data:[
                    Number(localStorage.getItem("progress")),
                    100-Number(localStorage.getItem("progress"))
                ],

                backgroundColor:[
                    "#38bdf8",
                    "#1e293b"
                ],

                borderWidth:0

            }]

        },

        options:{

            plugins:{

                legend:{
                    labels:{
                        color:"white"
                    }
                }

            }

        }

    });

}

// ---------- XP ----------
function addXP(points){

    let xp =
        Number(localStorage.getItem("xp"));

    xp += points;

    localStorage.setItem("xp",xp);

    levelSystem(xp);

    updateCards();

}

// ---------- Level ----------
function levelSystem(xp){

    let level = 1;

    if(xp>=500) level=2;

    if(xp>=1000) level=3;

    if(xp>=2000) level=4;

    if(xp>=4000) level=5;

    if(xp>=7000) level=6;

    localStorage.setItem("level",level);

}

// ---------- Complete Lesson ----------
function completeLesson(){

    let progress =
        Number(localStorage.getItem("progress"));

    progress += 3;

    if(progress>100)
        progress=100;

    localStorage.setItem("progress",progress);

    addXP(100);

    alert("Lesson Completed! +100 XP");

    location.reload();

}

// ---------- Reset ----------
function resetProgress(){

    if(confirm("Reset all progress?")){

        localStorage.clear();

        location.reload();

    }

}