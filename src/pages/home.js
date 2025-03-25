import { projectModule } from "../app";
import { createToDo, todoElements } from "./todo";

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
        console.log("clicked")
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

    let flag = true; //flag for preventing from adding multiple event listeners 

    function createNewProjectList(){
        let listProjects = projectModule.getProjects();
        cards.innerHTML = ""
        Object.keys(listProjects).forEach((element)=>{
            console.log(element)
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerText = element;
            cards.appendChild(card);
        })
        cardClicked();
        flag = !flag; 
    }


    function cardClicked(status){
        
        const cards = document.querySelectorAll(".card");
        function clickEvent(e){
            // todocreateToDo(e.target.innerHTML)
            todoElements.createToDo(e.target.innerHTML)

        }
        if(status){
            cards.forEach((card)=>{
                card.addEventListener("click",clickEvent)
            })
        }
        else {
            cards.forEach((card)=>{
                card.removeEventListener("click",clickEvent);
            })
            cards.forEach((card)=>{
                card.addEventListener("click",clickEvent)
            })
        }

    }
    
    removeButton.addEventListener("click",removeProject);
    function removeProject(){
        console.log("clicked")
    }
    return { createNewProject, createNewProjectList };
})();


export {homeElements};