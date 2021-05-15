using Lyzo.Common.Eventing.Events.Interface;
using Lyzo.Module.Rooms.DataTypes.Events;

namespace Lyzo.Module.Rooms.Events.Interface
{
	public interface IRoomEvents
	{
		IDistributedEvent<ParticipantJoined> ParticipantJoined { get; }

		IDistributedEvent<ParticipantDisconnected> ParticipantDisconnected { get; }
	}
}