import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user-entity";

@Entity()
export class Article {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 300 })
  title: string;

  @Column({ type: "varchar", length: 2000 })
  content: string;

  @ManyToOne(() => User)
  @JoinColumn()
  owner: string;

  @Column({ type: "date" })
  updated_at: Date;

  @Column({ type: "date" })
  created_at: Date;
}
