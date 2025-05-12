import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class MessagingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  users: Map<string, Socket> = new Map();

  handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.auth.token as string;

    const decoded: JwtPayload = jwtDecode(token);
    const { sub: userId } = decoded;

    this.users.set(userId as string, client);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    for (const [userId, socket] of this.users) {
      if (socket.id === client.id) {
        this.users.delete(userId);
      }
    }
  }
}
