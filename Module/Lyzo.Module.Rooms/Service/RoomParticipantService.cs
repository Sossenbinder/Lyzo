using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lyzo.Common.Eventing.DataTypes;
using Lyzo.Common.Eventing.Helper;
using Lyzo.Common.Eventing.MassTransit.Service.Interface;
using Lyzo.Module.Rooms.Abstractions.Events;
using Lyzo.Module.Rooms.DataTypes;
using Lyzo.Module.Rooms.Service.Interface;
using Lyzo.Module.ServiceBase;

namespace Lyzo.Module.Rooms.Service
{
	public class RoomParticipantService : LyzoServiceBaseWithoutLogger, IRoomParticipantService
	{
		private readonly IRoomManagementService _roomManagementService;

		private readonly IMassTransitSignalRBackplaneService _signalRBackplaneService;

		private readonly Dictionary<Guid, List<RoomParticipant>> _participantInfo;

		public RoomParticipantService(
			IRoomEvents roomEvents,
			IRoomManagementService roomManagementService,
			IMassTransitSignalRBackplaneService signalRBackplaneService)
		{
			_roomManagementService = roomManagementService;
			_signalRBackplaneService = signalRBackplaneService;
			_participantInfo = new();

			RegisterEventHandler(roomEvents.ParticipantJoined, OnParticipantJoined);
			RegisterEventHandler(roomEvents.ParticipantDisconnected, OnParticipantDisconnected);
		}

		public Task<List<RoomParticipant>> GetConnectedClients(Guid roomId)
		{
			return GetConnectedClientsInternal(roomId);
		}

		private async Task OnParticipantJoined(ParticipantJoined participantJoinedArg)
		{
			var (roomId, participantId) = participantJoinedArg;

			var participants = await GetConnectedClientsInternal(roomId);

			participants.Add(new RoomParticipant(participantId));

			await _signalRBackplaneService.RaiseAllSignalREvent(NotificationFactory.Update(new ParticipantUpdate(roomId, participants.Count), NotificationType.ParticipantUpdate));
		}

		private async Task OnParticipantDisconnected(ParticipantDisconnected args)
		{
			var rooms = _participantInfo
				.Where(x => x.Value.Any(x => x.ConnectionId == args.ParticipantId));

			foreach (var room in rooms)
			{
				var participants = room.Value;

				var index = participants.FindIndex(x => x.ConnectionId == args.ParticipantId);
				participants.RemoveAt(index);

				await _signalRBackplaneService.RaiseAllSignalREvent(NotificationFactory.Update(new ParticipantUpdate(room.Key, participants.Count), NotificationType.ParticipantUpdate));
			}
		}

		private async Task<List<RoomParticipant>> GetConnectedClientsInternal(Guid roomId)
		{
			var hasValue = _participantInfo.TryGetValue(roomId, out var participants);

			if (!hasValue)
			{
				var room = await _roomManagementService.GetRoom(roomId);
				_participantInfo.Add(roomId, room.Participants);

				participants = room.Participants;
			}

			return participants!;
		}
	}
}