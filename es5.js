// Course Constructor
function Course(title, instructor, image){
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

//UI Constructor
function UI(){

}

UI.prototype.addCourseToList = function(course){
    const list = document.getElementById("course-list");

    var html = `
        <tr>
            <td><img src="img/${course.image}"</td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `
    list.innerHTML += html;
    
}

UI.prototype.clearContols = function(){
    const title = document.getElementById('title').value = "";
    const instructor = document.getElementById('instructor').value = "";
    const image = document.getElementById('image').value = "";
}
UI.prototype.deleteCourse = function(element){
    if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert = function(message, alertName){

    var alert = ` <div class="alert alert-${alertName}">${message}</div> `
    console.log('çalıştı');
    const row = document.querySelector(".row");
    row.insertAdjacentHTML("beforeBegin", alert)

    setTimeout(() => {
        document.querySelector(".alert").remove();
    },1000)
}

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
        //clear contols
        ui.clearContols();
        ui.showAlert("The Course has been added" , "success")
        }
        

        


e.preventDefault();
})

document.querySelector("#course-list").addEventListener("click", function(e){
    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('The Course has been deleted', "danger")
})

