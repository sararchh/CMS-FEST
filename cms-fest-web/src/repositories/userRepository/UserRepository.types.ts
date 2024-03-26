export const userTypesPTMap = [
    { label: 'common', value: 'Comum' },
    { label: 'admin', value: 'Administrador' },
]

export interface UserProps {
    _id?: string;
    uuid?: string;
    name: string;
    email?: string;
    phone?: string;
    password?: string;
    status?: string;
    isAdmin?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ListUserProps {
    data: UserProps[];
    total: number;
    pages: number;
    current_page: number;
}

