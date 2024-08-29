import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { User } from "./user.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable({
        name: 'roles_has_permissions',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    })
    permissions: Permission[];

    @OneToMany(() => User, user => user.role)
    users: User[];
}