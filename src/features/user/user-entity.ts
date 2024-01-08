import bcrypt from "bcrypt";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 200 })
  username: string;

  @Column({ type: "varchar", length: 200 })
  first_name: string;

  @Column({ type: "varchar", length: 200 })
  last_name: string;

  @Column({ type: "varchar", length: 200 })
  password: string;

  @Column({ type: "date" })
  updated_at: Date;

  @Column({ type: "date" })
  created_at: Date;

  public async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
