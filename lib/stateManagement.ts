export let state = getState()

// Custom event for state changes
export const STATE_CHANGE_EVENT = 'apprenticeOSStateChange'

export function setState(newState: string) {
    state = newState
    localStorage.setItem("state", state)
    
    // Dispatch custom event to notify components of state change
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(STATE_CHANGE_EVENT, { 
            detail: { newState } 
        }))
    }
}

// Utility function to listen for state changes
export function onStateChange(callback: (newState: string) => void) {
    if (typeof window !== 'undefined') {
        const handleStateChange = (event: CustomEvent) => {
            callback(event.detail.newState)
        }
        
        window.addEventListener(STATE_CHANGE_EVENT, handleStateChange as EventListener)
        
        // Return cleanup function
        return () => {
            window.removeEventListener(STATE_CHANGE_EVENT, handleStateChange as EventListener)
        }
    }
    return () => {} // Return empty cleanup function for SSR
}

function getState() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("state") || "booting"
    }
    return "booting"
}