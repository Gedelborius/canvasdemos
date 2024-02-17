function canvasClick(cvs) {
    cvs.addEventListener('click', function (event) {
        // event.preventDefault();
        event.stopPropagation();
        console.log('Click on canvas: ');
        // console.log('Event: ', event);
        console.log(`event.clientX: ${event.clientX}; event.clientY: ${event.clientY}`);
        // const column = event.clientY ;

    });
}