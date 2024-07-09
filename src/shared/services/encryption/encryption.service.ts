import { Injectable } from '@nestjs/common';
import { compare, compareSync, hash, hashSync } from 'bcrypt';

@Injectable()
export class EncryptionService {
    readonly defaultSaltRounds = 12;

    compare(password: string, hash: string): Promise<boolean> {
        return compare(password, hash);
    }

    compareSync(password: string, hash: string): boolean {
        return compareSync(password, hash);
    }

    hash(password: string, saltRounds?: number): Promise<string> {
        return hash(password, saltRounds ?? this.defaultSaltRounds);
    }

    hashSync(password: string, saltRounds?: number): string {
        return hashSync(password, saltRounds ?? this.defaultSaltRounds);
    }
}
