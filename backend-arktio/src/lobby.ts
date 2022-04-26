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
            let ordre = [];
            let buffer : LobbyPlayer[] = Array.from(this.players.keys());
            for (let i=0; i<buffer.length; i++) {
                ordre.push(buffer[i].getName());

                players[buffer[i].getName()] = {
                    id: buffer[i].getUUID(),
                    inventaire : [],
                    argent : 1000,
                    pointTerre: 0,
                    pion : i,
                    caseActuelle : {position: 0, type: -1},
                    statut : 0,
                }
            }

            this.game = State.create(players, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], ordre);
            
            // Au cas où et pour + de lisibilité
            this.game.mois = 0;
            this.game.tour = 0;

            this.players.forEach((socket, player) => {
                let dice = true;
                socket.on("end turn", () => {
                    if (this.isActualPlayer(player)) {
                        let players = Array.from(this.players.entries());
                        let p = player;
                        let endMonth = true;
                        for (let i=0; i<players.length; i++) {
                            p = this.nextTurn();
                            if (this.game.joueurs[p.getName()].caseActuelle.position < this.game.plateau.length - 1 
                                && this.players.get(p) != null) {
                                endMonth = false;
                                break;
                            }
                        }

                        if (endMonth) {
                            this.game.mois += 1;

                            if (this.game.mois >= 10) {
                                this.io.sockets.in(this.uuid).emit("end");
                            } else {
                                for (let i=0; i<players.length; i++) {
                                    this.game.joueurs[players[i][0].getName()].caseActuelle = {
                                        position: 0,
                                        type: this.game.plateau[0]
                                    };
                                }
                            }
                        }

                        this.updateGameState();
                        dice = false;
                    }
                });

                socket.on("dice", (callback: ({ result } : { result: number }) => void) => {
                    if (this.isActualPlayer(player) && dice) {
                        callback({result: 1 + Math.floor(Math.random() * (6 - 1))});
                        dice = false;
                    } else {
                        callback({result: -1});
                    }
                });

                socket.on("play", () => {
                    
                });
            });

            this.updateGameState();
        }
    }

    private isActualPlayer(player: LobbyPlayer) : boolean {
        if (this.state === LobbyState.Game) {
            let p = Array.from(this.players.entries()).filter(entry => entry[0].getName() === this.game.joueur_actuel);

            if (p.length > 0)
                return player === p[0][0];
            else
                return false; 
        }

        return false;
    }

    private nextTurn() : LobbyPlayer {
        if (this.state === LobbyState.Game) {
            let player: string = this.game.joueur_actuel;
            let ordre: string[] = this.game.ordre_joueurs;
            
            for (let i=0; i<ordre.length; i++) {
                if (ordre[i] === player) {
                    if (i+1 === ordre.length) {
                        this.game.tour += 1
                        this.game.joueur_actuel = ordre[0];
                    } else {
                        this.game.joueur_actuel = ordre[i+1];
                    }

                    break;
                }
            }

            return Array.from(this.players.entries())
                .filter(entry => entry[0].getName() === this.game.joueur_actuel)[0][0];
        }

        return null;
    }

    public toJSON() : LobbyJSON {
        return {
            uuid: this.uuid,
            players: Array.from(this.players.keys()).map((player: LobbyPlayer) => player.toJSON()),
            owner: this.owner.toJSON(),
            state: this.state
        }
    }

    public updateGameState() : void {
        this.io.sockets.in(this.uuid).emit("update gamestate", this.game);
    }

    public updateLobby() : void {
        this.io.sockets.in(this.uuid).emit("update lobby", this.toJSON());
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
            socket.join(this.uuid);
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
        socket.leave(this.uuid);
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