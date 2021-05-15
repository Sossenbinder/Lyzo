using System.Collections.Generic;
using System.Threading.Tasks;
using Lyzo.Module.Rooms.DataTypes;

namespace Lyzo.Module.Rooms.Repository.Interface
{
	public interface IRoomRepository
	{
		Task CreateRoom(Room room);

		Task<List<Room>> GetRooms();
	}
}