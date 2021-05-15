using System.Collections.Generic;
using System.Threading.Tasks;
using Lyzo.Common.Database.Context;
using Lyzo.Common.Database.Repository;
using Lyzo.Module.Rooms.DataTypes;
using Lyzo.Module.Rooms.Repository.Context;
using Lyzo.Module.Rooms.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace Lyzo.Module.Rooms.Repository
{
	public class RoomRepository : AbstractRepository<RoomContext>, IRoomRepository
	{
		public RoomRepository(DbContextFactory<RoomContext> dbContextFactory)
			: base(dbContextFactory)
		{
		}

		public async Task CreateRoom(Room room)
		{
			await using var ctx = CreateContext();

			ctx.Rooms.Add(room);

			await ctx.SaveChangesAsync();
		}

		public async Task<List<Room>> GetRooms()
		{
			await using var ctx = CreateContext();

			return await ctx.Rooms.ToListAsync();
		}
	}
}