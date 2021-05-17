using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Lyzo.Module.Rooms.DataTypes;

namespace Lyzo.Module.Rooms.Service.Interface
{
	public interface IRoomParticipantService
	{
		Task<List<RoomParticipant>> GetConnectedClients(Guid roomId);
	}
}