using System.Collections.Generic;
using System.Linq;
using Lyzo.Module.Rooms.DataTypes;
using Lyzo.Module.Rooms.DataTypes.Events;
using Lyzo.Module.Rooms.Events.Interface;
using Lyzo.Module.Rooms.Service.Interface;
using Lyzo.Module.ServiceBase;

namespace Lyzo.Module.Rooms.Service
{
	public class RoomParticipantService : LyzoServiceBaseWithoutLogger, IRoomParticipantService
	{
		private readonly Dictionary<string, RoomInfo> _roomInfo;

		public RoomParticipantService(IRoomEvents roomEvents)
		{
			_roomInfo = new();

			RegisterEventHandler(roomEvents.ParticipantJoined, OnParticipantJoined);
			RegisterEventHandler(roomEvents.ParticipantDisconnected, OnParticipantDisconnected);
		}

		private void OnParticipantJoined(ParticipantJoined participantJoinedArg)
		{
			var (roomId, participantId) = participantJoinedArg;

			var hasValue = _roomInfo.TryGetValue(roomId, out var roomInfo);

			if (!hasValue)
			{
				roomInfo = new RoomInfo();
				_roomInfo.Add(roomId, roomInfo);
			}

			roomInfo!.Participants.Add(new RoomParticipant(participantId));
		}

		private void OnParticipantDisconnected(ParticipantDisconnected args)
		{
			var roomInfos = _roomInfo
				.Select(x => x.Value)
				.Where(x => x.Participants.Any(x => x.ConnectionId == args.ParticipantId));

			foreach (var roomInfo in roomInfos)
			{
				var index = roomInfo.Participants.FindIndex(x => x.ConnectionId == args.ParticipantId);
				roomInfo.Participants.RemoveAt(index);
			}
		}

		public List<RoomParticipant> GetConnectedClients(string roomId)
		{
			if (_roomInfo.TryGetValue(roomId, out var roomInfo))
			{
				return roomInfo.Participants;
			}

			return new List<RoomParticipant>();
		}
	}
}