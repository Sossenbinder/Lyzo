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

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Room>().Ignore(x => x.Participants);
			modelBuilder.Entity<Room>().Ignore(x => x.Participants);
		}
	}
}