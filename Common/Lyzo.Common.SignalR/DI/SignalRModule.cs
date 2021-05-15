using Autofac;
using Lyzo.Common.SignalR.Service;
using Lyzo.Common.SignalR.Service.Interface;

namespace Lyzo.Common.SignalR.DI
{
	public class SignalRModule : Autofac.Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			builder.RegisterType<ConnectionMappingService>()
				.As<IConnectionMappingService>()
				.SingleInstance();
		}
	}
}