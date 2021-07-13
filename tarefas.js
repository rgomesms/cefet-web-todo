// Exercicio 1
const tasks = [
	{
		name: "Lavar Pratos",
		category: "lazer",
		done: true
	},
	{
		name: "Comprar Leite",
		category: "compras",
		done: false
	}
]

const taskListSelector = "ul#lista-tarefas";
const checkedClass = "marcado";
const taskClass = "item-tarefa";

const insertTaskOnPage = (task, index) => {
	let { name, category, done } = task;
	const taskElement = document.createElement("li");
	taskElement.innerHTML = name;

	taskElement.classList.add(taskClass);
	done ? taskElement.classList.add(checkedClass) : null;
	taskElement.classList.add(`categoria-${category.toLowerCase()}`);

	// (Exercicio 5)
	if (index >= 0) {
		taskElement.setAttribute("data-index", index);
	}

	taskElement.addEventListener("click", (e) => {
		e.target.classList.toggle(checkedClass);
		let index = e.target.getAttribute("data-index");
		if (index)
			tasks[index].done = e.target.classList.contains(checkedClass);
	});

	document.querySelector(taskListSelector).appendChild(taskElement);
}

const insertTasksOnPage = (tasks) => {
	tasks.forEach(insertTaskOnPage);
}

const cleanTasksOnPage = () => {
	document.querySelector(taskListSelector).innerHTML = "";
}

cleanTasksOnPage();
insertTasksOnPage(tasks);

// Exercicio 2
const addClassId = "incluir-nova-tarefa"
const taskInputId = "nova-tarefa-nome";
const newCategoryId = "nova-tarefa-categoria";

const buttonAddNewTaskElement = document.getElementById(addClassId);
const taskInputElement = document.getElementById(taskInputId);

buttonAddNewTaskElement.addEventListener("click", () => {
	const taskName = taskInputElement.value;
	const taskCategory = document.getElementById(newCategoryId).value;

	const newTask = {
		name: taskName,
		category: taskCategory,
		done: false
	};
	if (taskName.length > 0) {
		tasks.push(newTask);
		insertTaskOnPage(newTask, tasks.length - 1);
	}
	taskInputElement.value = "";
	taskInputElement.focus();
});

// Exercicio 3
const categoryFilterClass = "filtro-de-categoria";
const filteredClass = "retido-no-filtro"

const categoryFilterElement = document.getElementById(categoryFilterClass);

categoryFilterElement.addEventListener("change", () => {
	let tasksElements = document.querySelectorAll(`li.${taskClass}`);

	tasksElements.forEach(taskElement => {
		taskElement.classList.remove(filteredClass);
		let filterValue = categoryFilterElement.value;
		if (filterValue && !taskElement.classList.contains(`categoria-${filterValue}`))
			taskElement.classList.add(filteredClass);
	});

});

//Exercicio 4
taskInputElement.addEventListener("keypress", (e) => {
	if (e.key == "Enter") {
		buttonAddNewTaskElement.click();
	}
});
