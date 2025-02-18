import { groupLists, projectModule } from "./app";
import { toDoList} from "./app";
import './styles/style.css'
import { format } from "date-fns";
import { homeElements } from "./pages/home";



projectModule.createProject("College");
projectModule.createProject("Home");
homeElements.createNewProject();

projectModule.pushToProject("Home","Cook")
projectModule.pushToProject("Home","Clean")
projectModule.pushToProject("Home","Car wash")
projectModule.pushToProject("College","Maths Homework")
projectModule.pushToProject("College","Chemistry Homework")
projectModule.pushToProject("College","Health Work Excerscie")
projectModule.pushToProject("College","IPR micro")
projectModule.pushToProject("College","FOC IT record")
projectModule.setDesc("Home","Cook","pizza mari")

// const dateTest = new Date(2025,11,24);
// console.log(dateTest)
// console.log(format(dateTest,"Pp"))

projectModule.setDate("1994,11,24","College","Chemistry Homework")
projectModule.setDate("1994,10,24","College","FOC IT record")
projectModule.setDate("2025,11,24","College","Health Work Excerscie")
projectModule.setDate("2027,11,24","College","IPR micro")
projectModule.setDate("2026,11,19","College","Maths Homework")
projectModule.statusChange("Completed","College","Chemistry Homework")
projectModule.statusChange("Completed","College","Maths Homework")
console.log(projectModule.getProjects())
console.log(projectModule.getListFromProject("College"))

groupLists.getExpiredList("College")
groupLists.getUpcomingList("College")