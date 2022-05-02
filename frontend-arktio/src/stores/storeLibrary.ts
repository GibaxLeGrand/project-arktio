import {Writable, writable} from "svelte/store";
import type * as socketio from "socket.io-client";
import type {PlayerJSON} from "../types/types";

export const base : Writable<string> = writable("/")
export const socketStore : Writable<socketio.Socket> = writable(null)
export const userStore : Writable<PlayerJSON> = writable(null);