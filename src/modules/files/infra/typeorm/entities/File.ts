import { v4 as uuidV4 } from 'uuid';
import {
  Entity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('files')
class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { File };
