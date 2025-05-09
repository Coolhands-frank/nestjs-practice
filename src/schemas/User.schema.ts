import {Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema() 
export class User {
    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ unique: true, required: true})
    email: string;

    @Prop({ required: false })
    displayName?: string;
}

export const userSchema = SchemaFactory.createForClass(User)

