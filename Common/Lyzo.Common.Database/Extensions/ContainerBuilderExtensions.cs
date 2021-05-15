using System;
using Autofac;
using Lyzo.Common.Database.Context;
using Microsoft.Extensions.Configuration;

namespace Lyzo.Common.Database.Extensions
{
	public static class ContainerBuilderExtensions
	{
		public static void RegisterDbContextFactory<TDbContext>(
			this ContainerBuilder containerBuilder,
			Func<IConfiguration, TDbContext> contextCreator)
			where TDbContext : AbstractDbContext
		{
			containerBuilder.Register(ctx => new DbContextFactory<TDbContext>(
					ctx.Resolve<IConfiguration>(),
					contextCreator))
				.As<DbContextFactory<TDbContext>>()
				.SingleInstance();
		}
	}
}