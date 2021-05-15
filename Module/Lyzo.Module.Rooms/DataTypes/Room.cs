using System;

namespace Lyzo.Module.Rooms.DataTypes
{
	public class Room
	{
		public Guid Id { get; set; }

		public string Name { get; set; } = null!;

		public string? Description { get; set; }

		public DateTime CreationDate { get; set; }
	}
}