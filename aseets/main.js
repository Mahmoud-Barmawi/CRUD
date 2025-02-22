var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");

var update=document.getElementById("update");
var add_cor=document.getElementById("click");
update.style.display='none';
var currunt_index=0;

// var arr_courses =JSON.parse(localStorage.getItem('arr_courses'));
let localStorageData = localStorage.getItem('arr_courses');
let dataArray = JSON.parse(localStorageData);
let arr_courses = dataArray;
if(arr_courses === null){
    arr_courses=[]
}
else{
    let arr_courses = dataArray;
}
display();

var search = document.getElementById("search");

function getValues(e) {
    e.preventDefault();
    addCourse();
    resetInput();
    display();

}


//create course
function addCourse() {
    var courses = {
            Cname: courseName.value,
            Ccategory: courseCategory.value,
            Cprice: coursePrice.value,
            Cdescription: courseDescription.value,
            Ccapacity: courseCapacity.value
    };
    arr_courses.push(courses);
    localStorage.setItem('arr_courses',JSON.stringify(arr_courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course Added Successfully',
        showConfirmButton: false,
        timer: 1400
    })
}


function resetInput() {
    courseName.value = '';

    courseCategory.value = '';

    coursePrice.value = '';

    courseDescription.value = '';

    courseCapacity.value = '';
}
//display data
function display() {
    var table_data = ` `;
    for (var i = 0; i < arr_courses.length ; i++) {
        table_data += `
        <tr>
            <td> ${i + 1} </td>
            <td> ${arr_courses[i].Cname} </td>
            <td> ${arr_courses[i].Ccategory} </td>
            <td> ${arr_courses[i].Cprice} </td>
            <td> ${arr_courses[i].Cdescription} </td>
            <td> ${arr_courses[i].Ccapacity} </td>
            <td> <button class="btn btn-danger" onclick="getCourse(${i})">UPDATE</button> </td>
            <td> <button class="btn btn-danger" onclick="deleteCourse(${i})"> DELETE </button> </td>
            
            </tr>
        `
    }
    document.getElementById("data").innerHTML = table_data;
}

//delete table
document.getElementById("deleteBtn").onclick = function () {
    Swal.fire({
        title: 'Are you sure to delete all?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            arr_courses = [];
            localStorage.setItem('arr_courses',JSON.stringify(arr_courses))       
            document.getElementById("data").innerHTML = ''; 
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}
//delete row
function deleteCourse(index) {
    Swal.fire({
        title: 'Are you sure to delete all?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            arr_courses.splice(index, 1);
            localStorage.setItem('arr_courses',JSON.stringify(arr_courses))       
            display();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}

//search  
search.onkeyup = function () {
    var table_data = ` `;
    for (var i = 0; i < arr_courses.length; i++) {
        if (arr_courses[i].Cname.toLowerCase().includes(search.value.toLowerCase())) {
            table_data += `
            <tr>
                <td> ${i + 1} </td>
                <td> ${arr_courses[i].Cname} </td>
                <td> ${arr_courses[i].Ccategory} </td>
                <td> ${arr_courses[i].Cprice} </td>
                <td> ${arr_courses[i].Cdescription} </td>
                <td> ${arr_courses[i].Ccapacity} </td>
                <td> <button class="btn btn-info" onclick="getCourse(${i})">UPDATE</button> </td>
                <td> <button class="btn btn-danger" onclick="deleteCourse(${i})"> DELETE </button> </td>
                </tr>
                `
        }
        document.getElementById("data").innerHTML = table_data;

    }
}
//update
function getCourse(index){
    var cou_s=arr_courses[index];   //get cours that user click on it
    currunt_index=index;
    courseName.value=cou_s.Cname;
    courseCategory.value=cou_s.Ccategory;
    coursePrice.value=cou_s.Cprice;
    courseDescription.value=cou_s.Cdescription;
    courseCapacity.value=cou_s.Ccapacity;
    add_cor.style.display='none';
    update.style.display='inline-block';
}

update.onclick=function(e){
    e.preventDefault();
    var courses = {
        Cname: courseName.value,
        Ccategory: courseCategory.value,
        Cprice: coursePrice.value,
        Cdescription: courseDescription.value,
        Ccapacity: courseCapacity.value
    }
    let preName=arr_courses[currunt_index].Cname;
    arr_courses[currunt_index].Cname=courses.Cname;
    arr_courses[currunt_index].Ccategory=courses.Ccategory;
    arr_courses[currunt_index].Cprice=courses.Cprice;
    arr_courses[currunt_index].Cdescription=courses.Cdescription;
    arr_courses[currunt_index].Ccapacity=courses.Ccapacity;
    localStorage.setItem('arr_courses',JSON.stringify(arr_courses))       
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${preName} Updated Successfully`,
        showConfirmButton: false,
        timer: 1400
    })
    display();
    add_cor.style.display='inline-block';
    update.style.display='none';
    resetInput();
}