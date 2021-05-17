using System;
using System.Collections.Generic;

namespace Lyzo.Module.Rooms.DataTypes
{
	public class Room
	{
		public Guid Id { get; set; }

		public string Name { get; set; } = null!;

		public string? Description { get; set; }

		public DateTime CreationDate { get; set; }

		public int? MaxParticipants { get; set; }

		public List<RoomParticipant> Participants { get; set; } = new();
	}
}