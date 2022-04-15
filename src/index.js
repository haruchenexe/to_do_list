import _ from 'lodash';
import './style.css';


// Open Project and Forms
const openButtons = document.querySelectorAll('[data-form-target]');
const closeButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openButtons.forEach(button => {
  button.addEventListener('click', () => {
    const pointer = document.querySelector(button.dataset.formTarget)
    openButton(pointer)
  })
})

overlay.addEventListener('click', () => {
  const FormsOpen = document.querySelectorAll('.form.active')
  FormsOpen.forEach(form => {
    closeButton(form)
  })
})

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const pointer = button.closest('.form')
    closeButton(pointer)
  })
})

function openButton(pointer) {
  if (pointer == null) return
  pointer.classList.add('active')
  overlay.classList.add('active')
}

function closeButton(pointer) {
  if (pointer == null) return
  pointer.classList.remove('active')
  overlay.classList.remove('active')
}

// Create a function that specifies in creation of divs. Should be able to set id and classes
var elementCreations = {
  init: function() {
    this.cacheDom();
  },
  cacheDom: function() {
    this.$container = document.querySelector('#container');
  },
  emptyText: function(ele, text) {
    if (text.length > 0) {
      ele.textContent = text;
    }
    else {
      ele.textContent = '';
    }
  },
  createElement: function(ele, idName, classId, text) {
    const element = document.createElement(ele);
    const eleName = element.setAttribute('id', idName);
    const eleClassName = element.setAttribute('class', classId);
    
    this.emptyText(element, text);
    this.appendElement(element);
  },
  createMultielement: function(ele, idName, classId, text, range) {
    for (let i=0; range>i; i++) {
      const multiElement = document.createElement(ele);
      const uniqueID = idName + i;
      const multiName = multiElement.setAttribute('id', uniqueID); 
      const multiClass = multiElement.setAttribute('class', classId);

      this.emptyText(multiElement, text);
      this.appendElement(multiElement)
    }
  },
  appendElement: function(value) {
    this.$container.appendChild(value);
  }
}

elementCreations.init()
elementCreations.createMultielement('div', 'boxcontainers', 'dashboard', '', 2);

// Table creation
elementCreations.createElement('div', 'UIContainer', 'UIBox', '');
elementCreations.createElement('div', 'UIResponse', 'UIResponse', '');

var elementManipulation = {
  moveNodes: function(parent, child) {
    const parentNode = document.querySelectorAll(parent);
    const childNode = document.querySelectorAll(child);

    for(let i=0; childNode.length>i; i++) {
      parentNode[0].appendChild(childNode[i])
    }
  },
  modtifyAttributes: function(element, id, value) {
    const ele = document.querySelector(element);
    ele.setAttribute(id, value);
  },
  prependTxt: function(element, text) {
    const ele = document.querySelector(element);
    ele.prepend(text)
  },
  appendTxt: function(element, text) {
    const ele = document.querySelector(element);
    ele.append(text)
  }
}

elementManipulation.moveNodes('#boxcontainers0', '#overlay');
elementManipulation.moveNodes('#boxcontainers1', '#UIContainer');
elementManipulation.moveNodes('#UIContainer', '.headerTitle');
elementManipulation.moveNodes('#headerTitle', '.headers');
elementManipulation.moveNodes('#UIContainer', '#UIResponse');


let count = 0

var submitResult = {
  init: function() {
    this.cacheDom();
    this.createDiv();
    this.formValues();
    this.populateDiv();
  },
  cacheDom: function() {
    this.$UIResponse = document.querySelector('#UIResponse');
    this.$closedataBtn = document.querySelector('.close-button');
    this.$addProject = document.querySelector('#addProject');
    this.$inputs = document.querySelectorAll('input');
    this.$submitBtn = document.querySelector('#submitBtn');
  },
  createDiv: function() {
    this.$addProject.addEventListener('click', e=> {

      this.countVariable();

      elementCreations.createElement('div', 'list'+count , 'list', '');
      elementCreations.createElement('div', this.$projectCount, 'projectitem', '');
      elementCreations.createElement('div', this.$priorityCount , 'todoitem', '');
      elementCreations.createElement('div', this.$descriptionCount, 'todoitem', '');
      elementCreations.createElement('div', this.$duedateCount, 'todoitem', '');
      elementCreations.createElement('button', this.$cancelCount, 'cancelitem', 'Delete');
      elementManipulation.moveNodes('#UIResponse', '#list'+count);
      elementManipulation.moveNodes('#list'+count, '#'+this.$projectCount);
      elementManipulation.moveNodes('#list'+count, '#'+this.$priorityCount );
      elementManipulation.moveNodes('#list'+count, '#'+this.$descriptionCount);
      elementManipulation.moveNodes('#list'+count, '#'+this.$duedateCount);
      elementManipulation.moveNodes('#list'+count, '#'+this.$cancelCount);
      count++

      this.deleteDiv();
    })
  },
  formValues: function() {
    this.$submitBtn.addEventListener('click', e=> {
      this.projectTitle = document.querySelector('#project-title').value;
      this.priorityInput = document.querySelector('#priority-input').value;
      this.describleInput = document.querySelector('#describle-input').value;
      this.duedateInput = document.querySelector('#due-date-input').value;

      this.exitForm();
    })
  },
  countVariable: function() {
    this.$projectCount = 'projectTitle' + count;
    this.$priorityCount = 'priorityTitle'+ count;
    this.$descriptionCount = 'descriptionTitle' + count;
    this.$duedateCount = 'duedateTitle' + count;
    this.$cancelCount = 'cancel' + count;
  },
  populateDiv: function() {
    this.$submitBtn.addEventListener('click', e=> {
      const projectDiv = document.getElementById(this.$projectCount);
      const priorityDiv = document.getElementById(this.$priorityCount);
      const descriptionDiv = document.getElementById(this.$descriptionCount);
      const duedateDiv = document.getElementById(this.$duedateCount);

      projectDiv.textContent = this.projectTitle;
      priorityDiv.textContent = this.priorityInput;
      descriptionDiv.textContent = this.describleInput;
      duedateDiv.textContent = this.duedateInput;
      this.priorityFaces();
      this.clearAll();
    })
  },
  exitForm: function() {
    this.$closedataBtn.click();
  },
  clearAll: function() {
    this.$inputs.forEach(input => input.value = '');
  },
  priorityFaces: function() {

    if (this.priorityInput == 'High') {
      elementManipulation.appendTxt('#'+this.$priorityCount, ' 😮');
    }
    else if (this.priorityInput == 'Medium') {
      elementManipulation.appendTxt('#'+this.$priorityCount, ' 😬');
    }
    else {
      elementManipulation.appendTxt('#'+this.$priorityCount, ' 😙');
    }
  },
  deleteDiv: function() {
    const deleteDiv = document.querySelectorAll('.cancelitem');

    deleteDiv.forEach(xmark => xmark.addEventListener('click', e=> {
      const parentNode = document.getElementById(e.target.id).parentElement
      parentNode.remove();
    }))
  }
}

submitResult.init();





