using Lyzo.Common.Eventing.Abstractions.Events;
using Lyzo.Common.Eventing.Events;
using Lyzo.Common.Eventing.MassTransit.Service.Interface;
using Lyzo.Module.Rooms.Abstractions.Events;
using Microsoft.Extensions.Logging;

namespace Lyzo.Module.Rooms.Events
{
	public class RoomEvents : IRoomEvents
	{
		public IDistributedEvent<ParticipantJoined> ParticipantJoined { get; }

		public IDistributedEvent<ParticipantDisconnected> ParticipantDisconnected { get; }

		public RoomEvents(
			IMassTransitEventingService massTransitEventingService,
			ILogger<RoomEvents> logger)
		{
			ParticipantJoined = new MtEvent<ParticipantJoined>(massTransitEventingService, logger);
			ParticipantDisconnected = new MtEvent<ParticipantDisconnected>(massTransitEventingService, logger);
		}
	}
}