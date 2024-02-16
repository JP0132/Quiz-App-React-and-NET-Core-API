import axios from 'axios';

// Address to access the API
export const BASE_URL = 'http://localhost:5243/';

// What type of data to fetch
export const ENDPOINT = {
    admin: 'admins',
    participant: 'participants',
    question: 'questions/getquestions',
    getAnswers : 'questions/getanswers',
    categories: 'categories',
    allQuestions: 'questions',
    newQuestion: 'questions/newquestion',
}

// Making the API call using axios package.
export const createAPIEndpoint =  endpoint => {
    let url = BASE_URL + 'api/' + endpoint + '/';

    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        fetchByObject: record => axios.post(url, record),
        fetchCategories: () => axios.get(url),
        fetchQuestions: id => axios.get(url + id),
        fetchImages: imageName => axios.get(url + imageName),
        postNewQuestion: newQuestion => axios.post(url, newQuestion),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url +id),
    }
}
