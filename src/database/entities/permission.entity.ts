import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
}