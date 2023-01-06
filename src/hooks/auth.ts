import { writable } from 'svelte/store';

const user = 'admin@admin.com'
const pass = '1234'
const role = 'ADMIN'

export const store = writable(null);

let sessions = []

export const getUserDetails = async ( username:string, password:string, role:string ) => {
	if ( username === user && password === pass && role === role)
		return 1
}