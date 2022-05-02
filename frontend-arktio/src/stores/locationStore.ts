import {Writable, writable} from "svelte/store";
import type * as socketio from "socket.io-client";

export const base : Writable<string> = writable("/")
export const socketStore : Writable<socketio.Socket> = writable(null)