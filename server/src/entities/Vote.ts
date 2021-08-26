import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Post } from "./post";
import { User } from "./user";

@Entity()
@ObjectType()
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  value!: number;

  @Column()
  @Field()
  username!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "email" })
  user!: User;

  @Field(() => Post)
  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  post: Post;
}
