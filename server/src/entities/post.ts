import { Vote } from './Vote';
import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne, OneToMany, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { slugify } from "../utils/createSlug";
import { makeId } from "../utils/generateRandom";
import { Comment } from './comment';
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

    @Field(() => [Comment])
    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt!: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt!: Date;

    @Field(() => [Vote])
    @OneToMany(() => Vote, (vote) => vote.post)
    votes!: Vote[];

    @Field(() => Number, { nullable: true })
    protected userVote: number
    setUserVote(user: User) {
        const index = this.votes?.findIndex((v) => v.username === user.email)
        this.userVote = index > -1 ? this.votes[index].value : 0
    }

    @Field(() => Number)
    get votesCount(): Number {
        return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0);
    }

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(7);
        this.slug = slugify(this.title);
    }
}
