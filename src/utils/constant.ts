interface Roles {
    ADMIN: string,
    USER: string
}

interface AssignmentStatus {
    ACCEPTED: string,
    PENDING: string,
    REJECTED: string
}

export const ROLES: Roles = {
    ADMIN: 'Admin',
    USER: 'User'
};

export const ASSIGNMENTSTATUS: AssignmentStatus = {
    PENDING: 'Pending',
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected'
}