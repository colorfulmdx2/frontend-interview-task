import axios from "axios";

enum Type {
    CLASSIC = "CLASSIC",
    SERVER_SIDE = "SERVER_SIDE",
    MVT = "MVT"
}

export enum Status {
    ONLINE = "ONLINE",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
    DRAFT = "DRAFT",
}

export interface Site {
    id: number;
    url: string;
}

export interface Test {
    id: number;
    name: string;
    type: Type;
    status: Status;
    siteId: number;

}



const axiosInstance = axios.create({
    baseURL: 'http://localhost:3100'  //server URL
})
export const serviceApi = {

    async getTests() {
        return axiosInstance.get<Test[]>('/tests').then(res => res.data);
    },
    async getSites() {
        return axiosInstance.get<Site[]>('/sites').then(res => res.data);
    }
}