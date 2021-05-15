using Lyzo.Common.Database.Context;

namespace Lyzo.Common.Database.Repository
{
	public abstract class AbstractRepository<TDbContext>
		where TDbContext : AbstractDbContext
	{
		private readonly DbContextFactory<TDbContext> _dbContextFactory;

		protected AbstractRepository(DbContextFactory<TDbContext> dbContextFactory)
		{
			_dbContextFactory = dbContextFactory;
		}

		protected TDbContext CreateContext() => _dbContextFactory.CreateDbContext();
	}
}