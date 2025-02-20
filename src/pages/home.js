import { forEach } from "neo-async";
import { projectModule } from "../app";

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

    const cards = document.createElement("div");
    cards.classList.add("cards");
    main.appendChild(cards);

    function createNewProject(){
        const createdialog = document.querySelector("#createDialog");
        const confirmButtonCreate = document.querySelector("#confirm");
        const projectNameInput = document.querySelector("#project-name");

        createButton.addEventListener("click",()=>{
            createdialog.showModal()
        })
        confirmButtonCreate.addEventListener("click",(e)=>{
            // const projectName = projectNameInput.value;
            projectModule.createProject(projectNameInput.value);
            projectNameInput.value = "";
            createdialog.close()
            createNewProjectList();
        })
    }

    function createNewProjectList(){
        let listProjects = projectModule.getProjects();
        cards.innerHTML = ""
        Object.keys(listProjects).forEach((element)=>{
            console.log(element)
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerText = element;
            cards.appendChild(card)
        })
    }

    return { createNewProject };
})();



export {homeElements};