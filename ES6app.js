class Question{
  constructor(question,marks,chapter){
    this.question = question;
    this.marks = marks;
    this.chapter = chapter
  }
}

class UI{
  
  addQuestionTotheList(question){
    const list = document.getElementById('questions-list');

    //create row element
    const row = document.createElement('tr');
    row.classList.add('spawn-row-anim');
    row.innerHTML = `
    <td>${question.question}</td>
    <td>${question.chapter}</td>
    <td>${question.marks}</td>
    <td><a href='#' class="delete">X</a></td>
    `;
    
    list.appendChild(row);
  }

  clearFields(){
    document.querySelector('#question-title').value = "";
    document.querySelector('#question-chapter').value = "";
    document.querySelector('#question-marks').value = "";
  }

  showAlert(message,className){
      // create div
  const div = document.createElement('div');

  //add class
  div.className =`alert ${className}`;

  //add message
  div.appendChild(document.createTextNode(message));

  //get container
  const container = document.querySelector('.container');

  //get form
  const form = document.querySelector('#question-form');

  //insert div before form
  container.insertBefore(div,form);

  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);
  }

  deleteQuestion(target){
    target.parentElement.parentElement.remove();
  }
}

class Store{

  static getQuestions(){
    let questions;
    if(localStorage.getItem('questions')=== null){
      questions = [];
    } else {
      questions = JSON.parse(localStorage.getItem('questions'));
    }

    return questions;
  }

  static addQuestion(question){
    const questions = Store.getQuestions();
    questions.push(question);
    localStorage.setItem('questions',JSON.stringify(questions));
  }

  static displayQuestions(){
    const questions = JSON.parse(localStorage.getItem('questions'));
    questions.forEach(function(question){
      const ui = new UI;
      ui.addQuestionTotheList(question);
    });
  }

  static deleteQuestion(questionTxt){
    const questions = Store.getQuestions();
    questions.forEach(function(question,index){
      if(question.question === questionTxt ){
        questions.splice(index,1);
      }
    });
    localStorage.setItem('questions',JSON.stringify(questions));
  }

}

//load questions after DOM is loaded
document.addEventListener('DOMContentLoaded',Store.displayQuestions);

document.getElementById('question-form').addEventListener('submit',function(e){

  //storing values from form
  const questionTxt = document.querySelector('#question-title').value,
        marks = document.querySelector('#question-marks').value;
        chapter = document.querySelector('#question-chapter').value;
  
  //Instantiate Question
  const question = new Question(questionTxt, marks, chapter);

  //Instantiate UI
  const ui = new UI();

  if(questionTxt === "" || marks === "" || chapter === ""){
    ui.showAlert('Please fill in all fields', 'error');
  }else{

    //add question to the list
    ui.addQuestionTotheList(question);

    //add question to the local storage
    Store.addQuestion(question);

    //clear fields
    ui.clearFields();

    //show success message
    ui.showAlert("Question added succesfully!!",'success');
  }

  e.preventDefault();
});

document.getElementById('questions-list').addEventListener('click',function(e){
  // instantiate UI
  const ui = new UI();

  if(e.target.className == 'delete')
    ui.deleteQuestion(e.target);

  //show delete message
  ui.showAlert('Question removed','success');

  Store.deleteQuestion(e.target.parentElement.parentElement.firstElementChild.textContent);

  
  e.preventDefault();
});

document.querySelector('.print').addEventListener('click',function(e){
  if(e.target.className='btn print'){

    //get table element 
    let table = document.getElementById('questions-table').cloneNode(true);

    // removing deletecolumn table>thead>tr>td>delete 
    table.firstElementChild.firstElementChild.lastElementChild.remove();

    //removing delete option in rows
    const rows = table.children[1].children;

    for(let i = 0; i<rows.length; i++){
      //removes delete option from each row
      rows[i].lastElementChild.remove();
    }

    win = window.open("");
    win.document.write('<style>thead, td{ border: solid 1px #ddd;}');
    win.document.write('thead{background-color: #ddd}');
    win.document.write('table{width: 90%;border-collapse: collapse; margin: 16px;');
    win.document.write('font-size: 1.5rem;text-align: left;table-layout: fixed}');
    win.document.write('</style><h1 style="text-align:center">Question list</h1>');
    win.document.write(table.outerHTML);
    win.print();
    win.document.close();
  }
  e.preventDefault();
});

