import { slugify } from "../utils/createSlug";
import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { makeId } from "../utils/generateRandom";
import { User } from "./user";

@Entity()
@ObjectType()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id!: number;

    @Column()
    @Field()
    title!: string;

    @Column()
    @Index()
    @Field()
    identifier: string;

    @Index()
    @Column()
    @Field()
    slug: string;

    @Column({ nullable: true, type: "text" })
    @Field()
    body!: string;


    @Field(() => User)
    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: "username", referencedColumnName: "email" })
    user!: User;


    @Field(() => String)
    @CreateDateColumn()
    createdAt!: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt!: Date;


    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(7);
        this.slug = slugify(this.title);
    }
}
