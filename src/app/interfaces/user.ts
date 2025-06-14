export interface IUser {
    id: string;
    name: string;
    lastName: string;
    dni: number;
    email: string;
    password: string;
    rol: 'admin' | 'user';
    createdAt?: string;
    updatedAt?: string;
}