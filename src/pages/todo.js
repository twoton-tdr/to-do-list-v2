import { groupLists, projectModule } from "../app";
import { homeElements } from "./home";
import { parse , format } from "date-fns";

const content = document.querySelector(".content");

const todoElements = (function(){

    function createToDo(projectName){
        
        content.innerHTML = "";
        const sideBar = document.createElement("div");
        sideBar.classList.add("sidebar");
        content.appendChild(sideBar);
    
        const createButton = document.createElement("button");
        const homeButton = document.createElement("button");
        createButton.classList.add("create-project");
        homeButton.classList.add("remove-project");
        createButton.innerText = "Create TO-DO";
        homeButton.innerText = "Home";
        sideBar.appendChild(homeButton);
        sideBar.appendChild(createButton);
        

        homeButton.addEventListener("click",goHome);
        function goHome(){
            console.log("clicked")
            location.reload(); //just a muri vidhya to avoid fecking rewriting the whole home.js
            //if it work dont touch it logic lol
        }
        const classificationList = document.createElement('div');
        classificationList.classList.add('classification-list');

        const classifications = ['All','Upcoming', 'Completed', 'Expired'];

        classifications.forEach(text => {
            const button = document.createElement('button');
            button.classList.add('classification');
            button.textContent = text;
            classificationList.appendChild(button);
            button.addEventListener("click",handleClassificationButtonClick);
        });

        function handleClassificationButtonClick(e){
            console.log(e.target.innerHTML);
            const temp = e.target.innerHTML;
            if(temp == "Upcoming"){
                const tempList = groupLists.getUpcomingList(projectName);
                console.log(tempList)
                createCards(false,tempList);
            }
            else if(temp == "Completed"){
                const tempList = groupLists.getCompletedList(projectName);
                createCards(false,tempList);
            }
            else if(temp == "Expired"){
                const tempList = groupLists.getExpiredList(projectName);
                createCards(false,tempList);
            }
            else if(temp == "All"){
                const tempList = projectModule.getListFromProject(projectName);
                console.log(tempList)
                createCards(false,tempList)
            }
        }
        sideBar.appendChild(classificationList);
    
        const main = document.createElement("div");
        main.classList.add("main");
        content.appendChild(main)
    
        const mainHead = document.createElement("div");
        mainHead.classList.add("projects");
        main.appendChild(mainHead);
        mainHead.innerHTML = "To Do List";
    
        const cards = document.createElement("div");
        cards.classList.add("cards");
        main.appendChild(cards);
        createCards();
        createButton.addEventListener("click",()=>{
            createNewToDo(projectName);
        })   

        
        function createCards(flag = true,listToDo = ""){
            // console.log(listToDo)
            //to create the list of all elements
            if(flag){
                //this runs by default 
                //this is done to avoid rewritting classify list 
                listToDo = projectModule.getListFromProject(projectName);
            }
            cards.innerHTML = "";
            listToDo.forEach((element)=>{
                const card = document.createElement("div");
                card.classList.add("card");
                card.classList.add("todo-card")

                const todoname = document.createElement("span");
                todoname.classList.add("todoname");
                todoname.innerText = element.name;
                card.appendChild(todoname);

                const dueDate = document.createElement("span")
                dueDate.classList.add("due-date");
                dueDate.innerText = element.dueDate;
                card.appendChild(dueDate);
                
                const listPriority = document.createElement("span")
                listPriority.classList.add("priority");
                listPriority.innerText = element.priority;
                card.appendChild(listPriority);

                const listStatus = document.createElement("span");
                listStatus.classList.add("status");
                listStatus.innerText = element.status;
                card.appendChild(listStatus)

                cards.appendChild(card);

                todoname.addEventListener("click",handleClick)

                function handleClick(e){
                    cardDialog(e,projectName)
                }
            })
        }

        function cardDialog(e,projectName){
            const eventEditor = document.querySelector("#showEvent");

            const toDoName = e.target.innerHTML;
            let listDetails;
            
            let listToDo = projectModule.getListFromProject(projectName);
            listToDo.map((element)=>{
                
                if(element.name == toDoName){
                    // console.log(element)
                    listDetails = element;
                }
            })

            
            const TODONAME = document.querySelector("#todo-name-event");
            TODONAME.value = toDoName;

            const DESC = document.querySelector("#desc-event");
            DESC.value = listDetails.desc;

            const DATE = document.querySelector("#date-event");
            //since date is stored in formated form "Pp" it is not in the format
            //to be displayed in the input type = "date"
            //so here date is reverted back to that format
            const tempDate = parse(listDetails.dueDate,"Pp",new Date());
            const dueDate = format(tempDate,"yyyy-MM-dd'T'HH:mm")
            DATE.value = dueDate;

            const PRIORITY = document.querySelector("#priority-event");
            PRIORITY.value = listDetails.priority;
            eventEditor.showModal();
            
            const confirmUpdateButton = document.querySelector("#confirmUpdate");
            confirmUpdateButton.addEventListener("click",confirmChanges);

            function confirmChanges(){
                projectModule.setDate(projectName,toDoName,DATE.value);
                projectModule.setDesc(projectName,toDoName,DESC.value);
                projectModule.setPriority(projectName,toDoName,PRIORITY.value);
                createCards();
                eventEditor.close()
                confirmUpdateButton.removeEventListener("click",confirmChanges);//
            }

            const statusCompletedButton = document.querySelector("#statusCompleted");
            statusCompletedButton.addEventListener("click",handleStatusChange);
            function handleStatusChange(){
                projectModule.statusChange("Completed",projectName,toDoName);
                createCards();
                statusCompletedButton.removeEventListener("click",handleStatusChange);
                eventEditor.close();
            }


            const removeTodoButton = document.querySelector("#RemoveToDo");
            removeTodoButton.addEventListener("click",handleRemove);
            function handleRemove(){
                projectModule.removeToDo(projectName,toDoName);
                createCards();
                eventEditor.close();
                removeTodoButton.removeEventListener("click",handleRemove);
            }
        }
        

        function createNewToDo(projectName){
            const toDoDialog = document.querySelector("#ToDoDialog"); 
            
            const confirmButton = document.querySelector("#confirmToDo");
            const todoName = document.querySelector("#todo-name");
            const description = document.querySelector("#desc");
            const date = document.querySelector("#date");
            const priority = document.querySelector("#priority");
            toDoDialog.showModal()
    
            confirmButton.addEventListener("click",confirmClicked)

            function confirmClicked(){
                projectModule.pushToProject(projectName,todoName.value);
                projectModule.setDesc(projectName,todoName.value,description.value);
                projectModule.setDate(projectName,todoName.value,date.value);
                projectModule.setPriority(projectName,todoName.value,priority.value)
                projectModule.statusChange("Ongoing",projectName,todoName.value)
                toDoDialog.close();
                // console.log(projectModule.getListFromProject(projectName))
                createCards()
                confirmButton.removeEventListener("click",confirmClicked)
            }
        }

        
    }


    return {createToDo}
})()





export {todoElements}