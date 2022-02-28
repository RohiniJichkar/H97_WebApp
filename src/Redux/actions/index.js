export function setMedicine() {
    return { type: 'ADD_MEDICINE', payload }
}


export function removeMedicineList() {
    return { type: 'DELETE_MEDICINE', payload }
}

export function addPatientReports() {
    return { type: 'ADD_REPORTS', payload }
}

export function deletePatientReports() {
    return { type: 'DELETE_REPORTS', payload }
}

export function resetPatientReports() {
    return { type: 'RESET_REPORTS_ITEM' }
}