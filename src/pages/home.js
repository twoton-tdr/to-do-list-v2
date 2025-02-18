const content = document.querySelector(".content");

const homeElements = (function (){
    const sideBar = document.createElement("div");
    sideBar.classList.add("sidebar");
    content.appendChild(sideBar);

    const createButton = document.createElement("button");
    const removeButton = document.createElement("button");
    createButton.classList.add("create-project");
    removeButton.classList.add("remove-project");
    createButton.innerText = "Create Project";
    removeButton.innerText = "Remove Project"
    sideBar.appendChild(createButton);
    sideBar.appendChild(removeButton);

    const main = document.createElement("div");
    main.classList.add("main");
    content.appendChild(main)

    const mainHead = document.createElement("div");
    mainHead.classList.add("projects");
    main.appendChild(mainHead);
    mainHead.innerHTML = "My Projects";

    function createNewProject(){
        createButton.addEventListener("click",()=>{
            console.log("clicked")
        })
    }

    return { createNewProject };
})();



export {homeElements};