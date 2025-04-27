export class AuthResponseDto {
  status: string;
  message: string;
  data: {
    access_token: string;
  };
}
