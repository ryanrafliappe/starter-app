import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Role } from './role.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({length: 255, default: null})
    token: string;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

    @DeleteDateColumn()
    deleted_at: Timestamp;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({name: 'role_id'})
    role: Role;
}