export let state = getState()

export function setState(newState: string) {
    state = newState
    localStorage.setItem("state", state)
}

function getState() {
    return localStorage.getItem("state") || ""
}