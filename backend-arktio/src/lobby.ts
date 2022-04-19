import { Server, Socket } from 'socket.io';
import { Chat } from './chat';
import { LobbyPlayer, PlayerJSON } from './player';
import { State } from 'gamelogic-arktio/src/state';
import { Objet } from 'gamelogic-arktio/src/objetManager';
import { Player } from 'gamelogic-arktio/src/player';

export enum LobbyState {
    Lobby,
    Game,
    End
};

export interface LobbyJSON {
    uuid: string,
    players: Array<PlayerJSON>,
    owner: PlayerJSON,
    state: LobbyState
}

export class Lobby {
    private game: State;
    private uuid: string;
    private players: Map<LobbyPlayer, Socket>;
    private owner: LobbyPlayer | null;
    private state: LobbyState;
    private chat: Chat;
    private io : Server;

    constructor(uuid: string, io: Server, privacy: boolean) {
        this.uuid = uuid;
        this.players = new Map();
        this.owner = null;
        this.state = LobbyState.Lobby;
        this.chat = new Chat(this);
        this.io = io;
    }

    public launchTheGame() : void {
        if (this.state === LobbyState.Lobby) {
            let players : { [key: string] : Player } = {};
            let buffer : LobbyPlayer[] = Array.from(this.players.keys());
            for (let i=0; i<buffer.length; i++) {
                players[i] = {
                    id: buffer[i].getUUID(),
                    inventaire : [],
                    argent : 1000,
                    pointTerre: 0,
                    pion : i,
                    caseActuelle : {position: 0, type: -1},
                    statut : 0,
                }
            }

            this.game = State.create(players, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
            
            // Au cas où et pour + de lisibilité
            this.game.mois = 0;
            this.game.tour = 0;

            this.players.forEach((socket, player) => {
                // TODO
            });
        }
    }

    public toJSON() : LobbyJSON {
        return {
            uuid: this.uuid,
            players: Array.from(this.players.keys()).map((player: LobbyPlayer) => player.toJSON()),
            owner: this.owner.toJSON(),
            state: this.state
        }
    }

    public updateGameState() {
        let sockets : Socket[] = Array.from(this.players.values());
        for (let i=0; i<sockets.length; i++) 
            if (sockets[i] !== null)
                sockets[i].emit("update gamestate", this.game);
    }

    public updateLobby() : void {
        let sockets : Socket[] = Array.from(this.players.values());
        for (let i=0; i<sockets.length; i++) 
            if (sockets[i] !== null)
                sockets[i].emit("update lobby", this.toJSON());
    }

    public setOwner(player: LobbyPlayer) : void {
        let oldSocket: Socket = this.players.get(this.owner);
        if (oldSocket !== null) {
            oldSocket.removeAllListeners("launch game");
        }

        this.owner = player;
        let newSocket: Socket = this.players.get(this.owner);
    
        if (this.state === LobbyState.Lobby && newSocket !== null) {
            newSocket.on("launch game", () => {
                this.launchTheGame();
            });
        }
    }

    public addPlayer(player: LobbyPlayer, socket: Socket) : void {
        if (this.state !== LobbyState.Lobby) {
            throw new Error("This lobby is already in game");
        } else if (this.getNumberOfPlayers() < 4 || this.players.has(player)) {
            this.players.set(player, socket);
            this.chat.update();
            console.log("Player %s added on lobby %s", player.getUUID(), this.uuid);

            socket.on("update token", (token: number) => {
                player.setToken(token);
            });

            if (this.owner === null) 
                this.setOwner(player);

            this.updateLobby();
        } else { 
            throw new RangeError("Too many players already here");        
        }
    }

    public destroy() : void {
        this.chat.destroy();
    }

    public removePlayer(player: LobbyPlayer) : void {
        if (!this.players.has(player)) return;

        let socket: Socket = this.players.get(player);
        socket.removeAllListeners("update token");

        if (this.owner === player) {
            if (this.players.size === 0) {
                this.setOwner(null);
            } else {
                let iterator = this.players.entries();
                let player = iterator.next();
                while (player.value[1] === null || player.value[0] === player) 
                    player = iterator.next();

                this.setOwner(player.value[0]);
            }
        }

        if (this.state !== LobbyState.Lobby) 
            this.players.set(player, null);
        else
            this.players.delete(player);
        
        this.chat.update();
        this.updateLobby();

        player.setToken(0);
    }

    public isAccessible() : boolean {
        return this.state === LobbyState.Lobby && this.getNumberOfPlayers() < 4;
    }

    public getState() : LobbyState {
        return this.state;
    }

    public getPlayersAndTheirSocket() : Map<LobbyPlayer, Socket> {
        return this.players;
    }

    public getPlayers() : LobbyPlayer[] {
        return Array.from(this.players.keys());
    }

    public getNumberOfPlayers() : number {
        return this.players.size;
    }

    public isOwner(player: LobbyPlayer) : boolean {
        return this.owner === player;
    }

    public getOwner() : LobbyPlayer | null {
        return this.owner;
    }

    public getUUID() : string {
        return this.uuid;
    }

    public getIO() : Server {
        return this.io;
    }

    public getGameState() : State {
        return this.game;
    }

};