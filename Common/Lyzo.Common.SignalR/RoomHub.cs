using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Lyzo.Common.SignalR.Base;
using Lyzo.Common.SignalR.Service.Interface;
using Lyzo.Module.Rooms.DataTypes.Events;
using Lyzo.Module.Rooms.Events.Interface;

namespace Lyzo.Common.SignalR
{
	public enum Commands
	{
		Joined,
		RemoteOffer,
		OfferRespondedTo,
		NewParticipant,
		Disconnected,
	}

	public partial class SignalRHub : BaseHub
	{
		public SignalRHub(
			IRoomEvents roomEvents,
			IConnectionMappingService connectionMappingService)
			: base(
				roomEvents,
				connectionMappingService)
		{
		}

		public async Task JoinRoom(string roomId)
		{
			await Groups.AddToGroupAsync(ConnectionId, roomId);

			await Clients.Caller.SendAsync(Commands.Joined.ToString().ToLower(), roomId);

			await Clients.GroupExcept(roomId, ConnectionId).SendAsync(Commands.NewParticipant.ToString().ToLower(), roomId, ConnectionId);

			await RoomEvents.ParticipantJoined.Raise(new ParticipantJoined(roomId, ConnectionId));
		}

		public async Task OfferRtc(string roomId, string offer)
		{
			await Clients.GroupExcept(roomId, ConnectionId).SendAsync(Commands.RemoteOffer.ToString().ToLower(), roomId, ConnectionId, offer);
		}

		public async Task RespondToRemoteOffer(string roomId, string originalOfferer, string responseOffer)
		{
			await Clients.Client(originalOfferer).SendAsync(Commands.OfferRespondedTo.ToString().ToLower(), roomId, ConnectionId, responseOffer);
		}

		public async Task Disconnect(string roomId)
		{
			await Clients.GroupExcept(roomId, ConnectionId).SendAsync(Commands.Disconnected.ToString().ToLower(), ConnectionId);
		}
	}
}