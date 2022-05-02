import {Writable, writable} from "svelte/store";
import type * as socketio from "socket.io-client";
import type {LobbyJSON, PlayerJSON, State} from "../types/types";

export const base : Writable<string> = writable("/")
export const socketStore : Writable<socketio.Socket> = writable(null)
export const userStore : Writable<PlayerJSON> = writable(null);
export const lobbyStore : Writable<LobbyJSON> = writable(null);
export const stateStore : Writable<State> = writable(null);