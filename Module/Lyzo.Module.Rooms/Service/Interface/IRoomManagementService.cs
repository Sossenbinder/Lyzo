using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Lyzo.Module.Rooms.DataTypes;

namespace Lyzo.Module.Rooms.Service.Interface
{
	public interface IRoomManagementService
	{
		Task<Guid> CreateRoom(Room room);

		Task<List<Room>> GetRooms();

		Task<Room> GetRoom(Guid roomId);
	}
}