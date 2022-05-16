import {Server, Socket} from 'socket.io';
import {Chat} from './chat';
import {LobbyPlayer, PlayerJSON} from './player';
import {State, Mois} from "../../gamelogic-arktio/dist/state";
import {Player} from '../../gamelogic-arktio/dist/player';
import {CaseManager, Case, TypeReponse} from '../../gamelogic-arktio/dist/caseManager'
import {LobbyManager} from './lobbymanager';

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
    private players: Map<LobbyPlayer, Socket | null>;
    private owner: LobbyPlayer | null;
    private state: LobbyState;
    private chat: Chat;
    private io: Server;

    constructor(uuid: string, io: Server) {
        this.uuid = uuid;
        this.players = new Map();
        this.owner = null;
        this.state = LobbyState.Lobby;
        this.chat = new Chat(this);
        this.io = io;
    }

    public launchTheGame(): void {
        if (this.state === LobbyState.Lobby) {
            let players: { [key: string]: Player } = {};
            let ordre: string[] = [];
            let buffer: LobbyPlayer[] = Array.from(this.players.keys());
            for (let i = 0; i < buffer.length; i++) {
                ordre.push(buffer[i].getUUID());

                players[buffer[i].getUUID()] = {
                    id: buffer[i].getUUID(),
                    inventaire: [],
                    argent: 1000,
                    pointTerre: 0,
                    pion: i,
                    caseActuelle: -1,
                    statut: 0,
                    avertissement: 0
                }
            }
            
            console.log(ordre);
            this.game = State.create(players, ordre);
            

            // Au cas où et pour + de lisibilité
            this.game.mois = Mois.SEPTEMBRE;
            this.game.tour = 0;
            this.state = LobbyState.Game;

            this.players.forEach((socket, player) => {
                let dice = true;
                if (socket == null) return;

                socket.on("dice", (callback: (result: TypeReponse) => void) => {
                    if (this.isActualPlayer(player) && dice) {
                        let result = 1 + Math.floor(Math.random() * (6 - 1));

                        let caseActuelle = this.game.joueurs[this.game.joueur_actuel].caseActuelle;
                        this.game.joueurs[this.game.joueur_actuel].caseActuelle = Math.min(caseActuelle + result, this.game.plateau.length - 1);

                        callback({
                            titre: `Vous avez fait ${result}`,
                            messages: ["Suivant"],
                        });
                        dice = false;

                        this.updateGameState();
                    } else {
                        callback({
                            titre: `Ce n'est pas votre tour`,
                            messages: ["Attendre"],
                        });
                    }
                });

                let choices: number[] = [];
                let end = false;
                let endturn = false;

                socket.on("play", () => {
                    if (this.isActualPlayer(player)) {
                        let mycase: Case = this.getActualPlayerCase();
                        let step = 0;
                        let reponse = mycase.prepare(this.game, this.game.joueur_actuel, step);
                        let that = this;

                        const nextStep = async () => {
                            console.log("nextStep");
                            if (that.isActualPlayer(player)) {
                                socket.emit("choix", reponse, (choice: number) => {
                                    console.log("YAY")
                                    let next = mycase.next(that.game, that.game.joueur_actuel, step, choice);
                                    end = next.end;

                                    if (step > next.step && !end)
                                        choices.pop();
                                    else
                                        choices.push(choice);

                                    if (!end) {
                                        step = next.step;
                                        nextStep();
                                    } else {
                                        if (this.isActualPlayer(player) && end) {
                                            let mycase: Case = this.getActualPlayerCase();
                                            this.game = mycase.play(this.game, this.game.joueur_actuel, choices);
                    
                                            choices = [];
                                            end = false;
                                            this.updateGameState();
                                            socket.emit("end action");
                                        }
                                    }
                                });
                            }
                        };

                        socket.emit("choix", reponse, (choice: number) => {
                            console.log(choice);
                            let next = mycase.next(this.game, this.game.joueur_actuel, step, choice);
                            end = next.end;

                            if (step > next.step && next.step != -1)
                                choices.pop();
                            else
                                choices.push(choice);

                            if (!end) {
                                step = next.step;
                                console.log("nextStep");
                                nextStep();
                            } else {
                                if (this.isActualPlayer(player) && end) {
                                    let mycase: Case = this.getActualPlayerCase();
                                    this.game = mycase.play(this.game, this.game.joueur_actuel, choices);
            
                                    choices = [];
                                    end = false;
                                    endturn = true;
                                    this.updateGameState();
                                    socket.emit("end action");
                                }
                            }
                        });
                    }
                });

                socket.on("end turn", () => {
                    if (this.isActualPlayer(player) && endturn) {
                        let players = Array.from(this.players.entries());
                        let p = player;
                        let endMonth = true;
                        for (let i = 0; i < players.length; i++) {
                            p = this.nextTurn()!;
                            if (this.game.joueurs[p.getUUID()].caseActuelle < this.game.plateau.length - 1
                                && this.players.get(p) != null) {
                                endMonth = false;
                                break;
                            }
                        }

                        if (endMonth) {
                            this.game.mois += 1;
                            this.game.joueur_actuel = this.game.ordre_joueurs[0];
                            this.game.plateau = CaseManager.generate_board();
                            if (this.game.mois >= 10) {
                                this.io.sockets.in(this.uuid).emit("end");
                                return;
                            } else {
                                for (let i = 0; i < players.length; i++) {
                                    this.game.joueurs[players[i][0].getUUID()].caseActuelle = -1;
                                }
                            }
                        }

                        endturn = false;
                        dice = true;
                        this.io.sockets.in(this.uuid).emit("start turn", this.game);
                    }
                });
            });

            this.io.sockets.in(this.uuid).emit("start turn", this.game);
        }
    }

    private isActualPlayer(player: LobbyPlayer): boolean {
        if (this.state === LobbyState.Game) {
            return this.game.joueur_actuel === player.getUUID();
        }

        return false;
    }

    private getActualPlayerCase(): Case {
        return this.game.plateau[this.game.joueurs[this.game.joueur_actuel].caseActuelle];
    }

    private nextTurn(): LobbyPlayer | null {
        if (this.state === LobbyState.Game) {
            let player: string = this.game.joueur_actuel;
            let ordre: string[] = this.game.ordre_joueurs;

            for (let i = 0; i < ordre.length; i++) {
                if (ordre[i] === player) {
                    if (i + 1 === ordre.length) {
                        this.game.tour += 1
                        this.game.joueur_actuel = ordre[0];
                    } else {
                        this.game.joueur_actuel = ordre[i + 1];
                    }

                    break;
                }
            }

            return Array.from(this.players.entries())
                .filter(entry => entry[0].getUUID() === this.game.joueur_actuel)[0][0];
        }

        return null;
    }

    public toJSON(): LobbyJSON {
        return {
            uuid: this.uuid,
            players: Array.from(this.players.keys()).map((player: LobbyPlayer) => player.toJSON()),
            owner: this.owner!.toJSON(),
            state: this.state
        }
    }

    public updateGameState(): void {
        this.io.sockets.in(this.uuid).emit("update gamestate", this.game);
    }

    public updateLobby(): void {
        this.io.sockets.in(this.uuid).emit("update lobby", this.toJSON());
    }

    public setOwner(player: LobbyPlayer): void {
        let oldSocket: Socket = this.players.get(this.owner!)!;
        oldSocket?.removeAllListeners("launch game");

        if (player == null) return;

        this.owner = player;
        let newSocket: Socket = this.players.get(this.owner)!;

        if (this.state === LobbyState.Lobby && newSocket !== null) {
            newSocket.on("launch game", () => {
                this.launchTheGame();
            });
        }
    }

    public contain(player: LobbyPlayer): boolean {
        this.players.forEach((socket, p) => {
            if (player === p)
                return true;
        });

        return false;
    }

    public addPlayer(player: LobbyPlayer, socket: Socket): boolean {
        if (this.state !== LobbyState.Lobby) {
            return false;
        } else if (this.getNumberOfPlayers() < 4 || this.players.has(player)) {
            this.players.set(player, socket);

            socket.join(this.uuid);
            this.chat.update();

            console.log("Player %s added on lobby %s", player.getUUID(), this.uuid);

            socket.on("update token", (token: number) => {
                player.setToken(token);
                this.updateLobby();
            });

            socket.on("quit", (callback: () => void) => {
                console.log("Player %s quit lobby %s", player.getUUID(), this.uuid);
                this.removePlayer(player);
                callback();
            })

            if (this.owner === null)
                this.setOwner(player);

            this.updateLobby();
            return true;
        } else {
            return false;
        }
    }

    public destroy(): void {
        this.chat.destroy();
    }

    public removePlayer(player: LobbyPlayer): void {
        if (!this.players.has(player)) return;

        let socket: Socket = this.players.get(player)!;
        socket.removeAllListeners("update token");
        socket.removeAllListeners("quit");

        if (this.owner === player) {
            if (this.players.size <= 1) {
                LobbyManager.destroyLobby(this);
            } else {
                let iterator = this.players.entries();
                let p = iterator.next();
                while (p.value[1] === null || p.value[0] === player)
                    p = iterator.next();

                this.setOwner(p.value[0]);
            }
        }

        this.players.delete(player);

        this.chat.update();
        socket.leave(this.uuid);
        this.updateLobby();

        player.setToken(0);
    }

    public isAccessible(): boolean {
        return this.state === LobbyState.Lobby && this.getNumberOfPlayers() < 4;
    }

    public getState(): LobbyState {
        return this.state;
    }

    public getPlayersAndTheirSocket(): Map<LobbyPlayer, Socket | null> {
        return this.players;
    }

    public getPlayers(): LobbyPlayer[] {
        return Array.from(this.players.keys());
    }

    public getNumberOfPlayers(): number {
        return this.players.size;
    }

    public isOwner(player: LobbyPlayer): boolean {
        return this.owner === player;
    }

    public getOwner(): LobbyPlayer | null {
        return this.owner;
    }

    public getUUID(): string {
        return this.uuid;
    }

    public getIO(): Server {
        return this.io;
    }

    public getGameState(): State {
        return this.game;
    }

};
