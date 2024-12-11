import { rejects } from "assert";
import { resolve } from "path";

const DJANGO = 'http://localhost:8000/api/v1'

const CampaignJournal = {
    get: async function(url: string): Promise<any> {
        console.log('get', url);

        return new Promise((resolve, reject) => {
            fetch(`${DJANGO}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Respons:', json);

                resolve(json);
            })
            .catch((error => {
                reject(error);
            }))
        })
    }
}

export default CampaignJournal;