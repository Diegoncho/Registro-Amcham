import { Injectable } from '@angular/core';

@Injectable()
export class RifaService {
    constructor() {}

    private participantes: string[];

    setParticipantes(participantes: string[]): void {
        this.participantes = participantes;
    }

    getParticipantes(): string[] {
        return this.participantes;
    }
}
