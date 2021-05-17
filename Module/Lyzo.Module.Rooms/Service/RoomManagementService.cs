using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lyzo.Common.Core.Extensions;
using Lyzo.Module.Rooms.DataTypes;
using Lyzo.Module.Rooms.Repository.Interface;
using Lyzo.Module.Rooms.Service.Interface;

namespace Lyzo.Module.Rooms.Service
{
	public class RoomManagementService : IRoomManagementService
	{
		private readonly List<Room> _rooms;

		private readonly IRoomRepository _roomRepository;

		public RoomManagementService(IRoomRepository roomRepository)
		{
			_roomRepository = roomRepository;
			_rooms = new();
		}

		public async Task<Guid> CreateRoom(Room room)
		{
			var roomId = Guid.NewGuid();

			room.Id = roomId;

			await _roomRepository.CreateRoom(room);

			_rooms.Add(room);

			return roomId;
		}

		public async Task<List<Room>> GetRooms()
		{
			if (!_rooms.IsNullOrEmpty())
			{
				return _rooms;
			}

			var rooms = await _roomRepository.GetRooms();

			_rooms.AddRange(rooms);

			return rooms;
		}

		public async Task<Room> GetRoom(Guid roomId)
		{
			var room = _rooms.FirstOrDefault(x => x.Id == roomId);

			if (room is null)
			{
				room = await _roomRepository.GetRoom(roomId);
			}

			return room;
		}
	}
}