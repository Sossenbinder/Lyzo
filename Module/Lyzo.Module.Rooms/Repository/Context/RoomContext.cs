using Lyzo.Common.Database.Context;
using Lyzo.Module.Rooms.DataTypes;
using Microsoft.EntityFrameworkCore;

namespace Lyzo.Module.Rooms.Repository.Context
{
	public class RoomContext : AbstractDbContext
	{
		public DbSet<Room> Rooms { get; set; } = null!;

		public RoomContext(string connectionString)
			: base(connectionString)
		{
		}
	}
}