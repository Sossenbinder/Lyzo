using Autofac;
using Lyzo.Common.Eventing.MassTransit.Helper;
using Lyzo.Common.Eventing.MassTransit.Service;
using Lyzo.Common.Eventing.MassTransit.Service.Interface;

namespace Lyzo.Common.Eventing.DI
{
	public class MassTransitModule : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			//builder.RegisterType<MassTransitBusFactory>()
			//	.AsSelf()
			//	.SingleInstance();

			builder.RegisterType<MassTransitEventingService>()
				.As<IStartable, IMassTransitEventingService>()
				.SingleInstance();

			builder.RegisterType<MassTransitSignalRBackplaneService>()
				.As<IMassTransitSignalRBackplaneService>()
				.SingleInstance();
		}
	}
}