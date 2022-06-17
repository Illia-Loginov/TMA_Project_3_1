const valueInput = document.querySelector('#value');
const addBtn = document.querySelector('#add');
const removeBtn = document.querySelector('#remove');
const queueContainer = document.querySelector('#queue');
const queueSize = document.querySelector('#queueSize');
const maxQueueSize = document.querySelector('#maxQueueSize');

const calculateAge = (birthday) => {
    let now = new Date();
    let age = now.getFullYear() - birthday.getFullYear();
    if(now.getMonth() < birthday.getMonth() 
        || (now.getMonth() === birthday.getMonth() && now.getDate() < birthday.getDate())) {
        age--;
    }

    return age;
}

const MAX_QUEUE_SIZE = calculateAge(new Date('2003-05-28'));
let queue = [];

const unshiftNewElement = (value) => {
    let newElement = document.createElement('div');
    newElement.textContent = value;
    newElement.classList.add('queueElement');
    
    let firstChild = queueContainer.children[0];
    queueContainer.insertBefore(newElement, firstChild);
}

const pushNewElement = (value) => {
    let newElement = document.createElement('div');
    newElement.textContent = value;
    newElement.classList.add('queueElement');
    
    queueContainer.appendChild(newElement);
}

const addEvent = (e) => {
    e.preventDefault();

    if(queue.length >= MAX_QUEUE_SIZE) {
        alert(`The queue cannot have more than ${MAX_QUEUE_SIZE} element${MAX_QUEUE_SIZE === 1 ? '' : 's'}`);
        return;
    }

    let newValue = valueInput.value.trim();
    valueInput.value = "";
    if(newValue.length <= 0) {
        alert('New element cannot be an empty string');
        return;
    }

    queue.unshift(newValue);
    unshiftNewElement(newValue);
    queueSize.textContent = queue.length;
    
    localStorage.setItem('storedQueue', JSON.stringify(queue));
}

const removeEvent = (e) => {
    e.preventDefault();

    if(queue.length <= 0) {
        alert('No elements to remove');
        return;
    }

    queue.pop();

    let lastChild = queueContainer.children[queueContainer.children.length - 1];
    queueContainer.removeChild(lastChild);

    queueSize.textContent = queue.length;
    localStorage.setItem('storedQueue', JSON.stringify(queue));
}

const initialize = () => {
    maxQueueSize.textContent = MAX_QUEUE_SIZE;
    
    let storedQueue = localStorage.getItem('storedQueue');
    if(storedQueue) {
        queue = JSON.parse(storedQueue);
        
        queue.map(pushNewElement);
    }

    queueSize.textContent = queue.length;

    addBtn.addEventListener('click', addEvent);
    removeBtn.addEventListener('click', removeEvent);
}

initialize();