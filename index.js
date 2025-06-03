window.addEventListener("DOMContentLoaded", () => {

    let draggedItem = null;
    const allListItem = document.querySelectorAll('li')

    function addTrashBox(items) {
        if (!Array.isArray(items) && !items.forEach) {
            items = [items];
        }
    
        items.forEach(item => {
            const parentList = item.closest("ul");
            const isInFinishList = parentList && parentList.id === "finishlist";
    
            // Удаляем старую иконку, если вдруг переносится туда-обратно
            const existingTrash = item.querySelector("img.trashbox");

            if (existingTrash) {
                existingTrash.remove();
            }
    
            if (isInFinishList) {
                const trashbox = document.createElement("img");
                trashbox.src = "https://img.icons8.com/ios-glyphs/30/trash--v1.png";
                trashbox.classList.add("trashbox")
    
                trashbox.addEventListener("click", (e) => {
                    e.stopPropagation();
                    item.remove();
                });
    
                item.append(trashbox);
            }
        });
    }

    function dragItems(items) {

        if (!Array.isArray(items) && !items.forEach) {
            items = [items];
        }

        items.forEach(item => {
            item.addEventListener("dragstart", (e) => {
                draggedItem = item
                e.dataTransfer.effectAllowed = "move";
                setTimeout(() => {
                    item.style.display = "none";
                }, 0);
            })

            item.addEventListener("dragend", () => {
                item.style.display = "flex";
                draggedItem = null;
            })
        })
    }

    dragItems(allListItem)

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

            addTrashBox(listItem)

            dragItems(listItem)

            input.value = "";
            task = "";
        });
    }

    function dragNDropList() {
        const lists = document.querySelectorAll("ul");

        lists.forEach((list) => {
            list.addEventListener("dragover", (e) => {
                e.preventDefault();
                list.classList.add("drop-zone");
            });

            list.addEventListener("dragleave", () => {
                list.classList.remove("drop-zone");
            });

            list.addEventListener("drop", () => {
                if (draggedItem) {
                    list.append(draggedItem);
                    addTrashBox(draggedItem);
                }
                list.classList.remove("drop-zone");
            });
        });
    }

    addTask();
    dragNDropList();
});
