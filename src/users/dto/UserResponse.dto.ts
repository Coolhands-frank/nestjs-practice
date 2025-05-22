export class UserResponseDto {
  readonly id: string;
  readonly userName: string;
  readonly displayName?: string;
  readonly email: string;
  readonly role: string;
}