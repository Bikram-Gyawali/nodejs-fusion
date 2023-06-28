import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  role: string;

  @Column({ type: DataType.STRING, allowNull: false })
  avatar: string;

  @Column({ type: DataType.STRING, allowNull: false })
  bio: string;

  @Column({ type: DataType.STRING, allowNull: false })
  website: string;

  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false })
  gender: string;

  @Column({ type: DataType.STRING, allowNull: false })
  status: string;

  @Column({ type: DataType.STRING, allowNull: false })
  createdAt: string;

  @Column({ type: DataType.STRING, allowNull: false })
  updatedAt: string;

  @Column({
    type: DataType.ENUM(
      'boyfriend',
      'girlfriend',
      'friend',
      'partner',
      'other',
      'relative',
      'father',
      'mother',
      'uncle',
      'aunt',
      'brother',
      'sister',
      'enemy',
      'ex',
      'crush',
    ),
    allowNull: false,
  })
  relationship: string;
}
