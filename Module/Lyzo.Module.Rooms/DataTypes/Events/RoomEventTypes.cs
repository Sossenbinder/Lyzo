namespace Lyzo.Module.Rooms.DataTypes.Events
{
	public record ParticipantJoined(string RoomId, string ParticipantId);

	public record ParticipantOffered(string RoomId, string ParticipantId, string Offer);

	public record ParticipantDisconnected(string ParticipantId);
}