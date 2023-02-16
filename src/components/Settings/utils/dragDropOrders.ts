

export default  (  dragListWrapper : any  , callback :any  ) => {

if (!dragListWrapper) {
    return
}

dragListWrapper.addEventListener('dragstart',itemDragStarted);
dragListWrapper.addEventListener('dragend', itemDragEnd);

dragListWrapper.addEventListener('dragover',eventOver);
dragListWrapper.addEventListener('dragenter',eventEnter);
dragListWrapper.addEventListener('dragleave',eventLeave);
dragListWrapper.addEventListener('drop',eventDrop);


let currentItemDrag = {
    order  : 0 ,
    id : 0,
};

function itemDragStarted(event : any) {

    if (!event.target.dataset.order) {
        event.preventDefault();
        return
    }

    dragListWrapper.classList.add('drag-list--active')
    event.target.classList.add('drag__item--drag-now')

    currentItemDrag.order = event.target.dataset.order
    currentItemDrag.id = event.target.dataset.id

}

function itemDragEnd(event: any) {
    dragListWrapper.classList.remove('drag-list--active')
    event.target.classList.remove('drag__item--drag-now');
}

function eventOver(event: any) {
    event.preventDefault();
}
function eventEnter(event: any) {

    event.preventDefault();
    const order = event.target.dataset.order
    if (!order) {
        return
    }

    if (order !== currentItemDrag.order) {
        event.target.classList.add('drag__item--target-now')
    }
}

function eventLeave(event:any) {
    event.target.classList.remove('drag__item--target-now')
}

function eventDrop(event:any) {

    if (event.target.dataset.order) {
        event.target.classList.remove('drag__item--target-now')

        const targetItemDrag = {
            order : Number(event.target.dataset.order),
            id : Number(event.target.dataset.id) ,
        };
        currentItemDrag.id = Number(currentItemDrag.id)
        currentItemDrag.order = Number(currentItemDrag.order)
        callback ( [currentItemDrag , targetItemDrag ])
    }
}
}

