export default {
    setStatePromise,
}

async function setStatePromise(component, state = {}) {
    return new Promise((resolve) => component.setState(state, resolve));
}