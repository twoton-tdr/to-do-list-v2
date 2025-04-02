import { format , isBefore, isEqual } from "date-fns";

if(!localStorage.getItem("projects")){
    localStorage.setItem("projects","{}");
}

let projects;

const projectModule = (function() {

    projects = JSON.parse(localStorage.getItem("projects"));

    const updateLocalStorage = function (){
        const temp = JSON.stringify(projects);
        localStorage.setItem("projects",temp);
    }

    const createProject = function (newProject){
        //creating a new project(todo group)
        projects[newProject] = [];
        updateLocalStorage();
    }

    const removeProject = function (projectName){
        delete projects[projectName];

        updateLocalStorage();

    }
    function getProjects(){
        projects = JSON.parse(localStorage.getItem("projects"));
        return projects;
    }

    function pushToProject(projectName,toDoName){
        //function to add new todo(to do group) to the projects array
        const temp = new toDoList(toDoName);
        projects[projectName].push(temp);
        updateLocalStorage(projects)
    }

    function removeToDo(projectName,toDoName){
        const index = projects[projectName].findIndex(x => x.name === toDoName);
        projects[projectName].splice(index,1);
        updateLocalStorage();
    }

    function updateListInProject(projectName,list){
        projects[projectName] = [];
        list.map((element)=>{
            projects[projectName].push(element);
        })
        updateLocalStorage();
    }
    function getListFromProject(projectName){
        projects = getProjects();
        return projects[projectName];
    }

    function setDesc(projectName,toDoName,desc){
        //function to set description of todolist
        let list;

        //searching for the specified to do
        projects[projectName].forEach(element => {
            if(element.name === toDoName){
                list = element;
            }
        });

        list.setDesc(desc)
        updateLocalStorage()
    }

    function setDate(projectName,toDoName,date){
        if(date == ""){
            date = new Date();
            console.log(date)
        }
        else{
            date = new Date(date);
        }
        
        date = format(date,"Pp");
        let event;
        //getting the the todo object from array
        projects[projectName].forEach(element => {
            if(element.name === toDoName){
                event = element;
            }
        });
        event.dueDate = date;
        updateLocalStorage();
    }
    function setPriority(projectName,toDoName,prior){
        let event;
        //getting the the todo object from array
        projects[projectName].forEach(element => {
            if(element.name === toDoName){
                event = element;
            }
        });
        event.priority = prior;
        updateLocalStorage();
    }

    function statusChange(status,projectName,toDoName){
        let event;
        projects[projectName].forEach(element => {
            if(element.name === toDoName){
                event = element;
            }
        });
        event.status = status;
        updateLocalStorage();
    }
    return { createProject , getProjects, removeProject , pushToProject , updateListInProject , 
        setDesc , setDate , statusChange , getListFromProject , setPriority , removeToDo};
})();


const groupLists = (function(){
    function getUpcomingList(projectName){
        const copyOfList = [...projects[projectName]];
        const expiredList = getExpiredList(projectName);
        const completedList = getCompletedList(projectName);

        
        //checking whether a completed event is present
        copyOfList.forEach(element => {
            completedList.forEach(completedElement => {
                if(element == completedElement){
                    const indexOfCompleted = copyOfList.indexOf(element)
                    copyOfList.splice(indexOfCompleted,1);
                }
            })
        })

        for(let i = copyOfList.length-1;i>=0;i--){
            expiredList.forEach(expiredElement => {
                if(copyOfList[i] == expiredElement){
                    copyOfList.splice(i,1);
                }
            })
        }
        copyOfList.sort(compareDates)

        function compareDates(a,b){
        
            if(isBefore(a.dueDate,b.dueDate)){
                return -1;
            }
            else if(isEqual(a.dueDate,b.dueDate)){
                if((a.priority === "high" && b.priority === "medium") || (a.priority === "high" && b.priority === "low") || (a.priority === "high" && b.priority === "high")){
                    return 1;
                }
                else if((b.priority === "high" && a.priority === "medium") || (b.priority === "high" && a.priority === "low") ){
                    return -1;
                }
            }
            else{
                return 1;
            }
    
        }
        console.log(copyOfList)
        return copyOfList;
    }

    function getCompletedList(projectName){
        let completedList = [];
        projects[projectName].forEach(element => {
            if(element.status === "Completed"){
                completedList.push(element)
            }
        })
        return completedList;
    }
    function getExpiredList(projectName){
        //fetches expired lists
        let currentDate = new Date();
        currentDate = format(currentDate,"Pp");
        let expiredList = [];

        projects[projectName].forEach(element => {
            if(element.status === "Completed"){
                return; //check for errors
            }
            if(isBefore(element.dueDate,currentDate)){
                expiredList.push(element)
            }
        })
        return expiredList;
    }
    return {getUpcomingList, getExpiredList, getCompletedList};
})();

class toDoList {
    constructor(name,desc,priority,dueDate,status){
        this.name = name;
        this.desc = desc;
        this.priority = priority;
        this.dueDate = dueDate;
        this.status = status;
    }
    setDesc(desc){
        this.desc = desc;
    }
    
}

export {projectModule,toDoList,groupLists}


