using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Lyzo.Common.SignalR.Base;
using Lyzo.Common.SignalR.DataTypes;
using Lyzo.Common.SignalR.Service.Interface;
using Lyzo.Module.Rooms.Abstractions.Events;

namespace Lyzo.Common.SignalR
{
	public class SignalRHub : BaseHub
	{
		public SignalRHub(
			IRoomEvents roomEvents,
			IConnectionMappingService connectionMappingService)
			: base(
				roomEvents,
				connectionMappingService)
		{
		}

		public async Task JoinRoom(Guid roomId)
		{
			await Groups.AddToGroupAsync(ConnectionId, roomId.ToString());

			await Clients.Caller.SendAsync(GroupCommand.JoinConfirmation.ToString().ToLower(), roomId);

			await Clients.GroupExcept(roomId.ToString(), ConnectionId).SendAsync(GroupCommand.NewParticipant.ToString().ToLower(), roomId, ConnectionId);

			await RoomEvents.ParticipantJoined.Raise(new ParticipantJoined(roomId, ConnectionId));
		}

		public async Task OfferRtc(Guid roomId, string receiver, string offer)
		{
			await Clients.Client(receiver).SendAsync(WebRtcCommands.RemoteOffer.ToString().ToLower(), roomId, ConnectionId, offer);
		}

		public async Task RespondToRemoteOffer(Guid roomId, string originalOfferer, string responseOffer)
		{
			await Clients.Client(originalOfferer).SendAsync(WebRtcCommands.OfferRespondedTo.ToString().ToLower(), roomId, ConnectionId, responseOffer);
		}

		public async Task Disconnect(Guid roomId)
		{
			await Clients.GroupExcept(roomId.ToString(), ConnectionId).SendAsync(GroupCommand.Disconnected.ToString().ToLower(), ConnectionId);
		}

		public async Task ShareCandidate(Guid roomId, string receiver, string candidate)
		{
			await Clients.Client(receiver).SendAsync(WebRtcCommands.IceCandidateReceived.ToString().ToLower(), roomId, ConnectionId, candidate);
		}
	}
}