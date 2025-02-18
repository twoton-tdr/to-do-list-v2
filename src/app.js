import { format , isBefore, isEqual } from "date-fns";

let projects = {}

const projectModule = (function() {

    const createProject = function (newProject){
        //creating a new project(todo group)
        projects[newProject] = [];
    }

    function pushToProject(projectName,toDoName){
        //function to add new project(to do group) to the projects array
        const temp = new toDoList(toDoName);
        projects[projectName].push(temp)

    }
    function getProjects(){
        // console.log(projects)
        return projects;
    }

    function getListFromProject(projectName){
        return projects[projectName];
    }

    function setDesc(projectName,toDoName,desc){
        //function to set description of todolist
        //---update this function after ui is done ---------
        let list;

        //searching for the specified to do
        projects[projectName].forEach(element => {
            if(element.name === toDoName){
                list = element;
            }
        });

        list.setDesc(desc)
 
    }

    function setDate(date,projectName,toDoName){
        date = new Date(date);
        date = format(date,"Pp");
        let event;
        //getting the the todo object from array
        projects[projectName].forEach(element => {
            if(element.name === toDoName){
                event = element;
            }
        });
        return event.dueDate = date;
    }

    function statusChange(status,projectName,toDoName){
        let event;
        projects[projectName].forEach(element => {
            if(element.name === toDoName){
                event = element;
            }
        });
        return event.status = status;
    }
    return { createProject , getProjects , pushToProject , setDesc , setDate , statusChange , getListFromProject};
})();


const groupLists = (function(){
    function getUpcomingList(projectName){
        const copyOfList = projects[projectName];
        const expiredList = getExpiredList(projectName);
        const completedList = getCompletedList(projectName);
        console.log(completedList);
        console.log(expiredList)
        
        //checking whether a completed event is present
        copyOfList.forEach(element => {
            completedList.forEach(completedElement => {
                if(element == completedElement){
                    const indexOfCompleted = copyOfList.indexOf(element)
                    copyOfList.splice(indexOfCompleted,1);
                }
            })
        })

        //checking whether an expired element is present 
        copyOfList.forEach(element => {
            expiredList.forEach(expiredElement => {
                if(element == expiredElement){
                    const indexOfExpired = copyOfList.indexOf(element)
                    copyOfList.splice(indexOfExpired,1);

                }
            })
        })
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
    return {getUpcomingList, getExpiredList};
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


