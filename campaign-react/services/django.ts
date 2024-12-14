import { rejects } from "assert";
import { resolve } from "path";

const DJANGO = 'http://localhost:8000/api/v1'

const CampaignJournal = {
    get: async function(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`${DJANGO}${url}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
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
    },

    post: async function(url: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`${DJANGO}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
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