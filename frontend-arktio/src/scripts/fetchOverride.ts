import {base} from "../stores/storeLibrary";
import {get} from "svelte/store";

export const routerFetch = (url  : string, requestInit?: RequestInit) : Promise<Response> => {
    return fetch(`${get(base)}${url}`, requestInit)
}