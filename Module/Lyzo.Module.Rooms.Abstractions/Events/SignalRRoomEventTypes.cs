using System;

namespace Lyzo.Module.Rooms.Abstractions.Events
{
	public record ParticipantUpdate(Guid RoomId, int Count);
}