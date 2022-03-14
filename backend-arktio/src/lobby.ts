import { Server } from 'socket.io';
import { Chat } from './chat';
import { Player } from './player';
 
enum LobbyState {
    Lobby,
    Game,
    End
};

export class Lobby {
    private uuid: string;
    private players: Map<Player, any>; 
    private owner: Player | null;
    private state: LobbyState;
    private chat: Chat;

    private io : Server;

    constructor(uuid: string, io: Server) {
        this.uuid = uuid;
        this.players = new Map();
        this.owner = null;
        this.state = LobbyState.Lobby;
        this.chat = new Chat(this);

        this.io = io;
    }

    public addPlayer(player: Player, socket: any) : void {
        if (this.owner === null) this.owner = player;

        if (this.players.size < 4) {
            this.players.set(player, socket);
            this.chat.update();
            console.log("player %s added on lobby %s", player.getUUID(), this.uuid);
        } else { 
            throw new RangeError("Too many players already here");        
        }
    }

    public destroy() : void {
        this.chat.destroy();
    }

    public removePlayer(player: Player) : void {
        this.players.delete(player);
        this.chat.update();

        if (this.owner === player) 
            if (this.players.size === 0) 
                this.owner = null;
            else
                this.owner = this.players.entries().next().value[0];
    }

    public getState() : LobbyState {
        return this.state;
    }

    public getPlayersAndTheirSocket() : Map<Player, any> {
        return this.players;
    }

    public getPlayers() : Player[] {
        return Array.from(this.players.keys());
    }

    public getNumberOfPlayer() : number {
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

};