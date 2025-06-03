window.addEventListener("DOMContentLoaded", () => {
    let draggedItem = null;
    const allListItem = document.querySelectorAll('li')
    allListItem.forEach(item => {
        item.addEventListener("dragstart", (e) => {
            draggedItem = item
            e.dataTransfer.effectAllowed = "move";
            setTimeout(() => {
                listItem.style.display = "none";
            }, 0);
        })

        item.addEventListener("dragend", () => {
            listItem.style.display = "block";
            draggedItem = null;
        })
    })

    function addTask() {
        const input = document.querySelector("#taskInput");
        const addBtn = document.querySelector("#addTaskBtn");
        const listStart = document.querySelector("#addtask-list");

        let task = "";

        input.addEventListener("input", (e) => {
            task = e.target.value;
        });

        addBtn.addEventListener("click", () => {
            if (task.length === 0) return;

            const listItem = document.createElement("li");
            listItem.textContent = task;
            listItem.setAttribute("draggable", true);
            listStart.append(listItem);

            
            listItem.addEventListener("dragstart", (e) => {
                draggedItem = listItem;
                e.dataTransfer.effectAllowed = "move";
                setTimeout(() => {
                    listItem.style.display = "none";
                }, 0);
            });

            listItem.addEventListener("dragend", () => {
                listItem.style.display = "block";
                draggedItem = null;
            });

            input.value = "";
            task = "";
        });
    }

    function dragNDropList() {
        const lists = document.querySelectorAll("ul");

        lists.forEach((list) => {
            list.addEventListener("dragover", (e) => {
                e.preventDefault();
                list.classList.add("drag-over");
            });

            list.addEventListener("dragleave", () => {
                list.classList.remove("drag-over");
            });

            list.addEventListener("drop", () => {
                if (draggedItem) {
                    list.appendChild(draggedItem);
                }
                list.classList.remove("drag-over");
            });
        });
    }

    addTask();
    dragNDropList();
});
