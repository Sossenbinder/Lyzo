using Lyzo.Common.Eventing.Abstractions.Events;

namespace Lyzo.Module.Rooms.Abstractions.Events
{
	public interface IRoomEvents
	{
		IDistributedEvent<ParticipantJoined> ParticipantJoined { get; }

		IDistributedEvent<ParticipantDisconnected> ParticipantDisconnected { get; }
	}
}