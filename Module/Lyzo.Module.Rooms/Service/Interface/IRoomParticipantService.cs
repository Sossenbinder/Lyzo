using System.Collections.Generic;
using Lyzo.Module.Rooms.DataTypes;

namespace Lyzo.Module.Rooms.Service.Interface
{
	public interface IRoomParticipantService
	{
		List<RoomParticipant> GetConnectedClients(string roomId);
	}
}