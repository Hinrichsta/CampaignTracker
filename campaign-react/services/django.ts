import { getAuthToken } from "@/app/hooks/actions";
import { get } from "http";

const DJANGO = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

const CampaignJournal = {
    get: async function(url: string): Promise<any> {
        const token = await getAuthToken();

        let headers: { [key: string]: string } = {
            'Content-Type': 'application/json',
        };
        
        if (token !== null){
            headers['Authorization'] = `Bearer  ${token}`;
        }
        
        return new Promise((resolve, reject) => {
            fetch(`${DJANGO}${url}`, {
                method: 'GET',
                headers: headers
            })
            .then(response => response.json())
            .then((json) => {
                resolve(json);
            })
            .catch((error => {
                reject(error);
            }))
        })
    },

    post: async function(url: string, data: any): Promise<any> {
        const token = await getAuthToken();
        let headers: { [key: string]: string } = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        if (token !== undefined){
            headers['Authorization'] = `Bearer  ${token}`;
        }

        return new Promise((resolve, reject) => {
            fetch(`${DJANGO}${url}`, {
                method: 'POST',
                body: data,
                headers: headers
            })
            .then(response => response.json())
            .then((json) => {
                resolve(json);
            })
            .catch((error => {
                reject(error);
            }))
        })
    },

    update: async function(url: string, data: any): Promise<any> {
        const token = await getAuthToken();
        let headers: { [key: string]: string } = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        if (token !== undefined){
            headers['Authorization'] = `Bearer  ${token}`;
        }
        console.log(data)
        return new Promise((resolve, reject) => {
            fetch(`${DJANGO}${url}`, {
                method: 'PUT',
                body: data,
                headers: headers
            })
            .then(response => response.json())
            .then((json) => {
                resolve(json);
            })
            .catch((error => {
                reject(error);
            }))
        })
    },

    delete: async function(url: string): Promise<any> {
        const token = await getAuthToken();
        let headers: { [key: string]: string } = {
            'Accept': 'application/json',
        };
        if (token !== undefined){
            headers['Authorization'] = `Bearer  ${token}`;
        }

        return new Promise((resolve, reject) => {
            fetch(`${DJANGO}${url}`, {
                method: 'DELETE',
                headers: headers,
            })
            .then(response => {
                if (response.ok) {
                    resolve({ status: response.status, message: 'Deleted successfully' });
                } else {
                    return response.json().then((json) => {
                        reject(json);
                    });
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}

export default CampaignJournal;