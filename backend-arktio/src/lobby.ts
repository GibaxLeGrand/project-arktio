import { Server, Socket } from 'socket.io';
import { Chat } from './chat';
import { Player, PlayerJSON } from './player';
import { State } from 'gamelogic-statearktio/';

export enum LobbyState {
    Lobby,
    Game,
    End
};

export interface LobbyJSON {
    uuid: string,
    players: Array<PlayerJSON>,
    owner: PlayerJSON,
    state: LobbyState,
    privacy: boolean
}

export class Lobby {
    private game: State;
    private uuid: string;
    private players: Map<Player, Socket>; 
    private owner: Player | null;
    private state: LobbyState;
    private privacy: boolean;
    private chat: Chat;
    private io : Server;

    constructor(uuid: string, io: Server, privacy: boolean) {
        this.uuid = uuid;
        this.players = new Map();
        this.owner = null;
        this.privacy = privacy;
        this.state = LobbyState.Lobby;
        this.chat = new Chat(this);
        this.io = io;
    }

    public launchTheGame() : void {
        this.state = State.create();
    }

    public toJSON() : LobbyJSON {
        return {
            uuid: this.uuid,
            players: Array.from(this.players.keys()).map((player: Player) => player.toJSON()),
            owner: this.owner.toJSON(),
            state: this.state,
            privacy: this.privacy,
        }
    }

    public addPlayer(player: Player, socket: Socket) : void {
        if (this.getNumberOfPlayers() < 4 || this.players.has(player)) {
            socket.removeAllListeners("update");
            this.players.set(player, socket);
            this.chat.update();
            console.log("Player %s added on lobby %s", player.getUUID(), this.uuid);

            socket.on("update", (callback : (lobby: LobbyJSON) => void) => {
                callback(this.toJSON());
            });

            if (this.owner === null) {
                this.owner = player;
                
                let osocket = this.players.get(player)!;
                osocket.on("privacy switch", () => {
                    this.privacy = !this.privacy;
                });
            }
        } else { 
            throw new RangeError("Too many players already here");        
        }
    }

    public destroy() : void {
        this.chat.destroy();
    }

    public removePlayer(player: Player) : void {
        let socket = this.players.get(player)!;
        socket.removeAllListeners("update");

        this.players.delete(player);
        this.chat.update();

        if (this.owner === player) {
            socket.removeAllListeners("privacy switch");

            if (this.players.size === 0) 
                this.owner = null;
            else {
                this.owner = this.players.entries().next().value[0];
                
                let osocket = this.players.get(this.owner!)!;
                osocket.on("privacy switch", () => {
                    this.privacy = !this.privacy;
                });
            }
        }
    }

    public isAccessible() : boolean {
        return this.state === LobbyState.Lobby && this.getNumberOfPlayers() < 4;
    }

    public getState() : LobbyState {
        return this.state;
    }

    public getPlayersAndTheirSocket() : Map<Player, Socket> {
        return this.players;
    }

    public getPlayers() : Player[] {
        return Array.from(this.players.keys());
    }

    public getNumberOfPlayers() : number {
        return this.players.size;
    }

    public getOwner() : Player | null {
        return this.owner;
    }

    public getUUID() : string {
        return this.uuid;
    }

    public getIO() : Server {
        return this.io;
    }

    public isPublic() : boolean {
        return this.privacy;
    }

};