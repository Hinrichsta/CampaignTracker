import { getAuthToken } from "@/app/hooks/actions";
import { get } from "http";

const DJANGO = 'http://localhost:8000/api/v1'
const NEXTJS = 'http://localhost:3000'

const CampaignJournal = {
    get: async function(url: string): Promise<any> {
        const token = await getAuthToken(NEXTJS);

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
        const token = await getAuthToken(NEXTJS);
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
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                resolve(json);
            })
            .catch((error => {
                reject(error);
            }))
        })
    }
}

export default CampaignJournal;