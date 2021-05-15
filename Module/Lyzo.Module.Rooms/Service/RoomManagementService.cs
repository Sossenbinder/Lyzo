using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Lyzo.Module.Rooms.DataTypes;
using Lyzo.Module.Rooms.Repository.Interface;
using Lyzo.Module.Rooms.Service.Interface;

namespace Lyzo.Module.Rooms.Service
{
	public class RoomManagementService : IRoomManagementService
	{
		private readonly IRoomRepository _roomRepository;

		public RoomManagementService(IRoomRepository roomRepository)
		{
			_roomRepository = roomRepository;
		}

		public async Task<Guid> CreateRoom(Room room)
		{
			var roomId = Guid.NewGuid();

			room.Id = roomId;

			await _roomRepository.CreateRoom(room);

			return roomId;
		}

		public Task<List<Room>> GetRooms()
		{
			return _roomRepository.GetRooms();
		}
	}
}