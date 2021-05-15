namespace Lyzo.Module.Rooms.DataTypes
{
	public class RoomParticipant
	{
		public string ConnectionId { get; set; } = null!;

		public RoomParticipant()
		{
		}

		public RoomParticipant(string connectionId) => ConnectionId = connectionId;
	}
}