// Question Constructor
function Question(question, marks, chapter){
  this.question = question;
  this.marks = marks;
  this.chapter = chapter;
}

// UI Constructor
function UI(){}

UI.prototype.addQuestionTotheList = function(question){

  const list = document.getElementById('questions-list');

  //create row element
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${question.question}</td>
  <td>${question.chapter}</td>
  <td>${question.marks}</td>
  <td><a href='#' class="delete">X</a></td>
  `;
  
  list.appendChild(row);
}

UI.prototype.clearFields = function(){
  document.querySelector('#question-title').value = "";
  document.querySelector('#question-chapter').value = "";
  document.querySelector('#question-marks').value = "";
}

UI.prototype.showAlert = function(message,className){
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

UI.prototype.deleteQuestion = function(target){
  target.parentElement.parentElement.remove();
}

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
  
  e.preventDefault();
});


document.querySelector('#question-form').addEventListener('click',function(e){
  if(e.target.classList.contains('print')){

    //get table element 
    const table = document.querySelector('#questions-table');
    console.log(table);

    //window variable
    const win = window.open('');

    win.document.write(`
      <html>
      <head></head>
      <body>
      ${table}
      </body>
      </html>
    `);

    win.document.close();
    win.print();
  }
  e.preventDefault();
});