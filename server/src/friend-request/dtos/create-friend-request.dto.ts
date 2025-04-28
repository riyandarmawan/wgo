import { IsNotEmpty } from "class-validator";

export class CreateFriendRequestDto {
  @IsNotEmpty()
  receiverId: string;
}
