using System;

namespace Lyzo.Module.Rooms.Abstractions.Events
{
	public record ParticipantJoined(Guid RoomId, string ParticipantId);

	public record ParticipantOffered(Guid RoomId, string ParticipantId, string Offer);

	public record ParticipantDisconnected(string ParticipantId);
}