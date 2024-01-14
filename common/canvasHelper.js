const canvasHelper = (
    _ => {
        let canvasAutoId = 0;
        let canvasLastUsedId = 0;
        let canvasElements = {};
        let canvasContexts = {};
        let containerElement = null;

        function getFromObjectById(object, id) {
            if (id === undefined || object[id] === undefined) {
                if (Object.keys(object).length === 1) {
                    return object[canvasLastUsedId];
                } else {
                    return object;
                }
            } else {
                return object[id];
            }
        }

        function canvas(id) {
            return getFromObjectById(canvasElements, id);
        }

        function context(id) {
            return getFromObjectById(canvasContexts, id);
        }

        function container() {
            return containerElement;
        }

        const create = (
            _ => {
                function createNode(type, id, className) {
                    const newNode = document.createElement(type);
                    if (typeof id === 'string') {
                        newNode.setAttribute('id', id);
                    }
                    if (className !== undefined && typeof className === 'string') {
                        newNode.className = className;
                    }
                    return newNode;
                }
                function canvas(id, className) {
                    if (id === undefined || typeof id !== 'string') {
                        canvasLastUsedId = 'canvas_' + canvasAutoId++;
                        canvasElements[canvasLastUsedId] = createNode('canvas', canvasLastUsedId, className);
                    } else {
                        canvasLastUsedId = id;
                        canvasElements[id] = createNode('canvas', id, className);
                    }
                }
                function container(id = 'canvas_container', className) {
                    containerElement = createNode('div', id, className)
                }
                return {
                    canvas,
                    container
                }
            }
        )()

        function setContext(id, type = '2d') {
            if (id === undefined && canvasElements[id] === undefined) {
                Object.keys(canvasElements).forEach(key => {
                    canvasContexts[key] = canvasElements[key].getContext(type);
                })
            } else {
                canvasContexts[id] = canvasElements[id].getContext(type);
            }
        }

        const appendChild = (
            _ => {
                function container(parent) {
                    if (containerElement !== null) {
                        if (parent !== undefined && typeof parent === 'object' && 'appendChild' in parent) {
                            parent.appendChild(containerElement);
                        } else {
                            document.querySelector('body').appendChild(containerElement);
                        }
                    }
                }
                function canvas(canvasId = canvasLastUsedId) {
                    const cvs = canvasElements[canvasId];
                    if (canvasId !== undefined && cvs !== undefined) {
                        if (containerElement !== null) {
                            containerElement.appendChild(cvs);
                        } else {
                            document.querySelector('body').appendChild(cvs);
                        }
                        canvasLastUsedId = canvasId;
                    }
                }
                return {
                    container,
                    canvas
                }
            }
        )()

        const insertBeforeFirst = (
            _ => {
                function container(parent) {
                    if (containerElement !== null) {
                        if (parent !== undefined && typeof parent === 'object' && 'insertBefore' in parent) {
                            parent.insertBefore(containerElement, parent.firstChild);
                        } else {
                            const bodyElement = document.querySelector('body');
                            bodyElement.insertBefore(containerElement, bodyElement.firstChild);
                        }
                    }
                }
                function canvas(canvasId = canvasLastUsedId) {
                    const cvs = canvasElements[canvasId];
                    if (canvasId !== undefined && cvs !== undefined) {
                        if (containerElement !== null) {
                            containerElement.insertBefore(cvs, containerElement.firstChild);
                        } else {
                            const bodyElement = document.querySelector('body');
                            bodyElement.insertBefore(cvs, bodyElement.firstChild);
                        }
                        canvasLastUsedId = canvasId;
                    }
                }
                return {
                    container,
                    canvas
                }
            }
        )()

        return {
            canvas,
            context,
            container,
            create,
            setContext,
            appendChild,
            insertBeforeFirst
        }
    }
)();