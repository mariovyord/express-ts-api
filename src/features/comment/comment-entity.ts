import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user-entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 2000 })
  content: string;

  @OneToOne(() => User)
  @JoinColumn()
  owner: string;

  @OneToOne(() => Comment, { nullable: true })
  @JoinColumn()
  parent: string;

  @OneToOne(() => User)
  @JoinColumn()
  article: string;

  @Column({ type: "date" })
  updated_at: Date;

  @Column({ type: "date" })
  created_at: Date;
}
