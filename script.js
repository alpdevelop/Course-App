class Course{
    constructor(title, instructor, image){
        this.courseId = Math.floor(Math.random()*10000);
        this.title = title;
        this.image = image;
        this.instructor = instructor;
    }
}

class UI{
    addCourseToList(course){
        const list = document.getElementById("course-list");
        var html = `
                <tr>
                    <td><img src="img/${course.image}"</td>
                    <td>${course.title}</td>
                    <td>${course.instructor}</td>
                    <td><a href="#" data-id-course="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
                </tr>
                    `
    list.innerHTML += html;
    }

    clearContols(){
    document.getElementById('title').value = "";
    document.getElementById('instructor').value = "";
    document.getElementById('image').value = "";
    }

    showAlert(message, alertName){
    var alert = ` <div class="alert alert-${alertName}">${message}</div> `
    const row = document.querySelector(".row");
    row.insertAdjacentHTML("beforeBegin", alert)

    setTimeout(() => {
        document.querySelector(".alert").remove();
    },1000)

    }

    deleteCourse(element){
        if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
        return true;
    }
    }


}

class Storage{
     static getCourses(){
        let courses ;

        if(localStorage.getItem("courses")===null){
            courses = [];
        }else{
            courses = JSON.parse(localStorage.getItem("courses"));
        }
        return courses
    }
    static displayCourses(){
        const courses = Storage.getCourses();

        courses.forEach(course => {
            const ui = new UI;
            ui.addCourseToList(course);
        });
    }

    static addCourse(course){
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses' , JSON.stringify(courses));
    }

    static deleteCourse(element){
        if(element.classList.contains('delete')){
            const id = element.getAttribute('data-id-course');
            
            const courses = Storage.getCourses();

            courses.forEach((course,index) =>{
                if(course.courseId == id){
                    courses.splice(index,1);
                }
            })
            localStorage.setItem("courses" , JSON.stringify(courses));
        }
    }
}

document.addEventListener("DOMContentLoaded", Storage.displayCourses)


document.querySelector("#new-course").addEventListener('submit', function(e){

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;
    // Create Course obj
    
    const course = new Course(title, instructor, image);
    console.log(course);
    //create UI
    const ui = new UI();

    if(title==='' || instructor==='' || image==='' ){
        ui.showAlert("Please complete the form" , "warning")
    }else{
        //add course List
        ui.addCourseToList(course)
        // addlocalStoreage
        Storage.addCourse(course);

        //clear contols
        ui.clearContols();
        ui.showAlert("The Course has been added" , "success")
        }
e.preventDefault();
})

document.querySelector("#course-list").addEventListener("click", function(e){
    const ui = new UI();
    if(ui.deleteCourse(e.target) == true){
        //delete from storage
        Storage.deleteCourse(e.target);
        ui.showAlert('The Course has been deleted', "danger")
    };
})

