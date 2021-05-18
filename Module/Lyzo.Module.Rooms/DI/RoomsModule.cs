using Autofac;
using Lyzo.Common.Database.Extensions;
using Lyzo.Module.Rooms.Abstractions.Events;
using Lyzo.Module.Rooms.Events;
using Lyzo.Module.Rooms.Repository;
using Lyzo.Module.Rooms.Repository.Context;
using Lyzo.Module.Rooms.Repository.Interface;
using Lyzo.Module.Rooms.Service;
using Lyzo.Module.Rooms.Service.Interface;

namespace Lyzo.Module.Rooms.DI
{
	public class RoomsModule : Autofac.Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			builder.RegisterDbContextFactory(ctx => new RoomContext(ctx["PostgresConnectionString"]));

			builder.RegisterType<RoomRepository>()
				.As<IRoomRepository>()
				.SingleInstance();

			builder.RegisterType<RoomManagementService>()
				.As<IRoomManagementService>()
				.SingleInstance();

			builder.RegisterType<RoomManagementService>()
				.As<IRoomManagementService>()
				.SingleInstance();

			builder.RegisterType<RoomEvents>()
				.As<IRoomEvents>()
				.SingleInstance();

			builder.RegisterType<RoomParticipantService>()
				.As<IRoomParticipantService>()
				.SingleInstance()
				.AutoActivate();
		}
	}
}