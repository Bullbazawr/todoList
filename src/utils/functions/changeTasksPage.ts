
export function prevTasksPage(page: number) {
    if (page - 1 <= 0) {
        return 1
    }
    return page - 1
}

export function nextTasksPage(page: number, totalPages: number) {
    if (page + 1 > totalPages) {
        return totalPages
    }
    return page + 1
}