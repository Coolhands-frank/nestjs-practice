import {Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema() 
export class User {
    @Prop({ unique: true, required: true })
    userName: string;

    @Prop({ unique: true, required: true})
    email: string;

    @Prop({ sparse: true })
    displayName?: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: 'user' })
    role: string;

}

export const userSchema = SchemaFactory.createForClass(User)

